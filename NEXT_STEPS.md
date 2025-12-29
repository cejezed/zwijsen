# Next Steps - Cloudflare Worker Troubleshooting

## Status: Worker Code is Correct ✅

De logs laten zien dat je Worker code correct werkt:
- Request wordt ontvangen
- Pathname wordt correct genormaliseerd
- Routing logic werkt (root `/` gaat correct naar WordPress)

## Probleem: Verkeerde Test URL ❌

Je test op: `https://dawn-wave-7ebc.cejezed.workers.dev/`
Je moet testen op: `https://www.zwijsen.net/loosdrecht`

## Wat Nu Te Doen:

### Stap 1: Check Route Configuration in Cloudflare

1. Ga naar [Cloudflare Dashboard](https://dash.cloudflare.com)
2. Selecteer je account
3. Workers & Pages
4. Klik op je Worker (bijvoorbeeld "dawn-wave-7ebc")
5. Ga naar **Triggers** tab
6. Check of er een route is toegevoegd

**Verwacht:**
```
Route: www.zwijsen.net/*
Zone: zwijsen.net
```

**Als deze route er NIET staat:**
- Klik "Add Route"
- Route: `www.zwijsen.net/*`
- Zone: `zwijsen.net`
- Worker: (selecteer je worker)
- Save

### Stap 2: Test Op Productie Domein

**In je browser of via curl:**

```bash
# Test loosdrecht pagina
curl -I https://www.zwijsen.net/loosdrecht

# Verwacht:
# HTTP/2 200
# X-Proxy-Target: Vercel
# X-Vercel-Domain: zwijsen-eta.vercel.app
# X-Original-Path: /loosdrecht
# X-Normalized-Path: /loosdrecht
```

```bash
# Test met trailing slash
curl -I https://www.zwijsen.net/loosdrecht/

# Verwacht: Ook 200 OK met zelfde headers
```

### Stap 3: Check Logs Opnieuw

1. Houd je Cloudflare Worker logs tab open (streaming)
2. Open in browser: `https://www.zwijsen.net/loosdrecht`
3. Kijk naar de logs

**Verwachte logs:**
```
=== WORKER DEBUG ===
Original URL: https://www.zwijsen.net/loosdrecht
Original pathname: /loosdrecht
Normalized pathname: /loosdrecht
Should proxy to Vercel: true
Proxying to Vercel: https://zwijsen-eta.vercel.app/loosdrecht
Vercel response status: 200
```

### Stap 4: Als Je NOG STEEDS Geen Route Ziet

**Optie A: Test eerst DIRECT op Vercel**

```bash
# Bypass Worker, test rechtstreeks op Vercel
curl -I https://zwijsen-eta.vercel.app/loosdrecht
```

Als dit een **404** geeft → Probleem zit in Vercel deployment
Als dit **200** geeft → Probleem zit in Worker routing

**Optie B: Check Cloudflare DNS Settings**

1. Cloudflare Dashboard → DNS
2. Check of `www.zwijsen.net` A record bestaat
3. Check of de **oranje cloud** (Proxied) aan staat
4. Als de cloud grijs is → Klik erop om proxy te activeren

### Stap 5: Als Route WEL Geconfigureerd Is

Maar het nog steeds niet werkt, check:

1. **Vercel Domain Correct?**
   - In je Worker code: `VERCEL_DOMAIN = "zwijsen-eta.vercel.app"`
   - Check in Vercel Dashboard of deze URL klopt

2. **Vercel Deployment Live?**
   ```bash
   vercel ls
   ```
   Check of `zwijsen-eta` deployment status "Ready" is

3. **WordPress Site Bereikbaar?**
   ```bash
   curl -I https://www.zwijsen.net/
   ```
   Moet 200 geven

## Meest Waarschijnlijke Oplossing

Je moet waarschijnlijk alleen de **Route toevoegen** in Cloudflare:

1. Workers & Pages → Je Worker → Triggers → Add Route
2. Route: `www.zwijsen.net/*`
3. Zone: `zwijsen.net`
4. Save

Dan test je op `https://www.zwijsen.net/loosdrecht` (niet op de worker dev URL).

## Debugging Checklist

- [ ] Route geconfigureerd in Cloudflare (www.zwijsen.net/*)
- [ ] Oranje cloud actief in DNS settings
- [ ] Test op www.zwijsen.net, niet op worker dev URL
- [ ] Vercel deployment is live (curl test)
- [ ] Worker logs tonen "Should proxy to Vercel: true"
- [ ] Browser toont React app, niet WordPress 404

---

**Volgende stap:** Check je Cloudflare Workers → Triggers tab en vertel me wat je ziet.
