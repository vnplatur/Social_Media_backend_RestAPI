import { verify } from 'crypto';
import mongoose from 'mongoose';

const otpSchema = new mongoose.Schema({
  email: { type: String, required: true },
  otp: { type: String, required: true },
  verify: {type: String, default:"pending"},
  createdAt: { type: Date, default: Date.now, expires: 30 }, // OTP expires in 5 minutes

});

export const otpModel = mongoose.model('OTP', otpSchema);
