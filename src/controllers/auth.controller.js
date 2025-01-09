const User = require('../models/user.model');

/**
 * Controller for user registration.
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 */
const register = async (req, res) => {
  try {
    const { firstName, lastName, username, email, passwordHash, termsAccepted } = req.body;

    // Check if email or username already exists
    const isEmailTaken = await User.isEmailTaken(email);
    const isUsernameTaken = await User.isUsernameTaken(username);
    if (isEmailTaken) {
      return res.status(400).json({ message: 'Email already in use' });
    }
    if (isUsernameTaken) {
      return res.status(400).json({ message: 'Username already in use' });
    }

    // Create new user
    const user = new User({
      firstName,
      lastName,
      username,
      email,
      passwordHash,
      termsAccepted,
    });

    await user.save();

    res.status(201).json({
      message: 'User registered successfully',
      user: {
        id: user.id,
        email: user.email,
        username: user.username,
      },
    });
  } catch (error) {
    res.status(500).json({ message: 'Internal server error', error: error.message });
  }
};

module.exports = {
  register,
};
