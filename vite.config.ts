import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// Plain local setup: `npm run dev` serves the dashboard at http://localhost:5173
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: { port: 5173 },
})
