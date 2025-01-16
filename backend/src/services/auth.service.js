const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user.model');
const ApiError = require('../utils/ApiError');
const { tokenTypes } = require('../config/tokens');
const config = require('../config/config');
const httpStatus = require('http-status');

// Log in user
const loginUserWithEmailAndPassword = async (email, password) => {
  const user = await User.findOne({ email });
  if (!user || !(await user.isPasswordMatch(password))) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'Incorrect email or password');
  }
  return user;
};
const resetPassword = async (userId, newPassword) => {
  try {
    const user = await User.findById(userId);
    if (!user) {
      throw new Error('User not found');
    }

    // Assign the plain password directly; it will be hashed by the pre-save hook
    user.passwordHash = newPassword;
    console.log('Plain password assigned for reset:', newPassword);

    await user.save();
    console.log('Password successfully reset and saved for user:', user.email);
    return true;
  } catch (error) {
    console.error('Error resetting password:', error);
    throw new Error('Failed to reset password');
  }
};


// Verify reset password token
const verifyResetPasswordToken = async (token) => {
  try {
    const payload = jwt.verify(token, config.jwt.secret);
    if (payload.type !== tokenTypes.RESET_PASSWORD) {
      throw new ApiError(httpStatus.UNAUTHORIZED, 'Invalid token type');
    }
    return payload;
  } catch (error) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'Invalid or expired token');
  }
};

module.exports = {
  loginUserWithEmailAndPassword,
  resetPassword,
  verifyResetPasswordToken,
};
