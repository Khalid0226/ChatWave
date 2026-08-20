import express from "express";
import cors from 'cors'
import dotenv from 'dotenv'
import connectDB from "./config/db.js";
import userRouter from './routes/userRoute.js'
import cookieparser from 'cookie-parser'

dotenv.config()
connectDB()

const app = express()

app.use(cors({
    origin:process.env.FRONTEND_URL,
    credentials:true
}))

app.use(express.json())
app.use(cookieparser())

app.use('/api',userRouter)

const PORT = process.env.PORT || 5000

app.listen(PORT,()=>{
    console.log(`server running on PORT: ${PORT}`);
})