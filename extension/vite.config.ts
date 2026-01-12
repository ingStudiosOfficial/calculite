import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import webExtension from 'vite-plugin-web-extension';

export default defineConfig({
  plugins: [
    vue(),
    webExtension({
      manifest: './manifest.json',
      browser: 'chrome',
    }),
  ],
});