const bcrypt = require('bcrypt');
const UserModel = require('../models/user.model');

exports.registerUser = async (userData) => {
  const { firstName, lastName, username, email, passwordHash, termsAccepted } = userData;


  const existingUser = await UserModel.findOne({
    $or: [{ email }, { username }],
  });
  if (existingUser) {
    throw new Error('Email or username is already in use');
  }

  const hashedPassword = await bcrypt.hash(passwordHash, 10);

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
