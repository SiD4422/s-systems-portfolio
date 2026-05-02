// server.js — JS Systems Express Backend

require('dotenv').config();
const express = require('express');
const cors = require('cors');
const rateLimit = require('express-rate-limit');
const { seedAdmin } = require('./controllers/authController');

const app = express();
const PORT = process.env.PORT || 5000;

// ── Middleware ────────────────────────────────────────────────
app.use(cors({
  origin: true,
  credentials: true,
}));

app.use(express.json({ limit: '10kb' }));

// Rate limiting — prevent spam submissions
const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 50,
  message: { error: 'Too many requests. Please try again later.' },
});

const strictLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 10,
  message: { error: 'Too many submissions. Please wait before trying again.' },
});

app.use('/api', apiLimiter);
app.use('/api/orders', strictLimiter);
app.use('/api/auth/login', rateLimit({ windowMs: 15 * 60 * 1000, max: 10 }));

// ── Routes ────────────────────────────────────────────────────
app.use('/api/auth',     require('./routes/auth'));
app.use('/api/orders',   require('./routes/orders'));
app.use('/api/feedback', require('./routes/feedback'));

// Health check
app.get('/api/health', (req, res) => res.json({ status: 'ok', timestamp: new Date().toISOString() }));

// 404 fallback
app.use((req, res) => res.status(404).json({ error: 'Route not found.' }));

// Global error handler
app.use((err, req, res, next) => {
  console.error('Unhandled error:', err);
  res.status(500).json({ error: 'Internal server error.' });
});

// ── Start ─────────────────────────────────────────────────────
async function start() {
  await seedAdmin(); // Create admin account from .env if not exists
  app.listen(PORT, () => {
    console.log(`\n🚀 JS Systems API running on http://localhost:${PORT}`);
    console.log(`   Admin login: ${process.env.ADMIN_EMAIL}`);
    console.log(`   Frontend:    ${process.env.FRONTEND_URL}\n`);
  });
}

start().catch(console.error);
