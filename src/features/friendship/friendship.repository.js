import { friendshipModel } from "./friendship.schema.js";
import { ApplicationError } from "./../../error-handling/applicationError.js";
import { UserModel } from "../users/user.schema.js";
import { ObjectId } from "mongodb";

export default class friendshipRepository {
  async responseToRequest(friendId, userId, status) {
    try {
      if (status) status = status.toLowerCase();
      const userAccount = await UserModel.findById(userId);
      const friendAccount = await UserModel.findById(friendId);

      // 1. check friends accound exist or not
      if (!friendAccount) {
        return "friend not found";
      }

      // 2. Check if the user already sent or received a request
      
      const existingRequest = await friendshipModel.findOne({
        $or: [
        { userId: new ObjectId(userId), friendId: new ObjectId(friendId) },
        { userId: new ObjectId(friendId), friendId: new ObjectId(userId) },
      ],});
      console.log(userId);
      console.log(existingRequest);

      // 3. if request is already exist then change the status
      if (existingRequest) {
        if(existingRequest.status === "pending"){
          if (status) {
            existingRequest.status = status;
  
            // if status is accept add to friends list
            if (status === "accept") {
              userAccount.friends.push(friendAccount.id);
              friendAccount.friends.push(userAccount.id);
  
              await userAccount.save();
              await friendAccount.save();
            }
            await existingRequest.save();
  
            return `Your request is ${status}`;
          } else {
            return "Response is need to change the status";
          }
        }else{
          return "Request is not pending";
        }
        
      } else {
        if (status) {
          // 4. creating new friendModel with status if not exist
          const friend = new friendshipModel({
            userId,
            friendId,
            status,
          });

          if (status === "accept") {
            userAccount.friends.push(friendAccount.id);
            friendAccount.friends.push(userAccount.id);

            await userAccount.save();
            await friendAccount.save();
          }

          await friend.save();
          return `Your request is ${status}`;
        } else {
          // 5. create new friendModel with status pending is not provided
          const friend = new friendshipModel({
            userId,
            friendId,
            status: "pending",
          });
          await friend.save();
          return "You request is pending";
        }
      }
    } catch (err) {
      throw new ApplicationError(err.message, 401);
    }
  }

  async getPendingRequest() {
    try {
      const friend = await friendshipModel
        .find({ status: "pending" })
        .populate("friendId", "name email -_id").select('friendId -_id');
      
      return friend; 
    } catch (err) {
      throw new ApplicationError(err.message, 401);
    }
  }

  async getFriends(userId) {
    try {
      const friend = await UserModel.findById(userId).populate(
        "friends",
        "name email -_id"
      ).select('friends -_id');
      return friend;
    } catch (err) {
      throw new ApplicationError(err.message, 401);
    }
  }

  async toggelFriendShip(userId,friendId) {
    try {
      const userAccount = await UserModel.findById(userId);
      const friendAccount = await UserModel.findById(friendId);
      const friend = await friendshipModel.findOne({ userId, friendId });

      // 1. check friends accound exist or not
      if (!friendAccount) {
        return "friend is not Found";
      }

      const isFriend = userAccount.friends.includes(friendAccount.id);
      if (isFriend) {
        userAccount.friends.pull(friendAccount.id);
        friendAccount.friends.pull(userAccount.id);
        friend.status = "reject";

        await userAccount.save();
        await friendAccount.save();
        await friend.save();

        return "FriendShip is removed";
      } else {
        userAccount.friends.push(friendAccount.id);
        friendAccount.friends.push(userAccount.id);
        friend.status = "accept";

        await userAccount.save();
        await friendAccount.save();
        await friend.save();

        return "FriendShip is added";
      }
    } catch (err) {
      throw new ApplicationError(err.message, 401);
    }
  }
}
