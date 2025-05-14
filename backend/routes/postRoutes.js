const express = require('express');
const router = express.Router();
const {
  createPost,
  getAllPosts,
  getPostById,
  updatePost,
  deletePost } = require('../controllers/postController');

const  protect = require('../middlewares/authMiddleware');
const admin = require('../middlewares/authMiddleware');
const verifyToken = require('../middlewares/verify');

// Public: View posts
router.get('/', getAllPosts);
router.get('/:id', getPostById);

// Admin only: Create, update, delete

router.post('/', protect,verifyToken, admin, createPost);
router.put('/:id', protect,verifyToken, admin, updatePost);
router.delete('/:id',verifyToken, protect, admin, deletePost);

module.exports = router;
