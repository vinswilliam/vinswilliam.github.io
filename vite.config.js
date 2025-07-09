import { defineConfig } from 'vite'

export default defineConfig({
  base: '/vinswilliam.github.io/', // For username.github.io repos that serve from root
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    sourcemap: false,
    minify: 'terser',
    rollupOptions: {
      output: {
        manualChunks: undefined,
      }
    }
  },
  server: {
    port: 3000,
    open: true,
    cors: true,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET,POST,PUT,DELETE,OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type'
    }
  },
  preview: {
    port: 4173,
    open: true,
    cors: true
  },
  // Ensure proper MIME types
  optimizeDeps: {
    include: []
  }
})
