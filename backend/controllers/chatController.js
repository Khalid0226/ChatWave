import userModel from "../models/userModel.js";
import messageModel from "../models/messageModel.js";

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

export const sendMessage = async(req, res) => {
    try {
        const { receiverId, text, image, file, messageType } = req.body

        const senderId = req.user.id

        if (!receiverId || (!text && !image && !file)) {
            return res.status(400).json({
                message: 'Receiver aur message content (text, image ya file) hona zaroori hai!'
            });
        }

        const newMessage = await messageModel.create({
            sender: senderId,
            receiver: receiverId,
            text: text || "",
            image: image || "",
            file: file || "",
            messageType: messageType || (file ? 'file' : image ? 'image' : "text")
        })

        const io = req.app.get('io')
        io.emit('receive_message',newMessage)

        res.status(201).json({
            message:'message sent successfully!!',
            newMessage
        })
    } catch (error) {
        res.status(500).json({
            message:'failed to send message!!',
            error
        })
    }
}