import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  server: {
    host: '0.0.0.0',
    port: 3000,
  },
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['favicon.ico', 'apple-touch-icon.png'],
      workbox: {
        globPatterns: ['**/*.{js,css,html,ico,png,svg,webp}'],
        runtimeCaching: [
          {
            urlPattern: /^https:\/\/api\./,
            handler: 'NetworkFirst',
            options: {
              cacheName: 'api-cache',
              expiration: {
                maxEntries: 50,
                maxAgeSeconds: 5 * 60, // 5 minutes
              },
            },
          },
        ],
      },
      manifest: {
        name: 'News Reader PWA',
        short_name: 'NewsReader',
        description: 'A cross-platform news reader app',
        theme_color: '#000000',
        background_color: '#fafafa',
        display: 'standalone',
        display_override: ['fullscreen', 'standalone'],
        scope: '/',
        start_url: '/?utm_source=homescreen',
        orientation: 'portrait-primary',
        icons: [
          {
            src: 'icons/pwa-64x64.png',
            sizes: '64x64',
            type: 'image/png',
          },
          {
            src: 'icons/pwa-192x192.png',
            sizes: '192x192',
            type: 'image/png',
          },
          {
            src: 'icons/pwa-512x512.png',
            sizes: '512x512',
            type: 'image/png',
          },
          {
            src: 'icons/maskable-icon-512x512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'maskable',
          },
        ],
        screenshots: [
          {
            src: 'add2home-screen.jpg',
            sizes: '540x720',
            type: 'image/jpeg',
            form_factor: 'narrow',
          },
          {
            src: 'homescreen-shortcuts-android-02.jpg',
            sizes: '1280x720',
            type: 'image/jpeg',
            form_factor: 'wide',
          },
        ],
      },
    }),
  ],
})