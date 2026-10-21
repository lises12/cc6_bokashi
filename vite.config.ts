import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// Plain local setup: `npm run dev` serves the dashboard at http://localhost:5173
// `base` matches the GitHub Pages sub-path: https://lises12.github.io/cc6_bokashi/
export default defineConfig({
  base: '/cc6_bokashi/',
  plugins: [react(), tailwindcss()],
  server: { port: 5173 },
})
