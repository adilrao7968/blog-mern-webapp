const likeRouter = require("express").Router();
const likesController = require("../controllers/likes-controller")

likeRouter.post("/api/blog/likes", likesController.likeOnArticle);
likeRouter.get("/api/blog/likes/:postId", likesController.fetchLikeOnArticle);

likeRouter.post("/api/blog/views", likesController.viewArticle);
likeRouter.get("/api/blog/views/:postId", likesController.fetchViewArticle);


module.exports = likeRouter;
