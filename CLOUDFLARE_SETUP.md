# Cloudflare Setup voor Hybride WordPress + Vercel

Deze guide helpt je om WordPress op het hoofddomein te houden en specifieke regio-routes naar Vercel door te sturen.

## Architectuur Overzicht

```
zwijsen.net (WordPress root)
├── /                           → WordPress
├── /blog                       → WordPress
├── /contact                    → WordPress
│
├── /loenen-aan-de-vecht       → Vercel (React app)
├── /loosdrecht                → Vercel (React app)
├── /regios                    → Vercel (React app)
├── /projecten                 → Vercel (React app)
└── /projecten/*               → Vercel (React app)
```

## Stap 1: Vercel Project Deployment

1. **Deploy naar Vercel:**
   ```bash
   npm run build
   vercel --prod
   ```

2. **Noteer je Vercel deployment URL:**
   - Bijvoorbeeld: `zwijsen-regio.vercel.app`

3. **Vercel Custom Domain (optioneel maar aanbevolen):**
   - Voeg `regio.zwijsen.net` toe als custom domain in Vercel
   - Of gebruik de `.vercel.app` URL

## Stap 2: Cloudflare Page Rules Setup

### Optie A: Via Cloudflare Dashboard (Aanbevolen voor beginners)

Ga naar: **Cloudflare Dashboard → Rules → Page Rules**

Maak voor elke regio een regel aan:

#### Regel 1: Loenen aan de Vecht
```
If the URL matches: zwijsen.net/loenen-aan-de-vecht*
Then: Forwarding URL (301 or 302 redirect)
Destination: https://zwijsen-regio.vercel.app/loenen-aan-de-vecht$1
```

#### Regel 2: Loosdrecht
```
If the URL matches: zwijsen.net/loosdrecht*
Then: Forwarding URL (301 or 302 redirect)
Destination: https://zwijsen-regio.vercel.app/loosdrecht$1
```

#### Regel 3: Regio's overzicht
```
If the URL matches: zwijsen.net/regios*
Then: Forwarding URL (301 or 302 redirect)
Destination: https://zwijsen-regio.vercel.app/regios$1
```

#### Regel 4: Projecten
```
If the URL matches: zwijsen.net/projecten*
Then: Forwarding URL (301 or 302 redirect)
Destination: https://zwijsen-regio.vercel.app/projecten$1
```

**Let op:** Cloudflare gratis plan heeft limiet van 3 Page Rules. Voor meer regios heb je een betaald plan nodig of gebruik je Workers (zie hieronder).

---

### Optie B: Cloudflare Workers (Aanbevolen - Onbeperkt regels)

Ga naar: **Cloudflare Dashboard → Workers & Pages → Create Worker**

#### Worker Script:

