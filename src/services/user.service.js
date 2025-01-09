const bcrypt = require('bcrypt');
const UserModel = require('../models/user.model');

exports.registerUser = async (userData) => {
  const { firstName, lastName, username, email, passwordHash, termsAccepted } = userData;

  // Check if the email or username already exists
  const existingUser = await UserModel.findOne({
    $or: [{ email }, { username }],
  });
  if (existingUser) {
    throw new Error('Email or username is already in use');
  }

  // Hash the password
  const hashedPassword = await bcrypt.hash(passwordHash, 10);

  // Create a new user
  const newUser = await UserModel.create({
    firstName,
    lastName,
    username,
    email,
    passwordHash: hashedPassword,
    termsAccepted,
  });

  return newUser;
};
