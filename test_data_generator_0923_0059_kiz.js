// 代码生成时间: 2025-09-23 00:59:29
const faker = require('faker');

// TestDataGenerator class for generating test data
class TestDataGenerator {
  // Generates a list of fake users
  static generateUsers(numUsers) {
    if (numUsers <= 0) {
      throw new Error('Number of users must be greater than 0');
    }
    const users = [];
    for (let i = 0; i < numUsers; i++) {
      users.push({
        id: i + 1,
        name: faker.name.findName(),
        email: faker.internet.email(),
        address: faker.address.streetAddress()
      });
    }
    return users;
  }

  // Generates a list of fake products
  static generateProducts(numProducts) {
    if (numProducts <= 0) {
      throw new Error('Number of products must be greater than 0');
    }
    const products = [];
    for (let i = 0; i < numProducts; i++) {
      products.push({
        id: i + 1,
        name: faker.commerce.productName(),
        price: faker.commerce.price(),
        description: faker.commerce.productDescription()
      });
    }
    return products;
  }
}

// Example usage of TestDataGenerator
try {
  const users = TestDataGenerator.generateUsers(10);
  console.log('Generated Users:', users);

  const products = TestDataGenerator.generateProducts(10);
  console.log('Generated Products:', products);
} catch (error) {
  console.error('Error:', error.message);
}
