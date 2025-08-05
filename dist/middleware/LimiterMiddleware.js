"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authLimiter = void 0;
const express_rate_limit_1 = __importDefault(require("express-rate-limit"));
exports.authLimiter = (0, express_rate_limit_1.default)({
    windowMs: 1 * 60 * 1000, // 1 minutes
    max: 2, // limit each IP to 5 requests per windowMs
    message: {
        success: false,
        message: 'Too many login/OTP attempts. Please try again after 10 minutes.',
    },
    standardHeaders: true,
    legacyHeaders: false,
});
