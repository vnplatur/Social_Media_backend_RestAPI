import mongoose from "mongoose";

 const userSchema = new mongoose.Schema({
  name: { type: String, required: [true, "name is required"] },
  email: {
    type: String,
    unique: true, // unique is validation
    match: [/.+\@.+\../, "Please enter a valid email"], // regular expration
  },
  password: {
    type: String,
    // validate: {
    //   validator: function (value) {
    //     return /^(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,12}$/.test(value);
    //   },
    //   message:
    //     "Password should be between 8-12 charachetrs and have a special character",
    // },
  },
  imageUrl: { type: String },
  gender: { type: String, required: [true, "gendar is required"] },
  lastLogoutTime: {type: Date},       // Timestamp for the last logout from all devices
  // createdAt: {type: Date},            // Timestamp for when the user was created
  
});


// new one added
const BlacklistSchema = new mongoose.Schema({
  token: { type: String, required: true },
  createdAt: Date,
});

export const UserModel = mongoose.model("user", userSchema);

export const TokenBlacklistModel = mongoose.model('TokenBlacklist', BlacklistSchema);





