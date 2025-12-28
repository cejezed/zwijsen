# Deployment Checklist - Vercel + WordPress Hybride Setup

## Pre-Deployment

### 1. Code Gereed
- [ ] Alle regio's toegevoegd aan `data/regions/`
- [ ] Routes toegevoegd in `App.tsx`
- [ ] Sitemap.xml up-to-date met alle regio's
- [ ] SEO metadata compleet (seoTitle, metaDescription)
- [ ] JSON-LD structured data getest
- [ ] Build succesvol lokaal: `npm run build`
- [ ] Preview lokaal: `npm run preview`

### 2. Content Check
- [ ] Alle afbeeldingen in `/public/images/`
- [ ] Hero slides aanwezig voor elke regio
- [ ] Collage afbeeldingen aanwezig (6 per regio)
- [ ] Project afbeeldingen beschikbaar
- [ ] Alt-teksten ingevuld voor alle afbeeldingen

### 3. SEO Validatie
- [ ] Google Search Console preview getest
- [ ] Schema.org validator: https://validator.schema.org/
- [ ] Meta tags checker: https://metatags.io/
- [ ] Lighthouse audit score >90

---

## Vercel Deployment

### 1. Eerste Deployment
```bash
# Installeer Vercel CLI
npm install -g vercel

# Login
vercel login

# Deploy naar production
vercel --prod
```

### 2. Vercel Dashboard Instellingen
- [ ] Project naam: `zwijsen-regio` (of eigen naam)
- [ ] Framework Preset: `Vite`
- [ ] Build Command: `npm run build`
- [ ] Output Directory: `dist`
- [ ] Environment Variables toegevoegd (zie `.env.example`)

### 3. Custom Domain (Optioneel)
- [ ] Voeg custom domain toe: `regio.zwijsen.net`
- [ ] Of gebruik `.vercel.app` subdomain
- [ ] SSL certificaat automatisch geactiveerd

### 4. Vercel Settings Check
- [ ] **General:**
  - Node.js Version: `18.x` of hoger
  - Install Command: `npm install`
- [ ] **Git:**
  - Production Branch: `main`
  - Automatic deployments: `Enabled`
- [ ] **Domains:**
  - Vercel domain toegevoegd
  - SSL/TLS: `Enabled`

---

## Cloudflare Setup

### Optie A: Cloudflare Workers (Aanbevolen)

#### 1. Worker Aanmaken
- [ ] Ga naar Cloudflare Dashboard → Workers & Pages
- [ ] Create Worker → Naam: `zwijsen-proxy`
- [ ] Kopieer worker script uit `CLOUDFLARE_SETUP.md`
- [ ] Vervang `zwijsen-regio.vercel.app` met jouw Vercel URL

#### 2. Worker Routes Configureren
- [ ] Triggers → Add Route
- [ ] Route: `zwijsen.net/*`
- [ ] Zone: `zwijsen.net`
- [ ] Sla op

#### 3. Worker Script Testen
```bash
# Test via curl
curl -I https://zwijsen.net/loenen-aan-de-vecht

# Controleer response headers:
# - Should return 200 OK
# - X-Proxied-By: Cloudflare-Worker (optioneel)
```

#### 4. Regio Routes Lijst
Update worker met alle regio's:
```javascript
const vercelRoutes = [
  '/loenen-aan-de-vecht',
  '/loosdrecht',
  '/regios',
  '/projecten'
  // Voeg nieuwe regio's hier toe
]
```

---

### Optie B: Cloudflare Page Rules (Simpeler, maar gelimiteerd)

- [ ] Cloudflare Dashboard → Rules → Page Rules
- [ ] Maak regel per regio (max 3 gratis):

**Regel 1:**
- URL pattern: `zwijsen.net/loenen-aan-de-vecht*`
- Setting: `Forwarding URL` (302)
- Destination: `https://jouw-vercel-url.vercel.app/loenen-aan-de-vecht$1`

**Regel 2:**
- URL pattern: `zwijsen.net/loosdrecht*`
- Setting: `Forwarding URL` (302)
- Destination: `https://jouw-vercel-url.vercel.app/loosdrecht$1`

**Regel 3:**
- URL pattern: `zwijsen.net/regios*`
- Setting: `Forwarding URL` (302)
- Destination: `https://jouw-vercel-url.vercel.app/regios$1`

---

## WordPress Configuratie

### 1. Redirect Conflicten Voorkomen
- [ ] Check .htaccess: Geen redirects voor `/loenen-aan-de-vecht`, `/loosdrecht`, etc.
- [ ] Check WordPress redirects plugin (indien actief)
- [ ] Yoast SEO: Geen automatische redirects voor deze routes

### 2. Sitemap Integratie

**Optie 1: Handmatige sitemap combinatie**
- [ ] Upload `sitemap.xml` naar WordPress root
- [ ] Bevat zowel WordPress als Vercel routes

