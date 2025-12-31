# Prerendering Implementatie (De Bulletproof Aanpak)

Om de broncode (`Ctrl+U`) volledig gevuld te krijgen voor SEO en social media previews, veranderen we de site van een pure **Client-Side App** naar een **Prerendered App**.

## Waarom deze aanpak?
- **SEO**: Google ziet direct alle tekst, JSON-LD en meta-tags.
- **Social Media**: WhatsApp/LinkedIn tonen direct de juiste preview-afbeelding.
- **Geen Layout Shifts**: Door de `.is-prerendering` CSS hack staan alle elementen direct op hun plek zonder animatie-delay.

---

## Stappenplan

### 1. Installeer de nodige plugin
Run dit commando in je terminal:
```bash
npm install -D vite-plugin-prerender
```

### 2. Update `vite.config.ts`
Voeg de import toe bovenin en vul de `prerender` plugin in. We gebruiken nu de automatische route-lijst:

```typescript
import prerender from 'vite-plugin-prerender';
import { getAllPrerenderRoutes } from './data/routes'; // De helper die ik heb aangemaakt

const Renderer = prerender.PuppeteerRenderer;

// ... in de plugins array van defineConfig:
plugins: [
  react(),
  prerender({
    staticDir: path.join(__dirname, 'dist'),
    routes: getAllPrerenderRoutes(), // Automatisch alle regio's en projecten!
    renderer: new Renderer({
      renderAfterDocumentEvent: 'render-event',
      headless: true,
      // Geef de app de tijd om metadata te zetten
      maxConcurrentRoutes: 4
    })
  })
]
```

### 3. Hoe het werkt in de code (al voorbereid)

Ik heb de volgende onderdelen al voor je geconfigureerd:

1.  **CSS Animation Kill-switch (`index.css`)**:
    Zodra de prerenderer de site opent, wordt de klasse `body.is-prerendering` toegevoegd. Alle opacity-0 en transform animaties worden dan direct uitgezet, zodat de crawler geen "lege" pagina fotografeert.
    
2.  **Headless Detectie (`App.tsx`)**:
    De app herkent nu zelf of hij in een headless browser draait via `navigator.webdriver`.

3.  **Slimme Ready-check (`RegioDetail.tsx` & `ProjectDetail.tsx`)**:
    In plaats van direct bij het laden te roepen dat we klaar zijn, wacht de code nu tot:
    - De `document.title` daadwerkelijk de regiostad bevat.
    - De `canonical` link klopt.
    - De `JSON-LD` script tags aanwezig zijn.
    Pas dán wordt het `render-event` verzonden naar Puppeteer.

### 4. Build de site
Run:
```bash
npm run build
```
De map `dist/` zal nu echte mappen bevatten (bijv. `dist/loosdrecht/index.html`) met de volledige HTML inhoud.

### 5. Hosting check (Cloudflare/Vercel)
Omdat we op Vercel hosten, wordt dit automatisch goed herkend. De Cloudflare Worker die we eerder hebben ingesteld stuurt verkeer voor `/loosdrecht` al door naar Vercel, en Vercel zal nu het statische bestand serveren in plaats van de lege index.html.
