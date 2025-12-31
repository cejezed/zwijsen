import path from 'path';
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import { createRequire } from 'module';
import { getAllPrerenderRoutes } from './data/routes';

const _require = createRequire(import.meta.url);
const prerender = _require('vite-plugin-prerender');
const JSDOMRenderer = _require('@prerenderer/renderer-jsdom');

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, '.', '');
  return {
    base: './',  // Use relative paths for assets
    server: {
      port: 3000,
      host: '0.0.0.0',
    },
    preview: {
      port: 3000
    },
    plugins: [
      react(),
      // === OPTIE A: PRERENDERING (Tijdelijk uitgeschakeld voor stabiliteit) ===
      /*
      prerender({
        staticDir: path.join(__dirname, 'dist'),
        routes: getAllPrerenderRoutes(),
        renderer: new JSDOMRenderer({
          renderAfterDocumentEvent: 'render-event',
          renderAfterTime: 3000
        })
      })
      */
    ],
    define: {
      'process.env.API_KEY': JSON.stringify(env.GEMINI_API_KEY),
      'process.env.GEMINI_API_KEY': JSON.stringify(env.GEMINI_API_KEY)
    },
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      }
    }
  };
});
