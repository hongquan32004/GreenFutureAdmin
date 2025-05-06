import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'


// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  css: {
    devSourcemap: false // Tắt source map CSS trong chế độ dev
  },
  // ...các cấu hình khác
  optimizeDeps: {
    include: ['react-icons/bi']
  }
})

