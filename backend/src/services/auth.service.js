const httpStatus = require('http-status');
const tokenService = require('./token.service');
const ApiError = require('../utils/ApiError');
const { tokenTypes } = require('../config/tokens');
const jwt = require('jsonwebtoken');
const config = require('../config/config');
const bcrypt = require('bcryptjs');  
const User = require('../models/user.model');  

/**
 * Log in a user with email and password.
 * @param {string} email - User's email.
 * @param {string} password - User's password.
 * @returns {Promise<Object>} - The logged-in user object.
 * @throws {ApiError} - If email or password is incorrect.
 */
const loginUserWithEmailAndPassword = async (email, password) => {
  const user = await User.findOne({ email });
  if (!user) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'Incorrect email or password');
  }
  const match = await bcrypt.compare(password, user.passwordHash);
  if (!match) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'Incorrect email or password');
    //throw new ApiError(402, "Incorrect email or password"); 
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

const verifyResetPasswordToken = async (token) => {
  if (!token) {
    throw new ApiError(httpStatus.BAD_REQUEST, "Token must be provided");
  }

  try {
    const payload = jwt.verify(token, config.jwt.secret);
    if (payload.type !== tokenTypes.RESET_PASSWORD) {
      throw new ApiError(httpStatus.UNAUTHORIZED, "Invalid token type");
    }
    return payload; // Return payload for userId extraction
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      throw new ApiError(httpStatus.UNAUTHORIZED, "Reset password token has expired");
    }
    throw new ApiError(httpStatus.UNAUTHORIZED, "Invalid reset password token");
  }
};

const resetPassword = async (userId, hashedPassword) => {
  const user = await User.findById(userId);
  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, "User not found");
  }

  user.passwordHash = hashedPassword; // Update passwordHash
  await user.save();
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
  verifyResetPasswordToken
};
/* */