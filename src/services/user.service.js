const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Environment variables for secrets
const JWT_SECRET = process.env.JWT_SECRET || 'default_jwt_secret';
const RESET_SECRET = process.env.JWT_RESET_SECRET || 'reset_jwt_secret';

/**
 * Find a user by their email.
 * @param {string} email - User's email address.
 * @returns {Object} User object or null.
 */
exports.findUserByEmail = async (email) => {
  return await User.findOne({ email });
};

/**
 * Find a user by their ID.
 * @param {string} userId - User's ID.
 * @returns {Object} User object or null.
 */
exports.findUserById = async (userId) => {
  return await User.findById(userId);
};

/**
 * Create a new user.
 * @param {Object} userData - User data to be created.
 * @returns {Object} Newly created user.
 */
exports.createUser = async (userData) => {
  const hashedPassword = await bcrypt.hash(userData.password, 10);

  const user = new User({
    firstName: userData.firstName,
    lastName: userData.lastName,
    username: userData.username,
    email: userData.email,
    passwordHash: hashedPassword,
    gender: userData.gender,
    birthday: userData.birthday,
    bio: userData.bio,
    createdAt: new Date(),
    updatedAt: new Date(),
  });

  return await user.save();
};

/**
 * Generate a JWT for authentication.
 * @param {string} userId - User's ID.
 * @returns {string} JWT token.
 */
exports.generateAuthToken = (userId) => {
  return jwt.sign({ userId }, JWT_SECRET, { expiresIn: '1h' });
};

/**
 * Generate a reset token for password reset.
 * @param {string} userId - User's ID.
 * @returns {Object} Reset token and expiration.
 */
exports.generateResetToken = (userId) => {
  const token = jwt.sign({ userId }, RESET_SECRET, { expiresIn: '1h' });
  const expiresAt = new Date(Date.now() + 3600000); // 1 hour from now

  return { token, expiresAt };
};

/**
 * Verify a JWT token.
 * @param {string} token - JWT token.
 * @param {string} secret - JWT secret to verify against.
 * @returns {Object} Decoded payload.
 */
exports.verifyToken = (token, secret) => {
  return jwt.verify(token, secret);
};

/**
 * Compare plain text password with hashed password.
 * @param {string} password - Plain text password.
 * @param {string} hashedPassword - Hashed password.
 * @returns {boolean} True if passwords match, false otherwise.
 */
exports.comparePassword = async (password, hashedPassword) => {
  return await bcrypt.compare(password, hashedPassword);
};

/**
 * Update user fields.
 * @param {string} userId - User's ID.
 * @param {Object} updates - Fields to update.
 * @returns {Object} Updated user object.
 */
exports.updateUser = async (userId, updates) => {
  const user = await User.findById(userId);

  if (!user) {
    throw new Error('User not found');
  }

  Object.keys(updates).forEach((key) => {
    user[key] = updates[key];
  });

  user.updatedAt = new Date();
  return await user.save();
};

/**
 * Update the password for a user.
 * @param {string} userId - User's ID.
 * @param {string} newPassword - New password.
 * @returns {Object} Updated user object.
 */
exports.updatePassword = async (userId, newPassword) => {
  const hashedPassword = await bcrypt.hash(newPassword, 10);
  const user = await User.findById(userId);

  if (!user) {
    throw new Error('User not found');
  }

  user.passwordHash = hashedPassword;
  user.passwordResetToken = undefined;
  user.passwordResetExpires = undefined;
  user.updatedAt = new Date();

  return await user.save();
};
