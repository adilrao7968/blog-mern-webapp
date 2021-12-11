const jwt = require("jsonwebtoken");
const { Users } = require("../models");

const authMiddleware = async (req, res, next) => {
 try {
    const { authorization } = req.headers;
    if (!authorization) {
      return res.json({
        success: false,
        message: "You must be logged in",
      });
    }
  
    const token = authorization.replace("Bearer ", "");
      const payload = await jwt.verify(token, process.env.TOKEN_SECRET_KEY);
    if (!payload) {
      return res.json({
        success: false,
        message: "You must be logged in",
      });
    } else {
      const { id } = payload;
      const doestExist = await Users.findByPk(id);
      if (!doestExist) {
        return res.json({
          success: false,
          message: "You must be logged in",
        });
      }
      return next();
    }
 } catch (error) {
    return res.json({
        success: false,
        message: "Invalid token",
      });
 }
};

module.exports = { authMiddleware };
