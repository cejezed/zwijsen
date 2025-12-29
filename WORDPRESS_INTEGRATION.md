# WordPress Contactformulier Integratie

Gebruik je bestaande WordPress contactformulier systeem voor de React app.

## 🎯 Beste Opties

### Optie 1: Contact Form 7 (Meest gebruikt)
### Optie 2: WPForms (User-friendly)
### Optie 3: Custom WordPress Endpoint (Meest flexibel)

---

## Optie 1: Contact Form 7 Integration (Aanbevolen als je CF7 al hebt)

### Stap 1: Installeer CF7 REST API Plugin

In WordPress:
1. Plugins → Add New
2. Zoek: **"Contact Form 7 REST API"** of **"Flamingo"**
3. Installeer & Activeer

**Aanbevolen plugin:**
- **CF7 to REST API** - https://wordpress.org/plugins/contact-form-7-dynamic-text-extension/

### Stap 2: Maak Contact Form 7 Formulier

In WordPress → Contact → Contact Forms:

```
<label> Naam
    [text* your-name] </label>

<label> Email
    [email* your-email] </label>

<label> Telefoon (optioneel)
    [tel your-phone] </label>

<label> Regio
    [text regio] </label>

<label> Bericht
    [textarea* your-message] </label>

[submit "Versturen"]
```

**Mail instellingen:**
- To: `info@zwijsen.net`
- From: `[your-name] <[your-email]>`
- Subject: `Nieuw contactverzoek - [regio]`
- Message Template:
  ```
  Naam: [your-name]
  Email: [your-email]
  Telefoon: [your-phone]
  Regio: [regio]

  Bericht:
  [your-message]
  ```

### Stap 3: Noteer Form ID

- Na opslaan zie je in URL: `post=123` → Dit is je Form ID
- Of check in shortcode: `[contact-form-7 id="123"]`

### Stap 4: Configureer Vercel

Vercel Dashboard → Environment Variables:

```
WORDPRESS_URL=https://zwijsen.net
CF7_FORM_ID=123
```

### Stap 5: Hernoem API bestand

```bash
# Verwijder oude contact.ts
mv api/contact.ts api/contact-old.ts

# Gebruik WordPress versie
mv api/contact-wordpress.ts api/contact.ts
```

### Stap 6: Test

Deploy naar Vercel en test het formulier!

---

## Optie 2: WPForms Integration

### Stap 1: Installeer WPForms

1. WordPress → Plugins → Add New
2. Installeer **WPForms Lite** (gratis) of Pro
3. Activeer

### Stap 2: Maak Formulier

1. WPForms → Add New
2. Kies template: "Simple Contact Form"
3. Voeg velden toe:
   - Name (field ID 0)
   - Email (field ID 1)
   - Phone (field ID 2)
   - Message (field ID 3)
4. Settings → Notifications:
   - Send To: `info@zwijsen.net`
5. Save

### Stap 3: Noteer Form ID

- URL: `page=wpforms-builder&form_id=456`
- Of in Forms lijst

### Stap 4: Installeer WPForms API

**Optie A: WPForms Zapier Addon** (Gratis)
- WPForms → Addons
- Activeer "Zapier Addon"
- Dit enabled de REST API

**Optie B: Custom Code** (zie stap 5)

### Stap 5: Environment Variables

```
WORDPRESS_URL=https://zwijsen.net
WPFORMS_FORM_ID=456
```

### Stap 6: Update api/contact.ts

Uncomment de `sendViaWPForms` functie en gebruik die.

---

## Optie 3: Custom WordPress REST Endpoint (Meest Flexibel)

### Stap 1: Voeg Code toe aan functions.php

In je WordPress theme `functions.php` (of maak een custom plugin):

