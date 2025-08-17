// 代码生成时间: 2025-08-17 12:04:39
 * This script simulates a performance test by making repeated requests to a specified endpoint.
 * It measures the response time and logs the results.
 *
 * @author Your Name
 * @version 1.0
 * @date YYYY-MM-DD
 */

const axios = require('axios'); // Import axios for HTTP requests
const chalk = require('chalk'); // Import chalk for colored console output

// Configuration
const { URL, NUM_OF_REQUESTS } = require('./config'); // Import test parameters from config file

// Function to log messages with timestamp and color
function logMessage(message) {
  const timestamp = new Date().toISOString();
  console.log(chalk.blue(`[${timestamp}] ${message}`));
}

// Function to perform a single performance test
async function performTest() {
  try {
    const response = await axios.get(URL);
    const responseTime = response.headers['x-response-time'];
    logMessage(`Request successful. Response time: ${responseTime}ms`);
  } catch (error) {
    logMessage(chalk.red(`Request failed: ${error.message}`));
  }
}

// Function to run multiple performance tests
async function runPerformanceTest() {
  logMessage('Starting performance test...');

  for (let i = 0; i < NUM_OF_REQUESTS; i++) {
    await performTest();
  }

  logMessage('Performance test completed.');
}

// Run the performance test
runPerformanceTest();