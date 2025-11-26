/**
 * Image Optimization Service
 * Handles image compression, WebP conversion, and responsive variants
 */

const sharp = require("sharp");
const fs = require("fs").promises;
const path = require("path");

/**
 * Optimize image with compression and format conversion
 * @param {string} inputPath - Path to original image
 * @param {object} options - Optimization options
 * @returns {Promise<object>} - Paths to optimized images
 */
const optimizeImage = async (inputPath, options = {}) => {
  const {
    quality = 80,
    createWebP = true,
    createThumbnail = true,
    thumbnailWidth = 300,
    createResponsive = true,
  } = options;

  try {
    const parsedPath = path.parse(inputPath);
    const outputDir = parsedPath.dir;
    const baseName = parsedPath.name;

    const results = {
      original: inputPath,
      optimized: null,
      webp: null,
      thumbnail: null,
      responsive: {},
    };

    // Load image metadata
    const metadata = await sharp(inputPath).metadata();
    console.log(
      `Processing image: ${baseName}, size: ${metadata.width}x${metadata.height}`
    );

    // 1. Create optimized JPEG/PNG (compressed)
    const optimizedPath = path.join(
      outputDir,
      `${baseName}_optimized${parsedPath.ext}`
    );
    if (metadata.format === "jpeg" || metadata.format === "jpg") {
      await sharp(inputPath)
        .jpeg({ quality, mozjpeg: true })
        .toFile(optimizedPath);
    } else if (metadata.format === "png") {
      await sharp(inputPath)
        .png({ quality, compressionLevel: 9 })
        .toFile(optimizedPath);
    } else {
      // For other formats, just copy
      await sharp(inputPath).toFile(optimizedPath);
    }
    results.optimized = optimizedPath;

    // 2. Create WebP version (better compression)
    if (createWebP) {
      const webpPath = path.join(outputDir, `${baseName}.webp`);
      await sharp(inputPath)
        .webp({ quality: quality + 5 }) // WebP can handle slightly higher quality
        .toFile(webpPath);
      results.webp = webpPath;
    }

    // 3. Create thumbnail
    if (createThumbnail) {
      const thumbPath = path.join(
        outputDir,
        `${baseName}_thumb${parsedPath.ext}`
      );
      await sharp(inputPath)
        .resize(thumbnailWidth, null, {
          fit: "inside",
          withoutEnlargement: true,
        })
        .jpeg({ quality: 75 })
        .toFile(thumbPath);
      results.thumbnail = thumbPath;
    }

    // 4. Create responsive variants (for srcset)
    if (createResponsive && metadata.width > 800) {
      const sizes = [
        { width: 400, suffix: "_sm" },
        { width: 800, suffix: "_md" },
        { width: 1200, suffix: "_lg" },
      ];

      for (const size of sizes) {
        if (metadata.width >= size.width) {
          const responsivePath = path.join(
            outputDir,
            `${baseName}${size.suffix}${parsedPath.ext}`
          );
          await sharp(inputPath)
            .resize(size.width, null, {
              fit: "inside",
              withoutEnlargement: true,
            })
            .jpeg({ quality })
            .toFile(responsivePath);
          results.responsive[size.suffix] = responsivePath;
        }
      }
    }

    // Get file sizes for comparison
    const originalStats = await fs.stat(inputPath);
    const optimizedStats = await fs.stat(results.optimized);
    const savings = (
      ((originalStats.size - optimizedStats.size) / originalStats.size) *
      100
    ).toFixed(1);

    console.log(`✓ Image optimized: ${baseName}`);
    console.log(`  Original: ${(originalStats.size / 1024).toFixed(1)}KB`);
    console.log(
      `  Optimized: ${(optimizedStats.size / 1024).toFixed(
        1
      )}KB (${savings}% smaller)`
    );

    return results;
  } catch (error) {
    console.error("Image optimization error:", error.message);
    throw error;
  }
};

/**
 * Optimize all images in a directory
 * @param {string} dirPath - Directory containing images
 * @param {object} options - Optimization options
 */
