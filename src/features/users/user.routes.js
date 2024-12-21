import express from "express";
import { upload } from "../../middelware/fileMiddelware.js";
import UserController from "./user.controller.js";
import jwtAuth from "../../middelware/jwt.middelware.js";

const userRoutes = express.Router();

const userController = new UserController();

userRoutes.post("/signup", upload.single("imageUrl"), (req, res, next) => {
  userController.signUp(req, res, next);
});
userRoutes.post("/signin", (req, res, next) => {
  userController.signIn(req, res, next);
});
userRoutes.post("/logout",jwtAuth, (req, res, next) => {
  userController.logOut(req, res, next);
});
userRoutes.post("/logout-all-devices",jwtAuth, (req, res, next) => {
  userController.logOutAll(req, res, next);
});
userRoutes.get("/get-details/:userId", (req, res, next) => { 
  userController.getById(req, res, next);
});
userRoutes.get("/get-all-details", (req, res, next) => {
  userController.getAll(req, res, next);
});
userRoutes.post(
  "/update-details/:userId",
  upload.single("imageUrl"),
  (req, res, next) => {
    userController.updateById(req, res, next);
  }
);

export default userRoutes;
