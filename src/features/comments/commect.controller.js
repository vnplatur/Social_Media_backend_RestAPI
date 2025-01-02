import CommentRepository from "./commecnt.repository.js";
import { ApplicationError } from "../../error-handling/applicationError.js";

export default class CommentController {
  constructor() {
    this.commentRepository = new CommentRepository();
  }

  async addComment(req, res, next) {
    try {
      const { comment } = req.body;
      const userId = req.userId;
      const postId = req.params.postId;
      const newComment = await this.commentRepository.addComment(
        userId,
        comment,
        postId
      );
      res.status(200).send("comment is added successfully");
    } catch (err) {
      console.log(err);
      if (err instanceof ApplicationError) {
        next(err);
      }
      res.status(401).send(err.message);
    }
  }

  async getComment(req, res, next) {
    try {
      const postId = req.params.postId;
      const postComment = await this.commentRepository.getComment(postId);
      res.status(200).send(postComment);
    } catch (err) {
      console.log(err);
      if (err instanceof ApplicationError) {
        next(err);
      }
      res.status(401).send(err.message);
    }
  }

  async deleteComment(req, res, next) {
    try {
      const userId = req.userId;
      const commentId = req.params.commentId;
      const removeComment = await this.commentRepository.deleteComment(
        userId,
        commentId
      );
      
      res.status(200).send(removeComment);
    } catch (err) {
      console.log(err);
      if (err instanceof ApplicationError) {
        next(err);
      }
      res.status(401).send(err.message);
    }
  }

  async updateComment(req, res, next) {
    try {
      const { comment } = req.body;
      const userId = req.userId;
      const commentId = req.params.commentId;
      const updateComment = await this.commentRepository.updateComment(
        userId,
        comment,
        commentId
      );
      res.status(200).send(updateComment);
    } catch (err) {
      console.log(err);
      if (err instanceof ApplicationError) {
        next(err);
      }
      res.status(401).send(err.message);
    }
  }
}
