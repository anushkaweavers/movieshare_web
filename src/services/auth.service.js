const httpStatus = require('http-status');
const userService = require('./user.service');
const tokenService = require('./token.service');
const ApiError = require('../utils/ApiError');
const { tokenTypes } = require('../config/tokens');

/**
 * Log in a user with email and password.
 * @param {string} email - User's email.
 * @param {string} password - User's password.
 * @returns {Promise<Object>} - The logged-in user object.
 * @throws {ApiError} - If email or password is incorrect.
 */
const loginUserWithEmailAndPassword = async (email, password) => {
  const user = await userService.getUserByEmail(email);

  if (!user) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'Incorrect email or password');
  }

  console.log('User found:', user);  // Debugging: check user object

  const isPasswordValid = await user.isPasswordMatch(password);

  if (!isPasswordValid) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'Incorrect email or password');
  }

  return user;
};

/**
 * Log out a user by invalidating their refresh token.
 * @param {string} refreshToken - The refresh token to invalidate.
 * @returns {Promise<void>}
 */
const logout = async (refreshToken) => {
  if (!refreshToken) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Refresh token is required');
  }
  await tokenService.invalidateToken(refreshToken);
};

/**
 * Refresh authentication tokens using a valid refresh token.
 * @param {string} refreshToken - The refresh token to use.
 * @returns {Promise<Object>} - The new tokens.
 * @throws {ApiError} - If the refresh token is invalid or expired.
 */
const refreshAuth = async (refreshToken) => {
  if (!refreshToken) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Refresh token is required');
  }
  return tokenService.refreshAuth(refreshToken);
};

/**
 * Reset a user's password using a valid reset password token.
 * @param {string} resetPasswordToken - The reset token.
 * @param {string} newPassword - The new password.
 * @returns {Promise<void>}
 * @throws {ApiError} - If the reset token is invalid or expired.
 */
const resetPassword = async (resetPasswordToken, newPassword) => {
  if (!resetPasswordToken || !newPassword) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Invalid input for password reset');
  }
  await tokenService.resetPassword(resetPasswordToken, newPassword);
};

/**
 * Verify a user's email using a valid verification token.
 * @param {string} verifyEmailToken - The email verification token.
 * @returns {Promise<void>}
 * @throws {ApiError} - If the verification token is invalid or expired.
 */
const verifyEmail = async (verifyEmailToken) => {
  if (!verifyEmailToken) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Verification token is required');
  }
  await tokenService.verifyEmail(verifyEmailToken);
};

module.exports = {
  loginUserWithEmailAndPassword,
  logout,
  refreshAuth,
  resetPassword,
  verifyEmail,
};
