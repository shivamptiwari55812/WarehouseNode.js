import express from 'express';
import { registration, verifyOTP, Login } from '../controller/authentication.js';
import { AddProduct ,SendProductDetails , DeleteProduct} from '../controller/ProductInventory.js';
import Product from '../model/Product.js';

const router = express.Router();


router.post('/SignUpview',registration)
router.post("/verify",verifyOTP)
router.post("/Login",Login)
router.post("/products",AddProduct)
router.get("/productDetails",SendProductDetails)
router.delete(`/deleteProduct`,DeleteProduct)
export default router;
