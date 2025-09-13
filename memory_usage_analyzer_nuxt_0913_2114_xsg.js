// 代码生成时间: 2025-09-13 21:14:50
 * It includes error handling and follows best practices for maintainability and scalability.
 */

// Import necessary modules
const os = require('os');
const { shell } = require('electron');

// Define a function to fetch memory usage statistics
function getMemoryUsage() {
  try {
    // Get memory usage in MB
    const freeMemory = os.freemem() / (1024 * 1024);
    const totalMemory = os.totalmem() / (1024 * 1024);

    // Calculate used memory
    const usedMemory = totalMemory - freeMemory;
    const memoryUsagePercentage = (usedMemory / totalMemory) * 100;

    // Return memory usage statistics
    return {
      freeMemory,
      totalMemory,
      usedMemory,
      memoryUsagePercentage,
    };
  } catch (error) {
    console.error('Error fetching memory usage:', error);
    throw error; // Re-throwing the error for upper-level handling
  }
}

// Define a function to display memory usage in a format suitable for user
function displayMemoryUsage() {
  try {
    // Fetch memory usage statistics
    const memoryUsage = getMemoryUsage();

    // Display memory usage information
    console.log(`Free Memory: ${memoryUsage.freeMemory} MB`);
    console.log(`Total Memory: ${memoryUsage.totalMemory} MB`);
    console.log(`Used Memory: ${memoryUsage.usedMemory} MB`);
    console.log(`Memory Usage: ${memoryUsage.memoryUsagePercentage.toFixed(2)}%`);
  } catch (error) {
    console.error('Error displaying memory usage:', error);
    // Handle or re-throw the error as per application requirements
  }
}

// Export the module's functionality
module.exports = {
  getMemoryUsage,
  displayMemoryUsage,
};