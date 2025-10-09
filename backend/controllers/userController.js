const userService = require('../services/userService');
const jwt = require('jsonwebtoken');
const config = require('../config/config');

// Get all users
exports.getUsers = async (req, res) => {
    try {
        const users = await userService.getAllUsers();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get user by ID
exports.getUserById = async (req, res) => {
    try {
        const user = await userService.getUserById(req.params.id);
        res.status(200).json(user);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};

// Create new user (admin only)
exports.createUser = async (req, res, next) => {
    try {

        // Validate user data
        const validation = await userService.validateUserData(req.body);
        if (!validation.isValid) {
            return res.status(400).json({ 
                status: 'fail',
                errors: validation.errors 
            });
        }

        const newUser = await userService.createUser(req.body);
        
        res.status(201).json({
            status: 'success',
            data: {
                user: newUser
            }
        });
    } catch (error) {
        res.status(400).json({ 
            status: 'error',
            message: error.message 
        });
    }
};

// Update user
exports.updateUser = async (req, res) => {
    try {
        const updatedUser = await userService.updateUser(req.params.id, req.body);
        res.status(200).json(updatedUser);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Delete user
exports.deleteUser = async (req, res) => {
    try {
        await userService.deleteUser(req.params.id);
        res.status(200).json({ message: 'User deleted successfully' });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// User login
exports.loginUser = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        // 1) Check if email and password exist
        if (!email || !password) {
            return res.status(400).json({ message: 'Please provide email and password!' });
        }

        // 2) Login user
        const { user, token } = await userService.login(email, password);

        // 3) Set cookie options
        const cookieOptions = {
            expires: new Date(
                Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 60 * 60 * 1000 || 1 * 60 * 60 * 1000 
            ),
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict'
        };

        // 4) Send token in cookie and response
        res.cookie('jwt', token, cookieOptions);

        // Remove password from output
        user.password = undefined;

        res.status(200).json({
            status: 'success',
            token,
            data: {
                user
            }
        });
    } catch (error) {
        res.status(401).json({ message: error.message });
    }
};

// Logout user
exports.logout = (req, res) => {
    res.cookie('jwt', 'loggedout', {
        expires: new Date(Date.now() + 10 * 1000),
        httpOnly: true
    });
    
    res.status(200).json({ status: 'success' });
};

// Get current logged in user
exports.getMe = (req, res, next) => {
    req.params.id = req.user.id;
    next();
};