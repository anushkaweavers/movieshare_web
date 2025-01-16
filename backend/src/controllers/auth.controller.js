const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const { authService, userService, emailService, tokenService } = require('../services');
const ApiError = require('../utils/ApiError');
const User = require('../models/user.model'); // Adjust the path as needed
const bcrypt = require('bcryptjs');
const config = require('../config/config'); // Adjust the path as needed

// Register a new user
const register = catchAsync(async (req, res) => {
  const user = await userService.createUser({
    ...req.body,
    passwordHash: req.body.password, // Pass plain password; will be hashed in `pre('save')`
  });
  const tokens = await tokenService.generateAuthTokens(user);
  res.status(httpStatus.CREATED).send({ user, tokens });
});

// Login user
const login = catchAsync(async (req, res) => {
  const { email, password } = req.body;
  const user = await authService.loginUserWithEmailAndPassword(email, password);
  const tokens = await tokenService.generateAuthTokens(user);
  res.send({ user, tokens });
});

// Logout user
const logout = async (req, res) => {
  try {
    const token = req.headers.authorization && req.headers.authorization.split(' ')[1];
    if (!token) {
      return res.status(400).json({ message: 'Token is required' });
    }

    const result = await tokenService.invalidateToken(token);
    if (!result) {
      return res.status(400).json({ message: 'Token invalidation failed' });
    }

    res.status(200).json({ message: 'Logged out successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Error logging out', error: err.message });
  }
};

// Refresh tokens
const refreshTokens = catchAsync(async (req, res) => {
  const tokens = await authService.refreshAuth(req.body.refreshToken);
  res.send(tokens);
});

const forgotPassword = catchAsync(async (req, res) => {
  const { email } = req.body;

  // Fetch the user by email
  const user = await userService.getUserByEmail(email);
  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
  }

  // Generate a reset password token
  const resetPasswordToken = await tokenService.generateResetPasswordToken(user);
  const resetPasswordLink = `${config.appUrl}/reset-password?token=${resetPasswordToken}`;

  try {
    // Send the reset password email
    await emailService.sendResetPasswordEmail(email, resetPasswordLink);

    res.status(httpStatus.OK).json({
      message: 'Password reset email sent successfully',
    });
  } catch (error) {
    throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, 'Failed to send password reset email');
  }
});

const resetPassword = catchAsync(async (req, res) => {
  const { token } = req.query;  // Token should be passed in the URL query
  if (!token) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Token must be provided');
  }

  const { newPassword, confirmPassword } = req.body;
  if (!newPassword || !confirmPassword) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Both password and confirm password are required');
  }

  if (newPassword !== confirmPassword) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Passwords do not match');
  }

  try {
    // Verify the reset password token
    const { userId } = await authService.verifyResetPasswordToken(token);

    // Find the user
    const user = await userService.getUserById(userId);
    if (!user) {
      throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
    }

    // Update the password hash
    user.passwordHash = newPassword;  // This will trigger 'pre-save' hook to hash the password
    await user.save();

    // Invalidate the reset token (optional)
    await tokenService.invalidateToken(token);

    res.status(httpStatus.OK).json({ message: 'Password reset successful' });
  } catch (error) {
    res.status(error.statusCode || httpStatus.INTERNAL_SERVER_ERROR).send({
      code: error.statusCode || 500,
      message: error.message || 'Failed to reset password',
    });
  }
});

// Send verification email
const sendVerificationEmail = catchAsync(async (req, res) => {
  const verifyEmailToken = await tokenService.generateVerifyEmailToken(req.user);
  await emailService.sendVerificationEmail(req.user.email, verifyEmailToken);
  res.status(httpStatus.NO_CONTENT).send();
});

// Verify email
const verifyEmail = catchAsync(async (req, res) => {
  await authService.verifyEmail(req.query.token);
  res.status(httpStatus.NO_CONTENT).send();
});

module.exports = {
  register,
  login,
  logout,
  refreshTokens,
  forgotPassword,
  resetPassword,
  sendVerificationEmail,
  verifyEmail,
};