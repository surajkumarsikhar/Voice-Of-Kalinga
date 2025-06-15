const express = require("express");
const axios = require("axios");
const dotenv = require("dotenv");
dotenv.config();

const router = express.Router();

router.get("/cloudinary-videos", async (req, res) => {
  try {
    const cloudName = process.env.CLOUD_NAME;
    const apiKey = process.env.CLOUD_API_KEY;
    const apiSecret = process.env.CLOUD_API_SECRET;

    const response = await axios.get(
      `https://api.cloudinary.com/v1_1/${cloudName}/resources/video`,
      {
        auth: {
          username: apiKey,
          password: apiSecret,
        },
      }
    );

    const videos = response.data.resources.map((video) => ({
      url: video.secure_url,
      public_id: video.public_id,
      created_at: video.created_at,
    }));

    res.json({ resources: videos }); // wrapped in 'resources' to match frontend expectation
  } catch (error) {
    console.error("Cloudinary fetch error:", error.message);
    res.status(500).json({ error: "Failed to fetch videos from Cloudinary" });
  }
});

module.exports = router;
