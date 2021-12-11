const profileRouter = require("express").Router();
const profileController = require("../controllers/profile-controller")

profileRouter.post("/api/user/upload/profile", profileController.uploadProfile);
profileRouter.get("/api/user/fetch/profile/:userId", profileController.fetchProfile);

module.exports = profileRouter;
