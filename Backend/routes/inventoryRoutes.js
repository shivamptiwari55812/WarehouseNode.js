import express from "express";
import {
  AddProduct,SendProductDetails,updateProduct,DeleteProduct
} from "../controller/ProductInventory.js";
import { body } from "express-validator";

const router = express.Router();

// Validation
const productValidationRules = [
  body("name").notEmpty().withMessage("Product name is required"),
  body("category").notEmpty().withMessage("Category is required"),
  body("price").isFloat({ min: 0 }).withMessage("Price must be >= 0"),
  body("stock").isInt({ min: 0 }).withMessage("Stock must be >= 0"),
  body("minStock").isInt({ min: 0 }).withMessage("Min stock must be >= 0"),
  body("maxStock").isInt({ min: 1 }).withMessage("Max stock must be >= 1"),
  body("supplier").notEmpty().withMessage("Supplier is required"),
  body("location").notEmpty().withMessage("Location is required"),
];



router.post("/products/add", productValidationRules, AddProduct);
router.get("/products/getdetails", SendProductDetails);
router.put("/products/update/:id", productValidationRules, updateProduct);
router.delete("/products/delete/:id", DeleteProduct);


export default router;
