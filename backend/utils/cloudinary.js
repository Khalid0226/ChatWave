import {v2 as cloudinary} from 'cloudinary'
import streamifier from 'streamifier'
import dotenv from 'dotenv'

dotenv.config()

cloudinary.config({
    cloud_name:process.env.CLOUDINARY_CLOUD_NAME,
    api_key:process.env.CLOUDINARY_API_KEY,
    api_secret:process.env.CLOUDINARY_API_SECRET
})

export const uploadToCloudinary = (fileBuffer, mimeType, originalName) => {
    return new Promise((resolve, reject) => {
        let uploadOptions = {
            folder: "chatwave_profiles",
            resource_type: "auto",
        };

        // Agar PDF hai, toh resource_type ko "image" rakhein taaki Cloudinary ka viewer use support kare
        if (mimeType === "application/pdf" || mimeType?.includes("pdf")) {
            uploadOptions.resource_type = "image";
            uploadOptions.format = "pdf"; // Ensure kare ki format pdf rahe
        }

        let stream = cloudinary.uploader.upload_stream(
            uploadOptions,
            (error, result) => {
                if (result) {
                    resolve(result);
                } else {
                    reject(error);
                }
            }
        );
        streamifier.createReadStream(fileBuffer).pipe(stream);
    });
}