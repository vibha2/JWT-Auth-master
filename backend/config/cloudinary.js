const cloudinary = require("cloudinary").v2;

exports.cloudinaryConnect = () => {
    try{
        cloudinary.config({
            cloud_name: process.env.CLOUD_NAME,
            api_key: process.env.api_key,
            api_secret: process.env.api_secret,
        })
        console.log("cloudinary connect successfully");
    }
    catch(error){
        console.log("cloudinary connect error=> ",error);
    }
}