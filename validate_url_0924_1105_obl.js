// 代码生成时间: 2025-09-24 11:05:42
const axios = require('axios');

/**
 * 检查URL是否有效
 * @param {string} url - 需要验证的URL链接
 * @returns {Promise<boolean>} - 返回一个Promise，解析为布尔值，表示URL是否有效
 */
async function validateUrl(url) {
  try {
    // 使用axios发送HEAD请求检查URL是否可达
    const response = await axios.head(url, {
      timeout: 5000  // 设置请求超时时间为5秒
    });
    // 如果响应状态码在200-299之间，则认为URL有效
    return response.status >= 200 && response.status < 300;
  } catch (error) {
    // 如果请求失败，则认为URL无效
    console.error('URL validation failed:', error.message);
    return false;
  }
}

/**
 * 使用validateUrl函数的示例
 */
function main() {
  const testUrl = 'https://example.com';
  validateUrl(testUrl)
    .then(isValid => {
      console.log(`The URL ${testUrl} is ${isValid ? 'valid' : 'invalid'}`);
    }).catch(error => {
      console.error(`Error validating URL ${testUrl}:`, error);
    });
}

// 导出validateUrl函数，使其可以在其他模块中使用
module.exports = {
  validateUrl
};

// 可以直接运行main函数进行测试
if (require.main === module) {
  main();
}