const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const cors = require('cors');
require('dotenv').config();

const cloudinaryRoutes = require("./routes/cloudinaryVideos.js");
const blogRoutes = require('./routes/blogRoutes');
const authRoutes = require('./routes/authRoutes');
require('./config/db');

const app = express();

// ✅ Proper CORS setup
app.use(cors({
  origin: 'https://voice-of-kalinga-site.vercel.app/', // your frontend URL
  credentials: true // ✅ allow cookies to be sent
}));

app.use(express.json());
app.use(cookieParser());

// API Routes
app.use("/api", cloudinaryRoutes);
app.use('/api/blogs', blogRoutes);
app.use('/api/admin', authRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
