import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'dist',
    rollupOptions: {
      output: {
        manualChunks: {
          spanish: ['./src/guides/spanish.jsx'],
          arabic: ['./src/guides/arabic.jsx'],
          english: ['./src/guides/english.jsx'],
          hawaiian: ['./src/guides/hawaiian.jsx'],
          german: ['./src/guides/german.jsx'],
        }
      }
    }
  }
})
