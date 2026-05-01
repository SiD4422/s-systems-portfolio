// controllers/orderController.js

const db = require('../models/db');
const { sendOrderNotification, sendOrderConfirmation } = require('../config/email');

/**
 * POST /api/orders
 * Public — submit a new project order
 */
async function createOrder(req, res) {
  const { name, email, phone, department, domain, description, deadline } = req.body;

  // Basic validation
  if (!name || !email || !department || !domain || !description || !deadline) {
    return res.status(400).json({ error: 'All required fields must be filled.' });
  }

  try {
    const result = db.prepare(`
      INSERT INTO orders (name, email, phone, department, domain, description, deadline)
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `).run(name, email, phone || null, department, domain, description, deadline);

    const order = { id: result.lastInsertRowid, name, email, phone, department, domain, description, deadline };

    // Fire-and-forget emails (don't block response on email failure)
    Promise.allSettled([
      sendOrderNotification(order),
      sendOrderConfirmation(order),
    ]).then((results) => {
      results.forEach((r, i) => {
        if (r.status === 'rejected') console.error(`Email ${i} failed:`, r.reason?.message);
      });
    });

    res.status(201).json({ message: 'Order submitted successfully!', id: result.lastInsertRowid });
  } catch (err) {
    console.error('Order creation error:', err);
    res.status(500).json({ error: 'Failed to save order. Please try again.' });
  }
}

/**
 * GET /api/orders
 * Admin only — list all orders, newest first
 * Query params: status (pending|in-progress|completed), page, limit
 */
function getOrders(req, res) {
  const { status, page = 1, limit = 20 } = req.query;
  const offset = (parseInt(page) - 1) * parseInt(limit);

  let query = 'SELECT * FROM orders';
  const params = [];

  if (status) {
    query += ' WHERE status = ?';
    params.push(status);
  }

  query += ' ORDER BY created_at DESC LIMIT ? OFFSET ?';
  params.push(parseInt(limit), offset);

  const orders = db.prepare(query).all(...params);
  const total = db.prepare(`SELECT COUNT(*) as count FROM orders${status ? ' WHERE status = ?' : ''}`).get(...(status ? [status] : [])).count;

  res.json({ orders, total, page: parseInt(page), limit: parseInt(limit) });
}

/**
 * PATCH /api/orders/:id/status
 * Admin only — update order status
 */
function updateOrderStatus(req, res) {
  const { id } = req.params;
  const { status } = req.body;

  const validStatuses = ['pending', 'in-progress', 'completed', 'cancelled'];
  if (!validStatuses.includes(status)) {
    return res.status(400).json({ error: `Status must be one of: ${validStatuses.join(', ')}` });
  }

  const result = db.prepare('UPDATE orders SET status = ? WHERE id = ?').run(status, id);
  if (result.changes === 0) return res.status(404).json({ error: 'Order not found.' });

  res.json({ message: 'Status updated.', id, status });
}

/**
 * DELETE /api/orders/:id
 * Admin only
 */
function deleteOrder(req, res) {
  const { id } = req.params;
  const result = db.prepare('DELETE FROM orders WHERE id = ?').run(id);
  if (result.changes === 0) return res.status(404).json({ error: 'Order not found.' });
  res.json({ message: 'Order deleted.' });
}

module.exports = { createOrder, getOrders, updateOrderStatus, deleteOrder };
