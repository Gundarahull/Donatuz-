const express = require("express");
const { userProfile, updateUserProfile } = require("../services/userManagment.service");
const verifyJwt = require("../middleware/auth.middleware");
const router = express.Router();

router.get("/profile", verifyJwt, userProfile);
router.put("/profile",verifyJwt,updateUserProfile)

module.exports = router;