```php
<?php
// Register custom REST API endpoint voor contactformulier
add_action('rest_api_init', function () {
    register_rest_route('zwijsen/v1', '/contact', array(
        'methods' => 'POST',
        'callback' => 'handle_contact_form_submission',
        'permission_callback' => '__return_true', // Of custom validatie
    ));
});

function handle_contact_form_submission($request) {
    $params = $request->get_json_params();

    // Validatie
    if (empty($params['name']) || empty($params['email']) || empty($params['message'])) {
        return new WP_Error('missing_fields', 'Vul alle verplichte velden in', array('status' => 400));
    }

    // Email validatie
    if (!is_email($params['email'])) {
        return new WP_Error('invalid_email', 'Ongeldig e-mailadres', array('status' => 400));
    }

    // Sanitize input
    $name = sanitize_text_field($params['name']);
    $email = sanitize_email($params['email']);
    $phone = !empty($params['phone']) ? sanitize_text_field($params['phone']) : '';
    $message = sanitize_textarea_field($params['message']);
    $region = !empty($params['region']) ? sanitize_text_field($params['region']) : '';

    // Sla op in database (optioneel - voor logging)
    global $wpdb;
    $table_name = $wpdb->prefix . 'contact_submissions';

    $wpdb->insert(
        $table_name,
        array(
            'name' => $name,
            'email' => $email,
            'phone' => $phone,
            'message' => $message,
            'region' => $region,
            'created_at' => current_time('mysql')
        )
    );

    // Verstuur email
    $to = get_option('admin_email'); // Of hardcode: 'info@zwijsen.net'
    $subject = 'Nieuw contactverzoek' . ($region ? ' - ' . $region : '');

    $email_message = "Naam: $name\n";
    $email_message .= "Email: $email\n";
    if ($phone) $email_message .= "Telefoon: $phone\n";
    if ($region) $email_message .= "Regio: $region\n";
    $email_message .= "\nBericht:\n$message\n";

    $headers = array(
        'Content-Type: text/plain; charset=UTF-8',
        'From: Website <noreply@' . $_SERVER['HTTP_HOST'] . '>',
        'Reply-To: ' . $email
    );

    $sent = wp_mail($to, $subject, $email_message, $headers);

    if ($sent) {
        return array(
            'success' => true,
            'message' => 'Uw bericht is verzonden'
        );
    } else {
        return new WP_Error('email_failed', 'Email kon niet worden verzonden', array('status' => 500));
    }
}

// Maak database tabel (optioneel - voor logging)
function create_contact_submissions_table() {
    global $wpdb;
    $table_name = $wpdb->prefix . 'contact_submissions';
    $charset_collate = $wpdb->get_charset_collate();

    $sql = "CREATE TABLE IF NOT EXISTS $table_name (
        id mediumint(9) NOT NULL AUTO_INCREMENT,
        name varchar(255) NOT NULL,
        email varchar(255) NOT NULL,
        phone varchar(50),
        message text NOT NULL,
        region varchar(100),
        created_at datetime DEFAULT CURRENT_TIMESTAMP,
        PRIMARY KEY  (id)
    ) $charset_collate;";

    require_once(ABSPATH . 'wp-admin/includes/upgrade.php');
    dbDelta($sql);
}
register_activation_hook(__FILE__, 'create_contact_submissions_table');
```

### Stap 2: Test Endpoint

Test in browser of Postman:
```bash
curl -X POST https://zwijsen.net/wp-json/zwijsen/v1/contact \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test Naam",
    "email": "test@example.com",
    "message": "Test bericht"
  }'
```

### Stap 3: Environment Variable

```
WORDPRESS_URL=https://zwijsen.net
```

### Stap 4: Update api/contact.ts

Uncomment de `sendViaCustomEndpoint` functie.

---

## Security: CORS & Rate Limiting

### WordPress CORS Headers

Voeg toe aan functions.php:

