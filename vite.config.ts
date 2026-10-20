/// <reference types="vitest" />
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  define: {
    // Netlify needs SITE_RECAPTCHA_KEY at build time anyway; reuse it so the (public) site key is set in one place
    'import.meta.env.VITE_RECAPTCHA_SITE_KEY': JSON.stringify(process.env.SITE_RECAPTCHA_KEY ?? ''),
  },
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
  server: {
    host: true, // or '0.0.0.0'
    port: 3000,
  },
  preview: {
    host: true,
    port: 3000,
    allowedHosts: [
      'readyai2.onrender.com',
      'localhost',
      '127.0.0.1'
    ]
  },
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: ['./src/test/setup.ts'],
  },
});