# WordPress Contact Form 7 Koppeling - Stappenplan

## ✅ Wat we al hebben gedaan:

1. ✅ React formulier gebouwd in `components/Overlays.tsx`
2. ✅ Vercel API endpoint gemaakt in `api/contact.ts`
3. ✅ Contact Form 7 integratie code geschreven
4. ✅ `@vercel/node` package geïnstalleerd

## 📋 Wat je nog moet doen:

### Stap 1: WordPress Plugin Installatie

1. Log in op WordPress admin: `https://www.zwijsen.net/wp-admin`
2. Ga naar **Plugins → Add New**
3. Zoek en installeer deze plugins:
   - **Contact Form 7** (als je die nog niet hebt)
   - **Contact Form 7 REST API Support**
4. Activeer beide plugins

### Stap 2: Contact Form 7 Formulier Opzetten

1. Ga naar **Contact → Contact Forms**
2. Open je bestaande formulier OF maak een nieuw formulier
3. Zorg dat je formulier deze velden heeft:
   ```
   <label> Je naam
       [text* your-name] </label>

   <label> Je email
       [email* your-email] </label>

   <label> Telefoon (optioneel)
       [tel your-phone] </label>

   <label> Je bericht
       [textarea* your-message] </label>

   <label> Regio (optioneel)
       [text regio] </label>

   [submit "Versturen"]
   ```

4. **Belangrijke veldnamen** (deze matchen met onze code):
   - `your-name` (verplicht)
   - `your-email` (verplicht)
   - `your-phone` (optioneel)
   - `your-message` (verplicht)
   - `regio` (optioneel)

### Stap 3: Vind je Form ID

1. In Contact Form 7 lijst, zie je een kolom "Shortcode"
2. Bijvoorbeeld: `[contact-form-7 id="123" title="Contact form 1"]`
3. Het getal **123** is je Form ID
4. Of kijk in de URL wanneer je het formulier bewerkt: `post.php?post=123&action=edit`

### Stap 4: Configureer Vercel Environment Variables

1. Ga naar [Vercel Dashboard](https://vercel.com)
2. Selecteer je project "zwijsen"
3. Ga naar **Settings → Environment Variables**
4. Voeg deze toe:

   | Name | Value | Environment |
   |------|-------|-------------|
   | `WORDPRESS_URL` | `https://www.zwijsen.net` | Production, Preview, Development |
   | `CF7_FORM_ID` | `123` (jouw daadwerkelijke ID) | Production, Preview, Development |

5. Klik **Save**

### Stap 5: Deploy naar Vercel

```bash
git add .
git commit -m "Add WordPress Contact Form 7 integration"
git push
```

Vercel zal automatisch deployen.

### Stap 6: Test de Integratie

1. **Test lokaal** (optioneel):
   ```bash
   # Maak een .env file
   echo "WORDPRESS_URL=https://www.zwijsen.net" > .env
   echo "CF7_FORM_ID=123" >> .env

   # Start dev server
   npm run dev
   ```

2. **Test op productie**:
   - Ga naar `https://zwijsen.net/hilversum` (over 1-2 uur als DNS is gepropageerd)
   - Of test via `https://zwijsen-eta.vercel.app/hilversum`
   - Vul het formulier in en verstuur
   - Check je WordPress admin: **Contact → Submissions**

### Stap 7: Verifieer dat het werkt

1. **Check Vercel Logs**:
   - Ga naar Vercel Dashboard → Functions → Logs
   - Je zou moeten zien: "Sending to WordPress CF7"

2. **Check WordPress**:
   - Ga naar **Contact → Contact Forms**
   - Klik op je formulier
   - Je zou submissions moeten zien

3. **Check Email**:
   - Contact Form 7 stuurt automatisch emails
   - Check je inbox (het email adres dat je in CF7 hebt geconfigureerd)

## 🐛 Troubleshooting

### "Cannot find module '@vercel/node'"
- ✅ Al opgelost - we hebben het geïnstalleerd

### "CF7 Error: validation_failed"
- Check of de veldnamen exact matchen: `your-name`, `your-email`, etc.
- Check of required fields (*) correct zijn ingesteld in CF7

### "WordPress form submission failed"
- Check of **Contact Form 7 REST API Support** plugin actief is
- Test de API direct: `https://www.zwijsen.net/wp-json/contact-form-7/v1/contact-forms`
- Dit zou een lijst van formulieren moeten tonen

### "CORS error"
- De CF7 REST API plugin handelt CORS automatisch af
- Geen extra configuratie nodig

### Emails komen niet aan
- Check WordPress → Contact → Contact Forms → je formulier → Mail tab
- Controleer het "To" email adres
- Test met een simpel formulier vanuit WordPress admin

## 📝 Volgende Stappen (Optioneel)

1. **Email notificaties aanpassen** in Contact Form 7:
   - Ga naar je formulier → Mail tab
   - Pas onderwerp en body aan

2. **Auto-reply email** instellen:
   - Schakel "Mail (2)" in
   - Configureer een automatisch antwoord aan de klant

3. **Spam bescherming** toevoegen:
   - Installeer **Akismet** of **reCAPTCHA** plugin
   - Koppel aan Contact Form 7

## 🎉 Success!

Als alles werkt:
- ✅ React formulier stuurt data naar Vercel API
- ✅ Vercel API stuurt data naar WordPress CF7
- ✅ WordPress CF7 slaat submission op
- ✅ WordPress CF7 stuurt email notificatie
- ✅ Gebruiker ziet success bericht in React app

Succes! 🚀
