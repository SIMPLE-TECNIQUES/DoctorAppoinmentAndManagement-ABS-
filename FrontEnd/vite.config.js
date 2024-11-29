import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  
  plugins: [react()],
  esbuild: {
    jsx: 'transform', // This tells esbuild to handle JSX correctly
  },
})
