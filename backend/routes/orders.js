// routes/orders.js
const express = require('express');
const router = express.Router();
const { requireAuth } = require('../middleware/authMiddleware');
const { createOrder, getOrders, updateOrderStatus, deleteOrder } = require('../controllers/orderController');

router.post('/', createOrder);                           // Public
router.get('/', requireAuth, getOrders);                 // Admin
router.patch('/:id/status', requireAuth, updateOrderStatus); // Admin
router.delete('/:id', requireAuth, deleteOrder);         // Admin

module.exports = router;
