import userModel from "../models/userModel.js";

export const addContact = async (req,res) => {
    try {
        const {phone} = req.body
        const currentUserId = req.user.id

        if(!phone){
            return res.status(400).json({
                message:'please provide a phone number!!!'
            })
        }

        const targetUser = await userModel.findOne({phone})

        if(!targetUser){
            return res.status(404).json({
                message:'user not found with this phone number!!!'
            })
        }

        if(targetUser._id.toString() === currentUserId){
            return res.status(400).json({
                message:'You cannot add yourself as a contact!'
            })
        }

        const currentUser = await userModel.findById(currentUserId)

        if(currentUser.contacts.includes(targetUser._id)){
            return res.status(400).json({
                message:'User is already in your contacts!'
            })
        }

        currentUser.contacts.push(targetUser._id)
        await currentUser.save()

        res.status(200).json({
            message:'Contact added successfully!',
            contact:{
                _id:targetUser._id,
                name:targetUser.name,
                email:targetUser.email,
                phone:targetUser.phone,
                avatar:targetUser.avatar
            }

        })
    } catch (error) {
        res.status(500).json({
            message:'failed to add contact!',
            error:error.message
        })
    }
}


// export const getMyContacts = async (req,res) => {
//     try {
//         const currentUser = await userModel.findById(req.user.id)
//         .populate('contacts','name phone email about avatar')

//         res.status(200).json({
//             message:'contacts fetched successfully!!',
//             contacts:currentUser.contacts
//         })
//     } catch (error) {
//         req.status(500).json({
//             message:'failed to fetch contacts!!',
//             error:error.message
//         })
//     }
// }