//creating a register API
import express from 'express';
import { registerUser, loginUser, getSessionMeta } from '../Controller/authContoller.js';

const router = express.Router();  

//Register
router.post('/register', registerUser);

//login
router.post('/login', loginUser);

// server session metadata
router.get('/session-meta', getSessionMeta);


export default router;

