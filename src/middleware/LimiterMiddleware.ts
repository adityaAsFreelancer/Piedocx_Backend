import rateLimit from 'express-rate-limit';
export const authLimiter = rateLimit({
  windowMs: 1 * 60 * 1000, // 1 minutes
  max: 2, // limit each IP to 5 requests per windowMs
  message: {
    success: false,
    message: 'Too many login/OTP attempts. Please try again after 10 minutes.',
  },
  standardHeaders: true,
  legacyHeaders: false,
});