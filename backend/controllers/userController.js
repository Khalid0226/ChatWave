import express from "express";
import mongoose from "mongoose";
import userModel from "../models/userModel.js";
import bcrypt from 'bcryptjs'
import jwt, { decode } from 'jsonwebtoken'


export const register = async (req,res) => {
    try {
        const {name,email,phone,password} = req.body

        // Check karo ki email ya phone number pehle se registered toh nahi hai
        const existingUser = await userModel.findOne({ 
            $or: [{ email }, { phone }] 
        });

        if (existingUser) {
            const message = existingUser.email === email 
                ? 'User with this email already exists!' 
                : 'User with this phone number already exists!';
            
            return res.status(409).json({ message });
        }

        const hashedPassword = await bcrypt.hash(password,10)

        const user = await userModel.create({
            name,email,phone,password:hashedPassword
        })

        res.status(201).json({
            message:"user registered successfully!!!",
            user
        })

    } catch (error) {
        res.status(500).json({
            message:"failed to register user!!",
            error:error.message
        })       
   }
}

export const login = async (req,res) => {
    try {
        const {email,password} = req.body
        const user = await userModel.findOne({email})

        if(!user){
            return res.status(404).json({
                message:'user not found!!!'
            })
        }

        let comparePassword = await bcrypt.compare(password,user.password)

        if(!comparePassword){
            return res.status(404).json({
                message:'invalid password'
            })
        }

        let token = jwt.sign(
            {userId:user._id},
            process.env.JWT_SECRET,
            {expiresIn:'15m'}
        )

        let refreshToken = jwt.sign(
            {userId:user._id},
            process.env.REFRESH_TOKEN_SECRET,
            {expiresIn:'7d'}
        )

        res.cookie('accessToken',token,{
            httpOnly:true,
            secure:false,
            sameSite:'lax',
            maxAge:24*60*60*1000
        })

        res.cookie('refreshToken',refreshToken,{
            httpOnly:true,
            secure:false,
            sameSite:'lax',
            maxAge:7*24*60*60*1000
        })

         res.status(200).json({
            message:'user login successfully',
            user:{
                _id: user._id,
                name: user.name,
                email: user.email,
                phone: user.phone,
                about: user.about,
                avatar: user.avatar // <-- Yeh yahan add karna zaroori hai!
            }
        })
        
    } catch (error) {
        res.status(500).json({
            message:'failed to login user',
            error:error.message
        })
    }
}


export const refreshToken = async (req,res) => {
    try {
        const token = req.cookies.refreshToken

        if(!token){
            return res.status(404).json({
                message:'refresh token not found!!'
            })
        }

        const decoded = jwt.verify(
            token,
            process.env.REFRESH_TOKEN_SECRET
        )

        const user = await userModel.findById(decoded.userId)

        if(!user){
            return res.status(404).json({
                message:'user not found!!'
            })
        }

        const newAccessToken = jwt.sign(
            {userId:user._id},
            process.env.JWT_SECRET,
            {expiresIn:'15m'}
        )

        res.cookie('accessToken',newAccessToken,{
            httpOnly:true,
            secure:false,
            sameSite:'lax',
            maxAge:15*60*1000
        })

        res.status(200).json({
            message:'token refreshed successfully!!'
        })
    } catch (error) {
        res.status(401).json({
            message:"refresh token not found!!!",
            error:error.message
        })
    }
}


export const logout = async (req,res) => {
    try {
        res.clearCookie('accessToken',{
            httpOnly:true,
            secure:false,
            sameSite:'lax'
        })

        res.clearCookie('refreshToken',{
            httpOnly:true,
            secure:false,
            sameSite:'lax'
        })

        res.status(200).json({
            message:'logout successfully'
        })
    } catch (error) {
        res.status(500).json({
            message:'failed to logout',
            error:error.message
        })
    }
}


export const getMe = async (req,res) => {
    try {
        res.status(200).json({
            message:'user found successfully',
            user:req.user
        })
    } catch (error) {
        res.status(500).json({
            message:'failed to fetch users',
            error:error.message
        })   
    }
}