const { v2: cloudinary } = require("cloudinary");
const fs=require('fs')

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const uploadOnCloudinary=async(localFilePath)=>{
    try {
        if(!localFilePath) return null

        //upload File on Cloudinary
        const uploadResponse=await cloudinary.uploader.upload(localFilePath,{
            resource_type:"auto"
        })
        fs.unlinkSync(localFilePath)
        return uploadResponse;
        
    } catch (error) {
        fs.unlinkSync(localFilePath)
        console.error("Error in the uploadOnCloudinary", error);
        return null
      }
}

module.exports=uploadOnCloudinary