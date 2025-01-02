import mongoose from "mongoose";

const likeSchema = new mongoose.Schema({
    likeable:{
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        refPath: 'onModel',  // dynamic reference
    },
    userId:{
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref:'user'
    },
    onModel:{
        type: String,
        required: true,
        enum:['post','comment'],
    },
})

export const likeModel = mongoose.model('like',likeSchema); 