const jwt = require('jsonwebtoken');
const moment = require('moment');
const httpStatus = require('http-status');
const { Token, User } = require('../models');
const config = require('../config/config');
const ApiError = require('../utils/ApiError');
const { tokenTypes } = require('../config/tokens');
const { JWT_SECRET } = process.env;

// Function to generate a JWT token
const generateToken = (userId, expires, type, secret = config.jwt.secret) => {
  const payload = { userId, iat: moment().unix(), exp: expires.unix(), type };
  return jwt.sign(payload, secret);
};

// Function to generate authentication tokens (access and refresh tokens)
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


module.exports = {
  generateAuthTokens,
  invalidateToken,
};
