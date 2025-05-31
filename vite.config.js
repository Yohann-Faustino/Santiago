import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

export default ({ command, mode }) => {
  // Charge les variables d'env selon le mode (dev, production...)
  const env = loadEnv(mode, process.cwd(), '');

  return defineConfig({
    plugins: [react()],
    server: {
      proxy: command === 'serve' ? {
        '/api': {
          target: env.VITE_API_BASE_URL,
          changeOrigin: true,
          secure: false,
          rewrite: path => path.replace(/^\/api/, '')
        }
      } : undefined,
    }
  })
}
