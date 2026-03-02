import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      // Any request starting with /api will be forwarded to your WLV server
      '/api': {
        target: 'https://mi-linux.wlv.ac.uk/~2412420',
        changeOrigin: true,
        secure: true, // if using HTTPS
        rewrite: path => path.replace(/^\/api/, '') // remove /api prefix
      }
    }
  }
})
