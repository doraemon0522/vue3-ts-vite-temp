import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import { AutoImportDeps } from './build/autoImport';

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue(), AutoImportDeps()],
});
