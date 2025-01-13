const mongoose = require('mongoose');

const savedMovieSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    movieId: { type: String, required: true },
    title: { type: String, required: true },
    posterPath: { type: String },
    releaseDate: { type: Date },
    genre: { type: [String] },
    overview: { type: String },
  },
  { timestamps: true }
);

module.exports = mongoose.model('SavedMovie', savedMovieSchema);
