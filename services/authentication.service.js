const User = require("../models/user.model");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { sentMail } = require("./emailNotification.service");

const userRegistration = async (req, res) => {
  try {
    const { firstName, lastName, email, password } = req.body;
    if (!firstName || !lastName || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "Please fill in all fields.",
      });
    }
    //Email Check
    const emailCheck = await User.findOne({ email });
    if (emailCheck) {
      return res.status(400).json({
        success: false,
        message: "Email already exists",
      });
    }
    //hashing the Password for AUthentication
    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(password, salt);

    //storing in the DB
    const user = await User.create({
      firstName,
      lastName,
      email,
      password: hashedPassword,
    });
    const mailsent = {
      email: email,
      emailType: "Verify",
    };

    await sentMail(mailsent);

    return res.status(200).json({
      success: true,
      message: "User created successfully",
      data: user,
    });

    //sending the mail after registration
  } catch (error) {
    console.error("Error in the User Registration", error);
    return res.status(500).json({
      success: false,
      message: "Something Went Wrong in User Registration",
      error: error.message || error,
    });
  }
};

const userLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Please Enter Email and Password",
      });
    }
    //userCheck
    const userCheck = await User.findOne({ email });
    if (!userCheck) {
      return res.status(400).json({
        success: false,
        message: "User Not Found",
      });
    }
    //passwordCheck
    const passwordCheck = await bcryptjs.compare(password, userCheck.password);
    if (!passwordCheck) {
      return res.status(400).json({
        success: false,
        message: "Invalid Password",
      });
    }
    const tokenData = {
      id: userCheck._id,
      email: userCheck.email,
    };
    //tokenGeneration
    const token = jwt.sign(tokenData, process.env.TOKEN_SECRET, {
      expiresIn: "1d",
    });

    const cookieOptions = {
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000, //1day
    };

    //sending the token as cookie and as well as in the response..
    return res.status(200).cookie("token", token, cookieOptions).json({
      status: true,
      token: token,
      message: "User Logined Successfully ",
    });
  } catch (error) {
    console.error("Error in the User Login", error);
    return res.status(500).json({
      success: false,
      message: "Something Went Wrong in User Login",
      error: error.message || error,
    });
  }
};

module.exports = {
  userRegistration,
  userLogin,
};
