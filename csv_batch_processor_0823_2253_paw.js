// 代码生成时间: 2025-08-23 22:53:06
const fs = require('fs');
const csv = require('csv-parser');
const path = require('path');

// 定义一个函数，用于处理单个CSV文件
function processCSVFile(filePath, callback) {
  fs.createReadStream(filePath)
    .pipe(csv())
    .on('data', (data) => {
      // 处理每行数据
      console.log(data);
      // 在这里添加对数据的处理逻辑
    }).on('end', () => {
      // CSV文件处理完毕
      callback(filePath);
    }).on('error', (err) => {
      // 错误处理
      console.error(`Error processing file ${filePath}: ${err.message}`);
    });
}

// 定义一个函数，用于批量处理CSV文件
function processCSVFiles(directoryPath, callback) {
  fs.readdir(directoryPath, (err, files) => {
    if (err) {
      console.error(`Error reading directory ${directoryPath}: ${err.message}`);
      return;
    }
    files.filter(file => file.endsWith('.csv')).forEach(file => {
      const filePath = path.join(directoryPath, file);
      processCSVFile(filePath, callback);
    });
  });
}

// 使用示例
const directoryPath = './csv_files';
processCSVFiles(directoryPath, (processedFilePath) => {
  // 每个CSV文件处理完毕后的回调函数
  console.log(`Processed file: ${processedFilePath}`);
});

// 注意：
// 1. 请确保安装了必要的npm包：npm install csv-parser
// 2. 请确保CSV文件格式正确，且位于指定的目录下
// 3. 根据实际需求，添加具体的数据处理逻辑
