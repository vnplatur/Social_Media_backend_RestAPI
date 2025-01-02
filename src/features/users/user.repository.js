import mongoose from "mongoose";
import { UserModel, TokenBlacklistModel } from "./user.schema.js";
import bcrypt from 'bcrypt';
import {ApplicationError} from '../../error-handling/applicationError.js'


export default class UserRepository {
  async signUp(data) {
    try {
      const user = new UserModel(data);
      await user.save();
      return user;
    } catch (err) {
      // console.log(err);
      throw new ApplicationError(err.message,401);
    }
  }

  async getById(id) {
    try {
      const user = await UserModel.findById(id);
      return user;
    } catch (err) {
      // console.log(err);
      throw new ApplicationError(err.message,401);
    }
  }

  async findByEmail(email) {
    try {
      return await UserModel.findOne({ email });
    } catch (err) {
      // console.log(err);
      throw new ApplicationError(err.message,401);
    }
  }
  async findAll() {
    try {
      return await UserModel.find();
    } catch (err) {
      // console.log(err);
      throw new ApplicationError(err.message,401);
    }
  }

  async updateById(id, name, email, password, gender, imageUrl) {
    try {
      const user = await UserModel.findById(id);
      if (user) {
        if (name) {
          user.name = name;
          await user.save();
        }
        if (email) {
          user.email = email;
          await user.save();
        }
        if (password) {
          const hashedPassword = await bcrypt.hash(password, 10);
          user.password = password;
          await user.save();
        }
        if (gender) {
          user.gender = gender;
          await user.save();
        }
        if (imageUrl) {
          user.imageUrl = imageUrl;
          await user.save();
        }

        return user;
      }
    } catch (err) {
      // console.log(err);
      throw new ApplicationError(err.message,401);
    }
  }

  async blacklistToken(token){
    try{
      const blackList = new TokenBlacklistModel({token,createdAt: new Date()});
      await blackList.save();
      return blackList
    }catch(err){
      throw new ApplicationError(err.message,401);
    }
    
  }

  async updateLogoutAll(userId){
    try {
      const update = await UserModel.updateOne(
        { _id: userId },
        { $set: { lastLogoutTime: new Date() } }
      );
      return update;
    } catch (err) {
      throw new ApplicationError("Error logging out from all devices: " + err.message, 401);
    }
    
  }
}
