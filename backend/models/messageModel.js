import mongoose from "mongoose";

const messageSchema = new mongoose.Schema({
    sender:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true
    },
    receiver:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true
    },
    text:{
        type:String,
        trim:true
    },
    image:{
        type:String,
        default:""
    },
    messageType:{
        type:String,
        enum:['text','image','file'],
        default:'text'
    },
    seen:{
        type:Boolean,
        default:false
    }
},{timestamps:true})

const messageModel = mongoose.model('Message',messageSchema)
export default messageModel