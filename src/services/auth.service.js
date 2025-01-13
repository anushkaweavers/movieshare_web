const httpStatus = require('http-status');
const userService = require('./user.service');
const tokenService = require('./token.service');
const ApiError = require('../utils/ApiError');
const { tokenTypes } = require('../config/tokens');
const jwt = require('jsonwebtoken');
const config = require('../config/config');


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

  console.log('Checking password for user:', email);
  console.log('Password hash:', user.passwordHash);

  const isPasswordValid = await user.isPasswordMatch(password);

  console.log('Password match result:', isPasswordValid);

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

const resetPassword = async (token, newPassword) => {
  try {
    // Verify the token
    const { userId } = await tokenService.verifyResetPasswordToken(token);

    // Find the user
    const user = await User.findById(userId);
    if (!user) {
      throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
    }

    // Update the password
    user.password = newPassword;
    await user.save();

    // Invalidate the token
    await Token.findOneAndUpdate({ token }, { invalidated: true });
  } catch (error) {
    console.error('Error during resetPassword:', error); // Log the error for debugging
    throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, 'Failed to reset password');
  }
};
const verifyResetPasswordToken = async (token) => {
  if (!token) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Token must be provided');
  }
  try {
    const payload = jwt.verify(token, config.jwt.secret);
    if (payload.type !== tokenTypes.RESET_PASSWORD) { // Ensure token type matches
      throw new ApiError(httpStatus.UNAUTHORIZED, 'Invalid token type');
    }
    return payload; // Return payload for further processing
  } catch (error) {
    console.error('Token verification failed:', error);
    if (error.name === 'TokenExpiredError') {
      throw new ApiError(httpStatus.UNAUTHORIZED, 'Reset password token has expired');
    }
    throw new ApiError(httpStatus.UNAUTHORIZED, 'Invalid reset password token');
  }
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