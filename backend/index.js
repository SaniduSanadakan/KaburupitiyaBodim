const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const userRoutes = require('./routes/userRoutes');
const { errorHandler, notFound } = require('./middleware/errorMiddleware');
const { logger, requestTime, rateLimit } = require('./middleware/loggerMiddleware');

// Load environment variables
dotenv.config();

// Initialize express
const app = express();

// Global Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(logger);
app.use(requestTime);
app.use(rateLimit(100, 15 * 60 * 1000)); // 100 requests per 15 minutes

// Connect to MongoDB
connectDB();

// Basic route
app.get('/', (req, res) => {
  res.send('Welcome to Kaburupitiya Bodim API');
});

// Routes
app.use('/api/users', userRoutes);

// Import config
const config = require('./config/config');

// Error Handling Middleware
app.use(notFound);
app.use(errorHandler);

// Start server
app.listen(config.port, () => {
    console.log(`Server is running on port ${config.port}`);
});