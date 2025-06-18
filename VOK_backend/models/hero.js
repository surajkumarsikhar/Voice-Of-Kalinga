const mongoose = require("mongoose");

const heroNominationSchema = new mongoose.Schema({
  yourName: {
    type: String,
    required: true,
    trim: true,
  },
  yourEmail: {
    type: String,
    required: true,
    trim: true,
    match: [
      /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
      "Please fill a valid email address",
    ],
  },
  yourPhone: {
    type: String,
    required: true,
    match: [/^\d{10}$/, "Phone number must be 10 digits"],
  },
  heroName: {
    type: String,
    required: true,
    trim: true,
  },
  heroLocation: {
    type: String,
    required: true,
    trim: true,
  },
  whyNominate: {
    type: String,
    required: true,
    trim: true,
  },
  whatTheyDo: {
    type: String,
    required: true,
    trim: true,
  },
  photoUrl: {
    type: String,
    default: "",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("HeroNomination", heroNominationSchema);
