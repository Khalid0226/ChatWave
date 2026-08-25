import { addContact, getMyContacts } from "../controllers/chatController.js";
import express from 'express'
import { authMiddleWare } from "../middleware/authMiddleWare.js";

const router = express.Router()

router.post('/add-contact',authMiddleWare,addContact)
router.get('/my-contacts',authMiddleWare,getMyContacts)

export default router