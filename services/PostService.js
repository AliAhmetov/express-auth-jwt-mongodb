const Post = require("../models/Branch");
const fileService = require('./FileService')

class PostService {
    async create(post, picture) {
        const fileName = fileService.saveFile(picture);
        const createdPost = await Post.create({...post, img: fileName});
        return createdPost;
    }
    async update(id, post, picture) {
        const fileName = fileService.saveFile(picture);
        const createdPost = await Post.updateOne({_id:id},{...post, img: fileName});
        return createdPost;
    }
    async delete(branch) {
        return Post.deleteOne(branch)
    }
}

module.exports = new PostService()