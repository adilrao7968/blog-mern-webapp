const { Users } = require("../models");
const crypto = require("crypto");
const moment = require("moment");
const { Op } = require("sequelize");

class ForgotPasswordServices {
  // check user already exist in db or not
  async checkUserExist(email) {
    const emailExist = await Users.findOne({ where: { email: email } });
    return emailExist;
  }

  async sendEmailToUserToResetPassword(transporter, toEmail, toName, token) {
    const sendEmailToUser = await transporter.sendMail({
      to: toEmail,
      from: process.env.FROM_EMAIL,
      subject: "Reset your Blog Mall password",
      html: `
      <h2>${toName}</h2>,
      <p>Someone (hopefully you) has requested a password reset for your Blog-Mall account. Click on the link below "RESET PASSWORD" to set a new password.</p>
      <a href=http://localhost:3000/account/reset/password/${token}>RESET PASSWORD</a>
      <br/>
      <p>If you don't wish to reset your password, disregard this email and no action will be taken.</p>
      <br/>
      <h5>The Blog-Mall Team</h5>
      `,
    });
    return sendEmailToUser;
  }

  // save token in database
  async saveTokenInDB(email, token) {
    const savedToken = await Users.update(
      {
        resetPasswordToken: token,
        expireTimeToken: new Date() + 36000000,
      },
      {
        where: {
          email: email,
        },
      }
    );
    return savedToken;
  }

  // Reset Password (Update password)
  async resetUserPassword(resetPasswordToken, hashedPassword) {
    console.log(resetPasswordToken, hashedPassword);
    const uPassword = await Users.update(
      {
        password: hashedPassword,
      },
      {
        where:{
          [Op.and]: [
            {
              resetPasswordToken: {
                [Op.eq]: resetPasswordToken
              }
            },
            {
              expireTimeToken: {
                [Op.lt]: new Date()
              }
            }
          ]
        }
      }
    );
    return uPassword;
  }

  // hash password with default node module (crypto)
  async hashPassword(password) {
    const hashPassword = await crypto
      .createHmac("sha256", process.env.HASH_SECRET_KEY)
      .update(password)
      .digest("hex");

    return hashPassword;
  }

  // compare a password of registered user with login user
  async comparePassword(emailExist, hashPassword) {
    if (emailExist.password === hashPassword) {
      return true;
    } else {
      return false;
    }
  }
}

module.exports = new ForgotPasswordServices();
