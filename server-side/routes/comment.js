const commentRouter = require("express").Router();
const commentController = require("../controllers/comment-controller")

commentRouter.post("/api/blog/add/comment", commentController.addComment);
commentRouter.get("/api/blog/all/comment/:postId", commentController.fetchAllComments);


module.exports = commentRouter;
