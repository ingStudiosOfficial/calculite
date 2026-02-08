import { fileURLToPath, URL } from 'node:url';

import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import vueDevTools from 'vite-plugin-vue-devtools';
import { VitePWA } from 'vite-plugin-pwa';
import Sitemap from 'vite-plugin-sitemap';

const calculatorModeRoutes = [
  '/?mode=standard',
  '/?mode=scientific',
  '/?mode=conversion',
];

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
    Sitemap({ hostname: 'https://calculite.ingstudios.dev', dynamicRoutes: calculatorModeRoutes, exclude: ['/?mode=settings'], priority: { '/': 1.0, '/*': 0.8 }, changefreq: 'monthly' }),
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
        "start_url": "/",
        "display": "standalone",
        "theme_color": "#006a60",
        "background_color": "#f4fbf8",
        "shortcuts": [
          {
            "name": "Standard",
            "description": "Opens Calculite in Standard mode",
            "url": "/?mode=standard",
            "icons": [
              {
                "src": "shortcut_icons/shortcut_standard_icon.png",
                "sizes": "192x192"
              }
            ]
          },
          {
            "name": "Scientific",
            "description": "Opens Calculite in Scientific mode",
            "url": "/?mode=scientific",
            "icons": [
              {
                "src": "shortcut_icons/shortcut_scientific_icon.png",
                "sizes": "192x192"
              }
            ]
          },
          {
            "name": "Conversion",
            "description": "Opens Calculite in Conversion mode",
            "url": "/?mode=conversion",
            "icons": [
              {
                "src": "shortcut_icons/shortcut_conversion_icon.png",
                "sizes": "192x192"
              }
            ]
          },
          {
            "name": "Settings",
            "description": "Opens Calculite settings",
            "url": "/?mode=settings",
            "icons": [
              {
                "src": "shortcut_icons/shortcut_settings_icon.png",
                "sizes": "192x192"
              }
            ]
          }
        ]
      },
      srcDir: 'src/',
      includeAssets: ['public/*'],
      workbox: {
        globPatterns: [
          '**/*.{html,css,js,png,svg,ico,json}',
        ],
        cacheId: 'v2.0.2',
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
        ],
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
  base: '/',
})
