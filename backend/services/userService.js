const User = require('../models/User');
const AppError = require('../middleware/errorMiddleware').AppError;
const jwt = require('jsonwebtoken');

class UserService {
    // Create a new user
    async createUser(userData) {
        try {
            // Add business logic for user creation
            // e.g., password hashing, validation, etc.
            const user = new User(userData);
            return await user.save();
        } catch (error) {
            throw new Error(`Error creating user: ${error.message}`);
        }
    }

    // Get all users
    async getAllUsers(filters = {}) {
        try {
            return await User.find(filters).select('-password');
        } catch (error) {
            throw new Error(`Error fetching users: ${error.message}`);
        }
    }

    // Get user by ID
    async getUserById(userId) {
        try {
            const user = await User.findById(userId).select('-password');
            if (!user) {
                throw new Error('User not found');
            }
            return user;
        } catch (error) {
            throw new Error(`Error fetching user: ${error.message}`);
        }
    }

    // Update user
    async updateUser(userId, updateData) {
        try {
            const user = await User.findByIdAndUpdate(
                userId,
                { $set: updateData },
                { new: true, runValidators: true }
            ).select('-password');

            if (!user) {
                throw new Error('User not found');
            }
            return user;
        } catch (error) {
            throw new Error(`Error updating user: ${error.message}`);
        }
    }

    // Delete user
    async deleteUser(userId) {
        try {
            const user = await User.findByIdAndDelete(userId);
            if (!user) {
                throw new Error('User not found');
            }
            return user;
        } catch (error) {
            throw new Error(`Error deleting user: ${error.message}`);
        }
    }

    // Login user
    async login(email, password) {
        // 1) Check if email and password exist
        if (!email || !password) {
            throw new AppError('Please provide email and password!', 400);
        }

        // 2) Check if user exists && password is correct
        const user = await User.findOne({ email }).select('+password');
        
        if (!user || !(await user.correctPassword(password, user.password))) {
            throw new AppError('Incorrect email or password', 401);
        }

        // 3) If everything ok, generate token
        const token = user.generateAuthToken();

        // 4) Remove password from output
        user.password = undefined;

        return { user, token };
    }

    // Find user by email
    async getUserByEmail(email) {
        try {
            return await User.findOne({ email });
        } catch (error) {
            throw new Error(`Error finding user by email: ${error.message}`);
        }
    }

    // Custom business logic methods can be added here
    async validateUserData(userData) {
        const errors = [];

        // Validate full name
        if (!userData.fullName) {
            errors.push('Full name is required');
        } else if (userData.fullName.length < 2) {
            errors.push('Full name must be at least 2 characters long');
        } else if (userData.fullName.length > 100) {
            errors.push('Full name cannot exceed 100 characters');
        }

        // Validate email
        if (!userData.email || !this.isValidEmail(userData.email)) {
            errors.push('Valid email is required');
        }

        // Validate password
        if (!userData.password || userData.password.length < 6) {
            errors.push('Password must be at least 6 characters long');
        }

        // Validate role if provided
        if (userData.role && !['admin', 'houseOwner'].includes(userData.role)) {
            errors.push('Role must be either admin or houseOwner');
        }

        return {
            isValid: errors.length === 0,
            errors
        };
    }

    // Helper methods
    isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    // User login
    async loginUser(credentials) {
        try {
            const { email, password } = credentials;
            const user = await this.getUserByEmail(email);
            if (!user) {
                throw new Error('Invalid email or password');
            }

            const isMatch = await user.comparePassword(password);
            if (!isMatch) {
                throw new Error('Invalid password');
            }

            // Generate JWT token
            const token = user.generateAuthToken();
            return token;
        } catch (error) {
            throw new Error(`Login failed: ${error.message}`);
        }
    }
}

module.exports = new UserService();