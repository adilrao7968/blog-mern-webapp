const postRouter = require("express").Router();
const postController = require("../controllers/post-controller");
const requiredLogin = require("./protected-route");

postRouter.post("/api/blog/upload", requiredLogin, postController.uploadPost);
postRouter.get("/api/blogs/:categoryName", postController.fetchBlogs);

postRouter.delete(
  "/api/delete/blog/:blogId/:postImage",
  postController.deleteBlog
);
postRouter.put("/api/edit/blog/:blogId", postController.editBlog);

postRouter.post("/api/blog/save", postController.saveBlog);
postRouter.get(
  "/api/blog/saved/articles/:userId",
  postController.fetchSavedBlog
);

postRouter.get(
  "/api/blog/saved/single/articles/:savedArticleId",
  postController.fetchAllSavedBlog
);

postRouter.get("/api/blog/articles/:userId", postController.fetchMyBlogs);

module.exports = postRouter;
