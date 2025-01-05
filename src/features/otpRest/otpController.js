import OtpRepository from "./otp.repository.js";
import { ApplicationError } from "../../error-handling/applicationError.js";

export default class OtpController {
  constructor() {
    this.otpRepository = new OtpRepository();
  }

  async sendOtp(req, res, next) {
    try {
      const { email } = req.body;
      const otpsent = await this.otpRepository.sendOtp(email);
      return res.status(200).send(otpsent);
    } catch (err) {
      console.log(err);
      if (err instanceof ApplicationError) {
        return next(err);
      }
      return res.status(401).send(err.message);
    }
  }

  async verifyOtp(req, res, next) {
    try {
      const { email, otp } = req.body;
      const verified = await this.otpRepository.verifyOtp(email, otp);
      return res.status(200).send(verified);
    } catch (err) {
      console.log(err);
      if (err instanceof ApplicationError) {
        return next(err);
      }
      return res.status(401).send(err.message);
    }
  }

  async resetPassword(req, res, next) {
    try {
      const { email, newPassword } = req.body;
      const reset = await this.otpRepository.resetPassword(email, newPassword);
      return res.status(200).send(reset);
    } catch (err) {
      console.log(err);
      if (err instanceof ApplicationError) {
        return next(err);
      }
      return res.status(401).send(err.message);
    }
  }
}