const optimizeDirectory = async (dirPath, options = {}) => {
  try {
    const files = await fs.readdir(dirPath);
    const imageFiles = files.filter((file) => {
      const ext = path.extname(file).toLowerCase();
      return [".jpg", ".jpeg", ".png", ".gif", ".webp"].includes(ext);
    });

    console.log(`Found ${imageFiles.length} images to optimize in ${dirPath}`);

    const results = [];
    for (const file of imageFiles) {
      // Skip already optimized files
      if (
        file.includes("_optimized") ||
        file.includes("_thumb") ||
        file.includes("_sm") ||
        file.includes("_md") ||
        file.includes("_lg")
      ) {
        continue;
      }

      const filePath = path.join(dirPath, file);
      try {
        const result = await optimizeImage(filePath, options);
        results.push(result);
      } catch (err) {
        console.error(`Failed to optimize ${file}:`, err.message);
      }
    }

    console.log(`✓ Optimized ${results.length} images`);
    return results;
  } catch (error) {
    console.error("Directory optimization error:", error.message);
    throw error;
  }
};

/**
 * Generate image srcset for responsive images
 * @param {string} basePath - Base path of image (without size suffix)
 * @param {object} variants - Available image variants
 */
const generateSrcSet = (basePath, variants) => {
  const srcset = [];

  if (variants._sm) {
    srcset.push(`${variants._sm} 400w`);
  }
  if (variants._md) {
    srcset.push(`${variants._md} 800w`);
  }
  if (variants._lg) {
    srcset.push(`${variants._lg} 1200w`);
  }

  return srcset.join(", ");
};

/**
 * Clean up old/temporary image files
 * @param {string} dirPath - Directory to clean
 * @param {number} daysOld - Delete files older than this many days
 */
const cleanupOldImages = async (dirPath, daysOld = 30) => {
  try {
    const files = await fs.readdir(dirPath);
    const now = Date.now();
    const maxAge = daysOld * 24 * 60 * 60 * 1000;

    let deletedCount = 0;

    for (const file of files) {
      const filePath = path.join(dirPath, file);
      const stats = await fs.stat(filePath);

      // Delete if older than maxAge and is a temporary/optimized file
      if (
        now - stats.mtimeMs > maxAge &&
        (file.includes("_temp") || file.startsWith("tmp_"))
      ) {
        await fs.unlink(filePath);
        deletedCount++;
      }
    }

    if (deletedCount > 0) {
      console.log(
        `✓ Cleaned up ${deletedCount} old image files from ${dirPath}`
      );
    }

    return deletedCount;
  } catch (error) {
    console.error("Image cleanup error:", error.message);
    return 0;
  }
};

/**
 * Resize image to specific dimensions
 * @param {string} inputPath - Path to original image
 * @param {number} width - Target width
 * @param {number} height - Target height (optional, maintains aspect ratio if null)
 * @param {string} outputPath - Path for resized image
 */
const resizeImage = async (
  inputPath,
  width,
  height = null,
  outputPath = null
) => {
  try {
    if (!outputPath) {
      const parsedPath = path.parse(inputPath);
      outputPath = path.join(
        parsedPath.dir,
        `${parsedPath.name}_${width}x${height || "auto"}${parsedPath.ext}`
      );
    }

    await sharp(inputPath)
      .resize(width, height, {
        fit: "cover",
        position: "center",
      })
      .toFile(outputPath);

    return outputPath;
  } catch (error) {
    console.error("Image resize error:", error.message);
    throw error;
  }
};

/**
 * Convert image to WebP format
 * @param {string} inputPath - Path to original image
 * @param {number} quality - WebP quality (1-100)
 */
const convertToWebP = async (inputPath, quality = 85) => {
  try {
    const parsedPath = path.parse(inputPath);
    const webpPath = path.join(parsedPath.dir, `${parsedPath.name}.webp`);

    await sharp(inputPath).webp({ quality }).toFile(webpPath);

    return webpPath;
  } catch (error) {
    console.error("WebP conversion error:", error.message);
    throw error;
  }
};

module.exports = {
  optimizeImage,
  optimizeDirectory,
  generateSrcSet,
  cleanupOldImages,
  resizeImage,
  convertToWebP,
};
