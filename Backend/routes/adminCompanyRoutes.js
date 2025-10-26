import express from "express";
import { getAllCompaniesAdmin, createCompanyAdmin, updateCompanyAdmin, deleteCompanyAdmin } from "../controller/adminCompanyController.js";
import { verifyToken as authenticateAdmin } from "../Utilities&MiddleWare/AuthMiddleware.js";

import multer from "multer";

const router = express.Router();
const upload = multer({ dest: "uploads/" });

router.get("/companies", authenticateAdmin, getAllCompaniesAdmin);
router.post("/companies", authenticateAdmin, upload.single("document"), createCompanyAdmin);
router.put("/companies/:id", authenticateAdmin, upload.single("document"), updateCompanyAdmin);
router.delete("/companies/:id", authenticateAdmin, deleteCompanyAdmin);

export default router;
