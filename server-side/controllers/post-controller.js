const express = require("express")
const app = express()
const postServices = require("../services/post-service");
const storage = require("../storage/storage");
const fs = require("fs")
const fsPromises = require("fs/promises");

class PostController {
  // Post controller Logic
  async uploadPost(req, res) {
   try {
    const name = "postImage";
    let upload = storage.handlePostImages(name);

    upload(req, res, async (error) => {
      if (error) {
        return res.json({
          status: 422,
          success: false,
          message: "Image upload failed",
          error: error,
        });
      } else {
        const getUserData = await postServices.fetchUserData(req.body.user);
        const allBlogsPost = await postServices.uploadBlogs(req, getUserData);
        if (!allBlogsPost) {
          return res.json({
            status: 422,
            success: false,
            message: "Error! Post Uploaded Failed",
          });
        } else {
          return res.json({
            status: 200,
            success: true,
            message: "Post Uploaded successfully",
          });
        }
      }
    });
   } catch (error) {
    return res.json({
      status: 422,
      success: false,
      message: "All fields are required",
    });
   }
  }

  // fetch all blogs
  async fetchBlogs(req, res) {
    const { categoryName } = req.params;
    const response = await postServices.fetchAllBlogs(categoryName);
    return res.json({
      status: 200,
      success: true,
      response,
    });
  }


  // delete my blog
  async deleteBlog(req, res) {
    const { blogId, postImage } = req.params;

    const deletedBlog = await postServices.deleteMyBlog(blogId);
    if (!deletedBlog) {
      return res.json({
        status: 400,
        success: false,
        message: "Error! While deleting post",
      });
    } else {
      fs.unlink(`../public/postImages/${postImage}`, function (err) {
        if (err) throw err;
        // if no error, file has been deleted successfully
          res.json({ msg : "File deleted!"});
      });

      return res.json({
        status: 200,
        success: true,
        message: "Blog has been deleted",
      });
    }
  }

  // edit my blog
  async editBlog(req, res) {
    let uploadUpdate = storage.handlePostImages();

    uploadUpdate(req, res, async (error) => {
      if (error) {
        return res.json({
          status: 422,
          success: false,
          message: "Image upload failed",
          error: error,
        });
      }
      const { blogId } = req.params;
      const editedBlog = await postServices.editMyBlog(blogId, req);
      if (!editedBlog) {
        return res.json({
          status: 400,
          success: false,
          message: "Error! While updating post",
        });
      } else {
        return res.json({
          status: 200,
          success: true,
          message: "Post updated successfully",
        });
      }
    });
  }

  // save blog
  async saveBlog(req, res) {
    const checkExistingArticles = await postServices.checkExiting(req);
    if (!checkExistingArticles) {
      const savedArticle = await postServices.saveArticle(req);
      if (!savedArticle) {
        return res.json({
          status: 400,
          success: false,
          message: "Error! While saving article",
        });
      } else {
        return res.json({
          status: 200,
          success: true,
          message: "Article saved successfully",
        });
      }
    } else {
      return res.json({
        status: 400,
        success: false,
        message: "Article already saved",
      });
    }
  }

  // fetch my all saved Blog
  async fetchSavedBlog(req, res) {
    const getAllSavedArticle = await postServices.fetchSaveArticle(req);
    if (!getAllSavedArticle) {
      return res.json({
        status: 400,
        success: false,
        message: "Error! While fetching article",
      });
    } else {
      return res.json({
        status: 200,
        success: true,
        data: getAllSavedArticle,
      });
    }
  }

  // fetch all saved Blog
  async fetchAllSavedBlog(req, res) {
    const getAllSavedPost = await postServices.fetchAllSaveArticle(req);
    if (getAllSavedPost) {
      return res.json({
        status: 200,
        success: true,
        getAllSavedPost,
      });
    }
  }

  // fetch my all posted Blogs
  async fetchMyBlogs(req, res) {
    const getAllMyPostedArticle = await postServices.fetchMyAllPostedArticle(
      req
    );
    if (!getAllMyPostedArticle) {
      return res.json({
        status: 400,
        success: false,
        message: "Error! While fetching article",
      });
    } else {
      return res.json({
        status: 200,
        success: true,
        data: getAllMyPostedArticle,
      });
    }
  }
}

module.exports = new PostController();
