import mongoose from "mongoose";
import { userSchema } from "./user.schema.js";

const UserModel = mongoose.model("user", userSchema);

export default class UserRepository {
  async signUp(data) {
    try{
        const user = new UserModel(data);
        await user.save();
        return user;
    }catch(err){
        console.log(err);
        throw err;
    }
    
  }
}
