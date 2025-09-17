// 代码生成时间: 2025-09-18 05:34:30
 * It handles error checking and provides a clear interface for future extensions.
 */

module.exports = function nuxtImageResizer(moduleOptions) {
  // Default options
  const options = {
    ...{
      defaultWidth: 800, // Default width for resized images
      defaultHeight: 600, // Default height for resized images
      outputDir: './resized_images', // Directory to save resized images
      quality: 0.8 // JPEG quality for resized images
    },
    ...moduleOptions
  };

  const {
    defaultWidth,
    defaultHeight,
    outputDir,
    quality
  } = options;

  // Function to resize an image
  const resizeImage = async (imagePath, newWidth, newHeight) => {
    try {
      // Importing sharp library for image processing
      let sharp = require('sharp');
      
      // Resizing the image
      await sharp(imagePath)
        .resize(newWidth, newHeight)
        .toBuffer()
        .then(async (buffer) => {
          // Saving the resized image
          const outputFilename = imagePath.replace(/\.[^.]+$/, '') + `_${newWidth}x${newHeight}.jpg`;
          const outputFilePath = `${outputDir}/${outputFilename}`;
          await sharp(buffer).jpeg({ quality }).toFile(outputFilePath);
        });
    } catch (error) {
      // Error handling
      console.error(`Error resizing image ${imagePath}: ${error.message}`);
    }
  };

  // Function to process a list of images
  const processImages = async (imagePaths) => {
    try {
      await Promise.all(
        imagePaths.map(async (imagePath) => {
          // Resizing each image with default dimensions
          await resizeImage(imagePath, defaultWidth, defaultHeight);
        })
      );
    } catch (error) {
      console.error(`Error processing images: ${error.message}`);
    }
  };

  // Exposing module functions
  return {
    resizeImage,
    processImages
  };
};