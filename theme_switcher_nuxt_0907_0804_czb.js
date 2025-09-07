// 代码生成时间: 2025-09-07 08:04:58
// Import necessary modules and components
const { defineNuxtModule, addPlugin, addTemplate } = require('@nuxt/kit')

// Define a Nuxt.js module
export default defineNuxtModule({
  meta: {
    name: 'theme-switcher',
    compatibility: {
      // This module is only compatible with Nuxt 3
      h: true
    },
  },

  // Module hooks
  setup (_, options) {
    const themes = options.themes || ['light', 'dark']

    // Add a plugin to handle theme switching
    addPlugin(
      require.resolve('./theme-switcher-plugin')
    )

    // Add a template to store the current theme in the global scope
    addTemplate(
      require.resolve('./theme-switcher-template')
    )
  },
})

// Define the plugin for theme switching
const themeSwitcherPlugin = (context) => {
  // Get the current theme from local storage
  const currentTheme = localStorage.getItem('theme') || 'light'

  // Define a method to switch themes
  context.$theme = {
    get current() {
      return currentTheme
    },
    set current(theme) {
      if (themes.includes(theme)) {
        document.body.classList.remove(currentTheme)
        document.body.classList.add(theme)
        localStorage.setItem('theme', theme)
        currentTheme = theme
      } else {
        console.error('Invalid theme:', theme)
      }
    }
  }
}

// Expose the plugin
module.exports = themeSwitcherPlugin

// Define the template to store the current theme
const themeSwitcherTemplate = `
<script>
  const themes = ['light', 'dark']
  const currentTheme = localStorage.getItem('theme') || 'light'
  document.body.classList.add(currentTheme)
</script>
<style>
  /* Add theme specific styles here */
  .theme-light { /* light theme styles */ }
  .theme-dark { /* dark theme styles */ }
</style>
`
module.exports = themeSwitcherTemplate
