const mongoose = require('mongoose');

const adminSchema = new mongoose.Schema(
  {
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    passwordHash: { type: String, required: true },
    defaultMovies: { type: [String], default: [] },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Admin', adminSchema);
