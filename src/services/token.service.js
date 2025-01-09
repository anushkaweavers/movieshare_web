const jwt = require('jsonwebtoken');
const moment = require('moment');
const userService = require('./user.service');
const { Token } = require('../models');
const ApiError = require('../utils/ApiError');
const { tokenTypes } = require('../config/tokens');
const config = require('../config/config');

/**
 * Generate a JWT token
 * @param {ObjectId} userId
 * @param {Moment} expires
 * @param {string} type
 * @param {string} [secret]
 * @returns {string}
 */
const generateToken = (userId, expires, type, secret = config.jwt.secret) => {
  const payload = {
    sub: userId,
    iat: moment().unix(),
    exp: expires.unix(),
    type,
  };
  return jwt.sign(payload, secret);
};

/**
 * Save a token in the database
 * @param {string} token
 * @param {ObjectId} userId
 * @param {Moment} expires
 * @param {string} type
 * @param {boolean} [blacklisted=false]
 * @returns {Promise<Token>}
 */
const saveToken = async (token, userId, expires, type, blacklisted = false) => {
  return await Token.create({
    token,
    user: userId,
    expires: expires.toDate(),
    type,
    blacklisted,
  });
};

/**
 * Verify a token and return the corresponding token document
 * @param {string} token
 * @param {string} type
 * @returns {Promise<Token>}
 */
const verifyToken = async (token, type) => {
  const payload = jwt.verify(token, config.jwt.secret);
  const tokenDoc = await Token.findOne({ token, type, user: payload.sub, blacklisted: false });
  if (!tokenDoc) {
    throw new ApiError(401, 'Invalid or expired token');
  }
  return tokenDoc;
};

/**
 * Generate a reset password token
 * @param {string} email
 * @returns {Promise<string>}
 */
const generateResetPasswordToken = async (email) => {
  const user = await userService.getUserByEmail(email);
  if (!user) {
    throw new ApiError(404, 'No users found with this email');
  }

  const expires = moment().add(config.jwt.resetPasswordExpirationMinutes, 'minutes');
  const resetPasswordToken = generateToken(user.id, expires, tokenTypes.RESET_PASSWORD);

  await saveToken(resetPasswordToken, user.id, expires, tokenTypes.RESET_PASSWORD);

  return resetPasswordToken;
};

/**
 * Reset user password using token
 * @param {string} token
 * @param {string} newPassword
 * @returns {Promise<void>}
 */
const resetPassword = async (token, newPassword) => {
  const tokenDoc = await verifyToken(token, tokenTypes.RESET_PASSWORD);

  const user = await userService.getUserById(tokenDoc.user);
  if (!user) {
    throw new ApiError(404, 'User not found');
  }

  // Update the user's password
  await userService.updateUserPassword(user.id, newPassword);

  // Invalidate the token after use
  await tokenDoc.remove();
};

module.exports = {
  generateToken,
  saveToken,
  verifyToken,
  generateResetPasswordToken,
  resetPassword,
};
