import express from "express";
import { upload } from "../../middelware/fileMiddelware.js";
import PostController from "./post.controller.js";

export const postRoutes = express.Router();

const postController = new PostController();

postRoutes.post("/", upload.single("imageUrl"), (req, res, next) => {
  postController.addPost(req, res, next);
});

postRoutes.get("/all", (req, res, next) => {
  postController.getAllPost(req, res, next);
});

postRoutes.get("/", (req, res, next) => {
  postController.getUserPost(req, res, next);
});

postRoutes.get("/:postId", (req, res, next) => {
  postController.getPostById(req, res, next);
});

postRoutes.put("/:postId", upload.single("imageUrl"), (req, res, next) => {
  postController.updatePost(req, res, next);
});

postRoutes.delete("/:postId", upload.single("imageUrl"), (req, res, next) => {
  postController.deletePost(req, res, next);
});
