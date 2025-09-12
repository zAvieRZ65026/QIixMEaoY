// 代码生成时间: 2025-09-12 23:19:46
// Import necessary modules
const fs = require('fs');
const path = require('path');
const archiver = require('archiver');


// Function to extract files from a given archive
async function extractFiles(archivePath, targetPath) {
  // Check if archive path exists
  if (!fs.existsSync(archivePath)) {
    throw new Error('Archive file does not exist.');
  }

  // Create the target directory if it doesn't exist
  if (!fs.existsSync(targetPath)) {
    fs.mkdirSync(targetPath, { recursive: true });
  }

  // Use archiver to extract files
  return new Promise((resolve, reject) => {
    const extractor = archiver('zip', { zlib: { level: 9 } }); // Set compression level
    const extract = fs.createWriteStream(targetPath);
    extractor.pipe(extract);

    extractor.on('error', (err) => {
      reject(err);
    });

    extractor.on('finish', () => {
      resolve('Files extracted successfully.');
    });

    fs.createReadStream(archivePath).pipe(extractor);
  });
}

// Export the function so it can be used in other parts of the Nuxt.js application
module.exports = { extractFiles };
