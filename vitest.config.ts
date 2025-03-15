import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom', // Simulates a browser environment for React components
    setupFiles: './vitest.setup.ts', // Loads additional setup code
    globals: true, // Allows using `describe`, `it`, and `expect` without importing them
  },
});