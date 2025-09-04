const mongoose = require("mongoose");
const { faker } = require("@faker-js/faker");
require("dotenv").config();

const connectDB = require("../config/db");
const User = require("../models/User");

const seedUsers = async () => {
  try {
    await connectDB();

    // Clear old users
    await User.deleteMany();

    // Generate 50 dummy users
    const users = [];
    for (let i = 0; i < 50; i++) {
      users.push({
        name: faker.person.fullName(),
        email: faker.internet.email(),
        role: faker.helpers.arrayElement(["admin", "user"]),
      });
    }

    await User.insertMany(users);

    console.log("✅ 50 Dummy Users Inserted");
    process.exit();
  } catch (err) {
    console.error("❌ Seeding Failed:", err.message);
    process.exit(1);
  }
};

seedUsers();
