// 代码生成时间: 2025-08-10 10:01:05
// Import necessary modules and dependencies
const fs = require('fs').promises;
const path = require('path');

// Define the error logger class
class ErrorLogger {

  // Constructor for the ErrorLogger
  constructor({ filePath }) {
    this.filePath = filePath;
  }

  // Method to log errors to the console and file
  async logError(error) {
    try {
      // Log error to console for immediate feedback
      console.error('Error:', error);

      // Prepare error message with timestamp
      const errorMessage = `[${new Date().toISOString()}] - ${error}
`;

      // Append error message to the log file
      await fs.appendFile(this.filePath, errorMessage, 'utf8');

    } catch (error) {
      // Handle any errors that occur during logging
      console.error('Error while logging error:', error);
    }
  }
}

// Export the ErrorLogger class
module.exports = ErrorLogger;
