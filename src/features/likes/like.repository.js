import { ApplicationError } from "../../error-handling/applicationError.js";
import { likeModel } from "./like.schema.js";
import { ObjectId } from "mongodb";

export default class LikeRepository {
  async toggleLike(id, userId, type) {
    try {
      // Check if a like already exists
      const existingLike = await likeModel.findOne({
        likeable: id,
        userId: userId,
      });

      if (existingLike) {
        await existingLike.deleteOne();
        return "Unliked successfully";
      }

      // Otherwise, add a new like
      const newLike = new likeModel({
        likeable: new ObjectId(id),
        userId: new ObjectId(userId),
        onModel: type,
      });

      await newLike.save();
      return "Liked successfully";
    } catch (err) {
      throw new ApplicationError(err.message,401);
    }
  }

  async getLike(id, userId, type) {
    try {
      // Check if a like already exists
      const existingLike = await likeModel.findOne({
        likeable: id,
        userId: userId,
      });

      if (existingLike) {
        await existingLike.deleteOne();
        return "Unliked successfully";
      }

      // Otherwise, add a new like
      const newLike = new likeModel({
        likeable: new ObjectId(id),
        userId,
        onModel: type,
      });

      await newLike.save();
      return "Liked successfully";
    } catch (err) {
      throw new ApplicationError(err.message,401);
    }
  }
}
