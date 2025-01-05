import { ApplicationError } from "../../error-handling/applicationError.js";
import LikeRepository from "./like.repository.js";

export default class LikeController {
  constructor() {
    this.likeRepository = new LikeRepository();
  }

  async toggleLike(req, res, next) {
    try {
      const id = req.params.id;
      const { type } = req.body;
      const like = await this.likeRepository.toggleLike(id, req.userId, type);
      res.status(200).send(like);
    } catch (err) {
      if (err instanceof ApplicationError) {
        return next(err);
      }
      return res.status(401).send(err.message);
    }
  }

  async getLike(req, res, next) {
    try {
      const id = req.params.id;
      const like = await this.likeRepository.getLike(id, req.userId);
      res.status(200).send(like);
    } catch (err) {
      if (err instanceof ApplicationError) {
        return next(err);
      }
      return res.status(401).send(err.message);
    }
  }
}
