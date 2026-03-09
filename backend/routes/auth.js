//creating a register API
import express from 'express';
import { registerUser, loginUser } from '../Controller/authContoller.js';

const router = express.Router();  

//Register
router.post('/register', registerUser);

//login
router.post('/login', loginUser);


export default router;

