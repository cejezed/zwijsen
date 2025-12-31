import path from 'path';
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import prerender from 'vite-plugin-prerender';
import { getAllPrerenderRoutes } from './data/routes';

const Renderer = (prerender as any).PuppeteerRenderer;

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
      // === OPTIE A: PRERENDERING ACTIVATIE ===
      // Dit genereert statische HTML files voor elke route tijdens de build.
      prerender({
        staticDir: path.join(__dirname, 'dist'),
        routes: getAllPrerenderRoutes(),
        renderer: new Renderer({
          renderAfterDocumentEvent: 'render-event',
          headless: true,
          // Geef de app de tijd om metadata te zetten
          maxConcurrentRoutes: 4
        })
      })
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
