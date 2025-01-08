const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const { generateResetToken, sendResetEmail } = require('../services/email.service');

// Register User
exports.registerUser = async (req, res) => {
  const { firstName, lastName, username, email, password, gender, birthday, bio } = req.body;

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: 'User already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      firstName,
      lastName,
      username,
      email,
      passwordHash: hashedPassword,
      gender,
      birthday,
      bio,
    });

    await newUser.save();
    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Server error', details: error.message });
  }
};

// Login User
exports.loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ error: 'Invalid email or password' });
    }

    const isMatch = await bcrypt.compare(password, user.passwordHash);
    if (!isMatch) {
      return res.status(400).json({ error: 'Invalid email or password' });
    }

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.status(200).json({ token });
  } catch (error) {
    res.status(500).json({ error: 'Server error', details: error.message });
  }
};

// Get Profile
exports.getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: 'Server error', details: error.message });
  }
};

// Update Profile
exports.updateUserProfile = async (req, res) => {
  const { firstName, lastName, username, bio, gender, birthday } = req.body;

  try {
    const user = await User.findById(req.userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    user.firstName = firstName || user.firstName;
    user.lastName = lastName || user.lastName;
    user.username = username || user.username;
    user.bio = bio || user.bio;
    user.gender = gender || user.gender;
    user.birthday = birthday || user.birthday;

    await user.save();
    res.status(200).json({ message: 'Profile updated successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Server error', details: error.message });
  }
};

// Request Password Reset
exports.requestPasswordReset = async (req, res) => {
  const { email } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    const resetToken = generateResetToken(user._id);
    await sendResetEmail(email, resetToken);

    user.passwordResetToken = resetToken.token;
    user.passwordResetExpires = resetToken.expiresAt;
    await user.save();

    res.status(200).json({ message: 'Password reset email sent' });
  } catch (error) {
    res.status(500).json({ error: 'Server error', details: error.message });
  }
};

// Reset Password
exports.resetPassword = async (req, res) => {
  const { resetToken, password } = req.body;

  try {
    const decoded = jwt.verify(resetToken, process.env.JWT_RESET_SECRET);
    const user = await User.findById(decoded.userId);

    if (!user || user.passwordResetExpires < Date.now()) {
      return res.status(400).json({ error: 'Invalid or expired reset token' });
    }

    user.passwordHash = await bcrypt.hash(password, 10);
    user.passwordResetToken = undefined;
    user.passwordResetExpires = undefined;

    await user.save();
    res.status(200).json({ message: 'Password updated successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Server error', details: error.message });
  }
};
