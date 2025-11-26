const multer = require("multer");
const path = require("path");
const fs = require("fs");
const { optimizeImage } = require("../services/imageOptimization");

// Create uploads directory if it doesn't exist
const uploadDir = path.join(__dirname, "../uploads/images");
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// Configure storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    // Save with _original suffix first, will optimize later
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + "_original" + path.extname(file.originalname));
  },
});

// File filter
const fileFilter = (req, file, cb) => {
  const allowedTypes = /jpeg|jpg|png|gif|webp/;
  const extname = allowedTypes.test(
    path.extname(file.originalname).toLowerCase()
  );
  const mimetype = allowedTypes.test(file.mimetype);

  if (mimetype && extname) {
    return cb(null, true);
  } else {
    cb(new Error("Only image files are allowed (jpeg, jpg, png, gif, webp)"));
  }
};

// Configure multer
const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB limit
  },
});

/**
 * Middleware to automatically optimize images after upload
 */
const optimizeUploadedImage = async (req, res, next) => {
  if (!req.file) {
    return next();
  }

  try {
    // Optimize the uploaded image
    const optimizedImages = await optimizeImage(req.file.path, {
      quality: 80,
      createWebP: true,
      createThumbnail: true,
      createResponsive: true,
    });

    // Update req.file to point to optimized version
    req.file.optimized = optimizedImages.optimized;
    req.file.webp = optimizedImages.webp;
    req.file.thumbnail = optimizedImages.thumbnail;
    req.file.responsive = optimizedImages.responsive;

    // Store relative paths for database
    req.file.optimizedPath = optimizedImages.optimized.replace(uploadDir, "/uploads/images");
    req.file.webpPath = optimizedImages.webp ? optimizedImages.webp.replace(uploadDir, "/uploads/images") : null;
    req.file.thumbnailPath = optimizedImages.thumbnail ? optimizedImages.thumbnail.replace(uploadDir, "/uploads/images") : null;

    console.log(`✓ Image optimized and uploaded: ${req.file.filename}`);
    next();
  } catch (error) {
    console.error("Image optimization failed:", error.message);
    // Continue with original image if optimization fails
    next();
  }
};

module.exports = upload;
module.exports.optimizeUploadedImage = optimizeUploadedImage;
