const forgotPasswordServices = require("../services/forgotPassword-service");
const authServices = require("../services/auth-service");
const nodemailer = require("nodemailer");
const sendgridTransport = require("nodemailer-sendgrid-transport");
const randomString = require("randomstring");

class ForgotPasswordController {
  // Forgot Password controller
  async forgotPassword(req, res) {
    const transporter = nodemailer.createTransport(
      sendgridTransport({
        auth: {
          api_key: process.env.EMAIL_SECRET_KEY,
        },
      })
    );

    //   user email exist or not
    const emailExist = await forgotPasswordServices.checkUserExist(
      req.body.email
    );
    if (!emailExist) {
      return res.json({
        status: 404,
        success: false,
        message: "This email is not registered",
      });
    } else {
      let token = randomString.generate(32);
      const sendEmailToUser =
        await forgotPasswordServices.sendEmailToUserToResetPassword(
          transporter,
          emailExist.email,
          emailExist.name,
          token
        );
      if (!sendEmailToUser) {
        return res.json({
          status: 404,
          success: false,
          message: "Email not send. Something went wrong",
        });
      }
      const savedToken = await forgotPasswordServices.saveTokenInDB(
        emailExist.email,
        token
      );
      if (!savedToken) {
        return res.json({
          status: 400,
          success: false,
          message: "Error occur while saving token in database",
        });
      }
      return res.json({
        status: 200,
        success: true,
        message:
          "Check your email. New Password Creation Link has been sent to this email",
      });
    }
  }

  // Reset Password
  async updatePassword(req, res) {
    const { resetPasswordToken, password } = req.body;

    // hash password controller
    const hashedPassword = await authServices.hashPassword(password);

    const resetUPass = await forgotPasswordServices.resetUserPassword(
      resetPasswordToken,
      hashedPassword
    );
    if (!resetUPass) {
      return res.json({
        status: 200,
        success: false,
        message: "Error! Reset password link has been expired",
      });
    }
    return res.json({
      status: 200,
      success: true,
      message:
        "Password has been successfully reset. Now you can login to your account",
    });
  }
}

module.exports = new ForgotPasswordController();
