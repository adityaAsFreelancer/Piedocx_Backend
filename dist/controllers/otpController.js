"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.clearOTP = exports.verifyOTP = exports.sendOTP = exports.otpRateLimit = void 0;
const nodemailer_1 = __importDefault(require("nodemailer"));
const dotenv_1 = __importDefault(require("dotenv"));
const express_rate_limit_1 = __importDefault(require("express-rate-limit"));
const dbconfig_1 = require("../dbconfig/dbconfig");
const StudentSignup_entity_1 = require("../Entities/StudentSignup.entity");
const Studentotp_entity_1 = require("../Entities/Studentotp.entity");
dotenv_1.default.config();
const studentRepo = dbconfig_1.AppDataSource.getRepository(StudentSignup_entity_1.StudentSignup);
const otpRepo = dbconfig_1.AppDataSource.getRepository(Studentotp_entity_1.StudentOtp);
const otpStore = new Map();
exports.otpRateLimit = (0, express_rate_limit_1.default)({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 5, // limit each IP to 5 requests per windowMs
    message: {
        success: false,
        message: 'Too many OTP requests, please try again later.'
    },
    standardHeaders: true,
    legacyHeaders: false,
});
// Cleanup expired OTPs every 5 minutes
setInterval(() => {
    const now = Date.now();
    for (const [email, data] of otpStore.entries()) {
        if (now > data.expiresAt) {
            otpStore.delete(email);
        }
    }
}, 5 * 60 * 1000);
const transporter = nodemailer_1.default.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD,
    },
});
transporter.verify((error, success) => {
    if (error) {
        console.error('Email transporter configuration error:', error);
    }
    else {
        console.log('Email transporter is ready');
    }
});
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const sendOTP = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email } = req.body;
        if (!email || !emailRegex.test(email)) {
            return res.status(400).json({
                success: false,
                message: 'Valid email address is required',
            });
        }
        const normalizedEmail = email.trim();
        const student = yield studentRepo.findOne({ where: { email: normalizedEmail } });
        if (!student) {
            return res.status(404).json({
                success: false,
                message: 'User not found. Please register first.',
            });
        }
        // Generate OTP
        const otp = Math.floor(100000 + Math.random() * 900000).toString();
        const expiresAt = Date.now() + 2 * 60 * 1000; // 2 minutes
        // Delete old OTP if any
        yield otpRepo.delete({ email: normalizedEmail });
        // Save new OTP
        const otpEntity = otpRepo.create({
            email: normalizedEmail,
            otp,
            expiresAt,
            attempts: 0,
        });
        yield otpRepo.save(otpEntity);
        // Send email
        yield transporter.sendMail({
            from: `"Piedocx Technologies" <${process.env.EMAIL_USER}>`,
            to: normalizedEmail,
            subject: 'Your OTP Code',
            html: `
        <div style="font-family: Arial; max-width: 600px; margin: auto;">
          <p>Your OTP is:</p>
          <div style="font-size: 24px; font-weight: bold; background: #f4f4f4; padding: 10px; text-align: center;">${otp}</div>
          <p>This OTP will expire in 2 minutes.</p>
        </div>
      `,
        });
        return res.status(200).json({
            success: true,
            message: 'OTP sent to email successfully',
            expiresIn: 120,
        });
    }
    catch (error) {
        console.error('SendOTP Error:', error);
        return res.status(500).json({
            success: false,
            message: 'Failed to send OTP. Please try again.',
        });
    }
});
exports.sendOTP = sendOTP;
const verifyOTP = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, otp, password } = req.body;
        if (!email || !otp || !password) {
            return res.status(400).json({
                success: false,
                message: 'Email, OTP, and new password are required',
            });
        }
        const normalizedEmail = email.trim();
        const otpRecord = yield otpRepo.findOne({ where: { email: normalizedEmail } });
        if (!otpRecord) {
            return res.status(400).json({ success: false, message: 'OTP not found or expired' });
        }
        if (Date.now() > otpRecord.expiresAt) {
            yield otpRepo.delete({ email: normalizedEmail });
            return res.status(400).json({ success: false, message: 'OTP has expired' });
        }
        if (otpRecord.attempts >= 3) {
            yield otpRepo.delete({ email: normalizedEmail });
            return res.status(429).json({
                success: false,
                message: 'Too many failed attempts. Please request a new OTP.',
            });
        }
        if (otpRecord.otp !== otp.toString()) {
            otpRecord.attempts += 1;
            yield otpRepo.save(otpRecord);
            const remaining = 3 - otpRecord.attempts;
            return res.status(400).json({
                success: false,
                message: `Invalid OTP. ${remaining} attempts remaining.`,
            });
        }
        // OTP is correct – update password
        yield studentRepo.update({ email: normalizedEmail }, { password });
        // Delete OTP record after successful verification
        yield otpRepo.delete({ email: normalizedEmail });
        return res.status(200).json({ success: true, message: 'OTP verified. Password updated.' });
    }
    catch (error) {
        console.error('VerifyOTP Error:', error);
        return res.status(500).json({
            success: false,
            message: 'OTP verification failed.',
        });
    }
});
exports.verifyOTP = verifyOTP;
// Optional: Function to manually clear OTP (for admin use)
const clearOTP = (req, res) => {
    try {
        const { email } = req.body;
        if (!email) {
            return res.status(400).json({
                success: false,
                message: 'Email is required'
            });
        }
        const normalizedEmail = email.toLowerCase().trim();
        const deleted = otpStore.delete(normalizedEmail);
        return res.status(200).json({
            success: true,
            message: deleted ? 'OTP cleared successfully' : 'No OTP found for this email'
        });
    }
    catch (error) {
        console.error('ClearOTP Error:', error);
        return res.status(500).json({
            success: false,
            message: 'Failed to clear OTP',
            error: process.env.NODE_ENV === 'development' ? error.message : undefined
        });
    }
};
exports.clearOTP = clearOTP;
