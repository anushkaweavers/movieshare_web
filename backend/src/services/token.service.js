const jwt = require('jsonwebtoken');
const moment = require('moment');
const httpStatus = require('http-status');
const { Token, User } = require('../models');
const config = require('../config/config');
const ApiError = require('../utils/ApiError');
const { tokenTypes } = require('../config/tokens');
const { JWT_SECRET } = process.env;

// Generate a token with expiration and type
const generateToken = (userId, expires, type, secret = config.jwt.secret) => {
  const payload = {
    userId,
    type,
    iat: moment().unix(),
    exp: expires.unix(), // expiration time in seconds
  };
  return jwt.sign(payload, secret);
};

// Generate access and refresh tokens
const generateAuthTokens = async (user) => {
  const accessExpires = moment().add(config.jwt.accessExpirationMinutes, 'minutes');
  const accessToken = generateToken(user.id, accessExpires, tokenTypes.ACCESS);

  const refreshExpires = moment().add(config.jwt.refreshExpirationDays, 'days');
  const refreshToken = generateToken(user.id, refreshExpires, tokenTypes.REFRESH);

  // Save the refresh token to the database
  await Token.create({
    token: refreshToken,
    user: user.id,
    type: tokenTypes.REFRESH,
    expires: refreshExpires.toDate(),
  });

  return { accessToken, refreshToken };
};

// Invalidate a token in the database
const invalidateToken = async (token) => {
  try {
    // Atomically check and update the token status
    const result = await Token.findOneAndUpdate(
      { token, invalidated: { $ne: true } }, // Ensure it's not already invalidated
      { $set: { invalidated: true, expires: moment().toDate() } }, // Set invalidated flag and update expiration
      { new: true, upsert: false } // Ensure it returns the updated document
    );

    if (!result) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'Token is already invalidated');
    }

    return true;
  } catch (err) {
    console.error('Error invalidating token:', err);
    throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, 'Error invalidating token');
  }
};

// Generate reset password token and save it to the database
const generateResetPasswordToken = async (user) => {
  const expires = moment().add(1, 'hour'); // Set token to expire in 1 hour
  const resetPasswordToken = generateToken(user.id, expires, tokenTypes.RESET_PASSWORD);

  // Check if the reset password token already exists in the database
  const existingToken = await Token.findOne({ user: user.id, type: tokenTypes.RESET_PASSWORD, invalidated: { $ne: true } });
  if (existingToken) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'A reset password token already exists for this user');
  }

  // Save the reset password token to the database
  await Token.create({
    token: resetPasswordToken,
    user: user.id,
    type: tokenTypes.RESET_PASSWORD,
    expires: expires.toDate(),
  });

  return resetPasswordToken;
};

const verifyResetPasswordToken = async (token) => {
  if (!token) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Token must be provided');
  }
  try {
    const payload = jwt.verify(token, config.jwt.secret);

    console.log('Verified reset token payload:', payload);

    if (payload.type !== tokenTypes.RESET_PASSWORD) {
      throw new ApiError(httpStatus.UNAUTHORIZED, 'Invalid token type');
    }
    return payload;
  } catch (error) {
    console.error('Error verifying reset token:', error);
    if (error.name === 'TokenExpiredError') {
      throw new ApiError(httpStatus.UNAUTHORIZED, 'Reset password token has expired');
    }
    throw new ApiError(httpStatus.UNAUTHORIZED, 'Invalid reset password token');
  }
};

module.exports = {
  generateResetPasswordToken,
  generateAuthTokens,
  invalidateToken,
  verifyResetPasswordToken,
};
