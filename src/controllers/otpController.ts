import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
import rateLimit from 'express-rate-limit';
import { AppDataSource } from '../dbconfig/dbconfig';
import { StudentSignup } from '../Entities/StudentSignup.entity';
import { StudentOtp } from '../Entities/Studentotp.entity';
dotenv.config();

const studentRepo = AppDataSource.getRepository(StudentSignup);
const otpRepo=AppDataSource.getRepository(StudentOtp)

interface OTPData {
  otp: string;
  expiresAt: number;
  attempts: number;
}

const otpStore = new Map<string, OTPData>();

export const otpRateLimit = rateLimit({
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

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD,
  },
});

transporter.verify((error: any, success: any) => {
  if (error) {
    console.error('Email transporter configuration error:', error);
  } else {
    console.log('Email transporter is ready');
  }
});
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const sendOTP = async (req: any, res: any) => {
  try {
    const { email } = req.body;

    if (!email || !emailRegex.test(email)) {
      return res.status(400).json({
        success: false,
        message: 'Valid email address is required',
      });
    }

    const normalizedEmail = email.trim();
    const student = await studentRepo.findOne({ where: { email: normalizedEmail } });

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
    await otpRepo.delete({ email: normalizedEmail });

    // Save new OTP
    const otpEntity = otpRepo.create({
      email: normalizedEmail,
      otp,
      expiresAt,
      attempts: 0,
    });
    await otpRepo.save(otpEntity);

    // Send email
    await transporter.sendMail({
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

  } catch (error) {
    console.error('SendOTP Error:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to send OTP. Please try again.',
    });
  }
};


export const verifyOTP = async (req: any, res: any) => {
  try {
    const { email, otp, password } = req.body;

    if (!email || !otp || !password) {
      return res.status(400).json({
        success: false,
        message: 'Email, OTP, and new password are required',
      });
    }

    const normalizedEmail = email.trim();

    const otpRecord = await otpRepo.findOne({ where: { email: normalizedEmail } });

    if (!otpRecord) {
      return res.status(400).json({ success: false, message: 'OTP not found or expired' });
    }

    if (Date.now() > otpRecord.expiresAt) {
      await otpRepo.delete({ email: normalizedEmail });
      return res.status(400).json({ success: false, message: 'OTP has expired' });
    }

    if (otpRecord.attempts >= 3) {
      await otpRepo.delete({ email: normalizedEmail });
      return res.status(429).json({
        success: false,
        message: 'Too many failed attempts. Please request a new OTP.',
      });
    }

    if (otpRecord.otp !== otp.toString()) {
      otpRecord.attempts += 1;
      await otpRepo.save(otpRecord);
      const remaining = 3 - otpRecord.attempts;
      return res.status(400).json({
        success: false,
        message: `Invalid OTP. ${remaining} attempts remaining.`,
      });
    }

    // OTP is correct – update password
    await studentRepo.update({ email: normalizedEmail }, { password });

    // Delete OTP record after successful verification
    await otpRepo.delete({ email: normalizedEmail });

    return res.status(200).json({ success: true, message: 'OTP verified. Password updated.' });

  } catch (error) {
    console.error('VerifyOTP Error:', error);
    return res.status(500).json({
      success: false,
      message: 'OTP verification failed.',
    });
  }
};


// Optional: Function to manually clear OTP (for admin use)
export const clearOTP = (req: any, res: any) => {
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

  } catch (error) {
    console.error('ClearOTP Error:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to clear OTP',
      error: process.env.NODE_ENV === 'development' ? (error as Error).message : undefined
    });
  }
};