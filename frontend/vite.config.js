import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

// En desarrollo, las llamadas a /api se redirigen a la API Express (puerto 3000).
// En producción, Nginx sirve el build de React y hace de proxy inverso a /api.
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  return {
    plugins: [react()],
    server: {
      port: 5180, // 5173 lo usa otro proyecto en este equipo
      strictPort: true, // si el puerto está ocupado, falla en vez de cambiar a otro
      open: true, // abre el navegador en el sitio correcto
      proxy: {
        '/api': {
          target: env.VITE_API_PROXY || 'http://localhost:3000',
          changeOrigin: true,
        },
      },
    },
    preview: {
      port: 4180,
      strictPort: true,
    },
  }
})
