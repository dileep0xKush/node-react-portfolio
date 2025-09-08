const mongoose = require("mongoose");

const serviceSchema = new mongoose.Schema({
  name: { type: String, required: true },
  image: { type: String },
  description: {
    type: [String],
    required: true,
  },
  status: { type: String, enum: ["active", "inactive"], default: "active" },
  created_at: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Service", serviceSchema);
