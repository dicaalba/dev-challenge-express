/// <reference types="vitest/config" />
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Configuración de Vite + Vitest.
//
// `base` es configurable por entorno para servir el mismo código en distintos
// destinos:
//   - S3 + CloudFront y desarrollo local -> raíz ('/') (valor por defecto).
//   - GitHub Pages de proyecto -> subpath ('/dev-challenge-express/'), que el
//     workflow inyecta vía la variable de entorno VITE_BASE.
const base = process.env.VITE_BASE ?? '/';

export default defineConfig({
  plugins: [react()],
  base,
  build: {
    // Mantener el bundle pequeño y con nombres estables por chunk.
    target: 'es2020',
    sourcemap: false,
  },
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/test/setup.ts',
    css: true,
    include: ['src/**/*.{test,spec}.{ts,tsx}'],
  },
});
