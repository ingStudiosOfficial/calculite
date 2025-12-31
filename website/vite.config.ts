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
        "description": "A lightweight Material You themed calculator.",
        "icons": [
          {
            "src": "calculite_logo.png",
            "sizes": "500x500",
            "type": "image/png",
            "purpose": "any"
          },
          {
            "src": "calculite_logo.png",
            "sizes": "500x500",
            "type": "image/png",
            "purpose": "maskable"
          },
          {
            "src": "calculite_logo_mono.png",
            "sizes": "500x500",
            "type": "image/png",
            "purpose": "monochrome"
          }
        ],
        "screenshots": [
          {
            "src": "screenshots/desktop_preview_1.png",
            "sizes": "1920x1128",
            "form_factor": "wide",
            "platform": "windows",
            "label": "Standard calculator view on desktop"
          },
          {
            "src": "screenshots/desktop_preview_2.png",
            "sizes": "1920x1128",
            "form_factor": "wide",
            "label": "Scientific calculator view with memory box on desktop"
          },
          {
            "src": "screenshots/desktop_preview_3.png",
            "sizes": "1920x1128",
            "form_factor": "wide",
            "label": "Unit conversion view on desktop"
          },
          {
            "src": "screenshots/mobile_preview_1.png",
            "sizes": "1080x2400",
            "form_factor": "narrow",
            "label": "Standard calculator view on mobile"
          },
          {
            "src": "screenshots/mobile_preview_2.png",
            "sizes": "1080x2400",
            "form_factor": "narrow",
            "label": "Scientific calculator view with memory box on mobile"
          },
          {
            "src": "screenshots/mobile_preview_3.png",
            "sizes": "1080x2400",
            "form_factor": "narrow",
            "label": "Unit conversion view on mobile"
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
