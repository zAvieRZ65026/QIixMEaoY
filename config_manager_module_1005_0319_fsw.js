// 代码生成时间: 2025-10-05 03:19:25
const fs = require('fs');
const path = require('path');
const { defineNuxtModule } = require('@nuxt/kit');

// 定义配置文件管理模块
export default defineNuxtModule({
  meta: {
    name: 'config-manager',
    compatibility: {
      // 指定该模块的兼容性
      // 这里设置为与Nuxt 3兼容
      ssr: false,
      nuxt: '3.x',
    },
  },

  // 设置模块的钩子函数
  hooks: {    
    // 当Nuxt应用准备时，加载配置文件
    'nuxt:modules:done': async (moduleContainer) => {
      // 确保配置文件路径存在
      const configPath = path.resolve(moduleContainer.options.rootDir, 'config.json');
      
      // 检查配置文件是否存在
      if (!fs.existsSync(configPath)) {
        throw new Error('配置文件不存在，请确保config.json文件存在于项目根目录下');
      }
      
      // 读取配置文件
      const configContent = fs.readFileSync(configPath, 'utf8');
      
      // 解析配置文件内容为JSON
      try {
        const config = JSON.parse(configContent);
        // 将配置文件内容添加到Nuxt应用的上下文中
        moduleContainer.addPlugin({
          src: path.resolve(__dirname, 'plugin.js'),
          mode: 'all',
          ssr: false,
        }).use({
          config,
        }).expose({
          config,
        });
      } catch (error) {
        throw new Error('配置文件格式错误，请确保config.json文件内容是有效的JSON格式');
      }
    },
  },

  // 导出模块配置
  defaults: {
    config: {},
  },
});

// 定义Nuxt插件，将配置文件内容注入到Nuxt应用上下文中
const pluginTemplate = `export default defineNuxtPlugin((context) => {
  // 将配置文件内容注入到Nuxt应用上下文中
  context.provide('config', {{config}});
});`;

// plugin.js文件内容
const pluginContent = pluginTemplate.replace(/{{config}}/g, 'config');