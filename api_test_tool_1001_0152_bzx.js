// 代码生成时间: 2025-10-01 01:52:23
const axios = require('axios');

// ApiTestTool 类，用于模拟 API 测试工具
class ApiTestTool {

  // 构造函数，接收基础 URL 和 axios 实例
  constructor(baseUrl, axiosInstance) {
    this.baseUrl = baseUrl;
    this.axios = axiosInstance;
  }

  // 发送 GET 请求的方法
  async get(path, params = {}) {
    try {
      const response = await this.axios.get(`${this.baseUrl}${path}`, { params });
      return response.data;
    } catch (error) {
      console.error('GET 请求失败:', error);
      throw error;
    }
  }

  // 发送 POST 请求的方法
  async post(path, data = {}) {
    try {
      const response = await this.axios.post(`${this.baseUrl}${path}`, data);
      return response.data;
    } catch (error) {
      console.error('POST 请求失败:', error);
      throw error;
    }
  }

  // 发送 PUT 请求的方法
  async put(path, data = {}) {
    try {
      const response = await this.axios.put(`${this.baseUrl}${path}`, data);
      return response.data;
    } catch (error) {
      console.error('PUT 请求失败:', error);
      throw error;
    }
  }

  // 发送 DELETE 请求的方法
  async delete(path) {
    try {
      const response = await this.axios.delete(`${this.baseUrl}${path}`);
      return response.data;
    } catch (error) {
      console.error('DELETE 请求失败:', error);
      throw error;
    }
  }
}

// 导出 ApiTestTool 类
module.exports = ApiTestTool;