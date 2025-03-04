const mongoose = require('mongoose');

const PlaylistSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // Owner of the playlist
  title: { type: String, required: true },
  description: { type: String },
  thumbnail: { type: String }, // Cloudinary URL
  isPrivate: { type: Boolean, default: false },
  allowedUsers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }], 
  movies: [
    {
      movieId: { type: String, required: true }, 
      title: { type: String, required: true },
      poster: { type: String }, 
      addedAt: { type: Date, default: Date.now }
    }
  ],
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Playlist', PlaylistSchema);
