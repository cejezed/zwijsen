# Email Setup voor Contactformulier

Het contactformulier is nu werkend met een Vercel Serverless Function. Je moet alleen nog een email service configureren.

## 🎯 Aanbevolen Oplossing: Resend (Gratis tot 3000 emails/maand)

Resend is de makkelijkste en meest betrouwbare optie voor transactionele emails.

### Stap 1: Resend Account Aanmaken

1. Ga naar [https://resend.com](https://resend.com)
2. Sign up (gratis)
3. Verifieer je email

### Stap 2: API Key Genereren

1. Dashboard → API Keys
2. Create API Key
3. Kopieer de key (begint met `re_...`)

### Stap 3: Domain Verificatie (Optioneel maar aanbevolen)

**Optie A: Gebruik je eigen domain (zwijsen.net)**
1. Dashboard → Domains → Add Domain
2. Voeg `zwijsen.net` toe
3. Voeg DNS records toe bij je DNS provider (Cloudflare):
   ```
   TXT   @   resend._domainkey   [waarde van Resend]
   TXT   @   resend              [waarde van Resend]
   ```
4. Verify domain
5. Nu kun je verzenden vanaf `noreply@zwijsen.net`

**Optie B: Gebruik Resend shared domain**
- Geen DNS setup nodig
- Emails komen van `onboarding@resend.dev`
- Werkt direct

### Stap 4: Installeer Resend Package

```bash
npm install resend
```

### Stap 5: Voeg API Key toe aan Vercel

1. Ga naar Vercel Dashboard
2. Je project → Settings → Environment Variables
3. Voeg toe:
   - **Name:** `RESEND_API_KEY`
   - **Value:** Je Resend API key (`re_...`)
   - **Environment:** Production + Preview + Development
4. Save

### Stap 6: Update API Code

Bewerk `api/contact.ts` en uncomment de Resend functie:

```typescript
// Bovenaan bij imports:
import { Resend } from 'resend';

// Vervang simulateEmailSend met sendEmailViaResend:
async function sendEmailViaResend(data: ContactFormData) {
  const resend = new Resend(process.env.RESEND_API_KEY);

  await resend.emails.send({
    from: 'Website <noreply@zwijsen.net>', // Of onboarding@resend.dev
    to: 'info@zwijsen.net',
    replyTo: data.email,
    subject: `Nieuw contactverzoek van ${data.name}${data.region ? ` - ${data.region}` : ''}`,
    html: `
      <h2>Nieuw contactverzoek</h2>
      <p><strong>Naam:</strong> ${data.name}</p>
      <p><strong>Email:</strong> ${data.email}</p>
      ${data.phone ? `<p><strong>Telefoon:</strong> ${data.phone}</p>` : ''}
      ${data.region ? `<p><strong>Regio:</strong> ${data.region}</p>` : ''}
      <p><strong>Bericht:</strong></p>
      <p>${data.message.replace(/\n/g, '<br>')}</p>
    `
  });
}

// In de handler functie, vervang:
await simulateEmailSend(formData);
// Met:
await sendEmailViaResend(formData);
```

### Stap 7: Deploy & Test

```bash
vercel --prod
```

Test het formulier op je live site!

---

## Alternatieve Opties

### Optie 2: SendGrid (Gratis tot 100 emails/dag)

1. Account: [https://sendgrid.com](https://sendgrid.com)
2. API Key genereren
3. Installeer: `npm install @sendgrid/mail`
4. Environment var: `SENDGRID_API_KEY`
5. Uncomment SendGrid functie in `api/contact.ts`

### Optie 3: Gmail SMTP (Gratis)

1. Maak Gmail App Password aan
2. Installeer: `npm install nodemailer`
3. Environment vars:
   - `SMTP_USER=jouw@gmail.com`
   - `SMTP_PASS=app_password`
4. Code voorbeeld beschikbaar in comments

### Optie 4: Slack Notificaties (Gratis)

Perfect als je liever Slack berichten ontvangt:

1. Maak Slack Incoming Webhook
2. Environment var: `SLACK_WEBHOOK_URL`
3. Uncomment Slack functie in `api/contact.ts`

---

## Development Testen

### Lokaal testen zonder echte emails:

```bash
# Start dev server
npm run dev

# Test form submission - zie console logs
# Formulier werkt, maar verstuurt geen echte emails
```

### Testen met echte emails lokaal:

1. Maak `.env` bestand in root:
   ```
   RESEND_API_KEY=re_jouw_api_key
   ```

2. Start dev server:
   ```bash
   npm run dev
   ```

3. Test formulier op `http://localhost:3002`

---

## Email Template Aanpassen

De email template kun je aanpassen in `api/contact.ts`:

```typescript
html: `
  <!DOCTYPE html>
  <html>
    <head>
      <style>
        body { font-family: Arial, sans-serif; }
        .header { background: #d97706; color: white; padding: 20px; }
        .content { padding: 20px; }
      </style>
    </head>
    <body>
      <div class="header">
        <h1>Nieuw Contactverzoek</h1>
      </div>
      <div class="content">
        <p><strong>Naam:</strong> ${data.name}</p>
        <p><strong>Email:</strong> ${data.email}</p>
        <p><strong>Bericht:</strong></p>
        <p>${data.message.replace(/\n/g, '<br>')}</p>
      </div>
    </body>
  </html>
`
```

---

## Troubleshooting

### "Email niet ontvangen"

1. Check Resend Dashboard → Logs
2. Check spam folder
3. Verify domain ownership
4. Check Vercel logs: `vercel logs`

### "API Error 500"

1. Check environment variables in Vercel
2. Check API logs: `vercel logs`
3. Test lokaal met `.env` file

### "CORS Error"

CORS headers zijn al geconfigureerd in `api/contact.ts`. Als het niet werkt:
- Check of fetch URL correct is (`/api/contact`)
- Deploy opnieuw naar Vercel

### "Rate limit exceeded"

Resend free tier:
- 100 emails/dag tijdens trial
- 3000 emails/maand na domain verificatie

---

## Kosten Overzicht

| Service | Free Tier | Betaald |
|---------|-----------|---------|
| **Resend** | 3000/maand | $20/mnd (50k emails) |
| SendGrid | 100/dag | $15/mnd (40k emails) |
| Gmail SMTP | ~500/dag | Gratis |
| Slack | Unlimited | Gratis |

**Aanbeveling:** Start met Resend free tier (3000/maand is ruim voldoende).

---

## Auto-reply Email (Optioneel)

Stuur automatisch een bevestiging naar de klant:

```typescript
// Na het verzenden naar info@zwijsen.net:
await resend.emails.send({
  from: 'Jules Zwijsen <noreply@zwijsen.net>',
  to: data.email,
  subject: 'Bedankt voor uw bericht',
  html: `
    <h2>Bedankt voor uw interesse</h2>
    <p>Beste ${data.name},</p>
    <p>We hebben uw bericht ontvangen en nemen zo spoedig mogelijk contact met u op.</p>
    <p>Met vriendelijke groet,<br>Jules Zwijsen</p>
  `
});
```

---

## Monitoring

### Resend Dashboard

- Real-time logs van alle verzonden emails
- Open/click tracking (opt-in)
- Bounce handling

### Vercel Analytics

Monitor form submissions:
```bash
vercel logs --follow
```

---

## Security Best Practices

✅ **Al geïmplementeerd:**
- Rate limiting via Vercel (max 10 requests/10 sec)
- Email validation
- Honeypot field
- CORS configuratie
- Environment variables voor API keys

⚠️ **Optioneel toevoegen:**
- reCAPTCHA v3
- IP-based rate limiting
- Email domain verification

---

## Support

- **Resend Docs:** https://resend.com/docs
- **Vercel Functions:** https://vercel.com/docs/functions

Succes met de setup! 🚀
