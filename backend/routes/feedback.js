// routes/feedback.js
const express = require('express');
const router = express.Router();
const { requireAuth } = require('../middleware/authMiddleware');
const {
  createFeedback, getAllFeedback, getApprovedFeedback, toggleApprove, deleteFeedback
} = require('../controllers/feedbackController');

router.post('/', createFeedback);                        // Public
router.get('/approved', getApprovedFeedback);            // Public (for testimonials section)
router.get('/', requireAuth, getAllFeedback);             // Admin
router.patch('/:id/approve', requireAuth, toggleApprove);// Admin
router.delete('/:id', requireAuth, deleteFeedback);      // Admin

module.exports = router;
