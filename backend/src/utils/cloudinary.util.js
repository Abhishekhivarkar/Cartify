import {v2 as cloudinary} from "cloudinary"
import {config} from "../configs/env.config.js"
import fs from "fs"
cloudinary.config({
    cloud_name:config.CLOUDINARY_CLOUD_NAME,
    api_key:config.CLOUDINARY_API_KEY,
    api_secret:config.CLOUDINARY_API_SECRET
})


export const uploadOnCloudinary = async (filePath) =>{
    try{
        if (!filePath){
            console.log("File path not found");
        }

       const response = await cloudinary.uploader.upload(filePath,{resource_type:"auto"});

       console.log("file uploaded on cloudinary");

       return response;

    }catch(err){
    fs.unlinkSync(filePath);

    return null;
    }
}