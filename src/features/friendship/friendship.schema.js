import mongoose from "mongoose";

const friendshipSchema = new mongoose.Schema({
    userId:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"user",
        required: true,
    },
    friendId:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"user",
        required: true,
    },
    status:{ type: String, enum:['pending', 'accept', 'reject'], default:"pending"},
})

export const friendshipModel = mongoose.model('friendship',friendshipSchema);