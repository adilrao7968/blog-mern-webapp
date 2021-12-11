const likesServices = require("../services/likes-service");

class LikesController {
  //   Check liked by Id Exists or not
  async likeOnArticle(req, res) {
    const checkExist = await likesServices.checkLikedByIdExist(req);
    if (!checkExist) {
      const like = await likesServices.addLike(req);
      if (like) {
        return res.json({
          status: 201,
          success: true,
        });
      }
    } else {
      const unlike = await likesServices.removeLike(req);
      if (unlike) {
        return res.json({
          status: 201,
          success: true,
        });
      }
    }
  }

  // View post
  async viewArticle(req, res) {
    const checkExistView = await likesServices.checkViewedByIdExist(req);
    if (!checkExistView) {
      const view = await likesServices.createViewArticle(req);
      if (view) {
        return res.json({
          status: 201,
          success: true,
        });
      }
    }
  }

  // Fetch View post
  async fetchViewArticle(req, res) {
    const fetchView = await likesServices.fetchViewsOnPost(req);
    if (fetchView) {
      return res.json({
        status: 201,
        success: true,
        fetchView
      });
    }
  }

  // Fetch likes on post
  async fetchLikeOnArticle(req, res) {
    const fetchLikes = await likesServices.getLikesOnPost(req);
    if (fetchLikes) {
      return res.json({
        status: 201,
        success: true,
        fetchLikes
      });
    }
  }
}

module.exports = new LikesController();