**Optie 2: WordPress plugin/code**
Voeg toe aan `functions.php`:
```php
// Voeg Vercel sitemap toe aan index
add_filter('wpseo_sitemap_index', function($sitemap) {
    $vercel = '<sitemap><loc>https://zwijsen.net/vercel-sitemap.xml</loc></sitemap>';
    return str_replace('</sitemapindex>', $vercel . '</sitemapindex>', $sitemap);
});
```

### 3. Internal Links
- [ ] Update WordPress menu's met links naar regio's
- [ ] Gebruik absolute URLs: `https://zwijsen.net/loenen-aan-de-vecht`

---

## Google Search Console

### 1. Sitemap Indienen
- [ ] Ga naar Google Search Console
- [ ] Sitemaps → Add new sitemap
- [ ] Voeg toe: `https://zwijsen.net/sitemap.xml`
- [ ] Verifieer dat Vercel routes worden geïndexeerd

### 2. URL Inspection
Test een paar regio URL's:
- [ ] `https://zwijsen.net/loenen-aan-de-vecht`
- [ ] `https://zwijsen.net/loosdrecht`
- [ ] Request indexing indien nodig

### 3. Coverage Check
- [ ] Controleer na 1-2 weken of regio's geïndexeerd zijn
- [ ] Check "Coverage" rapport voor errors

---

## Testing Checklist

### Functioneel
- [ ] **Homepage WordPress werkt:** `https://zwijsen.net/`
- [ ] **WordPress blog werkt:** `https://zwijsen.net/blog`
- [ ] **Regio Loenen werkt:** `https://zwijsen.net/loenen-aan-de-vecht`
- [ ] **Regio Loosdrecht werkt:** `https://zwijsen.net/loosdrecht`
- [ ] **Regios overzicht werkt:** `https://zwijsen.net/regios`
- [ ] **Projecten werkt:** `https://zwijsen.net/projecten`
- [ ] **Project detail werkt:** `https://zwijsen.net/projecten/moderne-rietkapvilla-het-gooi`

### Performance
- [ ] Lighthouse score Desktop >90
- [ ] Lighthouse score Mobile >85
- [ ] Eerste Contentful Paint <2s
- [ ] Time to Interactive <3s

### SEO
- [ ] Meta tags correct op alle pagina's
- [ ] JSON-LD structured data aanwezig
- [ ] Canonical URLs correct
- [ ] Open Graph tags aanwezig
- [ ] Sitemap toegankelijk en correct

### Mobile
- [ ] Responsive design werkt op 320px breedte
- [ ] Touch targets minimaal 44x44px
- [ ] Geen horizontale scroll
- [ ] Tabs scrollbaar op mobiel (ProcessSectionCompact)
- [ ] QuickProjectsGrid 2x2 grid op mobiel

### Cross-browser
- [ ] Chrome (latest)
- [ ] Firefox (latest)
- [ ] Safari (latest)
- [ ] Edge (latest)
- [ ] Safari iOS
- [ ] Chrome Android

---

## Post-Deployment Monitoring

### Dag 1
- [ ] Check Vercel Analytics voor errors
- [ ] Check Cloudflare Analytics voor traffic
- [ ] Check server logs voor 404s
- [ ] Test alle regio URL's

### Week 1
- [ ] Google Search Console coverage check
- [ ] Check bounce rate in analytics
- [ ] Monitor page load times
- [ ] Check for broken links

### Maand 1
- [ ] Check Google rankings voor regio keywords
- [ ] Analyseer user behavior per regio
- [ ] Check Vercel bandwidth usage
- [ ] Review en optimaliseer indien nodig

---

## Rollback Plan

Als er iets fout gaat:

### 1. Vercel Rollback
```bash
vercel rollback
```
Of via dashboard: Deployments → Previous deployment → Promote to Production

### 2. Cloudflare Worker Uitschakelen
- Cloudflare Dashboard → Workers
- Disable route of verwijder worker

### 3. DNS Fallback
- Cloudflare Dashboard → DNS
- Verwijder CNAME voor `regio` subdomain (indien gebruikt)

---

## Kosten Breakdown

| Service | Plan | Maandkosten |
|---------|------|-------------|
| Vercel Hobby | Gratis | €0 |
| Cloudflare Workers | Gratis | €0 |
| WordPress Hosting | Bestaand | - |
| **Totaal** | | **€0** |

Upgrade alleen nodig bij:
- >100k requests/dag (Cloudflare Workers)
- >100GB bandwidth/maand (Vercel)
- >3 Page Rules (Cloudflare)

---

## Support Contacten

- **Vercel Support:** https://vercel.com/support
- **Cloudflare Support:** https://dash.cloudflare.com/support
- **Documentatie:** Zie `CLOUDFLARE_SETUP.md`

---

## ✅ Deployment Compleet!

Na het afvinken van alle items hierboven is je hybride setup live:
- WordPress blijft de hoofdsite
- Regio paginas draaien op Vercel
- Alles onder één domein: `zwijsen.net`
- Google ziet één unified website
- Optimale performance en SEO
