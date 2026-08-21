import express from "express";
import { login, logout, refreshToken, register } from "../controllers/userController.js";

const router = express.Router()

router.post('/auth/register',register)
router.post('/auth/login',login)
router.post('/auth/refresh-token',refreshToken)
router.post('/auth/logout',logout)

export default router