```php
// Allow CORS from Vercel domain
add_action('rest_api_init', function() {
    remove_filter('rest_pre_serve_request', 'rest_send_cors_headers');
    add_filter('rest_pre_serve_request', function($value) {
        $allowed_origins = array(
            'https://zwijsen.net',
            'https://zwijsen-regio.vercel.app',
            'http://localhost:3002'
        );

        $origin = $_SERVER['HTTP_ORIGIN'] ?? '';

        if (in_array($origin, $allowed_origins)) {
            header('Access-Control-Allow-Origin: ' . $origin);
            header('Access-Control-Allow-Methods: POST, GET, OPTIONS');
            header('Access-Control-Allow-Credentials: true');
            header('Access-Control-Allow-Headers: Content-Type');
        }

        return $value;
    });
}, 15);
```

### Rate Limiting Plugin

Installeer een security plugin zoals:
- **Wordfence** (gratis)
- **iThemes Security** (gratis)

Dit voorkomt spam via rate limiting.

---

## WordPress Admin Dashboard View (Bonus)

### Formulier Inzendingen Bekijken

**Met Flamingo (voor Contact Form 7):**
1. Installeer Flamingo plugin
2. WordPress → Flamingo → Inbound Messages
3. Zie alle formulier submissions

**Met Custom Endpoint:**
Maak admin pagina in functions.php:

```php
add_action('admin_menu', function() {
    add_menu_page(
        'Contact Submissions',
        'Contact Forms',
        'manage_options',
        'contact-submissions',
        'display_contact_submissions',
        'dashicons-email',
        25
    );
});

function display_contact_submissions() {
    global $wpdb;
    $table_name = $wpdb->prefix . 'contact_submissions';
    $submissions = $wpdb->get_results("SELECT * FROM $table_name ORDER BY created_at DESC LIMIT 50");

    echo '<div class="wrap">';
    echo '<h1>Contact Form Submissions</h1>';
    echo '<table class="wp-list-table widefat fixed striped">';
    echo '<thead><tr><th>Datum</th><th>Naam</th><th>Email</th><th>Regio</th><th>Bericht</th></tr></thead>';
    echo '<tbody>';

    foreach ($submissions as $submission) {
        echo '<tr>';
        echo '<td>' . $submission->created_at . '</td>';
        echo '<td>' . $submission->name . '</td>';
        echo '<td><a href="mailto:' . $submission->email . '">' . $submission->email . '</a></td>';
        echo '<td>' . $submission->region . '</td>';
        echo '<td>' . wp_trim_words($submission->message, 20) . '</td>';
        echo '</tr>';
    }

    echo '</tbody></table>';
    echo '</div>';
}
```

---

## Testing Checklist

- [ ] WordPress endpoint toegankelijk via `/wp-json/...`
- [ ] CORS headers correct geconfigureerd
- [ ] Email ontvangen op `info@zwijsen.net`
- [ ] Formulier werkt vanuit React app
- [ ] Error handling werkt (lege velden, invalid email)
- [ ] Spam protection actief (rate limiting)
- [ ] Submissions zichtbaar in WordPress admin

---

## Welke Optie Kiezen?

| Optie | Voordelen | Nadelen |
|-------|-----------|---------|
| **Contact Form 7** | Meest gebruikt, veel addons, Flamingo logging | Vereist extra plugin voor REST API |
| **WPForms** | User-friendly, ingebouwde analytics | Pro versie voor API (of Zapier addon) |
| **Custom Endpoint** | Volledig custom, geen extra plugins | Meer code, zelf onderhouden |

**Aanbeveling:**
- Heb je al Contact Form 7? → **Optie 1**
- Wil je makkelijke setup? → **Optie 2 (WPForms)**
- Wil je volledige controle? → **Optie 3 (Custom)**

---

## Deployment

1. Kies een optie hierboven
2. Configureer WordPress
3. Update `api/contact.ts` met juiste functie
4. Voeg Environment Variables toe in Vercel
5. Deploy: `vercel --prod`
6. Test formulier!

Klaar! Je formulieren gaan nu naar WordPress en worden afgehandeld door je bestaande email systeem. 🎉
