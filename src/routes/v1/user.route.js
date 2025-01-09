const express = require('express');
const { registerValidationRules } = require('../../validations/auth.validation');
const validate = require('../../middlewares/validate');
const userController = require('../../controllers/user.controller');
const authMiddleware = require('../../middlewares/auth');

const router = express.Router();

// Debugging logs
console.log('userController:', userController);
console.log('registerValidationRules:', registerValidationRules);
console.log('authMiddleware:', authMiddleware);

router.post('/register', validate(registerValidationRules), userController.registerUser);
router.post('/login', userController.loginUser);
router.get('/profile', authMiddleware, userController.getUserProfile);
router.put('/profile', authMiddleware, userController.updateUserProfile);
router.post('/reset-password', userController.requestPasswordReset);
router.post('/reset-password/:token', userController.resetPassword);

module.exports = router;
