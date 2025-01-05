import { ApplicationError } from "../../error-handling/applicationError.js";
import { otpModel } from './otp.schema.js';
import nodemailer from 'nodemailer';
import crypto from 'crypto';
import { UserModel } from "../users/user.schema.js";
import bcrypt from 'bcrypt';

export default class OtpRepository{

    async sendOtp(email){
        try{
            if (!email) return 'Email is required' ;
          
            const otp = crypto.randomInt(100000, 999999).toString();

            // 1. Create an email transporter.
            // SMTP (Simple Mail Transfer Protocol)
            const transporter = nodemailer.createTransport({
                service: "gmail",
                auth: {
                user: "vaijeenath.n.p@gmail.com",
                pass: "ubwr mjws liaj ogbj",
                },
            });

            //2. Configure email content
            const mailOptions = {
                from: "vaijeenath.n.p@gmail.com",
                to: email,
                subject: "OTP to reset your password",
                text: `Your OTP is ${otp}. It will expire in 5 minutes.`,
            };

            // 3. Send the email
            await otpModel.create({ email, otp });
            await transporter.sendMail(mailOptions);

            return "OTP sent successfully";

        }catch(err){
            throw new ApplicationError(err.message,401)
        }
    }

    async verifyOtp(email,otp){
        try{
            if (!email && !otp) return 'Email and OTP is required';
          
            const otpRecord = await otpModel.findOne({ email, otp });
            if (!otpRecord) return 'Invalid or expired OTP' ;

            otpRecord.verify = 'verified';
            await otpRecord.save();

            return 'OTP verified successfully';

        }catch(err){
            throw new ApplicationError(err.message,401)
        }
    }

    async resetPassword(email,newPassword){
        try{
            if (!email && !newPassword) return 'Email and newPassword is required' ;
          
            const verified = await otpModel.findOne({email,verify:'verified'});
            if(verified){
                const user = await UserModel.findOne({ email });
                if (!user) return 'User not found';

                const hashedPassword = await bcrypt.hash(newPassword, 10);

                user.password = hashedPassword; // Ensure hashing of passwords in your model
                await user.save();
    
                await otpModel.deleteMany({ email }); // Clean up OTPs for the user
                return 'Password reset successfully';
            } 
        }catch(err){
            throw new ApplicationError(err.message,401)
        }
    }
}