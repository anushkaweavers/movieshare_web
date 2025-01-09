const express = require('express');
const router = express.Router();
const authController = require('../../controllers/auth.controller');
const { registerValidationRules } = require('../../validations/auth.validation');
const validate = require('../../middlewares/validate');

// Route for user registration
router.post('/register', registerValidationRules, validate, authController.register);

module.exports = router;
