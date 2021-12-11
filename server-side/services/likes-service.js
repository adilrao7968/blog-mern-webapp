const { Likes, Views } = require("../models");
const { v4: uuidv4 } = require("uuid");

class likesServices {
  // check exist likes
  async checkLikedByIdExist(req) {
    const { likedBy, postId } = req.body;
    const checkExist = await Likes.findOne({
      where: { PostId: postId, likedBy: likedBy },
    });
    return checkExist;
  }


  // Get likes on post
  async getLikesOnPost(req) {
    const { postId } = req.params;
    const {count} = await Likes.findAndCountAll({
      where: { PostId: postId },
    });
    return count;
  }

  //   // Like Post
  async addLike(req) {
    const { likedBy, postId } = req.body;
    const like = await Likes.create({
      id: uuidv4(),
      PostId:postId,
      likedBy,
    });
    return like;
  }

  // delete my Blog
  async removeLike(req) {
    const { likedBy, postId } = req.body;
    const unlike = await Likes.destroy({
      where: { PostId: postId, likedBy: likedBy },
    });
    return unlike;
  }

  //Check exist view
  async checkViewedByIdExist(req) {
    const { viewedBy, postId } = req.body;
    const checkExistView = await Views.findOne({
      where: { PostId: postId, viewedBy: viewedBy },
    });
    return checkExistView;
  }


  //fetch views on post
  async fetchViewsOnPost(req) {
    const { postId } = req.params;
    const {count} = await Views.findAndCountAll({
      where: { PostId: postId },
    });
    return count;
  }

  // view post
  async createViewArticle(req) {
    const { viewedBy, postId } = req.body;
    const view = await Views.create({
      id: uuidv4(),
      PostId:postId,
      viewedBy,
    });
    return view;
  }
}

module.exports = new likesServices();
