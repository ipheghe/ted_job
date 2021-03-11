import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  server: {
      proxy: {
      '/v1': {
        target: 'https://api.jobboard.tedbree.com',
        changeOrigin: true,
        ws: true
      },
    }
  }
})
