import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: ['./src/test/setup.ts'],
    // Exclude Playwright e2e specs — they use @playwright/test, not Vitest
    exclude: ['**/node_modules/**', '**/dist/**', 'e2e/**'],
  },
});
