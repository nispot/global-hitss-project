import react from '@vitejs/plugin-react';
import { resolve } from 'path';
import { defineConfig } from 'vite';
import type { UserConfigExport as VitestUserConfigExport } from 'vitest/config';

const vitestConfig: VitestUserConfigExport = {
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/test/setup.ts',
    css: true,
    coverage: {
      exclude: [
        'dist/**',
        'eslint.config.js',
        'vite.config.ts',
        'postcss.config.js',
        'tailwind.config.js',
        'src/main.tsx',
        'src/types.d.ts',
        'src/vite-env.d.ts',
      ],
    },
  },
};

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': resolve(__dirname, './src'),
      '@components': resolve(__dirname, './src/components'),
      '@epgComponents': resolve(__dirname, './src/components/Epg/components'),
      '@hooks': resolve(__dirname, './src/hooks'),
      '@utils': resolve(__dirname, './src/utils'),
      '@context': resolve(__dirname, './src/context'),
    },
  },
  test: vitestConfig.test,
});
