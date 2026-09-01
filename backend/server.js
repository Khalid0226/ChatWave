import express from "express";
import http from 'http'
import { Server } from "socket.io";
import cors from 'cors'
import dotenv from 'dotenv'
import cookieparser from 'cookie-parser'
import connectDB from "./config/db.js";
import userRouter from './routes/userRoute.js'
import profileRouter from './routes/profileRoute.js'
import chatRouter from './routes/chatRoute.js'


dotenv.config()
connectDB()

const app = express()

const server = http.createServer(app)

const io = new Server(server,{
    cors:{
        origin:process.env.FRONTEND_URL,
        methods:['get','post'],
        credentials:true
    }
})

app.set('io',io)

io.on('connection',(socket)=>{
    console.log(`user connected: ${socket.id}`);

    socket.on('send_message',(data)=>{
        io.emit('receive_message',data)
    })
    
    socket.on('disconnect',()=>{
        console.log(`User disconnected :${socket.id}`);
        
    })
})

app.use(cors({
    origin:process.env.FRONTEND_URL,
    credentials:true
}))

app.use(express.json())
app.use(cookieparser())

app.use('/api',userRouter)
app.use('/api',profileRouter)
app.use('/api/chat',chatRouter)

const PORT = process.env.PORT || 5000

// app.listen(PORT,()=>{
//     console.log(`server running on PORT: ${PORT}`);
// })

server.listen(PORT,()=>{
    console.log(`server running on PORT: ${PORT}`);
})