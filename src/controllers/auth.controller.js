const userService = require('../services/user.service');
const { validationResult } = require('express-validator');

const register = async (req, res) => {
  try {
    // Validate request body using express-validator
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    // Extract data from the request body
    const { firstName, lastName, username, email, passwordHash, termsAccepted } = req.body;

    // Call userService to register the user
    const newUser = await userService.registerUser({
      firstName,
      lastName,
      username,
      email,
      passwordHash,
      termsAccepted,
    });

    // Respond with the newly created user (excluding sensitive fields like passwordHash)
    res.status(201).json({
      message: 'User registered successfully',
      user: {
        id: newUser.id,
        firstName: newUser.firstName,
        lastName: newUser.lastName,
        username: newUser.username,
        email: newUser.email,
      },
    });
  } catch (error) {
    console.error('Error in register:', error.message);
    res.status(500).json({ message: 'Internal server error', error: error.message });
  }
};

module.exports = {
  register,
};
