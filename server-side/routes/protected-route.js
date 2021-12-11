const protectedRouter = require("express").Router();
const {authMiddleware} = require("../middleware/authMiddleware")

protectedRouter.get("/api/protected", authMiddleware, (req, res) => {
    return res.json({
        success: true,
        message: "You are authorized for the protected routes",
      });
});

module.exports = protectedRouter;
