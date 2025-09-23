// 代码生成时间: 2025-09-23 09:38:09
const mysql = require('mysql2/promise');

/**
 * DatabasePoolManager class for managing database connections using connection pool.
 * @class DatabasePoolManager
 */
class DatabasePoolManager {
  /**
   * Creates an instance of DatabasePoolManager.
   * @param {Object} config Database connection configuration.
   */
  constructor(config) {
    this.config = config;
    this.pool = mysql.createPool(config);
  }

  /**
   * Gets a connection from the pool.
   * @returns {Promise} A promise that resolves with a connection.
   */
  async getConnection() {
    try {
      const connection = await this.pool.getConnection();
      return connection;
    } catch (error) {
      console.error('Failed to get connection from the pool:', error);
      throw error;
    }
  }

  /**
   * Executes a query using a connection from the pool.
   * @param {String} query SQL query to execute.
   * @returns {Promise} A promise that resolves with the query result.
   */
  async executeQuery(query) {
    const connection = await this.getConnection();
    try {
      const [results] = await connection.promiseExecute(query);
      return results;
    } catch (error) {
      console.error('Failed to execute query:', error);
      throw error;
    } finally {
      connection.release();
    }
  }

  /**
   * Ends the connection pool.
   * @returns {Promise} A promise that resolves when the pool is ended.
   */
  async endPool() {
    try {
      await this.pool.end();
    } catch (error) {
      console.error('Failed to end the pool:', error);
      throw error;
    }
  }
}

// Example usage:
// const dbConfig = {
//   host: 'localhost',
//   user: 'root',
//   password: 'password',
//   database: 'my_database',
//   waitForConnections: true,
//   connectionLimit: 10,
//   queueLimit: 0
// };

// const dbManager = new DatabasePoolManager(dbConfig);

// dbManager.executeQuery('SELECT * FROM users').then((users) => {
//   console.log(users);
// }).catch((error) => {
//   console.error(error);
// });
