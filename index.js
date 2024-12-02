import "./env.js";

import express from "express";
import userRoutes from "./src/features/users/user.routes.js";
import { connectUsingMongoose } from "./src/config/mongooseConfig.js";
import mongoose from "mongoose";

const server = express();
server.use(express.json());

server.use("/api/users", userRoutes);

// Error handler middleware
server.use((err, req, res, next) => {
  console.log(err);
  // if (err instanceof ApplicationError) {
  //   res.status(err.code).send(err.message);
  // }
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
