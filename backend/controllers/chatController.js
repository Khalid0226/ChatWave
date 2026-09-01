import userModel from "../models/userModel.js";
import messageModel from "../models/messageModel.js";
import { uploadToCloudinary } from "../utils/cloudinary.js";

export const addContact = async (req, res) => {
    try {
        const { phone } = req.body
        const currentUserId = req.user.id

        if (!phone) {
            return res.status(400).json({
                message: 'please provide a phone number!!!'
            })
        }

        const targetUser = await userModel.findOne({ phone })

        if (!targetUser) {
            return res.status(404).json({
                message: 'user not found with this phone number!!!'
            })
        }

        if (targetUser._id.toString() === currentUserId) {
            return res.status(400).json({
                message: 'You cannot add yourself as a contact!'
            })
        }

        const currentUser = await userModel.findById(currentUserId)

        if (currentUser.contacts.includes(targetUser._id)) {
            return res.status(400).json({
                message: 'User is already in your contacts!'
            })
        }

        currentUser.contacts.push(targetUser._id)
        await currentUser.save()

        res.status(200).json({
            message: 'Contact added successfully!',
            contact: {
                _id: targetUser._id,
                name: targetUser.name,
                email: targetUser.email,
                phone: targetUser.phone,
                avatar: targetUser.avatar
            }

        })
    } catch (error) {
        res.status(500).json({
            message: 'failed to add contact!',
            error: error.message
        })
    }
}


export const getMyContacts = async (req, res) => {
    try {
        const currentUser = await userModel.findById(req.user.id)
            .populate('contacts', 'name phone email about avatar')

        res.status(200).json({
            message: 'contacts fetched successfully!!',
            contacts: currentUser.contacts
        })
    } catch (error) {
        res.status(500).json({
            message: 'failed to fetch contacts!!',
            error: error.message
        })
    }
}


export const removeContacts = async (req, res) => {
    try {
        const contactIdToRemove = req.params.id
        const myUserId = req.user.id

        const updateUser = await userModel.findByIdAndUpdate(
            myUserId,
            { $pull: { contacts: contactIdToRemove } },
            { new: true }
        )

        if (!updateUser) {
            return res.status(404).json({
                message: "user not found!!"
            })
        }

        res.status(200).json({
            message: "contact removed successfully!!!"
        })
    } catch (error) {
        res.status(500).json({
            message: 'failed to remove contact!!!'
        })
    }
}

export const sendMessage = async (req, res) => {
    try {
        const { receiverId, text, messageType } = req.body;
        const senderId = req.user.id;

        // Agar na toh text hai aur na hi koi file/image aayi hai, tab 400 error do
        if (!receiverId || (!text && !req.file)) {
            return res.status(400).json({
                message: 'Receiver aur message content (text ya file/image) hona zaroori hai!'
            });
        }

        let fileUrl = "";
        let originalFileName = ""; // <--- Yeh variable banayein
        let type = messageType || "text";

        // Agar multer ke through file aayi hai, toh use Cloudinary par upload karein
        if (req.file) {
            const cloudinaryResult = await uploadToCloudinary(req.file.buffer, req.file.mimetype, req.file.originalname);
            fileUrl = cloudinaryResult.secure_url;
            originalFileName = req.file.originalname; // <--- Original file name yahan capture karein
            
            // Determine karein ki wo image hai ya koi aur file
            if (req.file.mimetype.startsWith('image/')) {
                type = 'image';
            } else {
                type = 'file';
            }
        }

        const newMessage = await messageModel.create({
            sender: senderId,
            receiver: receiverId,
            text: text || "",
            image: type === 'image' ? fileUrl : "",
            file: type === 'file' ? fileUrl : "",
            fileName: type === 'file' ? originalFileName : "", // <--- Database me save karein
            messageType: type
        });

        const io = req.app.get('io');
        io.emit('receive_message', newMessage);

        res.status(201).json({
            message: 'message sent successfully!!',
            newMessage
        });
    } catch (error) {
        console.error("Error sending message:", error);
        res.status(500).json({
            message: 'failed to send message!!',
            error: error.message
        });
    }
};

export const getMessage = async (req,res) => {
    try {
        const {id:userToChatId} = req.params
        const myId = req.user.id

        const messages = await messageModel.find({
            $or:[
                {sender:myId,receiver:userToChatId},
                {sender:userToChatId,receiver:myId}
            ]
        }).sort({createdAt:1})

        res.status(200).json({
            message:'Messages fetched successfully',
            messages
        })
    } catch (error) {
        res.status(500).json({
            message:'failed to fetch messages!!',
            error:error.message
        })
    }
}