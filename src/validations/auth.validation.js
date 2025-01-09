const { body } = require('express-validator');

// Registration Validation Rules
const registerValidationRules = [
  body('firstName').notEmpty().withMessage('First name is required'),
  body('lastName').notEmpty().withMessage('Last name is required'),
  body('username').notEmpty().withMessage('Username is required'),
  body('email').isEmail().withMessage('A valid email is required'),
  body('password')
    .isLength({ min: 6 })
    .withMessage('Password must be at least 6 characters long')
    .matches(/\d/)
    .withMessage('Password must contain at least one number')
    .matches(/[a-zA-Z]/)
    .withMessage('Password must contain at least one letter'),
  body('bio').notEmpty().withMessage('Bio is required'),
  body('birthday')
    .notEmpty()
    .withMessage('Birthday is required')
    .isDate()
    .withMessage('A valid date is required for the birthday'),
  body('gender')
    .notEmpty()
    .withMessage('Gender is required')
    .isIn(['Male', 'Female', 'Other'])
    .withMessage('Gender must be Male, Female, or Other'),
  body('termsAccepted')
    .isBoolean()
    .withMessage('Terms must be accepted')
    .custom((value) => value === true)
    .withMessage('You must accept the terms and conditions'),
];

// Login Validation Rules
const loginValidationRules = [
  body('email').isEmail().withMessage('A valid email is required'),
  body('password').notEmpty().withMessage('Password is required'), // Validate `password`, not `passwordHash`
];

// Forgot Password Validation Rules
const forgotPasswordValidationRules = [
  body('email').isEmail().withMessage('A valid email is required'),
];

// Reset Password Validation Rules
const resetPasswordValidationRules = [
  body('newPassword')
    .isLength({ min: 6 })
    .withMessage('Password must be at least 6 characters long')
    .matches(/\d/)
    .withMessage('Password must contain at least one number')
    .matches(/[a-zA-Z]/)
    .withMessage('Password must contain at least one letter'),
];

module.exports = {
  registerValidationRules,
  loginValidationRules,
  forgotPasswordValidationRules,
  resetPasswordValidationRules,
};
