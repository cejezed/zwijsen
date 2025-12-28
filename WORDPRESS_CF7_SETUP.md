# WordPress Contact Form 7 Setup

## Stap 1: Installeer Plugins

In WordPress dashboard:
1. Ga naar **Plugins → Add New**
2. Zoek en installeer: **Contact Form 7**
3. Zoek en installeer: **Contact Form 7 REST API Support**
4. Activeer beide plugins

## Stap 2: Vind je Form ID

1. Ga naar **Contact → Contact Forms** in WordPress
2. Klik op je formulier (of maak een nieuw formulier)
3. In de URL zie je iets als: `post.php?post=123&action=edit`
4. Het getal `123` is je **Form ID**

## Stap 3: Vind je Form Field Names

In Contact Form 7 editor zie je velden zoals:
```
[text your-name]
[email your-email]
[textarea your-message]
```

De namen zijn:
- `your-name`
- `your-email`
- `your-message`

## Stap 4: Test de REST API

Test of de API werkt via:
```
https://zwijsen.net/wp-json/contact-form-7/v1/contact-forms/[FORM_ID]/feedback
```

## Stap 5: Configureer Environment Variables

In Vercel dashboard (Settings → Environment Variables):
- `WORDPRESS_URL` = `https://www.zwijsen.net`
- `CF7_FORM_ID` = `123` (vervang met jouw ID)

Of lokaal in `.env`:
```
WORDPRESS_URL=https://www.zwijsen.net
CF7_FORM_ID=123
```

## Stap 6: Deploy

Push je code naar GitHub → Vercel deployed automatisch

## Troubleshooting

Als je errors krijgt:
1. Check of CF7 REST API plugin actief is
2. Check of CORS toegestaan is (plugin doet dit automatisch)
3. Check WordPress error logs: `/wp-content/debug.log`
4. Test direct via Postman/curl naar de REST API URL
