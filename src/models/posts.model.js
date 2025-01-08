const mongoose = require('mongoose');

const postSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    movieId: { type: String, required: true },
    content: { type: String },
    media: { type: [String] },
    tags: { type: [String] },
    rating: { type: Number, min: 1, max: 10 },
    generalScore: { type: Number, min: 0, max: 10 },
    plotScore: { type: Number, min: 0, max: 10 },
    storyScore: { type: Number, min: 0, max: 10 },
    characterScore: { type: Number, min: 0, max: 10 },
    cinematographyScore: { type: Number, min: 0, max: 10 },
    rateScore: { type: Number, min: 0, max: 10 },
    comments: [{ userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, comment: String }],
    likes: { type: [mongoose.Schema.Types.ObjectId], ref: 'User', default: [] },
    shares: { type: [mongoose.Schema.Types.ObjectId], ref: 'User', default: [] },
    filters: { type: Object },
    mediaType: { type: String },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Post', postSchema);
