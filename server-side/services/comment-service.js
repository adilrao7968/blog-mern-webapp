const { Posts, Users, SavedArticles, Comments } = require("../models");
const { v4: uuidv4 } = require("uuid");

class commentServices {
  // Save comments
  async addCommentOnPost(req) {
    const {
      comment,
      commentById,
      commentOnArticleId,
      commentByName,
      commentByProfile,
      PostId
    } = req.body;
    const postComments = await Comments.create({
      id: uuidv4(),
      comment,
      commentByName,
      commentByProfile,
      commentOnArticleId,
      commentById,
      PostId
    });
    return postComments;
  }

  // Fetch all comments on one post
  async getAllCommentsOnPost(req) {
    const { postId } = req.params;
    const getAllComments = await Comments.findAll({
      where: { PostId: postId },
    });
    return getAllComments;
  }

  //   // delete my Blog
  //   async deleteMyComment(blogId) {
  //     const deletedBlog = await Posts.destroy({
  //       where: {
  //         id: blogId,
  //       },
  //     });
  //     return deletedBlog;
  //   }

  //   // Fetch comments
  //     async checkExiting(req) {
  //       const { commentBy, commentOnArticleId } = req.body;
  //       const checkExistingArticles = await SavedArticles.findOne( { where: { commentBy: commentBy, commentOnArticleId:commentOnArticleId } });
  //       return checkExistingArticles;
  //     }

  //   // edit my Blog
  //   async editMyBlog(blogId, req) {
  //     const { title, category, description } = req.body;
  //     const { filename } = req.file;
  //     const editedBlog = await Posts.update(
  //       {
  //         title,
  //         category,
  //         description,
  //         postImage: filename,
  //       },
  //       {
  //         where: {
  //           id: blogId,
  //         },
  //       }
  //     );
  //     return editedBlog;
  //   }

  //   // fetch my all saved Blog
  //   async fetchSaveArticle(req) {
  //     const { userId } = req.params;
  //     const getAllSavedArticle = await SavedArticles.findAll({
  //       where: {
  //         savedBy: userId,
  //       },
  //     });
  //     return getAllSavedArticle;
  //   }
}

module.exports = new commentServices();
