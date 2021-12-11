const { Profiles } = require("../models");
const { v4: uuidv4 } = require("uuid");

class profileServices {
  // Check Profile data exist
  async checkProfileAlreadyExist(userId) {
    const profileDoesExist = await Profiles.findOne({where: { UserId: userId }});
    return profileDoesExist;
  }

  // Update profile data
  async updateProfile(req) {
    const {
      userId,
      profession,
      address,
      summery,
      nickname,
      language,
      gender,
      twitter,
      facebook,
      linkedIn,
      slack,
    } = req.body;
    const updateUserProfile = await Profiles.update(
      {
        profession: profession,
        address: address,
        summery: summery,
        nickname: nickname,
        language: language,
        gender: gender,
        twitter: twitter,
        facebook: facebook,
        linkedIn: linkedIn,
        slack: slack,
      },
      {
        where: {
          UserId: userId,
        },
      }
    );
    return updateUserProfile;
  }

  //   Fetch profile of a user
  async getProfile(req) {
    const { userId } = req.params;
    const profile = await Profiles.findOne({
      where: { UserId: userId },
    });
    return profile;
  }

  //   // Upload user profile into db
  async createProfile(req) {
    const {
      userId,
      profession,
      address,
      summery,
      nickname,
      language,
      gender,
      twitter,
      facebook,
      linkedIn,
      slack,
    } = req.body;
    const userProfile = await Profiles.create({
      id: uuidv4(),
      UserId: userId,
      profession,
      address,
      summery,
      nickname,
      language,
      gender,
      twitter,
      facebook,
      linkedIn,
      slack,
    });
    return userProfile;
  }
}

module.exports = new profileServices();
