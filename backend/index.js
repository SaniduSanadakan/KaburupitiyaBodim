const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const connectDB = require('./config/db');
const userRoutes = require('./routes/userRoutes');
const { errorHandler, notFound } = require('./middleware/errorMiddleware');
const {requestTime, rateLimit } = require('./middleware/loggerMiddleware');
const config = require('./config/config');
// Load environment variables
dotenv.config();

// Initialize express
const app = express();

// Enable CORS
app.use(cors({
  origin: 'http://localhost:5173', //process.env.FRONTEND_URL || 'http://localhost:3000'
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// Global Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(requestTime);
app.use(rateLimit(100, 15 * 60 * 1000)); // 100 requests per 15 minutes

// Connect to MongoDB
connectDB();

// Basic route
app.get('/', (req, res) => {
  res.send('Welcome to Kaburupitiya Bodim API');
});

// Routes
app.use('/api/auth', userRoutes);



// Error Handling Middleware
app.use(notFound);
app.use(errorHandler);

// Start server
app.listen(config.port, () => {
    console.log(`Server is running on port ${config.port}`);
});