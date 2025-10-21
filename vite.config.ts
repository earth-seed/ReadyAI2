import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
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
});