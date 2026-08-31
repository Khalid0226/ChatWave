    import mongoose from "mongoose";

    const userSchema = new mongoose.Schema({
        name: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true
        },
        phone: {
            type: String,
            required: true,
            unique: true
        },
        password: {
            type: String,
            required: true
        },
        about: {
            type: String,
            required: true,
            default: 'hello chatWave User!!!'
        },
        avatar: {
            type: String,
            default: ''
        },
        contacts: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        }]
    }, { timestamps: true }
    )

    const userModel = mongoose.model('User', userSchema)
    export default userModel