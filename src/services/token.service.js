const jwt = require('jsonwebtoken');
const moment = require('moment');
const httpStatus = require('http-status');
const { Token, User } = require('../models');
const config = require('../config/config');
const ApiError = require('../utils/ApiError');
const { tokenTypes } = require('../config/tokens');
const { JWT_SECRET } = process.env;


const generateToken = (userId, expires, type, secret = config.jwt.secret) => {
  const payload = { userId, type, iat: moment().unix(), exp: expires.unix() };
  return jwt.sign(payload, secret);
};


const generateAuthTokens = async (user) => {
  const accessExpires = moment().add(config.jwt.accessExpirationMinutes, 'minutes');
  const accessToken = generateToken(user.id, accessExpires, tokenTypes.ACCESS);

  const refreshExpires = moment().add(config.jwt.refreshExpirationDays, 'days');
  const refreshToken = generateToken(user.id, refreshExpires, tokenTypes.REFRESH);

  // Save the refresh token to the database
  await Token.create({ token: refreshToken, user: user.id, type: tokenTypes.REFRESH, expires: refreshExpires.toDate() });

  return { accessToken, refreshToken };
};
const invalidateToken = async (token) => {
  try {
    // Atomically check and update the token status
    const result = await Token.findOneAndUpdate(
      { token, invalidated: { $ne: true } }, // Ensure it's not already invalidated
      { $set: { invalidated: true, expires: moment().toDate() } }, // Set the invalidated flag
      { new: true, upsert: false } // Ensure it returns the updated document
    );

    // If no result is found, it means the token was already invalidated
    if (!result) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'Token is already invalidated');
    }

    return true;
  } catch (err) {
    console.error('Error invalidating token:', err);
    throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, 'Error invalidating token');
  }
};

const generateResetPasswordToken = async (user) => {
  const expires = moment().add(1, 'minute'); // 1-minute expiration
  const resetPasswordToken = generateToken(user.id, expires, tokenTypes.RESET_PASSWORD);

  await Token.create({
    token: resetPasswordToken,
    user: user.id,
    type: tokenTypes.RESET_PASSWORD,
    expires: expires.toDate(),
  });

  return resetPasswordToken;
};

/**
 * Verify and process a reset password token.
 */
const verifyResetPasswordToken = async (token) => {
  if (!token) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Token must be provided');
  }
  try {
    const payload = jwt.verify(token, config.jwt.secret);
    if (payload.type !== 'resetPassword') {
      throw new ApiError(httpStatus.UNAUTHORIZED, 'Invalid token type');
    }
    return payload;
  } catch (error) {
    console.error('Token verification failed:', error);
    throw new ApiError(httpStatus.UNAUTHORIZED, 'Invalid reset password token');
  }
};

module.exports = {
  generateResetPasswordToken,
  generateAuthTokens,
  invalidateToken,
  verifyResetPasswordToken
};
