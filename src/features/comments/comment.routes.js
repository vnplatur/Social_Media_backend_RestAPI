import express from "express";
import CommentController from "./commect.controller.js";

export const commentRoutes = express.Router();

const commentController = new CommentController

commentRoutes.post('/:postId',(req,res,next)=>{
    commentController.addComment(req,res,next);
})

commentRoutes.get('/:postId',(req,res,next)=>{
    commentController.getComment(req,res,next);
})

commentRoutes.delete('/:commentId',(req,res,next)=>{
    commentController.deleteComment(req,res,next);
})

commentRoutes.put('/:commentId',(req,res,next)=>{
    commentController.updateComment(req,res,next);
})