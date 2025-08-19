import express from 'express';
import { registration, verifyOTP, Login } from '../controller/authentication.js';
import { getAnnualReport, createAnnualReport } from '../controller/annualReportController.js';

const router = express.Router();


router.post('/SignUpview',registration)
router.post("/verify",verifyOTP)
router.post("/Login",Login)

router.get('/annual-reports', getAnnualReport);
router.post('/annual-reports', createAnnualReport);

export default router;
