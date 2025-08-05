// 代码生成时间: 2025-08-06 00:57:43
 * This utility formats API responses into a consistent and structured format.
 *
 * @author Your Name
 * @version 1.0.0
 * @since 2023-04-01
 */

// Import necessary modules and utilities
const axios = require('axios');
const { format } = require('date-fns');

// Define the API Response Formatter class
class ApiResponseFormatter {

  // Constructor to initialize the API endpoint and options
  constructor(baseURL) {
    this.baseURL = baseURL;
  }

  // Method to format a successful API response
  formatSuccessResponse(data, message = 'Success', statusCode = 200) {
    const response = {
      status: 'success',
      statusCode,
      timestamp: format(new Date(), 'yyyy-MM-dd HH:mm:ss'),
      message,
      data,
    };
    return JSON.stringify(response, null, 2);
  }

  // Method to format an error API response
  formatErrorResponse(error, statusCode = 500) {
    const response = {
      status: 'error',
      statusCode,
      timestamp: format(new Date(), 'yyyy-MM-dd HH:mm:ss'),
      message: error.message || 'Internal Server Error',
    };
    return JSON.stringify(response, null, 2);
  }

  // Method to make an API call and format the response
  async makeApiCall(endpoint, method = 'GET', payload = {}) {
    try {
      const response = await axios({
        method,
        url: `${this.baseURL}${endpoint}`,
        data: method.toLowerCase() === 'get' ? null : payload,
        params: method.toLowerCase() === 'get' ? payload : null,
      });
      return this.formatSuccessResponse(response.data);
    } catch (error) {
      return this.formatErrorResponse(error);
    }
  }

}

// Example usage
const formatter = new ApiResponseFormatter('https://api.example.com/');

// Making a GET request to /users endpoint
formatter.makeApiCall('/users', 'GET')
  .then((response) => console.log(response))
  .catch((error) => console.error(error));
