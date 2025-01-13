const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const validator = require('validator');
const ApiError = require('../utils/ApiError');
const saltRounds = 8;
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

userSchema.pre('save', async function (next) {
  if (this.isModified('passwordHash')) {
    console.log('Hashing password:', this.passwordHash); // Debugging
    this.passwordHash = await bcrypt.hash(this.passwordHash, saltRounds);
    console.log('Hashed password:', this.passwordHash);
  }
  next();
});

userSchema.methods.isPasswordMatch = async function (password) {
  console.log('Comparing plain password:', password);
  console.log('With hashed password:', this.passwordHash);
  const result = await bcrypt.compare(password, this.passwordHash);
  console.log('Password comparison result:', result);
  return result;
};

module.exports = mongoose.model('User', userSchema);