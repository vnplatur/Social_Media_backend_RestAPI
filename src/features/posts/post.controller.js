import PostReposiotory from "./post.repository.js";
import { ApplicationError } from "../../error-handling/applicationError.js";

export default class PostController {
  constructor() {
    this.postReposiotory = new PostReposiotory();
  }

  async addPost(req, res, next) {
    try {
      const { caption } = req.body;
      console.log("file error is geting",req.file)
      const post = await this.postReposiotory.addPost(
        req.userId,
        caption,
        req?.file?.filename
      );
      if (post) {
        res.status(200).send(post);
      }
    } catch (err) {
      console.log(err);
      if (err instanceof ApplicationError) {
        return next(err);
      }
      res.status(401).send(err.message);
    }
  }

  async updatePost(req, res, next) {
    try {
      const id = req.params.postId;
      const { caption, imageUrl } = req.body;
      const post = await this.postReposiotory.updatePost(
        id,
        req.userId,
        caption,
        imageUrl
      );
      if (post) {
        res.status(200).send(post);
      } else {
        res.status(200).send("please provide some caption or image to update");
      }
    } catch (err) {
      console.log(err);
      if (err instanceof ApplicationError) {
        return next(err);
      }
      res.status(401).send(err.message);
    }
  }

  async deletePost(req, res, next) {
    try {
      const id = req.params.postId;
      const post = await this.postReposiotory.deletePost(id, req.userId);
      if (post) {
        res.status(200).send("Post is deleted successfully");
      } else {
        res.status(200).send("Post is not found");
      }
    } catch (err) {
      console.log(err);
      if (err instanceof ApplicationError) {
        return next(err);
      }
      res.status(401).send(err.message);
    }
  }

  async getPostById(req, res, next) {
    try {
      const id = req.params.postId;
      const post = await this.postReposiotory.getPostById(id);
      if (post) {
        res.status(200).send(post);
      }
      else{
        res.status(400).send("post is not found");
      }
    } catch (err) {
      console.log(err);
      if (err instanceof ApplicationError) {
        return next(err);
      }
      res.status(401).send(err.message);
    }
  }

  async getAllPost(req, res, next) {
    try {
      const post = await this.postReposiotory.getAllPost();
      if (post) {
        res.status(200).send(post);
      }
      else{
        res.status(400).send("post is not found");
      }
    } catch (err) {
      console.log(err);
      if (err instanceof ApplicationError) {
        return next(err);
      }
      res.status(401).send(err.message);
    }
  }

  async getUserPost(req, res, next) {
    try {
      const post = await this.postReposiotory.getUserPost(req.userId);
      if (post) {
        res.status(200).send(post);
      }
      else{
        res.status(400).send("post is not found");
      }
    } catch (err) {
      console.log(err);
      if (err instanceof ApplicationError) {
        return next(err);
      }
      res.status(401).send(err.message);
    }
  }
}
