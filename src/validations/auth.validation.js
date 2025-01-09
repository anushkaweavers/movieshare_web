const { body } = require('express-validator');

const registerValidationRules = [
  body('firstName').notEmpty().withMessage('First name is required'),
  body('lastName').notEmpty().withMessage('Last name is required'),
  body('username').notEmpty().withMessage('Username is required'),
  body('email').isEmail().withMessage('A valid email is required'),
  body('passwordHash')
    .isLength({ min: 6 })
    .withMessage('Password must be at least 6 characters long')
    .matches(/\d/)
    .withMessage('Password must contain at least one number')
    .matches(/[a-zA-Z]/)
    .withMessage('Password must contain at least one letter'),
  body('termsAccepted')
    .isBoolean()
    .withMessage('Terms must be accepted')
    .custom((value) => value === true)
    .withMessage('Terms must be true'),
];

module.exports = {
  registerValidationRules,
};
