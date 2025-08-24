// 代码生成时间: 2025-08-24 10:40:30
const axios = require('axios');

/**
 * Function to validate the URL by checking if it is accessible.
 * @param {string} url - The URL to be validated.
 * @returns {Promise<boolean>} - A promise that resolves to true if the URL is valid and accessible, false otherwise.
 */
async function validateURL(url) {
  try {
    // Use axios to send a HEAD request to the URL.
    // This is a good practice as it doesn't download the entire body of the response.
    const response = await axios.head(url, {
      method: 'head',
      timeout: 5000, // Timeout after 5 seconds.
    });

    // Check if the URL is accessible based on the HTTP status code.
    // A status code in the range 200-299 means the URL is valid.
    return response.status >= 200 && response.status < 300;
  } catch (error) {
    // If any error occurs during the request, the URL is considered invalid.
    console.error('URL validation failed:', error);
    return false;
  }
}

// Export the function for use in other parts of the application.
module.exports = { validateURL };
