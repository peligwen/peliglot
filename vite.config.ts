import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import type { Plugin } from 'vite';

// ---------------------------------------------------------------------------
// Cloudflare Web Analytics beacon — build-time injection
//
// Injects the CFWA beacon into <head> only when:
//   1. Running `vite build` (apply: 'build' prevents injection during dev)
//   2. VITE_CF_ANALYTICS_TOKEN is set in the environment
//
// If the token is absent at build time, a single console.warn is emitted and
// no beacon is inserted (dist/index.html will have no cloudflareinsights ref).
// ---------------------------------------------------------------------------
function cfAnalyticsPlugin(): Plugin {
  return {
    name: 'cf-analytics-beacon',
    apply: 'build',
    transformIndexHtml() {
      const token = process.env.VITE_CF_ANALYTICS_TOKEN;
      if (!token) {
        console.warn(
          '[peliglot] VITE_CF_ANALYTICS_TOKEN not set; analytics beacon will not be included.',
        );
        return [];
      }
      return [
        {
          tag: 'script',
          attrs: {
            defer: true,
            src: 'https://static.cloudflareinsights.com/beacon.min.js',
            'data-cf-beacon': JSON.stringify({ token }),
          },
          injectTo: 'head',
        },
      ];
    },
  };
}

export default defineConfig({
  plugins: [react(), cfAnalyticsPlugin()],
  build: {
    outDir: 'dist',
    rollupOptions: {
      output: {
        manualChunks: {
          'react-vendor': ['react', 'react-dom', 'react-router-dom'],
        },
      },
    },
  },
});
