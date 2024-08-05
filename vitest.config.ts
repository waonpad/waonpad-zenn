import path from 'path';
import { defineConfig } from 'vitest/config';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [],
  test: {
    globals: false,
    // environment: 'happy-dom',
    include: ['src/**/*.test.{js,ts,jsx,tsx}'],
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
    setupFiles: [],
  },
});
