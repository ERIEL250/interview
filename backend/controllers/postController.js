const Post = require('../models/posts');

// Create a new post
exports.createPost = async (req, res) => {
  try {
    const { post_name } = req.body;

    // Check if post already exists
    const existingPost = await Post.findOne({ post_name });
    if (existingPost) {
      return res.status(400).json({ message: 'Post already exists' });
    }

    const post = new Post({ post_name });
    await post.save();

    res.status(201).json(post);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

// Get all posts
exports.getAllPosts = async (req, res) => {
  try {
    const posts = await Post.find();
    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

// Get a single post by ID
exports.getPostById = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ message: 'Post not found' });
    res.status(200).json(post);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

// Update a post
exports.updatePost = async (req, res) => {
  try {
    const { post_name } = req.body;
    const updatedPost = await Post.findByIdAndUpdate(
      req.params.id,
      { post_name },
      { new: true }
    );
    if (!updatedPost) return res.status(404).json({ message: 'Post not found' });
    res.status(200).json(updatedPost);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

// Delete a post
exports.deletePost = async (req, res) => {
  try {
    const deleted = await Post.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: 'Post not found' });
    res.status(200).json({ message: 'Post deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};
