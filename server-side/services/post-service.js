const { Posts, Users, SavedArticles } = require("../models");
const { v4: uuidv4 } = require("uuid");

class postServices {
  // fetch userData
  async fetchUserData(userId) {
    const getUser = await Users.findOne({ where: { id: userId } });
    return getUser;
  }

  // upload blogs post
  async uploadBlogs(req, getUserData) {
    const { title, category, description, user } = req.body;
    const { filename } = req.file;
    const { name, profile, email } = getUserData;

    const allBlogsPost = await Posts.create({
      id: uuidv4(),
      title,
      name,
      profile,
      email,
      UserId: user,
      category,
      description,
      postImage: filename,
    });
    return allBlogsPost;
  }

  // fetch all blog posts
  async fetchAllBlogs(categoryName) {
    if (categoryName === "All") {
      const allBlogsPost = await Posts.findAll();
      return allBlogsPost;
    } else {
      const allBlogsPost = await Posts.findAll({
        where: { category: categoryName },
      });
      return allBlogsPost;
    }
  }

  // delete my Blog
  async deleteMyBlog(blogId) {
    const deletedBlog = await Posts.destroy({
      where: {
        id: blogId,
      },
    });
    return deletedBlog;
  }

  // edit my Blog
  async editMyBlog(blogId, req) {
    const { title, category, description } = req.body;
    const { filename } = req.file;
    const editedBlog = await Posts.update(
      {
        title,
        category,
        description,
        postImage: filename,
      },
      {
        where: {
          id: blogId,
        },
      }
    );
    return editedBlog;
  }

  // check existing SavedArticles
  async checkExiting(req) {
    const { user, savedArticleId } = req.body;
    const checkExistingArticles = await SavedArticles.findOne({
      where: { savedBy: user, savedArticleId: savedArticleId },
    });
    return checkExistingArticles;
  }

  // save Blog
  async saveArticle(req) {
    const { user, savedArticleId, title, category, postImage } = req.body;
    const savedArticle = await SavedArticles.create({
      id: uuidv4(),
      savedArticleId, // Post Id
      savedBy: user, // Id of Who is saving article
      title,
      category,
      postImage,
    });
    return savedArticle;
  }

  // fetch my all saved Blog
  async fetchSaveArticle(req) {
    const { userId } = req.params;
    const getAllSavedArticle = await SavedArticles.findAll({
      where: {
        savedBy: userId,
      },
    });
    return getAllSavedArticle;
  }

  // fetch all saved Blog
  async fetchAllSaveArticle(req) {
    const { savedArticleId } = req.params;
    const { count } = await SavedArticles.findAndCountAll({
      where: {
        savedArticleId: savedArticleId,
      },
    });
    return count;
  }

  // fetch my all posted Blog
  async fetchMyAllPostedArticle(req) {
    const { userId } = req.params;
    const getAllMyPostedArticle = await Posts.findAll({
      where: {
        UserId: userId,
      },
    });
    return getAllMyPostedArticle;
  }
}

module.exports = new postServices();
