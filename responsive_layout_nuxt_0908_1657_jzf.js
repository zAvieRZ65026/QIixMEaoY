// 代码生成时间: 2025-09-08 16:57:48
const responsiveLayout = function () {
  // 导入 Vue 和 Nuxt 组件
  const Vue = require('vue')
  const { defineNuxtModule } = require('@nuxt/kit')

  // 定义 Nuxt 模块
  export default defineNuxtModule({
    meta: {
      name: 'responsive-layout',
      compatibility: {
        // 支持 Nuxt 2 和 3
         nuxt: ['2.x', '3.x']
      }
    },
    setup(nuxtApp) {
      const checkBrowserSize = () => {
        // 定义响应式断点
        const breakpoints = {
          mobile: 600,
          tablet: 900,
          desktop: 1200
        }

        // 根据屏幕尺寸设置响应式类
        const setResponsiveClass = () => {
          const width = window.innerWidth
          if (width < breakpoints.mobile) {
            document.body.classList.add('is-mobile')
            document.body.classList.remove('is-tablet', 'is-desktop')
          } else if (width >= breakpoints.mobile && width < breakpoints.tablet) {
            document.body.classList.add('is-tablet')
            document.body.classList.remove('is-mobile', 'is-desktop')
          } else {
            document.body.classList.add('is-desktop')
            document.body.classList.remove('is-mobile', 'is-tablet')
          }
        }

        // 监听窗口大小变化并更新类
        window.addEventListener('resize', setResponsiveClass)

        // 初始化页面加载时的响应式类
        setResponsiveClass()
      }

      // 在 Vue 生命周期钩子中注册响应式布局检查
      nuxtApp.hook('app:mounted', checkBrowserSize)
    }
  })
}

// 导出模块以供 Nuxt 使用
module.exports = responsiveLayout