const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const validator = require('validator');
const ApiError = require('../utils/ApiError');

/**
 * User Schema
 */
const userSchema = mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      trim: true,
    },
    lastName: {
      type: String,
      required: true,
      trim: true,
    },
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
      validate(value) {
        if (!validator.isEmail(value)) {
          throw new Error('Invalid email');
        }
      },
    },
    passwordHash: {
      type: String,
      required: true,
      trim: true,
    },
    profilePicture: {
      type: String,
      default: null,
    },
    bio: {
      type: String,
      trim: true,
      default: null,
    },
    birthday: {
      type: Date,
      default: null,
    },
    gender: {
      type: String,
      enum: ['Male', 'Female', 'Other'],
      default: 'Other',
    },
    termsAccepted: {
      type: Boolean,
      required: true,
    },
    passwordResetToken: {
      type: String,
      default: null,
    },
    passwordResetExpires: {
      type: Date,
      default: null,
    },
  },
  {
    timestamps: true, // Automatically adds `createdAt` and `updatedAt`
  }
);

/**
 * Static method to check if email is already taken.
 */
userSchema.statics.isEmailTaken = async function (email, excludeUserId) {
  const user = await this.findOne({ email, _id: { $ne: excludeUserId } });
  return !!user;
};

/**
 * Hash the password before saving the user.
 */
userSchema.pre('save', async function (next) {
  if (this.isModified('passwordHash')) {
    this.passwordHash = await bcrypt.hash(this.passwordHash, 8);
  }
  next();
});

/**
 * Compare passwords.
 */
userSchema.methods.isPasswordMatch = async function (password) {
  if (!this.passwordHash) {
    throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, 'Password hash not found');
  }
  console.log('Checking password for user:', this.email);  // Debugging: log email or username
  console.log('Password hash:', this.passwordHash);         // Debugging: log passwordHash
  const isMatch = await bcrypt.compare(password, this.passwordHash);
  console.log('Password match result:', isMatch);            // Debugging: log comparison result
  return isMatch;
};

const User = mongoose.model('User', userSchema);
module.exports = User;
