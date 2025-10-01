// 代码生成时间: 2025-10-01 19:47:48
const fs = require('fs');
const path = require('path');
const Knex = require('knex');

// 配置数据库连接
const knexConfig = {
  client: 'pg',
  connection: {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
  },
};

// 创建Knex实例
const knex = Knex(knexConfig);

// 定义数据库迁移函数
async function migrateDatabase() {
  try {
    // 加载所有迁移文件
    const migrationFiles = fs.readdirSync(path.join(__dirname, 'migrations')).filter((file) => file.endsWith('.js'));

    // 按顺序执行每个迁移
    for (const file of migrationFiles) {
      const migration = require(path.join(__dirname, 'migrations', file));
      await knex.migrate.latest(migration);
    }

    console.log('Database migration completed successfully.');
  } catch (error) {
    console.error('Error during database migration:', error);
  }
}

// 主函数，调用迁移
async function main() {
  try {
    await migrateDatabase();
  } catch (error) {
    console.error('Migration failed:', error);
  }
}

// 执行主函数
main();

// 导出函数以便在其他模块中使用
module.exports = {
  migrateDatabase,
};

// 文档说明：
/**
 * 数据库迁移工具
 * 此工具使用Knex.js和NUXT框架，用于执行数据库迁移。
 *
 * @example
 * // 运行迁移
 * migrateDatabase();
 *
 * // 导出迁移函数
 * module.exports = {
 *   migrateDatabase,
 * };
 */