```javascript
addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request))
})

async function handleRequest(request) {
  const url = new URL(request.url)
  const pathname = url.pathname

  // Lijst van regio routes die naar Vercel moeten
  const vercelRoutes = [
    '/loenen-aan-de-vecht',
    '/loosdrecht',
    '/regios',
    '/projecten'
  ]

  // Check of de route naar Vercel moet
  const shouldProxyToVercel = vercelRoutes.some(route =>
    pathname === route || pathname.startsWith(route + '/')
  )

  if (shouldProxyToVercel) {
    // Proxy naar Vercel
    const vercelUrl = `https://zwijsen-regio.vercel.app${pathname}${url.search}`

    const modifiedRequest = new Request(vercelUrl, {
      method: request.method,
      headers: request.headers,
      body: request.body
    })

    const response = await fetch(modifiedRequest)

    // Clone response en voeg custom headers toe indien nodig
    const newResponse = new Response(response.body, response)
    newResponse.headers.set('X-Proxied-By', 'Cloudflare-Worker')

    return newResponse
  }

  // Anders: door naar WordPress (origin server)
  return fetch(request)
}
```

#### Worker Route instellen:
1. Ga naar **Workers & Pages → je worker → Triggers**
2. Voeg route toe: `zwijsen.net/*`
3. Sla op

---

### Optie C: Nginx Reverse Proxy (Voor zelfgehoste WordPress)

Als je toegang hebt tot de webserver, voeg dit toe aan je Nginx config:

```nginx
server {
    server_name zwijsen.net;

    # Regio routes naar Vercel
    location ~ ^/(loenen-aan-de-vecht|loosdrecht|regios|projecten) {
        proxy_pass https://zwijsen-regio.vercel.app;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }

    # Alle andere routes naar WordPress
    location / {
        # WordPress configuratie
        try_files $uri $uri/ /index.php?$args;
    }
}
```

Herstart Nginx:
```bash
sudo nginx -t
sudo systemctl reload nginx
```

---

## Stap 3: DNS Configuratie

**Geen wijzigingen nodig!** Je DNS blijft wijzen naar:
- A record: `zwijsen.net` → Je WordPress hosting IP
- OF Cloudflare Proxy (oranje wolkje aan)

---

## Stap 4: Testen

Test elke route:

```bash
# WordPress routes (moeten werken zoals voorheen)
curl -I https://zwijsen.net/
curl -I https://zwijsen.net/blog

# Vercel routes (moeten React app tonen)
curl -I https://zwijsen.net/loenen-aan-de-vecht
curl -I https://zwijsen.net/loosdrecht
curl -I https://zwijsen.net/regios
curl -I https://zwijsen.net/projecten
```

Of gewoon in browser:
- https://zwijsen.net/ → WordPress
- https://zwijsen.net/loenen-aan-de-vecht → React app
- https://zwijsen.net/loosdrecht → React app

---

## SEO Overwegingen

✅ **Voordelen van deze setup:**
- Google ziet één domein (`zwijsen.net`)
- Geen duplicate content issues
- Alle pagina's onder één authority domain
- Sitemap kan beide systemen bevatten

⚠️ **Aandachtspunten:**
- Zorg dat sitemap.xml beide systemen bevat (WordPress + Vercel routes)
- Canonical URLs moeten correct zijn
- robots.txt moet beide delen toestaan

### Gecombineerde Sitemap

Maak een WordPress plugin of voeg toe aan functions.php:

```php
// WordPress: Voeg Vercel routes toe aan sitemap
add_filter('wpseo_sitemap_index', 'add_vercel_routes_to_sitemap');

function add_vercel_routes_to_sitemap($sitemap) {
    $vercel_sitemap = '
    <sitemap>
        <loc>https://zwijsen.net/vercel-sitemap.xml</loc>
        <lastmod>' . date('c') . '</lastmod>
    </sitemap>';

    $sitemap = str_replace('</sitemapindex>', $vercel_sitemap . '</sitemapindex>', $sitemap);
    return $sitemap;
}
```

En host de `sitemap.xml` van Vercel op `/vercel-sitemap.xml` via een Worker of aparte route.

---

## Nieuwe Regio Toevoegen

1. **Code:** Voeg regio toe zoals in TEMPLATE.md
2. **Vercel:** Deploy nieuwe versie
3. **Cloudflare:**
   - **Workers:** Voeg slug toe aan `vercelRoutes` array
   - **Page Rules:** Maak nieuwe rule (let op limiet van 3)
4. **Sitemap:** Update sitemap.xml met nieuwe regio URL

---

## Troubleshooting

### "Redirect loop"
- Check of WordPress geen eigen redirects heeft voor deze routes
- Controleer .htaccess in WordPress

### "404 on Vercel routes"
- Controleer of vercel.json correct is
- Test rechtstreeks op vercel.app domein

### "CORS errors"
- Voeg CORS headers toe in Cloudflare Worker
- Check Vercel headers configuratie

### "Slow response times"
- Gebruik Cloudflare caching voor statische assets
- Zet Cache-Control headers correct in Vercel

---

## Kosten Overzicht

| Methode | Kosten | Limieten |
|---------|--------|----------|
| Cloudflare Page Rules | Gratis (3 rules) / $20/mnd (20 rules) | 3 rules gratis |
| Cloudflare Workers | Gratis (100k req/dag) / $5/mnd | 100k requests/dag gratis |
| Nginx | Alleen server kosten | Geen limiet |
| Vercel | Gratis (hobby) / $20/mnd (pro) | 100GB bandwidth gratis |

**Aanbeveling:** Start met Cloudflare Workers (gratis & onbeperkt regels).

---

## Support

Bij vragen of problemen:
1. Check Cloudflare Analytics voor errors
2. Check Vercel logs voor deployment issues
3. Test routes in incognito mode (cache bypass)
