const express = require("express");
const router = express.Router();

const {
    getTestimonials,
    getTestimonial,
    createTestimonial,
    updateTestimonial,
    deleteTestimonial,
} = require("../controllers/testimonialController");

router.get("/", getTestimonials);
router.post("/", createTestimonial);
router.get("/:id", getTestimonial);
router.put("/:id", updateTestimonial);
router.delete("/:id", deleteTestimonial);

module.exports = router;
