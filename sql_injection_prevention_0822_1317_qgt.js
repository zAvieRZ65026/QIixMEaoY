// 代码生成时间: 2025-08-22 13:17:24
 * It includes proper error handling, documentation, and follows best practices for maintainability and scalability.
 */

// Import necessary dependencies
const { Pool } = require('pg');
const pool = new Pool({
  // Your PostgreSQL connection configuration
});

// Function to prevent SQL injection by using parameterized queries
async function getUserById(userId) {
  try {
    // Use parameterized queries to prevent SQL injection
    const result = await pool.query('SELECT * FROM users WHERE id = $1', [userId]);
    return result.rows;
  } catch (error) {
    // Handle errors properly
    console.error('Error fetching user:', error);
    throw error;
  }
}

// Example usage of the function
getUserById(1)
  .then((user) => {
    console.log('User:', user);
  }).catch((error) => {
    console.error('Failed to fetch user:', error);
  });
