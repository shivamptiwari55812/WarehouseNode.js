import express from 'express';
const router = express.Router();

import {
  getAllOrders,
  getOrderById,
  createOrder,
  updateOrderStatus,
  deleteOrder,
  getOrderStats
} from '../controller/orderController.js';
import { orderValidation } from '../Utilities&MiddleWare/orderValidation.js';
import upload from '../Utilities&MiddleWare/fileUpload.js';

// Create new order → POST /order-management/orders
router.post('/', upload.array('documents'), orderValidation, createOrder);

// Get all orders → GET /order-management/orders
router.get('/', getAllOrders);

// Get single order → GET /order-management/orders/:id
router.get('/:id', getOrderById);

// Update order status → PUT /order-management/orders/:id/status
router.put('/:id/status', updateOrderStatus);

// Delete order → DELETE /order-management/orders/:id
router.delete('/:id', deleteOrder);

// Order statistics → GET /order-management/orders-stats
router.get('/stats', getOrderStats);

export default router;
