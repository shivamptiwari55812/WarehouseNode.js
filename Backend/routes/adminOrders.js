// routes/adminOrders.js
import express from 'express';
import { User } from '../model/authentication.js'; // your User model
import Order from '../model/Order.js'; // your Order model
import { authenticateAdmin } from '../Utilities&MiddleWare/authenticateAdmin.js';
const router = express.Router();

// Approve an order
router.post('/:orderId/approve', authenticateAdmin, async (req, res) => {
  try {
    const order = await Order.findById(req.params.orderId);
    if (!order) return res.status(404).json({ message: 'Order not found' });

    order.status = 'Approved';
    await order.save();

    res.json({ message: 'Order approved', order });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Reject an order
router.post('/:orderId/reject', authenticateAdmin, async (req, res) => {
  try {
    const order = await Order.findById(req.params.orderId);
    if (!order) return res.status(404).json({ message: 'Order not found' });

    order.status = 'Rejected';
    await order.save();

    res.json({ message: 'Order rejected', order });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Delete an order
router.delete('/:orderId', authenticateAdmin, async (req, res) => {
  try {
    const order = await Order.findByIdAndDelete(req.params.orderId);
    if (!order) return res.status(404).json({ message: 'Order not found' });

    res.json({ message: 'Order deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Export all orders as CSV
// Export all orders as CSV
router.get('/export/csv', authenticateAdmin, async (req, res) => {
  try {
    const orders = await Order.find().lean();

    const fields = ['_id', 'customer', 'status', 'items', 'createdAt'];
    const csv = [
      fields.join(','), // CSV header
      ...orders.map(o => fields.map(f => JSON.stringify(o[f] || '')).join(',')),
    ].join('\n');

    res.setHeader('Content-Type', 'text/csv'); // important
    res.setHeader('Content-Disposition', 'attachment; filename=orders.csv'); // important
    res.send(csv);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error while generating CSV');
  }
});


export default router;
