import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    allowedHosts: ['c44a-103-204-161-51.ngrok-free.app'], // Add your allowed hosts here
  },
})