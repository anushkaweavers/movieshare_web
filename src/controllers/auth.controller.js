const { validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const User = require('../models/user.model');
const userService = require('../services/user.service');

// Register a user
const register = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const {
      firstName,
      lastName,
      username,
      email,
      password,
      bio,
      birthday,
      gender,
      termsAccepted,
    } = req.body;

    // Check for duplicate username or email
    const existingUser = await User.findOne({ $or: [{ username }, { email }] });
    if (existingUser) {
      return res.status(400).json({ message: 'Username or email already exists' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Register the user
    const newUser = await userService.registerUser({
      firstName,
      lastName,
      username,
      email,
      passwordHash: hashedPassword,
      bio,
      birthday,
      gender,
      termsAccepted,
    });

    res.status(201).json({
      message: 'User registered successfully',
      user: {
        id: newUser.id,
        firstName: newUser.firstName,
        lastName: newUser.lastName,
        username: newUser.username,
        email: newUser.email,
      },
    });
  } catch (error) {
    console.error('Error in register:', error.message);
    res.status(500).json({ message: 'Internal server error', error: error.message });
  }
};

// Login a user
const login = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    console.log('Received email:', email);
    console.log('Received password:', password);

    // Find user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }

    // Compare the provided password with the stored hashed password
    const isPasswordValid = await bcrypt.compare(password, user.passwordHash);
    if (!isPasswordValid) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }

    // Successful login response
    res.status(200).json({
      message: 'Login successful',
      user: {
        id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        username: user.username,
        email: user.email,
      },
    });
  } catch (error) {
    console.error('Error in login:', error.message);
    res.status(500).json({ message: 'Internal server error', error: error.message });
  }
};
// Forgot Password
const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;
    // Logic for sending reset link (to be implemented)
    res.status(200).json({ message: 'Password reset link sent to email' });
  } catch (error) {
    console.error('Error in forgotPassword:', error.message);
    res.status(500).json({ message: 'Internal server error', error: error.message });
  }
};

// Reset Password
const resetPassword = async (req, res) => {
  try {
    const { token } = req.params;
    const { newPassword } = req.body;

    // Logic for verifying token and resetting the password (to be implemented)
    res.status(200).json({ message: 'Password reset successful' });
  } catch (error) {
    console.error('Error in resetPassword:', error.message);
    res.status(500).json({ message: 'Internal server error', error: error.message });
  }
};

module.exports = {
  register,
  login,
  forgotPassword,
  resetPassword,
};
