import express from 'express';
import OtpController from './otpController.js';

export const OtpRoutes = express.Router();

const otpController = new OtpController();

OtpRoutes.post('/send',(req,res,next)=>{
    otpController.sendOtp(req,res,next);
})
OtpRoutes.post('/verify',(req,res,next)=>{
    otpController.verifyOtp(req,res,next);
})
OtpRoutes.post('/reset-password',(req,res,next)=>{
    otpController.resetPassword(req,res,next);
})