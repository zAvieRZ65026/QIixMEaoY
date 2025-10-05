// 代码生成时间: 2025-10-06 02:00:21
const { writeFile, readFile } = require('fs').promises;
const path = require('path');

// 定义一个工具函数，用于读取文件内容
async function readJsonFile(filePath) {
  try {
    const fileContent = await readFile(filePath, 'utf8');
    return JSON.parse(fileContent);
  } catch (error) {
    console.error('Error reading JSON file:', error.message);
    throw error;
  }
}

// 定义一个工具函数，用于写入文件内容
async function writeJsonFile(filePath, data) {
  try {
    await writeFile(filePath, JSON.stringify(data, null, 2), 'utf8');
  } catch (error) {
    console.error('Error writing JSON file:', error.message);
    throw error;
  }
}

// 定义去重和合并函数
async function deduplicateAndMerge(files) {
  // 使用Map来存储并去重
  const uniqueDataMap = new Map();
  // 遍历所有文件路径
  for (const file of files) {
    try {
      // 读取文件内容
      const data = await readJsonFile(file);
      // 将数据的每个条目添加到Map中，以实现去重
      for (const item of data) {
        uniqueDataMap.set(JSON.stringify(item), item);
      }
    } catch (error) {
      console.error(`Error processing file ${file}:`, error.message);
    }
  }
  // 将Map转换回数组
  const mergedData = Array.from(uniqueDataMap.values());
  return mergedData;
}

// 定义导出合并后数据的函数
async function exportMergedData(files, outputFilePath) {
  try {
    const mergedData = await deduplicateAndMerge(files);
    await writeJsonFile(outputFilePath, mergedData);
  } catch (error) {
    console.error('Error exporting merged data:', error.message);
  }
}

// 导出API函数，供Nuxt.js或其他环境调用
module.exports = {
  readJsonFile,
  writeJsonFile,
  deduplicateAndMerge,
  exportMergedData
};
