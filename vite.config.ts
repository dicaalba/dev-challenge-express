/// <reference types="vitest/config" />
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Configuración de Vite + Vitest.
// El sitio se sirve desde la raíz (base '/') para funcionar en S3 + CloudFront.
export default defineConfig({
  plugins: [react()],
  base: '/',
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
