import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import {defineConfig} from 'vite';

export default defineConfig(() => {
  return {
    plugins: [react(), tailwindcss()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    server: {
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      // Do not modifyâfile watching is disabled to prevent flickering during agent edits.
      hmr: process.env.DISABLE_HMR !== 'true',
      // Disable file watching when DISABLE_HMR is true to save CPU during agent edits.
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },
    build: {
      // Découpage du bundle : les libs tierces (react, motion, icônes) sont
      // isolées dans des chunks distincts → cache navigateur efficace et
      // téléchargement parallèle.
      rollupOptions: {
        output: {
          manualChunks(id: string) {
            if (!id.includes('node_modules')) return undefined;
            if (id.includes('lucide-react')) return 'vendor-icons';
            if (
              id.includes('framer-motion') ||
              id.includes('motion-dom') ||
              id.includes('motion-utils') ||
              id.includes('node_modules/motion/') ||
              id.includes('node_modules\\motion\\')
            ) {
              return 'vendor-motion';
            }
            if (id.includes('react') || id.includes('scheduler')) return 'vendor-react';
            return undefined;
          },
        },
      },
    },
  };
});
