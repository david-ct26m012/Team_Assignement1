import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'
import { VitePWA } from 'vite-plugin-pwa'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueDevTools(),
    VitePWA({
      registerType: 'autoUpdate',
      manifest: {
        name: 'CONFZone – FrontendNow 2026',
        short_name: 'CONFZone',
        description: 'Dein persönlicher Konferenzbegleiter für die FrontendNow 2026',
        id: '/',
        theme_color: '#006B5E',
        background_color: '#F4FBF8',
        display: 'standalone',
        start_url: '/',
        scope: '/',
        icons: [
          {
            src: 'icons/icon-192.png',
            sizes: '192x192',
            type: 'image/png',
          },
          {
            src: 'icons/icon-512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'any maskable',
          },
        ],
      },
      workbox: {
        globPatterns: ['**/*.{js,css,html,svg,ico,png,woff2}'],
        runtimeCaching: [
          {
            // App Shell und index.html — Network First: immer aktuell, Cache als Offline-Fallback
            urlPattern: ({ request }) => request.mode === 'navigate',
            handler: 'NetworkFirst',
            options: {
              cacheName: 'html-cache',
            },
          },
          {
            // Sessions- & Speaker-Daten + App-Logik (JS/CSS-Bundles) — Cache First
            urlPattern: /\.(?:js|css)$/,
            handler: 'CacheFirst',
            options: {
              cacheName: 'static-assets',
            },
          },
          {
            // Icons, Bilder, Fonts — Cache First: unveränderliche Assets
            urlPattern: /\.(?:svg|ico|png|woff2)$/,
            handler: 'CacheFirst',
            options: {
              cacheName: 'media-assets',
            },
          },
        ],
      },
    }),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
})
