import { authMiddleWare } from "../middleware/authMiddleWare.js";
import { updateProfile } from "../controllers/profileController.js";

import express from 'express'
import upload from "../middleware/multer.js";

const router = express.Router()

router.put('/update-profile',authMiddleWare,upload.single('profilePic'),updateProfile)

export default router