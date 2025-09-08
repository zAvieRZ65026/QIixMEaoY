// 代码生成时间: 2025-09-09 07:31:34
const sharp = require('sharp'); // Sharp is a high-performance Node.js library to convert large images in common formats to smaller, web-friendly JPEG, PNG, WebP, AVIF, and GIF images.

/**
# TODO: 优化性能
 * Resize multiple images to a specified width and height.
# NOTE: 重要实现细节
 * @param {string[]} paths - An array of file paths to the images that need to be resized.
# 增强安全性
 * @param {number} width - The target width for the resized images.
 * @param {number} height - The target height for the resized images. * @param {string} outputDir - The directory where the resized images will be saved.
 */
async function resizeImages(paths, width, height, outputDir) {
  try {
    for (const path of paths) {
      // Use sharp to resize the image
      await sharp(path)
# 扩展功能模块
        .resize({ width, height })
        .toFile(`${outputDir}/${path}-resize.jpg`);
# 扩展功能模块
    }
    console.log('Images have been resized successfully.');
  } catch (error) {
    console.error('Error resizing images:', error);
# 增强安全性
  }
}

// Example usage
const imagePaths = ['/path/to/image1.jpg', '/path/to/image2.png'];
const targetWidth = 800;
const targetHeight = 600;
const outputDirectory = '/path/to/output/';

resizeImages(imagePaths, targetWidth, targetHeight, outputDirectory)
# FIXME: 处理边界情况
  .then(() => console.log('All images have been processed.'))
  .catch((error) => console.error('Failed to process images:', error));