const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const blogController = require('../controllers/blog.controller');
const { authMiddleware, adminOnly } = require('../middleware/auth.middleware');

// Public routes
router.get('/', blogController.getAllPosts);
router.get('/categories', blogController.getCategories);
router.get('/slug/:slug', blogController.getPostBySlug);
router.get('/:id', blogController.getPost);

// Protected routes (Admin only)
router.post(
  '/',
  [authMiddleware, adminOnly],
  [
    body('title').notEmpty().withMessage('Title is required'),
    body('content').notEmpty().withMessage('Content is required'),
  ],
  blogController.createPost
);

router.put(
  '/:id',
  [authMiddleware, adminOnly],
  blogController.updatePost
);

router.delete(
  '/:id',
  [authMiddleware, adminOnly],
  blogController.deletePost
);

module.exports = router;
