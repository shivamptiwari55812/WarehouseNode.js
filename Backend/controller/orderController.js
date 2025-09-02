import Order from "../model/Order.js";
import Company from "../model/Company.js";
import Product from "../model/Product.js";
import { validationResult } from "express-validator";

// Get all orders
export const getAllOrders = async (req, res) => {
  try {
    const { orderType, status, companyId } = req.query;
    let query = {};

    if (orderType) {
      query.orderType = orderType;
    }

    if (status) {
      query.status = status;
    }

    if (companyId) {
      query.company = companyId;
    }

    const orders = await Order.find(query)
      .populate("company", "name contact email phone")
      .populate("products.productId", "name price category")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: orders.length,
      data: orders,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching orders",
      error: error.message,
    });
  }
};

// Get single order
export const getOrderById = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id)
      .populate("company")
      .populate("products.productId");

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found",
      });
    }

    res.status(200).json({
      success: true,
      data: order,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching order",
      error: error.message,
    });
  }
};

// Create new order
export const createOrder = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: "Validation errors",
        errors: errors.array(),
      });
    }

    const { orderType, companyId, products, notes, generatePDF } = req.body;

    // Verify company exists
    const company = await Company.findById(companyId);
    if (!company) {
      return res.status(404).json({
        success: false,
        message: "Company not found",
      });
    }

    // Process products and calculate total
    let totalAmount = 0;
    const processedProducts = [];

    for (const orderProduct of products) {
      const product = await Product.findById(orderProduct.productId);

      if (!product) {
        return res.status(404).json({
          success: false,
          message: `Product not found: ${orderProduct.productId}`,
        });
      }

      // Check stock for outbound orders
      if (orderType === "outbound" && product.stock < orderProduct.quantity) {
        return res.status(400).json({
          success: false,
          message: `Insufficient stock for product: ${product.name}. Available: ${product.stock}, Requested: ${orderProduct.quantity}`,
        });
      }

      const unitPrice = product.price;
      const totalPrice = unitPrice * orderProduct.quantity;
      totalAmount += totalPrice;

      processedProducts.push({
        productId: product._id,
        productDetails: {
          name: product.name,
          price: product.price,
          category: product.category,
        },
        quantity: orderProduct.quantity,
        notes: orderProduct.notes || "",
        unitPrice,
        totalPrice,
      });

      // Update stock based on order type
      if (orderType === "outbound") {
        product.stock -= orderProduct.quantity;
        await product.save();
      } else if (orderType === "inbound") {
        product.stock += orderProduct.quantity;
        await product.save();
      }
    }

    // Create order
    const order = await Order.create({
      orderType,
      company: company._id,
      companyDetails: {
        name: company.name,
        contact: company.contact,
        email: company.email,
        phone: company.phone,
        address: company.address,
        GSTIN: company.GSTIN,
      },
      products: processedProducts,
      totalAmount,
      notes,
      pdfGenerated: generatePDF || false,
    });

    const populatedOrder = await Order.findById(order._id)
      .populate("company")
      .populate("products.productId");

    res.status(201).json({
      success: true,
      message: "Order created successfully",
      data: populatedOrder,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error creating order",
      error: error.message,
    });
  }
};

// Update order status
export const updateOrderStatus = async (req, res) => {
  try {
    const { status } = req.body;

    const order = await Order.findByIdAndUpdate(
      req.params.id,
      { status, updatedAt: Date.now() },
      { new: true, runValidators: true }
    )
      .populate("company")
      .populate("products.productId");

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Order status updated successfully",
      data: order,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error updating order status",
      error: error.message,
    });
  }
};

// Delete order
export const deleteOrder = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found",
      });
    }

    // Restore stock if it's an outbound order
    if (order.orderType === "outbound") {
      for (const orderProduct of order.products) {
        const product = await Product.findById(orderProduct.productId);
        if (product) {
          product.stock += orderProduct.quantity;
          await product.save();
        }
      }
    }

    await Order.findByIdAndDelete(req.params.id);

    res.status(200).json({
      success: true,
      message: "Order deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error deleting order",
      error: error.message,
    });
  }
};

// Get order statistics
export const getOrderStats = async (req, res) => {
  try {
    const stats = await Order.aggregate([
      {
        $group: {
          _id: {
            orderType: "$orderType",
            status: "$status",
          },
          count: { $sum: 1 },
          totalAmount: { $sum: "$totalAmount" },
        },
      },
    ]);

    // Get total counts
    const totalStats = await Order.aggregate([
      {
        $group: {
          _id: null,
          totalOrders: { $sum: 1 },
          totalValue: { $sum: "$totalAmount" },
          inboundOrders: {
            $sum: { $cond: [{ $eq: ["$orderType", "inbound"] }, 1, 0] },
          },
          outboundOrders: {
            $sum: { $cond: [{ $eq: ["$orderType", "outbound"] }, 1, 0] },
          },
        },
      },
    ]);

    res.status(200).json({
      success: true,
      data: {
        detailed: stats,
        summary:
          totalStats[0] || {
            totalOrders: 0,
            totalValue: 0,
            inboundOrders: 0,
            outboundOrders: 0,
          },
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching order statistics",
      error: error.message,
    });
  }
};
