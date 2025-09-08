const express = require("express");
const dotenv = require("dotenv");
const session = require('express-session');
const cors = require('cors');

const connectDB = require("./config/db");
const userRoutes = require("./routes/userRoutes");
const skillRoutes = require('./routes/skillRoutes');
const serviceRoutes = require("./routes/serviceRoutes");
const portfolioRoutes = require('./routes/portfolioRoutes');
const testimonialRoutes = require('./routes/testimonialRoutes');
const authRoutes = require('./routes/authRoutes');

const logger = require("./middleware/logger");
const errorHandler = require("./middleware/errorHandler");
const { authMiddleware } = require('./middleware/authMiddleware');

dotenv.config();
connectDB();

const app = express();
const PORT = process.env.PORT || 5000;
app.use(cors());
app.use(express.json());
app.use(logger);

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

app.use("/users", authMiddleware, userRoutes);
app.use("/skills", authMiddleware, skillRoutes);
app.use("/services", authMiddleware, serviceRoutes);
app.use("/portfolio", authMiddleware, portfolioRoutes);
app.use("/testimonials", authMiddleware, testimonialRoutes);

app.use(errorHandler);

app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
});
