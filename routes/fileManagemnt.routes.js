const express = require("express");
const upload = require("../middleware/multer.middleware");
const verifyJwt = require("../middleware/auth.middleware");
const {
  uploadImages,
  downloadImage,
} = require("../services/fileManagement.service");
const router = express.Router();

router.post("/upload", verifyJwt, upload.any(), uploadImages);
router.post("/download/:ImageId", verifyJwt, downloadImage);

module.exports = router;
