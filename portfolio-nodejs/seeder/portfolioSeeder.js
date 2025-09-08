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
            const images = Array.from({ length: 3 }, () =>
                faker.image.urlLoremFlickr({ width: 640, height: 480, category: 'tech' })
            );

            portfolios.push({
                name: faker.word.verb(), // or faker.company.name() for more realism
                title: faker.company.catchPhrase(),
                description: faker.lorem.paragraph(),
                category: faker.commerce.department(),
                image: images,
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
