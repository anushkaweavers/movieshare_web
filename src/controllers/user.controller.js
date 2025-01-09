// src/controllers/user.controller.js
const userService = require('../services/user.service');
const { validationResult } = require('express-validator');

// Ensure that each function is defined and exported
exports.registerUser = async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

        const user = await userService.registerUser(req.body);
        res.status(201).json(user);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        const token = await userService.loginUser(email, password);
        res.status(200).json({ token });
    } catch (error) {
        res.status(401).json({ message: error.message });
    }
};

exports.getUserProfile = async (req, res) => {
    try {
        const user = await userService.getUserById(req.user.id);
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.updateUserProfile = async (req, res) => {
    try {
        const user = await userService.updateUser(req.user.id, req.body);
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.requestPasswordReset = async (req, res) => {
    try {
        const token = await userService.requestPasswordReset(req.body.email);
        res.status(200).json({ message: 'Password reset link sent.', token });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.resetPassword = async (req, res) => {
    try {
        await userService.resetPassword(req.params.token, req.body.newPassword);
        res.status(200).json({ message: 'Password reset successful.' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
