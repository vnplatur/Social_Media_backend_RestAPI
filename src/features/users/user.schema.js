import mongoose from "mongoose";

export const userSchema = new mongoose.Schema({
    name:{type:String, required:[true,"name is required"]},
    email:{type:String,
        unique:true,                                        // unique is validation
        match: [/.+\@.+\../, "Please enter a valid email"]    // regular expration
       },                   
   password:{type:String,
       validate:{
           validator: function(value){
               return /^(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,12}$/.test(value)
           },
           message:"Password should be between 8-12 charachetrs and have a special character"
       }
   },
   gender:{type:String, required:[true,"gendar is required"]},

})