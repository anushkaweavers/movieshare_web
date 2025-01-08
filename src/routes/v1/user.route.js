const express = require('express');
const {
  registerUser,
  loginUser,
  getUserProfile,
  updateUserProfile,
  requestPasswordReset,
  resetPassword,
  updatePassword,
} = require('../controllers/user.controller');
const { validateRegister, validateLogin, validateResetRequest, validateUpdatePassword } = require('../middlewares/validation.middleware');
const { authenticateToken } = require('../middlewares/auth.middleware');

const router = express.Router();

// Auth Routes
router.post('/register', validateRegister, registerUser);
router.post('/login', validateLogin, loginUser);

// Password Management
router.post('/reset-password', validateResetRequest, requestPasswordReset);
router.post('/update-password', validateUpdatePassword, resetPassword);

// Profile Management
router.get('/me', authenticateToken, getUserProfile);
router.put('/update', authenticateToken, updateUserProfile);

module.exports = router;
