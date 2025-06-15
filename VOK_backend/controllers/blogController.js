const Blog = require('../models/blog.js');

exports.createBlog = async (req, res) => {
  try {
    const blog = new Blog(req.body);
    await blog.save();
    res.status(201).json(blog);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.getAllApprovedBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find({ approved: true });
    res.json(blogs);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
};

// Get all unapproved blogs (for admin)
exports.getUnapprovedBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find({ approved: false });
    res.json(blogs);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
};

exports.getBlogById = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog || !blog.approved) return res.status(404).json({ error: 'Blog not found' });
    res.json(blog);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
};

exports.approveBlog = async (req, res) => {
  try {
    const blog = await Blog.findByIdAndUpdate(
      req.params.id,
      { approved: true },
      { new: true }
    );
    res.json(blog);
  } catch (err) {
    res.status(500).json({ error: 'Approval failed' });
  }
};
