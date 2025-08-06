import express from 'express';
import { registration, verifyOTP, Login } from '../controller/authentication.js';


const router = express.Router();


router.post('/registeration',registration)
router.post("/verifyOTP",verifyOTP)
router.post("/Login",Login)


export default router;
