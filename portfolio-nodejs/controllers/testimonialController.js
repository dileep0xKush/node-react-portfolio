const testimonialService = require("../services/testimonialService");

exports.getTestimonials = async (req, res) => {
    try {
        const data = await testimonialService.getAllTestimonials(req.query);
        res.json(data);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.getTestimonial = async (req, res) => {
    try {
        const testimonial = await testimonialService.getTestimonialById(req.params.id);
        if (!testimonial) return res.status(404).json({ message: "Not found" });
        res.json(testimonial);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.createTestimonial = async (req, res) => {
    try {
        const newOne = await testimonialService.createTestimonial(req.body);
        res.status(201).json(newOne);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

exports.updateTestimonial = async (req, res) => {
    try {
        const updated = await testimonialService.updateTestimonial(req.params.id, req.body);
        if (!updated) return res.status(404).json({ message: "Not found" });
        res.json(updated);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

exports.deleteTestimonial = async (req, res) => {
    try {
        const deleted = await testimonialService.deleteTestimonial(req.params.id);
        if (!deleted) return res.status(404).json({ message: "Not found" });
        res.json({ message: "Deleted successfully" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
