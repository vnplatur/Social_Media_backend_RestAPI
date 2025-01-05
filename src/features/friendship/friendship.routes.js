import express from 'express';
import FriendShipController from "./friendship.controller.js";

export const friendShipRoutes = express.Router();

const friendShipController = new FriendShipController();

friendShipRoutes.get('/get-friends/:userId',(req,res,next)=>{
    friendShipController.getFriends(req,res,next);
})
friendShipRoutes.get('/get-pending-requests',(req,res,next)=>{
    friendShipController.getPendingRequest(req,res,next);
})
friendShipRoutes.post('/toggle-friendship/:friendId',(req,res,next)=>{
    friendShipController.toggelFriendShip(req,res,next);
})
friendShipRoutes.post('/response-to-request/:friendId',(req,res,next)=>{
    friendShipController.responseToRequest(req,res,next);
}) 