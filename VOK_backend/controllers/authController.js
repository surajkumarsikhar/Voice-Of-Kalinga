const Admin = require('../models/admin.js');
const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET;
const COOKIE_OPTIONS = {
  httpOnly: true,
  secure: false, // Set to true in production (with HTTPS)
  sameSite: 'lax',
  maxAge: 24 * 60 * 60 * 1000
};

exports.loginAdmin = async (req, res) => {
  const { username, password } = req.body;
  try {
    const admin = await Admin.findOne({ username });
    if (!admin) return res.status(401).json({ error: 'Invalid username' });

    const isMatch = await admin.comparePassword(password);
    if (!isMatch) return res.status(401).json({ error: 'Invalid password' });

    const token = jwt.sign({ id: admin._id }, JWT_SECRET, { expiresIn: '1d' });
    res.cookie('adminToken', token, COOKIE_OPTIONS).json({ message: 'Login successful' });
  } catch (err) {
    res.status(500).json({ error: 'Login failed' });
  }
};

exports.logoutAdmin = (req, res) => {
  res.clearCookie('adminToken', COOKIE_OPTIONS).json({ message: 'Logged out' });
};