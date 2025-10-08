const logger = (req, res, next) => {
    console.log(`${new Date().toISOString()} - ${req.method} ${req.originalUrl}`);
    next();
};

// Request time middleware
const requestTime = (req, res, next) => {
    req.requestTime = new Date().toISOString();
    next();
};

// Rate limiting middleware
const rateLimit = (maxRequests, timeWindow) => {
    const requests = new Map();
    
    return (req, res, next) => {
        const ip = req.ip;
        const now = Date.now();
        
        if (requests.has(ip)) {
            const requestData = requests.get(ip);
            const timeSinceFirst = now - requestData.firstRequest;
            
            if (timeSinceFirst > timeWindow) {
                // Reset if time window has passed
                requests.set(ip, {
                    count: 1,
                    firstRequest: now
                });
                next();
            } else if (requestData.count < maxRequests) {
                // Increment count if under limit
                requestData.count++;
                next();
            } else {
                // Too many requests
                res.status(429).json({
                    message: 'Too many requests, please try again later.'
                });
            }
        } else {
            // First request from this IP
            requests.set(ip, {
                count: 1,
                firstRequest: now
            });
            next();
        }
    };
};

module.exports = {
    logger,
    requestTime,
    rateLimit
};