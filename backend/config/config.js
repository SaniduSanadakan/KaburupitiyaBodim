const config = {
    // Server configuration
    port: process.env.PORT || 5000,
    
    // MongoDB configuration
    mongoUri: process.env.MONGODB_URI,
    
    // JWT configuration (for future use)
    jwtSecret: process.env.JWT_SECRET || 'your-default-jwt-secret',
    jwtExpiration: '24h',
    
    // API configuration
    apiPrefix: '/api'
};

module.exports = config;