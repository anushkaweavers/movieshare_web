const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../models/user.model');
const nodemailer = require('nodemailer');

// Register a user
exports.registerUser = async (userData) => {
  const { firstName, lastName, username, email, passwordHash, termsAccepted } = userData;

  // Check for existing user
  const existingUser = await User.findOne({
    $or: [{ email }, { username }],
  });
  if (existingUser) {
    throw new Error('Email or username is already in use');
  }

  // Hash the password
  const hashedPassword = await bcrypt.hash(passwordHash, 10);

  // Create a new user
  const newUser = await User.create({
    firstName,
    lastName,
    username,
    email,
    passwordHash: hashedPassword,
    termsAccepted,
  });

  return newUser;
};

// Request password reset
exports.requestPasswordReset = async (email) => {
  const user = await User.findOne({ email });
  if (!user) {
    throw new Error('No user found with this email');
  }

  // Generate reset token
  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

  // Configure nodemailer transport
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  // Prepare the reset link
  const resetLink = `${process.env.CLIENT_URL}/reset-password/${token}`;
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: user.email,
    subject: 'Password Reset Request',
    text: `Click the link below to reset your password:\n\n${resetLink}`,
  };

  // Send the email
  await transporter.sendMail(mailOptions);

  return token; // Optional: return the token for testing purposes
};

// Reset password
exports.resetPassword = async (token, newPassword) => {
  try {
    // Verify the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decoded.id;

    // Find the user
    const user = await User.findById(userId);
    if (!user) {
      throw new Error('Invalid token or user not found');
    }

    // Hash the new password
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    // Update the user's password
    user.passwordHash = hashedPassword;
    await user.save();

    return true; // Indicate success
  } catch (error) {
    throw new Error('Invalid or expired token');
  }
};
