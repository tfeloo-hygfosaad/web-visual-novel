import { loadEnv } from 'vite';
import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import tsconfigPaths from 'vite-tsconfig-paths';
 
export default defineConfig(({ mode }) => ({
  plugins: [
    tsconfigPaths(), react()
  ],
  test: {
    env: loadEnv(mode, process.cwd(), ''),
    environment: 'jsdom',
  },
}));

