const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const { authService, userService, emailService, tokenService } = require('../services');
const ApiError = require('../utils/ApiError');
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
const logout = catchAsync(async (req, res) => {
  const token = req.headers.authorization && req.headers.authorization.split(' ')[1];
  if (!token) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Token is required');
  }
  await tokenService.invalidateToken(token);
  res.status(httpStatus.OK).json({ message: 'Logged out successfully' });
});

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
  const resetPasswordLink = `${config.appUrl}/reset-password?token=${resetPasswordToken}`;
  await emailService.sendResetPasswordEmail(email, resetPasswordLink);
  res.status(httpStatus.OK).json({ message: 'Password reset email sent successfully' });
});

// Reset password
const resetPassword = catchAsync(async (req, res) => {
  const { token } = req.query;
  const { newPassword, confirmPassword } = req.body;

  if (!token) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Token must be provided');
  }
  if (!newPassword || !confirmPassword) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Both passwords are required');
  }
  if (newPassword !== confirmPassword) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Passwords do not match');
  }

  const { userId } = await authService.verifyResetPasswordToken(token);
  await authService.resetPassword(userId, newPassword);
  res.status(httpStatus.OK).json({ message: 'Password reset successful' });
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
