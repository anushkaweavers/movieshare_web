const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');

// Define the schema first
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
      minlength: 8,
      validate(value) {
        if (!value.match(/\d/) || !value.match(/[a-zA-Z]/)) {
          throw new Error('Password must contain at least one letter and one number');
        }
      },
      private: true, // used by the toJSON plugin
    },
    profilePicture: {
      type: String,
      trim: true,
    },
    bio: {
      type: String,
      trim: true,
    },
    birthday: {
      type: Date,
    },
    gender: {
      type: String,
      enum: ['Male', 'Female', 'Other'],
    },
    termsAccepted: {
      type: Boolean,
      required: true,
    },
    passwordResetToken: {
      type: String,
    },
    passwordResetExpires: {
      type: Date,
    },
    isEmailVerified: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true, // Adds createdAt and updatedAt timestamps
  }
);

// Apply the toJSON transformation
userSchema.set('toJSON', {
  transform: function (doc, ret, options) {
    // Remove the passwordHash field from the JSON output
    delete ret.passwordHash;
    return ret;
  },
});

// Add pagination plugin (uncomment if needed)
// userSchema.plugin(paginate);  

/**
 * Check if email is taken
 * @param {string} email - The user's email
 * @param {ObjectId} [excludeUserId] - The id of the user to be excluded
 * @returns {Promise<boolean>}
 */
userSchema.statics.isEmailTaken = async function (email, excludeUserId) {
  const user = await this.findOne({
    email,
    _id: { $ne: excludeUserId },
  });
  return !!user;
};

/**
 * Check if username is taken
 * @param {string} username - The user's username
 * @param {ObjectId} [excludeUserId] - The id of the user to be excluded
 * @returns {Promise<boolean>}
 */
userSchema.statics.isUsernameTaken = async function (username, excludeUserId) {
  const user = await this.findOne({
    username,
    _id: { $ne: excludeUserId },
  });
  return !!user;
};

/**
 * Check if password matches the user's passwordHash
 * @param {string} password
 * @returns {Promise<boolean>}
 */
userSchema.methods.isPasswordMatch = async function (password) {
  const user = this;
  return bcrypt.compare(password, user.passwordHash);
};

userSchema.pre('save', async function (next) {
  const user = this;
  if (user.isModified('passwordHash')) {
    user.passwordHash = await bcrypt.hash(user.passwordHash, 8);
  }
  next();
});

/**
 * @typedef User
 */
const User = mongoose.model('User', userSchema);

module.exports = User;
