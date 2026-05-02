// controllers/feedbackController.js

const db = require('../models/db');

/**
 * POST /api/feedback
 * Public — submit feedback
 */
function createFeedback(req, res) {
  const { name, project, rating, message } = req.body;

  if (!name || !project || !rating || !message) {
    return res.status(400).json({ error: 'All fields are required.' });
  }

  const ratingNum = parseInt(rating);
  if (isNaN(ratingNum) || ratingNum < 1 || ratingNum > 5) {
    return res.status(400).json({ error: 'Rating must be between 1 and 5.' });
  }

  try {
    const result = db.prepare(`
      INSERT INTO feedback (name, project, rating, message)
      VALUES (?, ?, ?, ?)
    `).run(name, project, ratingNum, message);

    res.status(201).json({ message: 'Feedback submitted! Thank you.', id: result.lastInsertRowid });
  } catch (err) {
    console.error('Feedback error:', err);
    res.status(500).json({ error: 'Failed to save feedback.' });
  }
}

/**
 * GET /api/feedback
 * Admin only — get all feedback
 */
function getAllFeedback(req, res) {
  const { approved } = req.query;
  let query = 'SELECT * FROM feedback';
  const params = [];

  if (approved !== undefined) {
    query += ' WHERE approved = ?';
    params.push(approved === 'true' ? 1 : 0);
  }

  query += ' ORDER BY created_at DESC';
  const rows = db.prepare(query).all(...params);
  res.json({ feedback: rows });
}

/**
 * GET /api/feedback/approved
 * Public — returns only approved testimonials for frontend display
 */
function getApprovedFeedback(req, res) {
  const rows = db.prepare('SELECT id, name, project, rating, message FROM feedback WHERE approved = 1 ORDER BY created_at DESC').all();
  res.json({ feedback: rows });
}

/**
 * PATCH /api/feedback/:id/approve
 * Admin only — approve/unapprove a testimonial
 */
function toggleApprove(req, res) {
  const { id } = req.params;
  const { approved } = req.body;

  const result = db.prepare('UPDATE feedback SET approved = ? WHERE id = ?').run(approved ? 1 : 0, id);
  if (result.changes === 0) return res.status(404).json({ error: 'Feedback not found.' });

  res.json({ message: `Feedback ${approved ? 'approved' : 'unapproved'}.` });
}

/**
 * DELETE /api/feedback/:id
 * Admin only
 */
function deleteFeedback(req, res) {
  const { id } = req.params;
  const result = db.prepare('DELETE FROM feedback WHERE id = ?').run(id);
  if (result.changes === 0) return res.status(404).json({ error: 'Feedback not found.' });
  res.json({ message: 'Feedback deleted.' });
}

module.exports = { createFeedback, getAllFeedback, getApprovedFeedback, toggleApprove, deleteFeedback };
