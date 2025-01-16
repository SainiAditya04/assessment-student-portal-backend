import { v2 as cloudinary } from 'cloudinary';
import fs from 'fs'

export async function uploadFileToCloudinary(localFilePath) {
    try {
        if(!localFilePath) return null;

        cloudinary.config({
            cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
            api_key: process.env.CLOUDINARY_API_KEY,
            api_secret: process.env.CLOUDINARY_API_SECRET 
        });
        console.log('connected to cloudinary!');

        // upload the file on cloudinary
        const response = await cloudinary.uploader.upload(localFilePath, {
            folder: "student-portal-assignment",
            resource_type: "auto",
        });

        console.log(response.secure_url);
        console.log(response.public_id);

        return response;

    } catch (error) {
        fs.unlinkSync(localFilePath);
        throw new Error(error);
    } 
}

export async function deleteFileFromCloudinary (publicId) {
    try {
        cloudinary.config({
            cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
            api_key: process.env.CLOUDINARY_API_KEY,
            api_secret: process.env.CLOUDINARY_API_SECRET 
        });
        await cloudinary.uploader.destroy(publicId);
        console.log("deleted from cloudinary");
    } catch (error) {
        throw new Error(error);
    }
}