// 代码生成时间: 2025-09-19 16:45:46
const fs = require('fs');
const path = require('path');
const winston = require('winston');

// 设置日志文件存储路径
const logDirectory = path.join(__dirname, 'logs');

// 创建日志目录
if (!fs.existsSync(logDirectory)) {
  fs.mkdirSync(logDirectory);
}

// 配置日志文件名
const logFileName = path.join(logDirectory, 'security_audit.log');

// 创建 winston 日志传输
const logger = winston.createLogger({
  // 配置日志级别
  level: 'info',

  // 使用文件传输
  transports: [
    new winston.transports.File({
      filename: logFileName,
      handleExceptions: true,
      format: winston.format.combine(
        winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
        winston.format.errors({ stack: true }),
        winston.format.json()
      )
    })
  ]
});

// 添加一个错误处理器，用于处理未捕获的异常和 Promise 错误
process.on('unhandledRejection', (ex) => {
  logger.error('Unhandled Rejection:', ex);
});

process.on('uncaughtException', (ex) => {
  logger.error('Uncaught Exception:', ex);
});

// 导出日志器
module.exports = logger;

/**
 * 安全审计日志模块
 * @module securityAuditLog
 *
 * 提供一个日志器实例来记录安全审计日志。
 *
 * @example
 * const logger = require('./security_audit_log');
 * logger.info('User logged in', { userId: '123' });
 */