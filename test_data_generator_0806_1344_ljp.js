// 代码生成时间: 2025-08-06 13:44:11
const faker = require('@faker-js/faker');

// 数据生成器模块
module.exports = class TestDataGenerator {
  // 构造函数
  constructor() {
    // 初始化数据生成器实例
  }

  // 生成测试用户数据
  generateUser(numUsers) {
    // 检查输入参数是否有效
    if (!Number.isInteger(numUsers) || numUsers <= 0) {
      throw new Error('Invalid number of users. Please provide a positive integer.');
    }

    // 生成指定数量的用户数据
    const users = [];
    for (let i = 0; i < numUsers; i++) {
      users.push({
        id: faker.datatype.uuid(),
        name: faker.name.findName(),
        email: faker.internet.email(),
        // 可以添加更多字段
      });
    }

    return users;
  }

  // 生成测试产品数据
  generateProducts(numProducts) {
    // 检查输入参数是否有效
    if (!Number.isInteger(numProducts) || numProducts <= 0) {
      throw new Error('Invalid number of products. Please provide a positive integer.');
    }

    // 生成指定数量的产品数据
    const products = [];
    for (let i = 0; i < numProducts; i++) {
      products.push({
        id: faker.datatype.uuid(),
        name: faker.commerce.productName(),
        price: faker.commerce.price(),
        // 可以添加更多字段
      });
    }

    return products;
  }

  // 可以根据需要添加更多数据生成方法
};
