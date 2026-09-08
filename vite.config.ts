/// <reference types="vitest/config" />
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Configuración de Vite + Vitest.
//
// `base` usa rutas relativas ('./') por defecto para que el mismo build
// funcione sin cambios en cualquier destino:
//   - Dominio personalizado en la raíz (ej. ruleta.awsgirlsperu.com/).
//   - GitHub Pages de proyecto en subpath (usuario.github.io/repo/).
//   - S3 + CloudFront y desarrollo local.
// Se puede sobrescribir con VITE_BASE si algún despliegue necesita un base fijo.
const base = process.env.VITE_BASE ?? './';

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
