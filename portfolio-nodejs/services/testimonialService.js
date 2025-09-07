const Testimonial = require("../models/Testimonial");

exports.getAllTestimonials = async ({ page = 1, limit = 10, search = "" }) => {
    const pageNumber = Math.max(1, parseInt(page, 10) || 1);
    const pageSize = Math.max(1, parseInt(limit, 10) || 10);

    const query = {};

    if (search.trim()) {
        query.$or = [
            { name: { $regex: search.trim(), $options: "i" } },
            { email: { $regex: search.trim(), $options: "i" } },
        ];
    }

    const skip = (pageNumber - 1) * pageSize;
    const total = await Testimonial.countDocuments(query);

    const testimonials = await Testimonial.find(query)
        .skip(skip)
        .limit(pageSize)
        .sort({ created_at: -1 });

    return {
        testimonials,
        page: pageNumber,
        limit: pageSize,
        totalPages: Math.ceil(total / pageSize),
        totalResults: total,
    };
};

exports.getTestimonialById = async (id) => {
    return await Testimonial.findById(id);
};

exports.createTestimonial = async (data) => {
    const testimonial = new Testimonial(data);
    return await testimonial.save();
};

exports.updateTestimonial = async (id, data) => {
    return await Testimonial.findByIdAndUpdate(id, data, { new: true });
};

exports.deleteTestimonial = async (id) => {
    return await Testimonial.findByIdAndDelete(id);
};
