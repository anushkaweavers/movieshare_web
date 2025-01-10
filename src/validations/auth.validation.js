const Joi = require('joi');

const register = {
  body: Joi.object({
    firstName: Joi.string().required(),
    lastName: Joi.string().required(),
    username: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
    termsAccepted: Joi.boolean().required(),
  }),
};

const login = {
  body: Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
  }),
};

const logout = {
  body: Joi.object({
    refreshToken: Joi.string().required(),
  }),
};

const refreshTokens = {
  body: Joi.object({
    refreshToken: Joi.string().required(),
  }),
};

const forgotPassword = {
  body: Joi.object({
    email: Joi.string().email().required(),
  }),
};

const resetPassword = {
  body: Joi.object({
    password: Joi.string().min(6).required(),
  }),
};

const verifyEmail = {
  query: Joi.object({
    token: Joi.string().required(),
  }),
};

module.exports = {
  register,
  login,
  logout,
  refreshTokens,
  forgotPassword,
  resetPassword,
  verifyEmail,
};
