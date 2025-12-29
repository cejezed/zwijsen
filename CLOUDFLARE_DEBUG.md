# Cloudflare Worker Debugging Guide

## Stap-voor-stap Setup & Testing

### 1. Worker Code Installeren

1. **Ga naar Cloudflare Dashboard**
   - https://dash.cloudflare.com
   - Selecteer je account
   - Workers & Pages

2. **Create Worker**
   - Klik "Create Worker"
   - Naam: `zwijsen-proxy`
   - Klik "Deploy"

3. **Edit Code**
   - Klik "Edit Code"
   - Verwijder alle standaard code
   - Kopieer code uit `CLOUDFLARE_WORKER_FINAL.js`
   - **PAS AAN:** Regel 11: `const VERCEL_DOMAIN = "zwijsen-eta.vercel.app";`
     - Vervang met jouw Vercel URL
   - Klik "Save and Deploy"

### 2. Route Configureren

1. **Triggers Tab**
   - Ga naar je Worker → Triggers
   - Add Route

2. **Route Settings:**
   - Route: `zwijsen.net/*`
   - Zone: `zwijsen.net`
   - Worker: `zwijsen-proxy`

3. **Save**

### 3. Testen

#### Test 1: WordPress Homepage
```bash
curl -I https://zwijsen.net/

# Verwacht:
# HTTP/2 200
# X-Proxy-Target: WordPress
```

#### Test 2: Vercel Regio Pagina
```bash
curl -I https://zwijsen.net/loenen-aan-de-vecht

# Verwacht:
# HTTP/2 200
# X-Proxy-Target: Vercel
# X-Vercel-Domain: zwijsen-eta.vercel.app
```

#### Test 3: WordPress Blog
```bash
curl -I https://zwijsen.net/blog

# Verwacht:
# HTTP/2 200
# X-Proxy-Target: WordPress
```

### 4. Browser Testing

Open in browser:

- `https://zwijsen.net/` → WordPress
- `https://zwijsen.net/loenen-aan-de-vecht` → Vercel (React app)
- `https://zwijsen.net/regios` → Vercel

**Check Response Headers:**
- Chrome: F12 → Network tab → Klik op pagina → Headers
- Zoek naar: `X-Proxy-Target`

---

## Troubleshooting

### Probleem: "404 Not Found" op Vercel routes

**Oorzaak:** Vercel deployment niet correct geconfigureerd

**Oplossing:**
1. Test eerst rechtstreeks op Vercel:
   ```
   https://zwijsen-eta.vercel.app/loenen-aan-de-vecht
   ```
2. Werkt het daar? Dan is Worker config verkeerd
3. Werkt het daar niet? Check `vercel.json`

### Probleem: "Too Many Redirects"

**Oorzaak:** Redirect loop tussen WordPress en Worker

**Oplossing:**
1. Check WordPress .htaccess voor redirects
2. Disable WordPress SEO redirects tijdelijk
3. Check Cloudflare Page Rules (disable tijdelijk)

### Probleem: "Worker Error" / 500

**Oorzaak:** JavaScript error in Worker

**Oplossing:**
1. Cloudflare Dashboard → Workers → je worker → Logs
2. Check syntax errors
3. Test met simplified code:

```javascript
export default {
  async fetch(request) {
    return new Response("Worker werkt!", { status: 200 });
  }
};
```

### Probleem: Headers niet zichtbaar

**Oorzaak:** Headers worden niet doorgegeven

**Check:**
```bash
curl -I -H "User-Agent: curl" https://zwijsen.net/loenen-aan-de-vecht
```

### Probleem: CSS/JS laden niet

**Oorzaak:** Relatieve paden werken niet

**Oplossing:**
1. Check of assets in Vercel correct deployen
2. Open Network tab in Chrome DevTools
3. Zie welke bestanden 404 geven
4. Check `public/` folder in je React app

---

## Worker Logs Bekijken

### Real-time Logs

