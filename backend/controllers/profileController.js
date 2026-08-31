import userModel from "../models/userModel.js";
import { uploadToCloudinary } from "../utils/cloudinary.js";

export const updateProfile = async (req, res) => {
    try {
        const userId = req.user._id
        const { name, phone, about } = req.body

        let profilePicUrl = undefined

        if(req.file){
            let cloudinaryResponse = await uploadToCloudinary(req.file.buffer);
            profilePicUrl = cloudinaryResponse.secure_url
        }

        const updateData = {name,phone,about}
        if(profilePicUrl){
            updateData.avatar = profilePicUrl
        }

        const updateUser = await userModel.findByIdAndUpdate(
            userId,
            updateData,
            { new: true, runValidators: true }
        ).select('-password')

        if (!updateUser) {
            return res.status(404).json({
                message: 'user not found!!!'
            })
        }

        res.status(200).json({
            message: 'profile updated successfully!!!',
            updateUser
        })
    } catch (error) {
        res.status(500).json({
            message: 'failed to update userProfile!!!',
            error: error.message
        })
    }
}