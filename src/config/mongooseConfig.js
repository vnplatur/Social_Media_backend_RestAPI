import mongoose from "mongoose";
import { TokenBlacklistModel } from "../features/users/user.schema.js";

const url = process.env.DB_URL;

export const connectUsingMongoose = async () => {
  try {
    await mongoose.connect(url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    createIndexes();
    console.log("Mongodb connected using mongoose");
  } catch (err) {
    console.log("Error while connecting to db");
    console.log(err);
  }
};


const createIndexes = ()=>{
  TokenBlacklistModel.collection.createIndex({ "createdAt": 1 }, { expireAfterSeconds: 100 })
}