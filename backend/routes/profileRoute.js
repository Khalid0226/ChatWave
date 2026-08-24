import { authMiddleWare } from "../middleware/authMiddleWare.js";
import { updateProfile } from "../controllers/profileController.js";

import express from 'express'

const router = express.Router()

router.patch('/update-profile',authMiddleWare,updateProfile)

export default router