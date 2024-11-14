const jwt = require("jsonwebtoken");
const User = require("../models/user.model");

const verifyJwt = async (req, res, next) => {
  try {
    const token =
      req.cookies?.token || req.header("Authorization")?.replace("Bearer ", "");
      console.log("token DETAILS>>>>>>",token);
      
    if (!token) {
      return res.status(401).json({ sucess: false, message: "Unauthorized" });
    }

    //verify
    const decodedToken = jwt.verify(token, process.env.TOKEN_SECRET);
    console.log("decodedToken>>>>>>",decodedToken);
    const user = await User.findById(decodedToken?.id).select("-password"); //not sending the password
    console.log("user DETAILS>>>>>>>.",user);
    req.user = user;
    next();
  } catch (error) {
    console.error("Error in the verifyJwt", error);
    return res.status(500).json({
      success: false,
      message: "Invalid Access token",
      error: error.message || error,
    });
  }
};

module.exports=verifyJwt
