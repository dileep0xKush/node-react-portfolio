const mongoose = require("mongoose");
const { faker } = require("@faker-js/faker");
require("dotenv").config();

const connectDB = require("../config/db");
const Skill = require("../models/Skill");

const seedSkills = async () => {
    try {
        await connectDB();
        
        await Skill.deleteMany();

        const skills = [];
        for (let i = 0; i < 50; i++) {
            skills.push({
                name: faker.word.noun(),
                image: faker.image.urlPicsumPhotos({ width: 100, height: 100 }),
                status: faker.helpers.arrayElement(["active", "inactive"]),
                created_date: faker.date.past(),
            });
        }

        await Skill.insertMany(skills);

        console.log("50 Dummy Skills Inserted");
        process.exit();
    } catch (err) {
        console.error("Seeding Failed:", err.message);
        process.exit(1);
    }
};

seedSkills();
