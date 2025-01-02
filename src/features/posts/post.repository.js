import { ApplicationError } from "../../error-handling/applicationError.js";
import { postModel } from "./post.schema.js";
import { ObjectId } from "mongodb";

export default class PostReposiotory {
  async addPost(userId, caption, imageUrl) {
    try {
      const post = new postModel({ userId: new ObjectId(userId), caption, imageUrl });
      
      await post.save();
      return post;
    } catch (err) {
      throw new ApplicationError(err.message,401);
    }
  }

  async updatePost(id,userId, caption, imageUrl) {
    try {
      const post = await postModel.findById(id);
      if ((post.userId.toString() == userId.toString()) && (caption || imageUrl)) {
        if (caption) {
          post.caption = caption;
        }
        if (imageUrl) {
          post.imageUrl = imageUrl;
        }
        await post.save();

        return post;
      } else {
        return false;
      }
    } catch (err) {
      throw new ApplicationError(err.message,401);
    }
  }

  async deletePost(id, userId) {
    try {
      const post = await postModel.findById(id);

      if(post){
      // console.log("console the post",post)

        if(post.userId.toString() == userId.toString()) {
          await postModel.findByIdAndDelete(id);
          return true;
        }
      }else{
      
        return false;
      }
      
      
    } catch (err) {
      throw new ApplicationError(err.message,401);
    }
  }

  async getPostById(id) {
    try {
      const post = await postModel.findById(id);
      return post;
    } catch (err) {
      throw new ApplicationError(err.message,401);
    }
  }

  async getAllPost() {
    try {
      const post = await postModel.find();
      return post;
    } catch (err) {
      throw new ApplicationError(err.message,401);
    }
  }

  async getUserPost(userId) {
    try {
      const post = await postModel.find({ userId });
      return post;
    } catch (err) {
      throw new ApplicationError(err.message,401);
    }
  }
}
