const postService = require('../services/post.service');

// Get all posts
exports.getAllPosts = async (req, res) => {
  try {
    const posts = await postService.getAllPosts();
    res.json(posts);
  } catch (error) {
    console.error('Error fetching posts:', error);
    res.status(500).json({ message: 'Error fetching posts', error: error.message });
  }
};

// Create a post (with file upload support)
exports.createPost = async (req, res) => {
  try {
    const { movieTitle, title, content, rating, tags, userId } = req.body;
    let mediaFile = null;

    if (req.file) {
      mediaFile = req.file.path; // Save the file path
    }

    const post = await postService.createPost({
      movieTitle,
      title,
      content,
      rating,
      tags: tags ? JSON.parse(tags) : [],
      mediaFile,
      userId,
    });

    res.status(201).json(post);
  } catch (error) {
    console.error('Error creating post:', error);
    res.status(500).json({ message: 'Error creating post', error: error.message });
  }
};

// Delete a post
exports.deletePost = async (req, res) => {
  try {
    await postService.deletePost(req.params.postId);
    res.status(200).json({ message: 'Post deleted' });
  } catch (error) {
    console.error('Error deleting post:', error);
    res.status(500).json({ message: 'Error deleting post', error: error.message });
  }
};
