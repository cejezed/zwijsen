# DNS Cache Probleem Oplossen

Je router cached het oude IP adres van zwijsen.net. Hier zijn oplossingen:

## ✅ Snelste Oplossing: Test op Telefoon
1. Schakel WiFi uit op je telefoon
2. Ga naar https://zwijsen.net/hilversum via mobiel internet
3. Je zult zien dat het werkt!

## Router DNS Cache Legen

### Optie 1: Router Herstarten
1. Herstart je router (uit- en aanzetten)
2. Wacht 2-3 minuten
3. Test opnieuw

### Optie 2: Gebruik Cloudflare DNS (Permanent)
1. Druk op Windows + R
2. Typ: `ncpa.cpl` en druk Enter
3. Rechtermuisklik op je netwerkadapter → Properties
4. Dubbelklik op "Internet Protocol Version 4 (TCP/IPv4)"
5. Selecteer "Use the following DNS server addresses"
6. Voer in:
   - Preferred: `1.1.1.1` (Cloudflare)
   - Alternate: `1.0.0.1` (Cloudflare backup)
7. Klik OK
8. Open Command Prompt en run: `ipconfig /flushdns`

### Optie 3: Gebruik Google DNS (Permanent)
Zelfde stappen als boven, maar gebruik:
- Preferred: `8.8.8.8`
- Alternate: `8.8.4.4`

## Verificatie

Na het wijzigen, test met:
```bash
nslookup zwijsen.net
```

Je zou deze IP's moeten zien (Cloudflare):
- `188.114.96.0`
- `188.114.97.0`

Als je nog steeds `45.82.189.114` ziet, is de DNS cache nog niet ververst.

## Voor Andere Gebruikers

Andere bezoekers van je website zullen GEEN probleem hebben. Dit DNS cache probleem is alleen lokaal op computers die zwijsen.net EERDER hebben bezocht toen het nog naar het oude IP wees. Nieuwe bezoekers krijgen automatisch het juiste Cloudflare IP.

## Status Check

Test of de Worker actief is via deze URL's:
- Direct Worker: https://dawn-wave-7ebc.cejezed.workers.dev/regios ✅ Werkt
- Via Domain: https://zwijsen.net/regios ✅ Werkt (wereldwijd)
- Via Domain: https://zwijsen.net/hilversum ✅ Werkt (wereldwijd)

Het probleem is **alleen jouw lokale DNS cache**, niet de configuratie!
