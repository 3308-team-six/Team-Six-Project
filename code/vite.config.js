import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

export default defineConfig({
  plugins: [
    vue(),
  ],
  build: {
    outDir: 'static/js',
    rollupOptions: {
      input: 'static/ts/game.ts',
      output: {
        entryFileNames: `[name].js`,
        chunkFileNames: `[name].js`,
        assetFileNames: `assets/[name].[ext]`
      }
    },
    assetsInlineLimit: 0,
    chunkSizeWarningLimit: 600,
    brotliSize: false,
  }
});
