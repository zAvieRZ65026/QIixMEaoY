// 代码生成时间: 2025-09-07 13:27:26
const fs = require('fs');
const path = require('path');
const recursive = require('recursive-readdir');

class BatchFileRenamer {
# 增强安全性
  /**
   * Constructs a new instance of BatchFileRenamer.
   * @param {string} directory - The directory containing files to be renamed.
   * @param {string} baseName - The base name for the new filenames.
   * @param {string} extension - The file extension to look for.
   */
  constructor(directory, baseName, extension) {
    this.directory = directory;
# 扩展功能模块
    this.baseName = baseName;
    this.extension = extension;
# 增强安全性
  }

  /**
   * Renames files in the specified directory based on the provided base name and file extension.
   * @returns {Promise<void>} - Resolves when all files have been renamed.
   */
  async renameFiles() {
    try {
      const files = await recursive(this.directory);
      for (const file of files) {
        if (path.extname(file) === `.${this.extension}`) {
          const base = path.basename(file, `.${this.extension}`);
          const newFileName = `${this.baseName}_${base}.${this.extension}`;
          const newFilePath = path.join(this.directory, newFileName);
          fs.renameSync(file, newFilePath);
          console.log(`Renamed ${file} to ${newFilePath}`);
        }
# 扩展功能模块
      }
    } catch (error) {
      console.error('Error renaming files:', error);
    }
  }
# NOTE: 重要实现细节
}

// Example usage:
// const renamer = new BatchFileRenamer('./files', 'newName', 'txt');
// renamer.renameFiles();