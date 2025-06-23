const express = require("express");
const router = express.Router();
const HeroNomination = require("../models/HeroNomination");
const upload = require("../middleware/upload");

// 🟢 1. POST - Submit Nomination (already present)
router.post("/nominate", upload.single("photo"), async (req, res) => {
  try {
    const {
      yourName,
      yourEmail,
      yourPhone,
      heroName,
      heroLocation,
      whyNominate,
      whatTheyDo,
    } = req.body;

    const photoUrl = req.file ? req.file.path : null;

    const nomination = new HeroNomination({
      yourName,
      yourEmail,
      yourPhone,
      heroName,
      heroLocation,
      whyNominate,
      whatTheyDo,
      photoUrl,
    });

    await nomination.save();
    res.status(201).json({ message: "Nomination submitted successfully." });
  } catch (err) {
    console.error("Nomination error:", err);
    res.status(400).json({ error: "Failed to submit nomination." });
  }
});

// 🔵 2. GET - All Approved Hero Nominations
router.get("/heroes", async (req, res) => {
  try {
    const approvedHeroes = await HeroNomination.find({ isApproved: true }).sort({ createdAt: -1 });
    res.json(approvedHeroes);
  } catch (err) {
    console.error("Error fetching approved heroes:", err);
    res.status(500).json({ error: "Failed to fetch approved heroes" });
  }
});

// 🟠 3. GET - All Unapproved Hero Nominations
router.get("/heroes/unapproved", async (req, res) => {
  try {
    const unapprovedHeroes = await HeroNomination.find({ isApproved: false }).sort({ createdAt: -1 });
    res.json(unapprovedHeroes);
  } catch (err) {
    console.error("Error fetching unapproved heroes:", err);
    res.status(500).json({ error: "Failed to fetch unapproved heroes" });
  }
});

// 🔴 4. PATCH - Approve Hero Nomination
router.patch("/heroes/:id/approve", async (req, res) => {
  try {
    const { id } = req.params;
    const updated = await HeroNomination.findByIdAndUpdate(
      id,
      { isApproved: true },
      { new: true }
    );
    if (!updated) {
      return res.status(404).json({ error: "Hero not found" });
    }
    res.json({ message: "Hero approved successfully" });
  } catch (err) {
    console.error("Hero approval error:", err);
    res.status(500).json({ error: "Failed to approve hero" });
  }
});

module.exports = router;
