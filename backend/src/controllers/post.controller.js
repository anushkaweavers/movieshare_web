const Post = require("../models/post.model");
const { uploadToCloudinary } = require("../services/post.service"); // Service to handle Cloudinary uploads

// Get all posts
exports.getAllPosts = async (req, res) => {
  try {
    const posts = await Post.find().sort({ createdAt: -1 });
    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json({ error: "Error fetching posts" });
  }
};

// Create a post
exports.createPost = async (req, res) => {
  try {
    console.log("Request Body:", req.body); // Debugging Log

    const { title, content, tags, userId, mediaFile } = req.body;
    let mediaFileUrl = mediaFile || null; // Use mediaFile directly from frontend

    // Ensure tags is an array
    let parsedTags = [];
    if (tags) {
      try {
        parsedTags = typeof tags === "string" ? JSON.parse(tags) : tags;
      } catch (error) {
        console.error("Error parsing tags:", error);
        return res.status(400).json({ error: "Invalid tags format" });
      }
    }

    const newPost = new Post({
      title,
      content,
      tags: parsedTags,
      mediaFile: mediaFileUrl,
      userId,
    });

    await newPost.save();
    res.status(201).json(newPost);
  } catch (error) {
    console.error("Error creating post:", error);
    res.status(500).json({ error: "Failed to create post" });
  }
};

// Edit post
exports.editPost = async (req, res) => {
  try {
    const { title, content, tags } = req.body;
    let mediaFileUrl = req.body.mediaFile;

    if (req.file) {
      const uploadedMedia = await uploadToCloudinary(req.file.path);
      mediaFileUrl = uploadedMedia.url;
    }

    const updatedPost = await Post.findByIdAndUpdate(
      req.params.postId,
      { 
        title, 
        content, 
        tags: Array.isArray(tags) ? tags : tags ? JSON.parse(tags) : [], // Fix JSON parse error
        mediaFile: mediaFileUrl 
      },
      { new: true }
    );

    if (!updatedPost) return res.status(404).json({ error: "Post not found" });

    res.json(updatedPost);
  } catch (error) {
    console.error("Error updating post:", error);
    res.status(500).json({ error: "Error updating post" });
  }
};

// Delete post
exports.deletePost = async (req, res) => {
  try {
    const deletedPost = await Post.findByIdAndDelete(req.params.postId);
    if (!deletedPost) return res.status(404).json({ error: "Post not found" });

    res.json({ message: "Post deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Error deleting post" });
  }
};
