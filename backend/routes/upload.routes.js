const express = require("express");
const router = express.Router();
const upload = require("../middleware/upload.middleware");
const fileUpload = require("../middleware/fileUpload.middleware");
const { authMiddleware } = require("../middleware/auth.middleware");
const path = require("path");

// Upload single image
router.post("/image", authMiddleware, upload.single("image"), (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    const imageUrl = `/uploads/images/${req.file.filename}`;

    res.json({
      message: "Image uploaded successfully",
      url: imageUrl,
      filename: req.file.filename,
      size: req.file.size,
    });
  } catch (error) {
    console.error("Upload error:", error);
    res
      .status(500)
      .json({ message: "Failed to upload image", error: error.message });
  }
});

// Upload multiple images
router.post(
  "/images",
  authMiddleware,
  upload.array("images", 10),
  (req, res) => {
    try {
      if (!req.files || req.files.length === 0) {
        return res.status(400).json({ message: "No files uploaded" });
      }

      const imageUrls = req.files.map((file) => ({
        url: `/uploads/images/${file.filename}`,
        filename: file.filename,
        size: file.size,
      }));

      res.json({
        message: "Images uploaded successfully",
        images: imageUrls,
      });
    } catch (error) {
      console.error("Upload error:", error);
      res
        .status(500)
        .json({ message: "Failed to upload images", error: error.message });
    }
  }
);

// Delete image
router.delete("/image/:filename", authMiddleware, (req, res) => {
  try {
    const fs = require("fs");
    const filePath = path.join(
      __dirname,
      "../uploads/images",
      req.params.filename
    );

    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
      res.json({ message: "Image deleted successfully" });
    } else {
      res.status(404).json({ message: "Image not found" });
    }
  } catch (error) {
    console.error("Delete error:", error);
    res
      .status(500)
      .json({ message: "Failed to delete image", error: error.message });
  }
});

// List all uploaded files
router.get("/list", authMiddleware, (req, res) => {
  try {
    const fs = require("fs");
    const path = require("path");

    const imagesDir = path.join(__dirname, "../uploads/images");
    const filesDir = path.join(__dirname, "../uploads/files");

    const files = [];

    // Read images directory
    if (fs.existsSync(imagesDir)) {
      const imageFiles = fs.readdirSync(imagesDir);
      imageFiles.forEach((file) => {
        const stats = fs.statSync(path.join(imagesDir, file));
        files.push({
          name: file,
          url: `/uploads/images/${file}`,
          type: "image/" + file.split(".").pop(),
          size: stats.size,
          uploadedAt: stats.mtime,
        });
      });
    }

    // Read files directory
    if (fs.existsSync(filesDir)) {
      const docFiles = fs.readdirSync(filesDir);
      docFiles.forEach((file) => {
        const stats = fs.statSync(path.join(filesDir, file));
        files.push({
          name: file,
          url: `/uploads/files/${file}`,
          type: "document",
          size: stats.size,
          uploadedAt: stats.mtime,
        });
      });
    }

    // Sort by upload date (newest first)
    files.sort((a, b) => b.uploadedAt - a.uploadedAt);

    res.json({
      success: true,
      files,
      total: files.length,
    });
  } catch (error) {
    console.error("List files error:", error);
    res
      .status(500)
      .json({ message: "Failed to list files", error: error.message });
  }
});

// Upload single file (PDF, DOC, etc.)
router.post("/file", authMiddleware, fileUpload.single("file"), (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    const fileUrl = `/uploads/files/${req.file.filename}`;
    const fileSizeInMB = (req.file.size / (1024 * 1024)).toFixed(2);

    res.json({
      message: "File uploaded successfully",
      url: fileUrl,
      filename: req.file.originalname,
      size: `${fileSizeInMB} MB`,
      type: path.extname(req.file.originalname).substring(1).toUpperCase(),
    });
  } catch (error) {
    console.error("Upload error:", error);
    res
      .status(500)
      .json({ message: "Failed to upload file", error: error.message });
  }
});

// Delete file
router.delete("/file/:filename", authMiddleware, (req, res) => {
  try {
    const fs = require("fs");
    const filePath = path.join(
      __dirname,
      "../uploads/files",
      req.params.filename
    );

    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
      res.json({ message: "File deleted successfully" });
    } else {
      res.status(404).json({ message: "File not found" });
    }
  } catch (error) {
    console.error("Delete error:", error);
    res
      .status(500)
      .json({ message: "Failed to delete file", error: error.message });
  }
});

module.exports = router;
