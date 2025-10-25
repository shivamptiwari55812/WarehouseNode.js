import express from "express";
import multer from "multer";
import { BulkUploadProducts } from "../controller/BulkUploadController.js";
import { verifyToken } from "../Utilities&MiddleWare/AuthMiddleware.js";

const router = express.Router();
const upload = multer({ dest: "uploads/" }); // temporary storage

// Bulk upload route
router.post("/bulk-upload", verifyToken, upload.single("file"), BulkUploadProducts);

export default router;
