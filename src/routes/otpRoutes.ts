import express from 'express';
import { sendOTP, verifyOTP } from '../controllers/otpController';

const Otprouter = express.Router();

Otprouter.post('/send-otp', sendOTP);
Otprouter.post('/verify-otp', verifyOTP);

export default Otprouter;
