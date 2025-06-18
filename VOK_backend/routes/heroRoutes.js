const express = require("express");
const router = express.Router();
const HeroNomination = require("../models/hero");
const upload = require("../middlewares/upload");

// POST - Submit Nomination with optional photo
router.post("/nominate", upload.single("photo"), async (req, res) => {
  try {
    const {
      yourName,
      yourEmail,
      yourPhone,
      heroName,
      heroLocation,
      reason,
      story,
    } = req.body;

    const photoUrl = req.file ? req.file.path : null;

    const nomination = new HeroNomination({
      yourName,
      yourEmail,
      yourPhone,
      heroName,
      heroLocation,
      reason,
      story,
      photo: photoUrl,
    });

    await nomination.save();
    res.status(201).json({ message: "Nomination submitted successfully." });
  } catch (err) {
    console.error("Nomination error:", err);
    res.status(400).json({ error: "Failed to submit nomination." });
  }
});

module.exports = router;
