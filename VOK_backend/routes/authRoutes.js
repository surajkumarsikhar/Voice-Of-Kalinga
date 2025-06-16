const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const verifyAdmin = require("../middleware/verifyAdmin")

router.post('/login', authController.loginAdmin);
router.post('/logout', authController.logoutAdmin);
router.get("/verify", verifyAdmin, (req, res) => {
  res.status(200).json({ message: "Admin verified", adminId: req.adminId });
});

// Add in authRoutes.js temporarily
router.get('/check-cookies', (req, res) => {
  console.log("Cookies from Safari:", req.cookies);
  res.json({ cookies: req.cookies });
});


module.exports = router;