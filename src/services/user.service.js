const User = require('../models/user.model');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const generateToken = (userId) => {
    return jwt.sign({ id: userId }, process.env.JWT_SECRET, { expiresIn: '7d' });
};

exports.registerUser = async (userData) => {
    const { firstName, lastName, username, email, password, termsAccepted } = userData;

    if (!firstName || !lastName || !username || !email || !password || !termsAccepted) {
        throw new Error('All required fields must be provided.');
    }

    const isEmailTaken = await User.isEmailTaken(email);
    const isUsernameTaken = await User.isUsernameTaken(username);
    if (isEmailTaken || isUsernameTaken) {
        throw new Error('Email or username is already taken.');
    }

    const hashedPassword = await bcrypt.hash(password, 8);

    const newUser = await User.create({
        firstName,
        lastName,
        username,
        email,
        passwordHash: hashedPassword,
        termsAccepted,
    });

    return newUser.toJSON();
};

exports.loginUser = async (email, password) => {
    const user = await User.findOne({ email });
    if (!user) throw new Error('Invalid email or password.');

    const isPasswordMatch = await user.isPasswordMatch(password);
    if (!isPasswordMatch) throw new Error('Invalid email or password.');

    return generateToken(user._id);
};

exports.getUserById = async (userId) => {
    return User.findById(userId).select('-passwordHash');
};

exports.updateUser = async (userId, updateData) => {
    return User.findByIdAndUpdate(userId, updateData, { new: true, runValidators: true });
};

exports.requestPasswordReset = async (email) => {
    const user = await User.findOne({ email });
    if (!user) throw new Error('User not found.');

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    user.passwordResetToken = token;
    user.passwordResetExpires = Date.now() + 3600000; // 1 hour
    await user.save();
    return token;
};

exports.resetPassword = async (token, newPassword) => {
    const user = await User.findOne({
        passwordResetToken: token,
        passwordResetExpires: { $gt: Date.now() },
    });
    if (!user) throw new Error('Invalid or expired token.');

    user.passwordHash = await bcrypt.hash(newPassword, 8);
    user.passwordResetToken = undefined;
    user.passwordResetExpires = undefined;
    await user.save();
};
