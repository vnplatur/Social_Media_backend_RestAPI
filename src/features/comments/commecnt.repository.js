import { ApplicationError } from "../../error-handling/applicationError.js";
import { commentModel } from "./comment.schema.js";

export default class CommentRepository{

    async addComment(userId,comment,postId){
        try{
            const newComment = new commentModel({userId,comment,postId})
            await newComment.save();
            return newComment;
        }catch(err){
            throw new ApplicationError(err.message,401);
        }    
    }

    async getComment(postId){
        try{
            const allComment = await commentModel.find({postId});
            return allComment;

        }catch(err){
            throw new ApplicationError(err.message,401);
        }    
    }

    async deleteComment(userId,commentId){
        try{
            const comment = await commentModel.findById(commentId);
            console.log("userId: ",userId);
            if(comment){
                if(comment.userId.toString() == userId.toString()){
                    await commentModel.findByIdAndDelete(commentId);
                    return "comment is deleted successfully";
                }else{
                    return "only comment user can delete the comment";
                }
            }else{
                return "comment is not found";
            }
            
        }catch(err){
            throw new ApplicationError(err.message,401);
        }

    }
    async updateComment(userId, comment ,commentId){
        try{
            const oldComment = await commentModel.findById(commentId);
            if(oldComment){
                if(oldComment.userId.toString() == userId.toString()){
                    oldComment.comment = comment;
                    await oldComment.save();
                    return "comment is updated successfully";
                }else{
                    return "only comment user is allowed to update the comment";
                }
            }else{
                return "comment is not found"
            }
            
        }catch(err){
            throw new ApplicationError(err.message,401);
        }
    }
}