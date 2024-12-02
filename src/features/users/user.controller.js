
import UserRepository from "./user.repository.js"

export default class UserController{
    constructor(){
        this.userRepository = new UserRepository()
    }

    async signUp(req,res,next){
        
    }
}