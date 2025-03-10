import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import federation from '@originjs/vite-plugin-federation';
import { AutoImportDeps } from './build/autoImport';
import cesium from 'vite-plugin-cesium';
import { resolve } from 'path';

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    AutoImportDeps(),
    cesium(),
    federation({
      name: 'remote-package',
      filename: 'remoteEntry.js', //必须是js文件
      exposes: {
        './lm-button': './src/components/LmButton/index.vue',
      },
      shared: ['vue'],
    }),
  ],
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
    },
  },

  build: {
    minify: false,
    target: 'esnext',
    outDir: 'dist',
  },
  optimizeDeps: {
    include: ['leaflet'],
  },
  server: {
    port: 5260, // 确保与主应用配置的一致
    cors: true,
    headers: {
      'Access-Control-Allow-Origin': '*', // 允许所有域名访问
      'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    },
  },
});
