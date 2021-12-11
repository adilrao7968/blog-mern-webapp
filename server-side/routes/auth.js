const authRouter = require("express").Router();
const authController = require("../controllers/auth-controller")
const forgotPasswordController = require("../controllers/forgotPassword-controller")

authRouter.post("/api/blog/register", authController.register);
authRouter.post("/api/blog/login", authController.login);

// Forgot Password Routes
authRouter.post("/api/user/forgot-password", forgotPasswordController.forgotPassword);

// Forgot Password Routes Password
authRouter.post("/api/user/reset/password", forgotPasswordController.updatePassword);

module.exports = authRouter;
