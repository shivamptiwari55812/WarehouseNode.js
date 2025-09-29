import express from 'express';
const router = express.Router();

import {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
  updateStock,
  updateStockByone
} from '../controller/productController.js';

import { productValidation } from '../Utilities&MiddleWare/productValidation.js';
import upload from '../Utilities&MiddleWare/fileUpload.js';

// Get all products → GET /order-management/products
router.get('/', getAllProducts);

// Get single product → GET /order-management/products/:id
router.get('/:id', getProductById);

// Create new product → POST /order-management/products
router.post('/', upload.single('document'), productValidation, createProduct);

// Update product → PUT /order-management/products/:id
router.put('/:id', upload.single('document'), productValidation, updateProduct);

// Delete product → DELETE /order-management/products/:id
router.delete('/:id', deleteProduct);

// Update stock → PUT /order-management/products/:id/stock
router.put('/:id/stock', updateStock);

// Update stock by one → PUT /order-management/products/:id/:action


export default router;
