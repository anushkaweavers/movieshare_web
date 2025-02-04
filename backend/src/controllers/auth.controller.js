const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const { authService, userService, emailService, tokenService } = require('../services');
const ApiError = require('../utils/ApiError');
const User = require('../models/user.model'); // Adjust the path as needed
const bcrypt = require('bcryptjs');
const saltRounds = 10; // This is a typical value, you can increase it for higher security

const register = catchAsync(async (req, res) => {
  try {
    const user = await userService.createUser({
      ...req.body,
      passwordHash: req.body.password,
    });
    const tokens = await tokenService.generateAuthTokens(user);
    res.status(httpStatus.CREATED).send({ user, tokens });
  } catch (error) {
    if (error.code === 11000) {
      const duplicateKey = Object.keys(error.keyValue)[0];
      const errorMessage = `${duplicateKey.charAt(0).toUpperCase() + duplicateKey.slice(1)} already exists.`;
      res.status(httpStatus.BAD_REQUEST).json({ errors: { [duplicateKey]: errorMessage } });
    } else {
      res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ message: 'An unexpected error occurred.' });
    }
  }
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

// Forgot password
const forgotPassword = catchAsync(async (req, res) => {
  const { email } = req.body;

  const user = await userService.getUserByEmail(email);
  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
  }

  const resetPasswordToken = await tokenService.generateResetPasswordToken(user);
  try {
    await emailService.sendResetPasswordEmail(email, resetPasswordToken);
    res.status(httpStatus.OK).json({
      message: 'Password reset email sent successfully',
      debug: { email, resetPasswordToken }, 
    });
  } catch (error) {
    throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, 'Failed to send password reset email');
  }
});

const resetPassword = catchAsync(async (req, res) => {
  const { token, newPassword, confirmPassword } = req.body;  // Token is now in the body

  if (!token) {
    throw new ApiError(httpStatus.BAD_REQUEST, "Token is required");
  }

  if (!newPassword || !confirmPassword) {
    throw new ApiError(httpStatus.BAD_REQUEST, "Both passwords are required");
  }

  if (newPassword !== confirmPassword) {
    throw new ApiError(httpStatus.BAD_REQUEST, "Passwords do not match");
  }

  // Your logic to handle password reset
  const { userId } = await authService.verifyResetPasswordToken(token);
  const hashedPassword = await bcrypt.hash(newPassword, saltRounds);
  await authService.resetPassword(userId, hashedPassword);

  res.status(httpStatus.OK).json({ message: "Password reset successful" });
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