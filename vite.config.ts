import { fileURLToPath, URL } from 'node:url';

import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import vueDevTools from 'vite-plugin-vue-devtools';
import { VitePWA } from 'vite-plugin-pwa';

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue({
      template: {
        compilerOptions: {
          isCustomElement: (tag) => tag.startsWith('md-')
        }
      }
    }),
    VitePWA({
      registerType: 'autoUpdate',
      strategies: 'generateSW',
      manifest: {
        "short_name": "Calculite",
        "name": "Calculite",
        "icons": [
          {
            "src": "calculite_logo.png",
            "sizes": "192x192",
            "type": "image/png"
          },
          {
            "src": "calculite_logo.png",
            "sizes": "512x512",
            "type": "image/png"
          }
        ],
        "start_url": "/calculite/",
        "display": "standalone",
        "theme_color": "#006a60",
        "background_color": "#f4fbf8"
      },
      srcDir: 'src/',
      includeAssets: ['public/*'],
      workbox: {
        globPatterns: [
          '**/*.{html,css,js,png,svg,ico,json}',
        ],
        cleanupOutdatedCaches: true,
        clientsClaim: true,
        skipWaiting: true,
        navigateFallback: 'index.html',
        runtimeCaching: [
          {
            urlPattern: /^https:\/\/fonts\.googleapis\.com\/.*/i,
            handler: 'CacheFirst',
            options: {
              cacheName: 'google-fonts-cache',
              expiration: {
                maxEntries: 10,
                maxAgeSeconds: 60 * 60 * 24 *365,
              },
              cacheableResponse: {
                statuses: [0, 200],
              },
            }
          },
          {
            urlPattern: /^https:\/\/fonts\.gstatic\.com\/.*/i,
            handler: 'CacheFirst',
            options: {
              cacheName: 'gstatic-cache',
              expiration: {
                maxEntries: 10,
                maxAgeSeconds: 60 * 60 * 24 *365,
              },
              cacheableResponse: {
                statuses: [0, 200],
              },
            }
          },
        ]
      },
    }),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    },
  },
  server: {
    port: 3003,
  },
  base: '/calculite/',
})
