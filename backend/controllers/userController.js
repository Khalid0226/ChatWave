import express from "express";
import mongoose from "mongoose";
import userModel from "../models/userModel.js";
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'


export const register = async (req,res) => {
    try {
        const {name,email,phone,password} = req.body

        const exist = await userModel.findOne({email})

        if(exist){
            return res.status(409).json({
                message:'user already axist'
            })
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
            {expiresIn:'1d'}
        )

        res.cookie('accessToken',token,{
            httpOnly:true,
            secure:false,
            sameSite:'lax',
            maxAge:24*60*60*1000
        })

         res.status(200).json({
            message:'user login successfully',
            user:{
                name:user.name,
                email:user.email,
                phone:user.phone
            }
        })
        
    } catch (error) {
        res.status(500).json({
            message:'failed to login user',
            error:error.message
        })
    }
}