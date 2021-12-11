const commentServices = require("../services/comment-service");

class CommentController {
  //   Add comments on article
  async addComment(req, res) {
    const postComments = await commentServices.addCommentOnPost(req);
    if (!postComments) {
      return res.json({
        status: 400,
        success: false,
        message: "Error! While adding comment on post",
      });
    } else {
      return res.json({
        status: 201,
        success: true,
        message: "Comment Added Successfully",
      });
    }
  }

    // Fetch all comments
  async fetchAllComments(req, res) {
    const getAllComments = await commentServices.getAllCommentsOnPost(req);
    if (!getAllComments) {
      return res.json({
        status: 400,
        success: false,
        message: "Error! While fetching all comments",
      });
    } else {
      return res.json({
        status: 201,
        success: true,
        data: getAllComments,
      });
    }
  }
}

module.exports = new CommentController();
