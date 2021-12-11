const profileServices = require("../services/profile-service");

class ProfileController {
  // Upload user profile
  async uploadProfile(req, res) {
    const profileDoesExist = await profileServices.checkProfileAlreadyExist(
      req.body.userId
    );
    if (!profileDoesExist) {
      const userProfile = await profileServices.createProfile(req);
      if (!userProfile) {
        return res.json({
          status: 400,
          success: false,
          message: "Error occur while uploading profile",
        });
      } else {
        return res.json({
          status: 201,
          success: true,
          message: "Profile has been uploaded successfully",
        });
      }
    } else {
      const updateUserProfile = await profileServices.updateProfile(req);
      if (!updateUserProfile) {
        return res.json({
          status: 400,
          success: false,
          message: "Error occur while updating profile",
        });
      } else {
        return res.json({
          status: 201,
          success: true,
          message: "Profile updated successfully",
        });
      }
    }
  }

  //   Fetch user profile
  async fetchProfile(req, res) {
    const profile = await profileServices.getProfile(req);
    if (!profile) {
      return res.json({
        status: 400,
        success: false,
        message: "Error occur while fetching profile from database",
      });
    } else {
      return res.json({
        status: 201,
        success: true,
        profile,
      });
    }
  }
}

module.exports = new ProfileController();
