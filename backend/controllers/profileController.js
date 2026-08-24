import userModel from "../models/userModel.js";

export const updateProfile = async (req,res) => {
    try {
        const userId = req.user._id
    const {name,phone,about} = req.body

    const updateUser = await userModel.findByIdAndUpdate(
        userId,
        {name,phone,about},
        {new:true,runValidators:true}
    ).select('-password')

    if(!updateUser){
        return res.status(404).json({
            message:'user not found!!!'
        })
    }

    res.status(200).json({
        message:'profile updated successfully!!!',
        updateUser
    })
    } catch (error) {
        res.status(500).json({
            message:'failed to update userProfile!!!',
            error:error.message
        })   
    }
}