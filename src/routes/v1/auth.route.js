const express = require('express');
const router = express.Router();
const authController = require('../../controllers/auth.controller');
const {
  registerValidationRules,
  loginValidationRules,
  forgotPasswordValidationRules,
  resetPasswordValidationRules,
} = require('../../validations/auth.validation');
const validate = require('../../middlewares/validate');

// Route for user registration
router.post('/register', registerValidationRules, validate, authController.register);

// Route for user login
router.post('/login', loginValidationRules, validate, authController.login);

// Route for forgot password
router.post('/forgot-password', forgotPasswordValidationRules, validate, authController.forgotPassword);

// Route for reset password
router.post('/reset-password/:token', resetPasswordValidationRules, validate, authController.resetPassword);

module.exports = router;
