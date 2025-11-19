const express = require('express');
const router = express.Router();
const upload = require('../middleware/upload.middleware');
const { authMiddleware } = require('../middleware/auth.middleware');
const path = require('path');

// Upload single image
router.post('/image', authMiddleware, upload.single('image'), (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'No file uploaded' });
    }

    const imageUrl = `/uploads/images/${req.file.filename}`;
    
    res.json({
      message: 'Image uploaded successfully',
      url: imageUrl,
      filename: req.file.filename,
      size: req.file.size
    });
  } catch (error) {
    console.error('Upload error:', error);
    res.status(500).json({ message: 'Failed to upload image', error: error.message });
  }
});

// Upload multiple images
router.post('/images', authMiddleware, upload.array('images', 10), (req, res) => {
  try {
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ message: 'No files uploaded' });
    }

    const imageUrls = req.files.map(file => ({
      url: `/uploads/images/${file.filename}`,
      filename: file.filename,
      size: file.size
    }));
    
    res.json({
      message: 'Images uploaded successfully',
      images: imageUrls
    });
  } catch (error) {
    console.error('Upload error:', error);
    res.status(500).json({ message: 'Failed to upload images', error: error.message });
  }
});

// Delete image
router.delete('/image/:filename', authMiddleware, (req, res) => {
  try {
    const fs = require('fs');
    const filePath = path.join(__dirname, '../uploads/images', req.params.filename);
    
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
      res.json({ message: 'Image deleted successfully' });
    } else {
      res.status(404).json({ message: 'Image not found' });
    }
  } catch (error) {
    console.error('Delete error:', error);
    res.status(500).json({ message: 'Failed to delete image', error: error.message });
  }
});

module.exports = router;
