// 代码生成时间: 2025-08-11 02:18:59
const crypto = require('crypto');

/**
 * 哈希值计算工具
 * 该工具用于计算给定字符串的哈希值，支持多种哈希算法。
 * @param {string} input - 需要计算哈希值的字符串。
 * @param {string} algorithm - 使用的哈希算法名称（如 'sha256', 'md5' 等）。
 * @returns {string} 计算得到的哈希值。
 */
async function calculateHash(input, algorithm = 'sha256') {
  try {
    // 验证输入是否是字符串
    if (typeof input !== 'string') {
      throw new Error('Input must be a string.');
    }

    // 使用 crypto 模块生成哈希值
    const hash = crypto.createHash(algorithm);
    hash.update(input);
    const result = hash.digest('hex');
    return result;
  } catch (error) {
    // 错误处理
    console.error('Error calculating hash:', error.message);
    throw error;
  }
}

// 示例用法
async function exampleUsage() {
  try {
    const inputStr = 'Hello, World!';
    const algorithm = 'sha256';
    const hashValue = await calculateHash(inputStr, algorithm);
    console.log(`The hash of '${inputStr}' using ${algorithm} is:`, hashValue);
  } catch (error) {
    console.error('An error occurred:', error.message);
  }
}

// 运行示例用法
exampleUsage();