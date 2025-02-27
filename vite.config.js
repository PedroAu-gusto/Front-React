import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  base: "/Front-React/", // Adiciona o caminho base para o GitHub Pages
  plugins: [react()],
})
