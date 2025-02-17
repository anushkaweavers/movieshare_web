const Post = require('../models/post.model');

// Get all posts (sorted by latest)
exports.getAllPosts = async () => {
  return await Post.find().sort({ createdAt: -1 });
};

// Create a new post
exports.createPost = async (postData) => {
  const newPost = new Post(postData);
  return await newPost.save();
};

// Delete a post by ID
exports.deletePost = async (postId) => {
  return await Post.findByIdAndDelete(postId);
};
