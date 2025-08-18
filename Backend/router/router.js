import express from 'express';
import { registration, verifyOTP, Login } from '../controller/authentication.js';
import { AddProduct } from '../controller/ProductInventory.js';


const router = express.Router();


router.post('/SignUpview',registration)
router.post("/verify",verifyOTP)
router.post("/Login",Login)
router.post("/products",AddProduct)

export default router;
