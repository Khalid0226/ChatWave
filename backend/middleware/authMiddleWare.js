import jwt from 'jsonwebtoken'
import userModel from '../models/userModel.js'

export const authMiddleWare = async (req, res, next) => {
    try {
        const token = req.cookies.accessToken

        if (!token) {
            return res.status(401).json({
                message: 'Access token not found, please login again!'
            })
        }

        const decoded = jwt.verify(
            token,
            process.env.JWT_SECRET
        )
        // req.user = decoded; // Isme sirf { userId: '...', iat: ..., exp: ... } milta hai

        req.user = await userModel.findById(decoded.userId).select('-password')

        if(!req.user){
            return res.status(404).json({
                message:'user not found!!'
            })
        }

        next()
    } catch (error) {
        res.status(401).json({
            message: 'Invalid or expired access token!',
            error: error.message
        })
    }
}