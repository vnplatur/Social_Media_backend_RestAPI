import LikeRepository from './like.repository.js'

export default class LikeController{

    constructor(){
        this.likeRepository = new LikeRepository()
    }
}