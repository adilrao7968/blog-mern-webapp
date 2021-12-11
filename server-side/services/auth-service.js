const { Users } = require("../models");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const { v4: uuidv4 } = require("uuid");

class authServices {
  // hash password with default node module (crypto)
  async hashPassword(password) {
    const hashPassword = await crypto
      .createHmac("sha256", process.env.HASH_SECRET_KEY)
      .update(password)
      .digest("hex");

    return hashPassword;
  }

  // check user already exist in db or not
  async checkUserExist(email) {
    const emailExist = await Users.findOne({ where: { email: email } });
    return emailExist;
  }

  // create a new user to register an account
  async createUser(req, hashPassword) {
    const { name, email } = req.body;
    const { filename } = req.file;
    const signupUser = await Users.create({
      id: uuidv4(),
      name,
      email,
      profile: filename,
      password: hashPassword,
    });
    return signupUser;
  }

  // compare a password of registered user with login user
  async comparePassword(emailExist, hashPassword) {
    if (emailExist.password === hashPassword) {
      return true;
    } else {
      return false;
    }
  }

  // Generate user token
  async generateToken(id) {
    const token = await jwt.sign({ id }, process.env.TOKEN_SECRET_KEY, {
      expiresIn: 3600,
    });
    return token;
  }
}

module.exports = new authServices();
