import express from 'express';
import { registration, verifyOTP, Login, resendOTP } from '../controller/authentication.js';
import { getAnnualReport, createAnnualReport } from '../controller/annualReportController.js';
import { AddProduct ,SendProductDetails , DeleteProduct} from '../controller/ProductInventory.js';
import Product from '../model/Product.js';
import orderManagementRouter from "./orderManagement.js";

const router = express.Router();


router.post('/SignUpview',registration)
router.post("/verify",verifyOTP)
router.post("/Login",Login)
router.post("/resend-otp", resendOTP);

router.get('/annual-reports', getAnnualReport);
router.post('/annual-reports', createAnnualReport);

router.post("/products",AddProduct)
router.get("/productDetails",SendProductDetails)
router.delete(`/deleteProduct`,DeleteProduct)

router.use("/order-management", orderManagementRouter);
export default router;
