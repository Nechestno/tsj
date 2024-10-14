import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/auth': 'http://localhost:8080',
      '/tsj': 'http://localhost:8080',
      '/address': 'http://localhost:8080',
      '/user': 'http://localhost:8080',
      '/flat': 'http://localhost:8080',
      '/valueHistory': 'http://localhost:8080',
      '/api': 'http://localhost:8080',
    },
  },
})
