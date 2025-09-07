const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const userRoutes = require("./routes/userRoutes");
const skillRoutes = require('./routes/skillRoutes');
const serviceRoutes = require("./routes/serviceRoutes");

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

app.use("/users", userRoutes);
app.use("/skills", skillRoutes);
app.use("/services", serviceRoutes);

// Error Handler
app.use(errorHandler);

app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
});
