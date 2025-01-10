const jwt = require('jsonwebtoken');
const moment = require('moment');
const httpStatus = require('http-status');
const { Token, User } = require('../models');
const config = require('../config/config');
const ApiError = require('../utils/ApiError');
const { tokenTypes } = require('../config/tokens');


const generateToken = (userId, expires, type, secret = config.jwt.secret) => {
  const payload = { userId, iat: moment().unix(), exp: expires.unix(), type };
  return jwt.sign(payload, secret);
};

const generateAuthTokens = async (user) => {
  const accessExpires = moment().add(config.jwt.accessExpirationMinutes, 'minutes');
  const accessToken = generateToken(user.id, accessExpires, tokenTypes.ACCESS);

  const refreshExpires = moment().add(config.jwt.refreshExpirationDays, 'days');
  const refreshToken = generateToken(user.id, refreshExpires, tokenTypes.REFRESH);

  await Token.create({ token: refreshToken, user: user.id, type: tokenTypes.REFRESH, expires: refreshExpires.toDate() });

  return { accessToken, refreshToken };
};

module.exports = {
  generateAuthTokens,
};