const express = require("express");
const dotenv = require("dotenv");
const session = require('express-session');
const bcrypt = require('bcryptjs');

const connectDB = require("./config/db");
const userRoutes = require("./routes/userRoutes");
const skillRoutes = require('./routes/skillRoutes');
const serviceRoutes = require("./routes/serviceRoutes");
const portfolioRoutes = require('./routes/portfolioRoutes');
const testimonialRoutes = require('./routes/testimonialRoutes');
const authRoutes = require('./routes/authRoutes');
const logger = require("./middleware/logger");
const errorHandler = require("./middleware/errorHandler");
const cors = require('cors');

dotenv.config();
connectDB();

const app = express();
const PORT = process.env.PORT || 5000;
app.use(cors());

app.use(express.json());
app.use(logger);

// Routes
app.use(session({
    secret: process.env.SESSION_SECRET || 'mysecretkey',
    resave: false,
    saveUninitialized: false,
    cookie: {
        secure: false,
        httpOnly: true,
        maxAge: 1000 * 60 * 60
    }
}));

app.use("/auth", authRoutes);
app.use("/users", userRoutes);
app.use("/skills", skillRoutes);
app.use("/services", serviceRoutes);
app.use("/portfolio", portfolioRoutes);
app.use("/testimonials", testimonialRoutes);
// Error Handler
app.use(errorHandler);

app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
});
