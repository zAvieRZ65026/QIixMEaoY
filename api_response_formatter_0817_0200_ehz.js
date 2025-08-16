// 代码生成时间: 2025-08-17 02:00:15
const axios = require('axios');
const chalk = require('chalk');

// API响应格式化工具类
class ApiResponseFormatter {

  // 构造函数
  constructor(baseUrl) {
    this.baseUrl = baseUrl;
  }

  // 获取API响应并格式化
  async fetchAndFormat(url, params) {
    try {
      // 发送GET请求
      const response = await axios.get(`${this.baseUrl}${url}`, { params });
      return this.formatResponse(response.data);
    } catch (error) {
      // 错误处理
      console.error(chalk.red(`Error fetching data: ${error.message}`));
      return null;
    }
  }

  // 格式化响应数据
  formatResponse(data) {
    if (!data) {
      return null;
    }

    // 检查数据是否具有所需的结构
    if (!data.success || !data.data) {
      console.error(chalk.red('Invalid response structure'));
      return null;
    }

    // 格式化数据
    return {
      success: data.success,
      message: data.message || 'No message',
      data: data.data
    };
  }
}

// 使用示例
const apiFormatter = new ApiResponseFormatter('https://api.example.com/');

(async () => {
  const url = '/users';
  const params = { limit: 10 };
  const formattedResponse = await apiFormatter.fetchAndFormat(url, params);
  if (formattedResponse) {
    console.log(chalk.green('Formatted Response:'), formattedResponse);
  }
})();