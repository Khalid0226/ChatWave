import { addContact, getMyContacts, removeContacts } from "../controllers/chatController.js";
import express from 'express'
import { authMiddleWare } from "../middleware/authMiddleWare.js";
import { sendMessage } from "../controllers/chatController.js";

const router = express.Router()

router.post('/add-contact',authMiddleWare,addContact)
router.get('/my-contacts',authMiddleWare,getMyContacts)
router.delete('/remove-contact/:id',authMiddleWare,removeContacts)

router.post('/send',authMiddleWare,sendMessage)
export default router