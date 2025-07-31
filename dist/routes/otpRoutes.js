"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const otpController_1 = require("../controllers/otpController");
const Otprouter = express_1.default.Router();
Otprouter.post('/send-otp', otpController_1.sendOTP);
Otprouter.post('/verify-otp', otpController_1.verifyOTP);
exports.default = Otprouter;
