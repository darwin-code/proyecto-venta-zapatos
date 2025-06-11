import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()], // SOLO esto debería ser suficiente para JSX en .js y .jsx
  // Elimina o comenta toda la sección 'esbuild' que agregamos antes:
  // esbuild: {
  //   loader: {
  //     '.js': 'jsx',
  //   },
  // },
});