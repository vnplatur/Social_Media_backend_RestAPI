import mongoose from "mongoose";
import { UserModel, TokenBlacklistModel } from "./user.schema.js";
import bcrypt from 'bcrypt';


export default class UserRepository {
  async signUp(data) {
    try {
      const user = new UserModel(data);
      await user.save();
      return user;
    } catch (err) {
      // console.log(err);
      throw err;
    }
  }

  async getById(id) {
    try {
      const user = await UserModel.findById(id);
      return user;
    } catch (err) {
      // console.log(err);
      throw err;
    }
  }

  async findByEmail(email) {
    try {
      return await UserModel.findOne({ email });
    } catch (err) {
      // console.log(err);
      throw err;
    }
  }
  async findAll() {
    try {
      return await UserModel.find();
    } catch (err) {
      // console.log(err);
      throw err;
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
      throw err;
    }
  }

  async blacklistToken(token){
    const blackList = new TokenBlacklistModel({token,createdAt: new Date()});
    await blackList.save();
  }

  async updateLogoutAll(userId){
    try {
      const update = await UserModel.updateOne(
        { _id: userId },
        { $set: { lastLogoutTime: new Date() } }
      );
      return update;
    } catch (err) {
      throw new Error("Error logging out from all devices: " + err.message);
    }
    
  }
}
