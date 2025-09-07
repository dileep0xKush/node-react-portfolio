const mongoose = require("mongoose");
const { faker } = require("@faker-js/faker");
require("dotenv").config();

const connectDB = require("../config/db");
const Testimonial = require("../models/Testimonial");

const seedTestimonials = async () => {
    try {
        await connectDB();

        await Testimonial.deleteMany();

        const testimonials = [];

        for (let i = 0; i < 25; i++) {
            testimonials.push({
                name: faker.person.fullName(),
                email: faker.internet.email(),
                contactNumber: faker.phone.number(),
                message: faker.lorem.paragraph(),
                status: faker.helpers.arrayElement(["active", "inactive"]),
                created_at: faker.date.past(),
            });
        }

        await Testimonial.insertMany(testimonials);

        console.log("25 Dummy Testimonials Inserted");
        process.exit();
    } catch (err) {
        console.error("Seeding Failed:", err.message);
        process.exit(1);
    }
};

seedTestimonials();
