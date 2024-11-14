const User = require("../models/user.model");

const userProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select(
      "firstName lastName email"
    );
    return res.status(200).json({
      success: true,
      message: "User profile Fetched Succesfully",
      data: user,
    });
  } catch (error) {
    console.error("Error in the userProfile", error);
    return res.status(500).json({
      success: false,
      message: "Something Went Wrong in userProfile",
      error: error.message || error,
    });
  }
};

const updateUserProfile = async (req, res) => {
  try {
    const { firstName, lastName, email } = req.body;
    // emailCheck
    const emailCheck = await User.findOne({
      email,
      _id: { $ne: req.user._id },
    });
    if (emailCheck) {
      return res.status(400).json({
        success: false,
        message: "Email Already Exist",
      });
    }
    const updateData = {
      firstName,
      lastName,
      email,
    };
    const user = await User.findByIdAndUpdate(req.user._id, updateData, {
      new: true,
    });
    return res.status(200).json({
      success: true,
      message: "User Profile Updated Successfully",
      data: user,
    });
  } catch (error) {
    console.error("Error in the updateUserProfile", error);
    return res.status(500).json({
      success: false,
      message: "Something Went Wrong in updateUserProfile",
      error: error.message || error,
    });
  }
};

module.exports = {
  userProfile,
  updateUserProfile,
};
