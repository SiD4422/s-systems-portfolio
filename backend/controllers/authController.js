// controllers/authController.js

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const db = require('../models/db');

/**
 * Seed the admin account from .env on first run.
 * Call this once at server startup.
 */
async function seedAdmin() {
  const existing = db.prepare('SELECT id FROM admins WHERE email = ?').get(process.env.ADMIN_EMAIL);
  if (!existing) {
    const hash = await bcrypt.hash(process.env.ADMIN_PASSWORD, 12);
    db.prepare('INSERT INTO admins (email, password_hash) VALUES (?, ?)').run(
      process.env.ADMIN_EMAIL,
      hash
    );
    console.log(`✅ Admin account seeded: ${process.env.ADMIN_EMAIL}`);
  }
}

/**
 * POST /api/auth/login
 * Body: { email, password }
 * Returns: { token, admin: { id, email } }
 */
async function login(req, res) {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: 'Email and password are required.' });
  }

  const admin = db.prepare('SELECT * FROM admins WHERE email = ?').get(email);
  if (!admin) {
    return res.status(401).json({ error: 'Invalid credentials.' });
  }

  const valid = await bcrypt.compare(password, admin.password_hash);
  if (!valid) {
    return res.status(401).json({ error: 'Invalid credentials.' });
  }

  const token = jwt.sign(
    { id: admin.id, email: admin.email },
    process.env.JWT_SECRET,
    { expiresIn: '8h' }
  );

  res.json({ token, admin: { id: admin.id, email: admin.email } });
}

module.exports = { login, seedAdmin };
