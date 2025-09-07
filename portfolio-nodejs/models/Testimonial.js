const mongoose = require("mongoose");

const testimonialSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    contactNumber: { type: String, required: true },
    message: { type: String, required: true },
    status: { type: String, enum: ["active", "inactive"], default: "active" },
    created_at: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Testimonial", testimonialSchema);
