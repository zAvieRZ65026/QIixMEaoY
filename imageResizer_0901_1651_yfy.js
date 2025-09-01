// 代码生成时间: 2025-09-01 16:51:40
// Import necessary modules
const fs = require('fs').promises;
const path = require('path');
const sharp = require('sharp');

// Function to resize images
async function resizeImages(inputDir, outputDir, targetSize) {
  // Check if the input and output directories exist
  try {
    await fs.access(inputDir);
    await fs.access(outputDir);
  } catch (error) {
    console.error('Error accessing directories:', error);
    return;
  }

  // Read all files in the input directory
  const files = await fs.readdir(inputDir);

  // Loop through each file and resize if it's an image
  for (const file of files) {
    const filePath = path.join(inputDir, file);
    const stats = await fs.stat(filePath);
    if (stats.isFile() && filePath.endsWith('.jpg') || filePath.endsWith('.png')) {
      try {
        // Use sharp to resize the image
        const image = sharp(filePath).resize({
          width: targetSize,
          height: targetSize,
          fit: 'inside'
        });
        const outputPath = path.join(outputDir, file);
        await image.toFile(outputPath);
        console.log(`Resized ${file} and saved to ${outputPath}`);
      } catch (error) {
        console.error(`Error resizing ${file}:`, error);
      }
    }
  }
}

// Example usage
const inputDirectory = 'path/to/input/directory';
const outputDirectory = 'path/to/output/directory';
const targetSize = 800; // Target size in pixels

resizeImages(inputDirectory, outputDirectory, targetSize)
  .then(() => console.log('All images resized successfully'))
  .catch((error) => console.error('Error resizing images:', error));