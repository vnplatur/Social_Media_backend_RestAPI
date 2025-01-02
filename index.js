import "./env.js";

import express from "express";
import userRoutes from "./src/features/users/user.routes.js";
import { connectUsingMongoose } from "./src/config/mongooseConfig.js";
import mongoose from "mongoose";
import { postRoutes } from "./src/features/posts/post.routes.js";
import { commentRoutes } from "./src/features/comments/comment.routes.js";
import jwtAuth from "./src/middelware/jwt.middelware.js";
import { ApplicationError } from "./src/error-handling/applicationError.js";

const server = express();
server.use(express.json());

server.use("/api/users", userRoutes);
server.use("/api/posts", jwtAuth, postRoutes);
server.use("/api/comments", jwtAuth, commentRoutes);

// Error handler middleware
server.use((err, req, res, next) => {
  console.log(err);
  if (err instanceof ApplicationError) {
    res.status(err.code).send(err.message);
  }
  if (err instanceof mongoose.Error.ValidationError) {
    res.status(400).send(err.message);
  }

  // server errors.
  res.status(500).send("Something went wrong, please try later");
});

// 4. Middleware to handle 404 requests.
server.use((req, res) => {
  res
    .status(404)
    .send(
      "API not found. Please check our documentation for more information at localhost:3200/api-docs"
    );
});

server.listen(3000, () => {
  console.log("server is listening at 3000");
  connectUsingMongoose();
});
