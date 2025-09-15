// 代码生成时间: 2025-09-15 12:25:27
const fs = require('fs-extra');
const path = require('path');

// 一个用于整理文件夹结构的工具类
class FolderStructureOrganizer {
  // 构造函数，接收一个包含文件夹结构信息的对象
  constructor(config) {
    this.config = config;
  }

  // 验证配置是否合法
  validateConfig() {
    if (!this.config || typeof this.config !== 'object') {
      throw new Error('Invalid configuration provided.');
    }

    if (!this.config.baseDirectory) {
      throw new Error('Base directory must be specified in the configuration.');
    }
  }

  // 创建目录，递归创建所有子目录
  async createDirectory(directoryPath) {
    try {
      await fs.ensureDir(directoryPath);
    } catch (error) {
      console.error(`Error creating directory: ${error.message}`);
    }
  }

  // 整理文件夹结构
  async organize() {
    this.validateConfig();

    const { baseDirectory } = this.config;
    await this.createDirectory(baseDirectory);

    // 递归创建所有子目录
    for (const key in this.config) {
      if (key !== 'baseDirectory') {
        const childDirectory = path.join(baseDirectory, key);
        await this.createDirectory(childDirectory);
      }
    }
  }
}

// 使用示例
(async () => {
  try {
    const config = {
      baseDirectory: './organized',
      'subfolder1': {},
      'subfolder2': {}
    };

    const organizer = new FolderStructureOrganizer(config);
    await organizer.organize();
    console.log('Folder structure organized successfully.');
  } catch (error) {
    console.error(`An error occurred: ${error.message}`);
  }
})();