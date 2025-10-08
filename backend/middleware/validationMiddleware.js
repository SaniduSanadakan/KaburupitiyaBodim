const { AppError } = require('./errorMiddleware');

// Validate request body middleware
const validateRequest = (schema) => {
    return (req, res, next) => {
        const { error } = schema.validate(req.body);
        if (error) {
            const errorMessage = error.details.map(detail => detail.message).join(', ');
            return next(new AppError(errorMessage, 400));
        }
        next();
    };
};

// Sanitize data middleware
const sanitizeData = (fields) => {
    return (req, res, next) => {
        fields.forEach(field => {
            if (req.body[field]) {
                req.body[field] = req.body[field].trim();
            }
        });
        next();
    };
};

module.exports = {
    validateRequest,
    sanitizeData
};