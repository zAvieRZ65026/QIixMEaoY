// 代码生成时间: 2025-09-04 21:30:27
const { defineNuxtModule, addPlugin, addTemplate } = require('@nuxt/kit')

// 定义一个Nuxt模块，用于注册组件库
const componentsModule = defineNuxtModule({
  meta: 'ui-components-library',
  defaults: {},
  hooks: 'components'
})

// 导入组件库中的所有组件
const components = require.context('@/components', true, /\.vue$/)

// 将所有组件注册到Nuxt中
components.keys().forEach((fileName) => {
  // 获取组件的配置
  const config = components(fileName)
  // 获取组件的名称
  const name = config.default.name || fileName.replace(/\/g, '-')
  // 将组件添加到Nuxt的全局命名空间
  this.addTemplate({
    src: fileName,
    options: {
      name: name,
      global: true,
      ...config
    }
  })
})

// 添加错误处理插件
addPlugin('@/plugins/errorHandler.js')

// 导出模块
module.exports = componentsModule


// 在plugins文件夹中创建errorHandler.js文件
// 错误处理插件
const errorHandlerPlugin = (ctx, inject) => {
  // 捕获全局错误
  window.onerror = (message, source, lineno, colno, error) => {
    // 打印错误信息
    console.error('An error occurred:', error)
  }
  // 捕获未处理的Promise拒绝
  window.onunhandledrejection = (event) => {
    console.error('Unhandled promise rejection:', event.promise, 'reason:', event.reason)
  }
}

module.exports = errorHandlerPlugin
