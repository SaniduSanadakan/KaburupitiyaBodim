const jwt = require('jsonwebtoken');
const { AppError } = require('./errorMiddleware');
const config = require('../config/config');
const userService = require('../services/userService');

const protect = async (req, res, next) => {
    try {
        // 1) Get token from cookie or header
        let token;
        
        // Check for token in cookies first
        if (req.cookies && req.cookies.jwt) {
            token = req.cookies.jwt;
        } 
        // Fall back to Authorization header
        else if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
            token = req.headers.authorization.split(' ')[1];
        }

        if (!token) {
            return next(new AppError('You are not logged in. Please log in to get access.', 401));
        }

        // 2) Verify token using the same secret as in User model
        const decoded = jwt.verify(token, process.env.JWT_SECRET || '1234');

        // 3) Check if user still exists
        const user = await userService.getUserById(decoded.id);
        if (!user) {
            return next(new AppError('The user belonging to this token no longer exists.', 401));
        }

        // Grant access to protected route
        req.user = user;
        next();
    } catch (error) {
        next(new AppError(error, 401));
    }
};

// Role-based authorization middleware
const authorize = (...roles) => {
    return (req, res, next) => {
        if (!roles.includes(req.user.role)) {
            return next(new AppError('You do not have permission to perform this action', 403));
        }
        next();
    };
};

module.exports = {
    protect,
    authorize
};