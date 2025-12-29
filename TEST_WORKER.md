# Cloudflare Worker Test Guide

## Stap 1: Test Direct op Vercel (Zonder Worker)

Eerst checken of Vercel zelf werkt:

```bash
# Test zonder trailing slash
curl -I https://zwijsen-eta.vercel.app/loosdrecht

# Test met trailing slash
curl -I https://zwijsen-eta.vercel.app/loosdrecht/

# Verwacht: 200 OK voor BEIDE
```

**Als dit NIET werkt:**
- Probleem zit in Vercel configuratie
- Check `vercel.json`
- Check of deployment succesvol was

**Als dit WEL werkt:**
- Ga door naar stap 2

---

## Stap 2: Update Worker naar Debug Versie

1. Ga naar Cloudflare Workers
2. Edit je worker
3. Vervang code met `CLOUDFLARE_WORKER_DEBUG.js`
4. **Pas aan:** `VERCEL_DOMAIN = "zwijsen-eta.vercel.app"`
5. Save and Deploy

---

## Stap 3: Test via Cloudflare Worker

```bash
# Test loosdrecht zonder trailing slash
curl -I https://www.zwijsen.net/loosdrecht

# Test loosdrecht met trailing slash
curl -I https://www.zwijsen.net/loosdrecht/
```

**Kijk naar deze headers:**
```
X-Proxy-Target: Vercel
X-Vercel-Domain: zwijsen-eta.vercel.app
X-Original-Path: /loosdrecht/ (of /loosdrecht)
X-Normalized-Path: /loosdrecht
```

---

## Stap 4: Check Worker Logs

1. Cloudflare Dashboard → Workers
2. Je worker → Logs
3. Start Tail
4. Open `https://www.zwijsen.net/loosdrecht/` in browser
5. Zie logs:

```
=== WORKER DEBUG ===
Original URL: https://www.zwijsen.net/loosdrecht/
Original pathname: /loosdrecht/
Normalized pathname: /loosdrecht
Should proxy to Vercel: true
Proxying to Vercel: https://zwijsen-eta.vercel.app/loosdrecht
Vercel response status: 200
```

---

## Mogelijke Problemen & Oplossingen

### Probleem 1: "Vercel response status: 404"

**Oorzaak:** Vercel heeft geen route voor `/loosdrecht`

**Check:**
```bash
# Test direct op Vercel
curl https://zwijsen-eta.vercel.app/loosdrecht
```

**Oplossing:**
- Check `App.tsx` - is de route toegevoegd?
  ```tsx
  <Route path="/loosdrecht" element={<RegioDetail />} />
  ```
- Check `vercel.json` - zijn rewrites correct?
- Redeploy Vercel: `vercel --prod`

### Probleem 2: "Vercel response status: 308 (Redirect)"

**Oorzaak:** Vercel forceert HTTPS of www redirect

**Check logs:** Zie "Location" header in response

**Oplossing:**
```javascript
// In worker, change:
redirect: "follow" // Volg redirects automatisch
```

### Probleem 3: "Should proxy to Vercel: false"

**Oorzaak:** Route matching werkt niet

**Check:**
- Is `/loosdrecht` in `VERCEL_ROUTES` array?
- Typo in route naam?

**Debug:**
```javascript
console.log("Route check:", pathname, "in", VERCEL_ROUTES);
```

### Probleem 4: "Worker Error" of 500

**Check:**
- Worker logs voor JavaScript errors
- Syntax errors in code
- Missing environment variables

---

## Quick Fix: Simplified Worker (Test Only)

Probeer deze ultra-simpele versie om te testen:

```javascript
export default {
  async fetch(request) {
    const url = new URL(request.url);

    // Alleen loosdrecht testen
    if (url.pathname.includes("loosdrecht")) {
      // Redirect naar Vercel
      return fetch("https://zwijsen-eta.vercel.app/loosdrecht");
    }

    // Rest naar WordPress
    return fetch(request);
  },
};
```

Als dit werkt → probleem zit in route matching logic
Als dit niet werkt → probleem zit in Vercel deployment

---

## Vercel Deployment Check

Test of Vercel build succesvol was:

```bash
# Check deployment status
vercel ls

# Check logs
vercel logs zwijsen-eta

# Check deployment URL
vercel inspect zwijsen-eta.vercel.app
```

**Controleer:**
- [ ] Build succesvol? (geen errors)
- [ ] Routes geconfigureerd in `vercel.json`?
- [ ] `dist` folder bevat `index.html`?
- [ ] Browser console errors? (F12)

---

## Chrome DevTools Network Tab

1. Open `https://www.zwijsen.net/loosdrecht/` in Chrome
2. F12 → Network tab
3. Refresh page
4. Klik op eerste request (document)
5. Check:
   - **Status:** 200 of 404?
   - **Headers → Response Headers:**
     - `X-Proxy-Target` header aanwezig?
     - `X-Vercel-Domain` header aanwezig?
   - **Preview tab:** Zie je React app of WordPress 404?

---

## Emergency: Direct Vercel Domain Testen

Als niets werkt, test via Vercel custom domain:

### Optie 1: Vercel Subdomain
1. Vercel Dashboard → Settings → Domains
2. Add domain: `regio.zwijsen.net`
3. Voeg CNAME toe in Cloudflare DNS:
   ```
   regio  CNAME  zwijsen-eta.vercel.app
   ```
4. Test: `https://regio.zwijsen.net/loosdrecht`

### Optie 2: Direct .vercel.app
Test gewoon op:
```
https://zwijsen-eta.vercel.app/loosdrecht
https://zwijsen-eta.vercel.app/loenen-aan-de-vecht
https://zwijsen-eta.vercel.app/regios
```

Als dit werkt → Worker config is het probleem
Als dit niet werkt → Vercel deployment is het probleem

---

## Success Criteria

✅ Worker werkt als:
- `https://www.zwijsen.net/loosdrecht` → 200 OK
- `https://www.zwijsen.net/loosdrecht/` → 200 OK
- Headers tonen: `X-Proxy-Target: Vercel`
- React app wordt getoond (niet WordPress 404)
- Console logs tonen correcte routing
- Geen errors in Cloudflare logs

---

## Next Steps na Fixing

Als het werkt:
1. Verwijder debug headers (X-Original-Path etc)
2. Verwijder console.log statements
3. Switch van DEBUG versie naar FINAL versie
4. Test alle regio's:
   - `/loenen-aan-de-vecht`
   - `/regios`
   - `/hilversum`
   - etc.

Succes! 🔧
