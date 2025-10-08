// 代码生成时间: 2025-10-09 02:48:26
// Import necessary Nuxt.js libraries
const { defineNuxtModule, addPlugin, addTemplate } = require('@nuxt/module')

// Define the module
export default defineNuxtModule({
  meta: {
    name: 'progress-bar-loader',
    compatibility: {
      // Define compatibility
      h3: true,
      bridge: true
    },
    defaults: {
      // Module default configuration
      color: 'blue', // Progress bar color
      height: '2px', // Progress bar height
      duration: 300 // Animation duration in milliseconds
    }
  },
  setup(options, nuxtApp) {
    // Add template for the progress bar
    addTemplate({
      src: require.resolve('./templates/progress-bar.vue'),
      options: options,
      filePath: './plugins/progress-bar'
    })
  },
  plugins: [
    // Register the plugin
    '~/plugins/progress-bar.loader.js'
  ],
  // Provide additional hooks if necessary
  hooks: {
    'nuxt:headers': () => {
      // Add headers or other logic here
    }
  }
})

// progressBar.loader.js
export default function ({ app }) {
  // Check if the app instance exists
  if (!app) {
    throw new Error('Nuxt app instance not found')
  }

  // Add a plugin to handle progress bar and loader
  app.vueApp.use(() => {
    // Define a reactive state for progress
    const progress = app.vueApp.provide('progress', {
      value: 0,
      set(value) {
        this.value = value
      },
      get() {
        return this.value
      }
    })

    // Function to update progress
    const updateProgress = (value) => {
      progress.set(value)
    }

    // Function to handle loading and progress
    const handleLoading = async (promise) => {
      try {
        // Start loading
        updateProgress(0)
        const result = await promise
        // Update progress to 100% on success
        updateProgress(100)
        return result
      } catch (error) {
        // Handle errors and update progress to 100%
        console.error('Error during loading', error)
        updateProgress(100)
      }
    }

    // Expose the functions to the app
    app.vueApp.config.globalProperties.$handleLoading = handleLoading
  })
}

// progress-bar.vue
<template>
  <div v-if="isVisible" class="progress-bar" :style="{ backgroundColor: color, height: height }" :aria-valuenow="value" role="progressbar" :aria-valuemin="0" :aria-valuemax="100" />
</template>

<script>
export default {
  name: 'ProgressBar',
  props: ['color', 'height'],
  data() {
    return {
      value: 0,
      isVisible: true
    }
  },
  watch: {
    value(newVal, oldVal) {
      // Animate the progress bar
      if (newVal === 100) {
        this.isVisible = false
        setTimeout(() => {
          this.isVisible = true
          this.value = 0
        }, 300)
      }
    }
  },
  methods: {
    updateProgress(value) {
      this.value = value
    }
  }
}
</script>

<style scoped>
.progress-bar {
  width: 0%;
  transition: width 0.3s;
}
</style>
