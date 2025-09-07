// models/Skill.js
const mongoose = require("mongoose");

const skillSchema = new mongoose.Schema({
  name: { type: String, required: true },
  image: { type: String, required: false },
  status: { type: String, enum: ["active", "inactive"], default: "active" },
  created_date: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Skill", skillSchema);