1. Cloudflare Dashboard → Workers
2. Je worker → Logs
3. Start streaming
4. Refresh je website
5. Zie logs in real-time

### Log Toevoegen aan Worker

```javascript
export default {
  async fetch(request) {
    const url = new URL(request.url);

    // Log alle requests
    console.log("Request:", url.pathname);

    // ... rest van code

    const response = await fetch(vercelRequest);
    console.log("Response status:", response.status);

    return response;
  }
};
```

---

## Veelvoorkomende Fouten & Fixes

### Fout 1: Host Header Conflict

**Error:** `ERR_TOO_MANY_REDIRECTS`

**Fix:**
```javascript
// ❌ FOUT
modifiedRequest.headers.set("Host", VERCEL_DOMAIN);

// ✅ GOED
modifiedRequest.headers.delete("Host");
// OF gewoon niet aanraken
```

### Fout 2: Trailing Slash Inconsistentie

**Error:** Routes werken niet met `/` aan het eind

**Fix:**
```javascript
const pathname = url.pathname.replace(/\/$/, "") || "/";
```

### Fout 3: Query Parameters Verloren

**Error:** URL parameters (bijv. `?utm_source=google`) verdwijnen

**Fix:**
```javascript
const vercelUrl = `https://${VERCEL_DOMAIN}${url.pathname}${url.search}`;
//                                                         ^^^^^^^^^^^ belangrijk
```

### Fout 4: POST Requests Falen

**Error:** Formulieren werken niet

**Fix:**
```javascript
const vercelRequest = new Request(vercelUrl, {
  method: request.method,  // ← Niet hardcoden naar "GET"
  headers: request.headers,
  body: request.body,      // ← Body meesturen
  redirect: "manual",
});
```

---

## Performance Optimization

### Caching

Voeg toe aan Worker voor betere performance:

```javascript
export default {
  async fetch(request) {
    const cache = caches.default;
    const cacheKey = new Request(request.url, request);

    // Check cache
    let response = await cache.match(cacheKey);

    if (!response) {
      // ... routing logic hier

      // Cache static assets
      if (url.pathname.match(/\.(jpg|png|css|js|woff2)$/)) {
        response = new Response(response.body, response);
        response.headers.set("Cache-Control", "public, max-age=3600");
        await cache.put(cacheKey, response.clone());
      }
    }

    return response;
  }
};
```

### Compression

```javascript
// In Worker response
modifiedResponse.headers.set("Content-Encoding", "gzip");
```

---

## Testing Checklist

Voordat je live gaat:

- [ ] WordPress homepage werkt: `https://zwijsen.net/`
- [ ] WordPress blog werkt: `https://zwijsen.net/blog`
- [ ] WordPress admin werkt: `https://zwijsen.net/wp-admin`
- [ ] Vercel regio werkt: `https://zwijsen.net/loenen-aan-de-vecht`
- [ ] Vercel regios overzicht: `https://zwijsen.net/regios`
- [ ] Assets laden (CSS/JS)
- [ ] Formulieren werken
- [ ] Geen console errors
- [ ] Headers correct (check X-Proxy-Target)
- [ ] Mobile werkt
- [ ] Snelheid OK (Lighthouse score)

---

## Rollback Plan

Als het niet werkt:

### Quick Fix: Disable Worker

1. Cloudflare Dashboard → Workers
2. Je worker → Triggers
3. Delete de route `zwijsen.net/*`
4. Alles gaat weer direct naar WordPress

### Alternative: Bypass Worker

Via DNS:
1. Cloudflare → DNS
2. Verander A record naar direct IP (bypass Cloudflare proxy)
3. Orange cloud → Gray cloud

---

## Support

**Cloudflare Docs:**
- Workers: https://developers.cloudflare.com/workers/
- Routing: https://developers.cloudflare.com/workers/platform/routes/

**Debug Tools:**
- Cloudflare Worker Logs
- Chrome DevTools Network tab
- `curl -I` command
- Postman

**Common Issues:**
- https://community.cloudflare.com/c/developers/workers/

Succes! 🚀
