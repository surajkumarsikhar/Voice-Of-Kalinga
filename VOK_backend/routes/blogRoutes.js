const express = require('express');
const router = express.Router();
const blogController = require('../controllers/blogController');
const verifyAdmin = require('../middleware/verifyAdmin');

router.post('/', blogController.createBlog);
router.get('/', blogController.getAllApprovedBlogs);
router.get('/unapproved', verifyAdmin, blogController.getUnapprovedBlogs);
router.get('/:id', blogController.getBlogById);
router.patch('/:id/approve', verifyAdmin, blogController.approveBlog);

module.exports = router;