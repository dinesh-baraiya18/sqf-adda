import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import { createRequire } from 'module';

const require = createRequire(import.meta.url);

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    preserveSymlinks: true,
  },
  css: {
    modules: true,
  },
});

