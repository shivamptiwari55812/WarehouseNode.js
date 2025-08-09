import express from 'express';
import { registration, verifyOTP, Login } from '../controller/authentication.js';


const router = express.Router();


router.post('/SignUpview',registration)
router.post("/verify",verifyOTP)
router.post("/Login",Login)


export default router;
