import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

import { cloudflare } from "@cloudflare/vite-plugin";

export default defineConfig({
  base: './',
  plugins: [react(), cloudflare()],
  server: { port: 5173, host: '127.0.0.1' },
  build: {
    outDir: 'dist',
    target: 'es2020',
    cssCodeSplit: false,
  },
});