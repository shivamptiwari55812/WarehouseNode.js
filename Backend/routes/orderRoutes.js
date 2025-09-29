import PDFDocument from "pdfkit";
import fs from "fs";
import path from "path";
import Order from "../model/Order.js"; 
import { cloudinary } from "../Utilities&MiddleWare/cloudinary.js";

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

// Generate & upload invoice PDF
// ✅ Add this route at the end (or anywhere after imports and before export)
router.get("/generate-invoice/:orderId", async (req, res) => {
  const { orderId } = req.params;

  try {
    // Find the order using orderId instead of _id
    const order = await Order.findOne({ orderId: orderId });
    if (!order) return res.status(404).json({ message: "Order not found" });

    // If PDF already exists
    if (order.pdfGenerated && order.pdfPath) {
      return res.json({ pdfUrl: order.pdfPath });
    }

    if (!fs.existsSync("./temp")) fs.mkdirSync("./temp");

    const pdfPathLocal = path.join("./temp", `invoice-${orderId}.pdf`);
    const doc = new PDFDocument();
    doc.pipe(fs.createWriteStream(pdfPathLocal));

    doc.fontSize(20).text(`Invoice for Order: ${orderId}`);
    doc.text(`Company: ${order.companyDetails.name || "N/A"}`);
    doc.text(`Amount: $${order.totalAmount}`);
    doc.text(`Date: ${order.createdAt.toDateString()}`);
    doc.end();

    doc.on("finish", async () => {
      const result = await cloudinary.uploader.upload(pdfPathLocal, {
        resource_type: "auto",
        folder: "pdf/invoices",
      });

      order.pdfPath = result.secure_url;
      order.pdfGenerated = true;
      await order.save();

      fs.unlinkSync(pdfPathLocal);

      res.json({ pdfUrl: order.pdfPath });
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});


export default router;
