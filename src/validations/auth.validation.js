const { body } = require('express-validator');

/**
 * Validation rules for user registration.
 */
const registerValidationRules = [
  body('firstName').notEmpty().withMessage('First name is required'),
  body('lastName').notEmpty().withMessage('Last name is required'),
  body('username').notEmpty().withMessage('Username is required'),
  body('email').isEmail().withMessage('Valid email is required'),
  body('passwordHash')
    .isLength({ min: 6 })
    .withMessage('Password must be at least 6 characters long')
    .matches(/\d/)
    .withMessage('Password must contain at least one number')
    .matches(/[a-zA-Z]/)
    .withMessage('Password must contain at least one letter'),
  body('termsAccepted').isBoolean().withMessage('Terms must be accepted'),
];

module.exports = {
  registerValidationRules,
};
