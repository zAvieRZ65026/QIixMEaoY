// 代码生成时间: 2025-09-09 15:16:02
const fs = require('fs-extra');
const path = require('path');
const chalk = require('chalk');

// Configuration for the backup and sync tool
const config = {
  srcPath: './src/',
  destPath: './backup/',
  backupInterval: 1000 * 60 * 60, // 1 hour in milliseconds
};

// Check if the source directory exists
const checkSourceDirectory = async () => {
  try {
    await fs.pathExists(config.srcPath);
  } catch (error) {
    console.error(chalk.red('Error: Source directory does not exist'));
    process.exit(1);
  }
};

// Check if the destination directory exists, if not, create it
const checkDestinationDirectory = async () => {
  try {
    await fs.ensureDir(config.destPath);
  } catch (error) {
    console.error(chalk.red('Error: Failed to create destination directory'));
    process.exit(1);
  }
};

// Copy files from source to destination
const copyFiles = async () => {
  try {
    await fs.copy(config.srcPath, config.destPath, { overwrite: true });
    console.log(chalk.green('Files copied successfully'));
  } catch (error) {
    console.error(chalk.red('Error: Failed to copy files'), error);
  }
};

// Schedule the backup and sync process
const scheduleBackupSync = () => {
  setInterval(copyFiles, config.backupInterval);
  console.log(chalk.blue('Backup and sync scheduled every'), config.backupInterval / 1000 / 60, 'minutes');
};

// Main function to run the backup and sync tool
const main = async () => {
  await checkSourceDirectory();
  await checkDestinationDirectory();
  await copyFiles();
  scheduleBackupSync();
};

// Run the main function
main();