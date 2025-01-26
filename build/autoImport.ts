import AutoImport from 'unplugin-auto-import/vite';
export const AutoImportDeps = () => {
  return AutoImport({
    imports: ['vue', 'vue-router', 'pinia', '@vueuse/core'],
    dts: 'types/auto-imports.d.ts',
    eslintrc: {
      enabled: true,
      filepath: './.eslintrc-auto-import.json',
      globalsPropValue: true,
    },
  });
};
