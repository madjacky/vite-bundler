import { defineConfig } from 'vite';
import { resolve } from 'path';
import injectHTML from 'vite-plugin-html-inject';

export default defineConfig({
  root: 'src',
  build: {
    outDir: '../dist',
    emptyOutDir: true,
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'src/index.html'),
      },
    },
  },
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
      '@js': resolve(__dirname, 'src/javascript'),
      '@components': resolve(__dirname, 'src/javascript/components'),
      '@functions': resolve(__dirname, 'src/javascript/functions'),
      '@assets': resolve(__dirname, 'assets'),
      '@scss': resolve(__dirname, 'src/scss'),
    },
  },
  publicDir: '../assets',
  css: {
    postcss: './postcss.config.js',
  },
  plugins: [
    injectHTML(),
  ],
})