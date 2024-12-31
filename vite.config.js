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
      output: {
        assetFileNames: (assetInfo) => {
          // Handle CSS files
          if (assetInfo.name.endsWith('.css')) {
            return 'css/[name][extname]';
          }
          // Handle assets (images, fonts, videos)
          const ext = assetInfo.name.split('.').pop();
          if (/png|jpe?g|svg|gif|tiff|bmp|ico|webp|avif/i.test(ext)) {
            return 'assets/images/[name][extname]';
          }
          if (/woff2?|ttf|eot|otf/i.test(ext)) {
            return 'assets/fonts/[name][extname]';
          }
          if (/mp4|webm|ogg|mp3|wav|flac|aac/i.test(ext)) {
            return 'assets/video/[name][extname]';
          }
          return 'assets/[name][extname]';
        },
        entryFileNames: 'javascript/[name].js',
        chunkFileNames: 'javascript/[name].js',
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