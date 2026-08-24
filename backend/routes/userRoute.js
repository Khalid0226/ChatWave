import express from "express";
import { getMe, login, logout, refreshToken, register } from "../controllers/userController.js";
import { authMiddleWare } from "../middleware/authMiddleWare.js";

const router = express.Router()

router.post('/auth/register',register)
router.post('/auth/login',login)
router.post('/auth/refresh-token',refreshToken)
router.post('/auth/logout',logout)
router.get('/auth/me',authMiddleWare,getMe)

export default router
