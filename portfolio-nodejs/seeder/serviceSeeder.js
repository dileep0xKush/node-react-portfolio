const mongoose = require("mongoose");
const { faker } = require("@faker-js/faker");
require("dotenv").config();

const connectDB = require("../config/db");
const Service = require("../models/Service");

const seedServices = async () => {
    try {
        await connectDB();
        await Service.deleteMany();
        const services = [];

        for (let i = 0; i < 30; i++) {
            services.push({
                name: faker.company.name(),
                image: faker.image.urlLoremFlickr({ width: 640, height: 480, category: "business" }),
                status: faker.helpers.arrayElement(["active", "inactive"]),
                created_at: faker.date.past(),
            });
        }

        await Service.insertMany(services);

        console.log("30 Dummy Services Inserted");
        process.exit();
    } catch (err) {
        console.error("Seeding Failed:", err.message);
        process.exit(1);
    }
};

seedServices();
