const mongoose = require('mongoose');

const postSchema = new mongoose.Schema(
  {
    movieTitle: { type: String, required: true },
    title: { type: String, required: true },
    content: { type: String, required: true },
    rating: { type: Number, required: true, min: 0, max: 10 },
    tags: { type: [String], default: [] },
    mediaFile: { type: String }, // Store file path (not URL)
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  },
  { timestamps: true }
);

const Post = mongoose.model('Post', postSchema);
module.exports = Post;
