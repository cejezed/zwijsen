# Cloudflare Worker Route Configureren

## Probleem: Worker heeft geen route naar je domein

Je Worker code is correct, maar er is geen "trigger" of "route" die de Worker activeert op `www.zwijsen.net`.

## Oplossing: Routes Toevoegen

Er zijn **2 manieren** om dit te doen in Cloudflare:

---

## Methode 1: Via Worker Settings (Nieuwe Interface)

1. Ga naar [Cloudflare Dashboard](https://dash.cloudflare.com)
2. Selecteer je account
3. Klik op **"Workers & Pages"** in de linker sidebar
4. Klik op je Worker (bijv. "dawn-wave-7ebc" of hoe je hem genoemd hebt)
5. Kijk naar de tabs bovenaan:
   - **Settings** tab
   - **Deployments** tab
   - **Logs** tab
   - **Triggers** tab (of **Routes** tab)

**Als je GEEN "Triggers" tab ziet:**

Klik op **Settings** → Scroll naar beneden → Zoek naar "Routes" of "Custom Domains"

**Voeg toe:**
- Route Pattern: `www.zwijsen.net/*`
- Zone: `zwijsen.net`

---

## Methode 2: Via Zone Settings (Klassieke Manier)

Dit werkt ALTIJD, ook in oudere Cloudflare interfaces:

1. Ga naar [Cloudflare Dashboard](https://dash.cloudflare.com)
2. Klik op je **domein** in de lijst (bijv. `zwijsen.net`)
3. Ga naar **"Workers Routes"** in de linker sidebar
   - Of: **Workers** → **Manage Workers** → **Add Route**
4. Klik **"Add Route"**
5. Vul in:
   - **Route**: `www.zwijsen.net/*`
   - **Worker**: (selecteer je worker uit de dropdown)
6. Klik **"Save"**

---

## Methode 3: Via Custom Domain (Nieuwste Methode)

Als je Cloudflare's nieuwe Custom Domain feature gebruikt:

1. Workers & Pages → Je Worker
2. Klik **"Add Custom Domain"**
3. Voer in: `www.zwijsen.net`
4. Cloudflare configureert automatisch DNS

---

## Verificatie Dat Het Werkt

Na het toevoegen van de route:

### Test 1: Check Headers
```bash
curl -I https://www.zwijsen.net/loosdrecht
```

**Verwacht:**
```
HTTP/2 200
X-Proxy-Target: Vercel
X-Vercel-Domain: zwijsen-eta.vercel.app
```

### Test 2: Browser Test
Open: `https://www.zwijsen.net/loosdrecht`

**Verwacht:** React app wordt geladen (geen WordPress 404)

### Test 3: WordPress Check
Open: `https://www.zwijsen.net/`

**Verwacht:** WordPress homepage (zoals normaal)

---

## Troubleshooting

### "Ik zie nergens Routes of Triggers"

**Mogelijke oorzaak:** Je Worker is nog niet deployed naar een zone.

**Oplossing:**

1. **Wrangler CLI gebruiken:**

```bash
# Installeer Wrangler (als je nog niet hebt)
npm install -g wrangler

# Login
wrangler login

# Deploy met route
wrangler deploy --route "www.zwijsen.net/*"
```

2. **Of via `wrangler.toml` bestand:**

Maak bestand `wrangler.toml` in je project:

```toml
name = "zwijsen-proxy"
main = "CLOUDFLARE_WORKER_FINAL.js"
compatibility_date = "2024-01-01"

routes = [
  { pattern = "www.zwijsen.net/*", zone_name = "zwijsen.net" }
]
```

Dan deploy:
```bash
wrangler deploy
```

---

## Alternative: Test Route Nu Met Wrangler

Als je route UI niet kunt vinden, gebruik gewoon Wrangler CLI:

```bash
# In je zwijsen folder (waar CLOUDFLARE_WORKER_FINAL.js staat)

# 1. Maak wrangler.toml
cat > wrangler.toml << 'EOF'
name = "zwijsen-proxy"
main = "CLOUDFLARE_WORKER_FINAL.js"
compatibility_date = "2024-01-01"

routes = [
  { pattern = "www.zwijsen.net/*", zone_name = "zwijsen.net" }
]
EOF

# 2. Deploy
wrangler deploy
```

Dit zal automatisch:
- Je Worker deployen
- De route configureren naar www.zwijsen.net/*
- Alles activeren

---

## Wat Gebeurt Er Na Route Toevoegen?

Cloudflare stuurt nu ALLE requests naar `www.zwijsen.net/*` eerst naar je Worker.

Je Worker checkt het pad:
- `/loosdrecht` → Stuurt door naar Vercel
- `/loenen-aan-de-vecht` → Stuurt door naar Vercel
- `/regios` → Stuurt door naar Vercel
- `/blog` → Stuurt door naar WordPress (origin)
- `/` → Stuurt door naar WordPress (origin)

---

## Quick Win: Gebruik Wrangler

Als je de UI niet kunt vinden, is Wrangler het snelst:

**1 commando in PowerShell:**

```powershell
# In e:\zwijsen folder
npx wrangler deploy CLOUDFLARE_WORKER_FINAL.js --name zwijsen-proxy --route "www.zwijsen.net/*"
```

Dit zou moeten vragen om:
1. Cloudflare account login (browser opent)
2. Zone selecteren (kies zwijsen.net)
3. Deploy bevestigen

Dan is het live! 🚀

---

**Volgende stap:** Probeer Methode 2 (Via Zone Settings) - dat werkt in elke Cloudflare interface.

Of gebruik gewoon: `npx wrangler deploy CLOUDFLARE_WORKER_FINAL.js --name zwijsen-proxy --route "www.zwijsen.net/*"`
