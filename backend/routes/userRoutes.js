const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const { protect,authorize } = require('../middleware/authMiddleware');

// Public routes
router.post('/login', userController.loginUser);
router.get('/logout', userController.logout);  // Moved before :id routes

// Protected routes (require authentication)
router.use(protect);

// Get current user
router.get('/me', userController.getMe, userController.getUserById);

// Get all users (admin only)
router.get('/users',authorize('admin'), userController.getUsers);

// Get user by ID (admin only)
router.get('/users/:id',authorize('admin'), userController.getUserById);

// Create new user (admin only)
router.post('/register',authorize('admin'), userController.createUser);

// Update user
router.put('/users/:id', userController.updateUser);

// Delete user (admin only)
router.delete('/users/:id',authorize('admin'), userController.deleteUser);

module.exports = router;