import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vitejs.dev/config/
export default defineConfig({
  base: '/Weather_Test_App/', 
  build: {
    outDir: 'build',
  },
  plugins: [
    react(),
    tailwindcss()
  ],
})