const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: [true, 'Full name is required'],
        trim: true,
        minlength: [2, 'Full name must be at least 2 characters long'],
        maxlength: [100, 'Full name cannot exceed 100 characters']
    },
    role: {
        type: String,
        enum: {
            values: ['admin', 'houseOwner'],
            message: 'Role must be either admin or houseOwner'
        },
        default: 'houseOwner',
        required: true
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true,
        lowercase: true,
        trim: true,
        match: [
            /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
            'Please enter a valid email address'
        ]
    },
    password: {
        type: String,
        required: [true, 'Password is required'],
        minlength: [6, 'Password must be at least 6 characters long']
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

// Create index for email (unique constraint)
userSchema.index({ email: 1 }, { unique: true });

module.exports = mongoose.model('User', userSchema);