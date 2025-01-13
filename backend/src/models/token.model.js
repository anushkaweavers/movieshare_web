const mongoose = require('mongoose');
const { toJSON } = require('./plugins');
const { tokenTypes } = require('../config/tokens');

const tokenSchema = mongoose.Schema(
  {
    token: {
      type: String,
      required: true,
      index: true,
    },
    user: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: 'User',
      required: true,
    },
    type: {
      type: String,
      enum: [tokenTypes.REFRESH, tokenTypes.RESET_PASSWORD, tokenTypes.VERIFY_EMAIL],
      required: true,
    },
    expires: {
      type: Date,
      required: true,
    },
    blacklisted: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

// add plugin that converts mongoose to json
tokenSchema.plugin(toJSON);

/**
 * Invalidate the token by marking it as blacklisted
 * @returns {Promise<void>}
 */
tokenSchema.methods.invalidate = async function() {
  if (this.blacklisted) {
    // If the token is already blacklisted, no need to do anything
    return;
  }

  this.blacklisted = true;
  await this.save();
};
const Token = mongoose.model('Token', tokenSchema);

module.exports = Token;
