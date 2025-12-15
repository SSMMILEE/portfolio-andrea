import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // IMPORTANTE: Cambia "nombre-de-tu-repositorio" por el nombre EXACTO que le pongas a tu repo en GitHub.
  // Ejemplo: si tu repo es "andrea-portfolio", esto debe ser base: "/andrea-portfolio/"
  base: "/portfolio-andrea/", 
  server: {
    host: true, 
    port: 5173
  }
})