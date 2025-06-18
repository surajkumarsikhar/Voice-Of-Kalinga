const express = require("express");
const router = express.Router();
const HeroNomination = require("../models/HeroNomination");
const verifyAdmin = require("../middlewares/verifyAdmin"); // import your middleware

// POST - Anyone can submit
router.post("/nominate", async (req, res) => {
  try {
    const nomination = new HeroNomination(req.body);
    await nomination.save();
    res.status(201).json({ message: "Nomination submitted successfully." });
  } catch (err) {
    console.error("Nomination error:", err);
    res.status(400).json({ error: "Failed to submit nomination." });
  }
});

// GET - Only Admin can fetch
router.get("/nominations", verifyAdmin, async (req, res) => {
  try {
    const data = await HeroNomination.find().sort({ createdAt: -1 });
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: "Error fetching nominations." });
  }
});

module.exports = router;
