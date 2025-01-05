import express from 'express';
import LikeController from './like.controller.js';

export const likeRoutes = express.Router();

const likeController = new LikeController();

likeRoutes.get("/:id",(req,res,next)=>{
    likeController.getLike(req,res,next);
})

likeRoutes.post("/:id",(req,res,next)=>{
    likeController.toggleLike(req,res,next);
})