const uploadOnCloudinary = require("../helpers/cloudinary.helper");
const { nanoid } = require("nanoid");
const axios = require("axios");
const User = require("../models/user.model");
const { sentMail } = require("./emailNotification.service");

const uploadImages = async (req, res) => {
  try {
    const images = req.files;
    console.log("images>>>>>>>>>>", images);
    const userImages = await User.findById(req.user._id).select("-password");
    if (images === undefined) {
      return res.status(200).json({
        sucess: true,
        message: "NO Images uploaded",
        data: userImages,
      });
    }
    if (images.length) {
      for (let i = 0; i < images.length; i++) {
        const imageUrl = await uploadOnCloudinary(images[i].path);
        const uniqueId = nanoid();
        userImages.Images.push({ url: imageUrl.secure_url, id: uniqueId });
      }
      await userImages.save();

      //sending the Mail after Uploading 
      const mailsent = {
        email: userImages.email,
        emailType: "",
      };
      await sentMail(mailsent)
      return res.status(200).json({
        sucess: true,
        message: "Images uploaded successfully",
        data: userImages,
      });
    }
  } catch (error) {
    console.error("Error in the updateUserProfile", error);
    return res.status(500).json({
      success: false,
      message: "Something Went Wrong in updateUserProfile",
      error: error.message || error,
    });
  }
};

const downloadImage = async (req, res) => {
  try {
    const { ImageId } = req.params;
    const userImages = await User.findById(req.user._id).select("Images");
    if (userImages.Images.length > 0) {
      const image = userImages.Images.find((image) => image.id === ImageId);
      if (!image) {
        return res.status(404).json({
          success: false,
          message: "Image Not Found",
        });
      }
      const response = await axios.get(image.url, { responseType: "stream" });
      res.set("Content-Disposition", `attachment;filename=image${ImageId}.jpg`);
      res.set("Content-Type", "image/jpeg");
      res.set("Content-Length", response.headers["content-length"]);
      response.data.pipe(res);
    }
  } catch (error) {
    console.error("Error in the downloadImage", error);
    return res.status(500).json({
      success: false,
      message: "Something Went Wrong in downloadImage",
      error: error.message || error,
    });
  }
};

module.exports = {
  uploadImages,
  downloadImage,
};
