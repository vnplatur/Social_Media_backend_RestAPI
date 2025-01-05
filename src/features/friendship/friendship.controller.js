import { ApplicationError } from "../../error-handling/applicationError.js";
import friendshipRepository from "./friendship.repository.js";

export default class FriendShipController{

    constructor(){
        this.friendShipRepository = new friendshipRepository();
    }

    async responseToRequest(req,res,next){
        try{
            const {status} = req.body;
            const friendId = req.params.friendId;
            const response = await this.friendShipRepository.responseToRequest(friendId,req.userId,status);
            return res.status(200).send(response);
        }catch(err){
            console.log(err);
            if(err instanceof ApplicationError){
               return next(err);
            }
            return res.status(401).send(err.message);
        }
    }

    async getPendingRequest(req,res,next){
        try{
            
            const response = await this.friendShipRepository.getPendingRequest();
            
            if(response){
                res.status(200).send(response);
            }
            return res.status(200).send("No More Pending Request");
        }catch(err){
            console.log(err);
            if(err instanceof ApplicationError){
               return next(err);
            }
            return res.status(401).send(err.message);
        }
    }

    async getFriends(req,res,next){
        try{
            const userId = req.params.userId
            const response = await this.friendShipRepository.getFriends(userId);
            if(response){
                res.status(200).send(response);
            }
            return res.status(200).send("user have no Friends");
        }catch(err){
            console.log(err);
            if(err instanceof ApplicationError){
               return next(err);
            }
            return res.status(401).send(err.message);
        }
    }

    async toggelFriendShip(req,res,next){
        try{
            const friendId = req.params.friendId;
            const response = await this.friendShipRepository.toggelFriendShip(req.userId,friendId);
            return res.status(200).send(response);
           
        }catch(err){
            console.log(err);
            if(err instanceof ApplicationError){
               return next(err);
            }
            return res.status(401).send(err.message);
        }
    }
}