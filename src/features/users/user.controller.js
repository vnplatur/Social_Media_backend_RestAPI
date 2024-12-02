import userModel from "./user.model.js";
import UserRepository from "./user.repository.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export default class UserController {
  constructor() {
    this.userRepository = new UserRepository();
  }

  async signUp(req, res, next) {
    try {
      const { name, email, password, gender } = req.body;
      const hashedPassword = await bcrypt.hash(password, 10);
      const newUser = new userModel(
        name,
        email,
        hashedPassword,
        gender,
        req.file.filename
      );
      const createUser = await this.userRepository.signUp(newUser);
      res.status(200).send(createUser);
    } catch (err) {
      console.log(err);
      next(err);
    }
  }

  async signIn(req, res, next) {
    try {
      const { email, password } = req.body;

      //   1. find the user
      const user = await this.userRepository.findByEmail(email);
      if (!user) {
        return res.status(400).send("Incorrect credentials");
      } else {
        //  2. compare password with hashedPassword
        const comparePassword = bcrypt.compare(password, user.password);
        if (comparePassword) {
          //  3. create token for user
          const token = jwt.sign(
            {
              userId: user._id,
              email: user.email,
            },
            process.env.JWT_SECRET,
            {
              expiresIn: "1h",
            }
          );
          //   4. send the token as responce
          res.status(200).send(token);
        }
      }
    } catch (err) {
      console.log(err);
      next(err);
    }
  }
  async logOut(req, res, next) {
    try {
    } catch (err) {
      console.log(err);
      next(err);
    }
  }
  async logOutAll(req, res, next) {
    try {
        
    } catch (err) {
      console.log(err);
      next(err);
    }
  }
  async getById(req, res, next) {
    try {
      const id = req.params.userId;
      const user = await this.userRepository.getById(id);
      if (!user) {
        return res.status(400).send("User doesn't exist");
      } else {
        return res.status(200).send(user);
      }
    } catch (err) {
      console.log(err);
      next(err);
    }
  }
  async getAll(req, res, next) {
    try {
      const user = await this.userRepository.findAll();
      if (!user) {
        return res.status(400).send("No Data available");
      } else {
        return res.status(200).send(user);
      }
    } catch (err) {
      console.log(err);
      next(err);
    }
  }
  async updateById(req, res, next) {
    try {
      const { name, email, password, gender } = req.body;
      const id = req.params.userId;
      let image;
      if (req.file) {
        image = req.file.filename;
      }
     
      const update = await this.userRepository.updateById(
        id,
        name,
        email,
        password,
        gender,
        image
      );
      console.log(update);
      if (update) {
        res.status(200).send(update);
      } else {
        res.send(
          "update is not possible ether data is missing or somthing is went wrong"
        );
      }
    } catch (err) {
      console.log(err);
      next(err);
    }
  }
}
