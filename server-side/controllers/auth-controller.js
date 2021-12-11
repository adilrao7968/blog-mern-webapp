const authServices = require("../services/auth-service");
const storage = require("../storage/storage");

class AuthController {
  // Register controller Logic
  async register(req, res) {
    try {
      const name = "profile";
      let upload = storage.handlePostImages(name);

      upload(req, res, async (error) => {
        if (error) {
          return res.json({
            status: 422,
            success: false,
            message: "Image upload failed",
            error: error,
          });
        }

        // hash password controller
        const hashPassword = await authServices.hashPassword(req.body.password);

        // user exist controller
        const emailExist = await authServices.checkUserExist(req.body.email);
        if (!emailExist) {
          await authServices.createUser(req, hashPassword);
          return res.json({
            status: 201,
            success: true,
            message: "User Registered Successfully",
          });
        } else {
          return res.json({
            status: 403,
            success: false,
            message:
              "User already exist. You have to change your email or mobile no!",
          });
        }
      });
    } catch (error) {
      console.log(error);
      return res.json({
        status: 422,
        success: false,
        message: "User registered failed!",
      });
    }
  }

  // Login controller Logic
  async login(req, res) {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.json({
        status: 422,
        success: false,
        message: "All fields are required!",
      });
    }

    //   hash password controller
    const hashPassword = await authServices.hashPassword(password);

    //   user exist controller
    const emailExist = await authServices.checkUserExist(email);

    //   send response to client
    if (!emailExist) {
      return res.json({
        status: 404,
        success: false,
        message: "User not found. Wrong email and password combination!",
      });
    } else {
      const loggedInUser = await authServices.comparePassword(
        emailExist,
        hashPassword
      );
      if (loggedInUser) {
        const userToken = await authServices.generateToken(emailExist.id);
        const loggedInUser = {
          _id: emailExist.id,
          name: emailExist.name,
          email: emailExist.email,
          profile: emailExist.profile,
          createdAt: emailExist.createdAt,
        };
        return res.json({
          status: 200,
          success: true,
          message: "User logged in successfully",
          user: loggedInUser,
          token: userToken,
        });
      } else {
        return res.json({
          status: 401,
          success: false,
          message: "User not found. Wrong email and password combination!",
        });
      }
    }
  }
}

module.exports = new AuthController();
