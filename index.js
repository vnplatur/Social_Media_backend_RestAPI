import "./env.js";

import express from "express";
import userRoutes from "./src/features/users/user.routes.js";
import { connectUsingMongoose } from "./src/config/mongooseConfig.js";

const server = express();

server.use("/api/users", userRoutes);

server.listen(3000, () => {
  console.log("server is listening at 3000");
  connectUsingMongoose();
});
