const mongoose = require('mongoose');
const { faker } = require('@faker-js/faker');
require('dotenv').config();

const connectDB = require('../config/db');
const Portfolio = require('../models/Portfolio');

const seedPortfolios = async () => {
    try {
        await connectDB();

        await Portfolio.deleteMany();

        const portfolios = [];

        for (let i = 0; i < 30; i++) {
            portfolios.push({
                name: [
                    faker.word.noun(),
                    faker.word.adjective(),
                    faker.word.verb(),
                ], 
                image: faker.image.urlLoremFlickr({ width: 640, height: 480, category: 'tech' }),
                status: faker.helpers.arrayElement(['active', 'inactive']),
                created_at: faker.date.past(),
            });
        }

        await Portfolio.insertMany(portfolios);

        console.log('30 Dummy Portfolios Inserted');
        process.exit();
    } catch (err) {
        console.error('Seeding Failed:', err.message);
        process.exit(1);
    }
};

seedPortfolios();
