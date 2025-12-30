import type { VercelRequest, VercelResponse } from '@vercel/node';

// Email service configuratie
// Je kunt kiezen uit: SendGrid, Resend, Nodemailer, etc.
// Hieronder een voorbeeld met basis node-mailer

interface ContactFormData {
  name: string;
  email: string;
  phone?: string;
  message: string;
  location?: string;
  website?: string; // Honeypot field
  subject?: string;
  region?: string;
}

// Simple in-memory rate limiting (for production, use Redis or similar)
const rateLimitMap = new Map<string, { count: number; resetTime: number }>();

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const limit = rateLimitMap.get(ip);

  if (!limit || now > limit.resetTime) {
    // Reset or create new limit
    rateLimitMap.set(ip, { count: 1, resetTime: now + 3600000 }); // 1 hour
    return true;
  }

  if (limit.count >= 5) {
    // Max 5 submissions per hour
    return false;
  }

  limit.count++;
  return true;
}

export default async function handler(
  req: VercelRequest,
  res: VercelResponse
) {
  // CORS headers (pas aan voor productie)
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // Handle preflight
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  // Alleen POST requests toestaan
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const formData: ContactFormData = req.body;

    // Rate limiting check
    const ip = (req.headers['x-forwarded-for'] as string)?.split(',')[0] ||
               (req.headers['x-real-ip'] as string) ||
               'unknown';

    if (!checkRateLimit(ip)) {
      return res.status(429).json({
        error: 'Te veel aanvragen. Probeer het later opnieuw.'
      });
    }

    // Honeypot check - if filled, it's likely a bot
    if (formData.website) {
      // Return success to bot, but don't actually process
      return res.status(200).json({
        success: true,
        message: 'Bedankt voor uw bericht!'
      });
    }

    // Basic validation
    if (!formData.name || !formData.email || !formData.message) {
      return res.status(400).json({
        error: 'Vul alle verplichte velden in (naam, email, bericht)'
      });
    }

    // Trim and validate length
    const name = formData.name.trim();
    const email = formData.email.trim();
    const message = formData.message.trim();

    if (name.length < 2 || name.length > 100) {
      return res.status(400).json({
        error: 'Naam moet tussen 2 en 100 karakters zijn'
      });
    }

    if (message.length < 10 || message.length > 2000) {
      return res.status(400).json({
        error: 'Bericht moet tussen 10 en 2000 karakters zijn'
      });
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        error: 'Ongeldig e-mailadres'
      });
    }

    // Update formData with trimmed values
    formData.name = name;
    formData.email = email;
    formData.message = message;

    // Log naar console (development)
    console.log('Contact form submission:', {
      name: formData.name,
      email: formData.email,
      region: formData.region,
      timestamp: new Date().toISOString()
    });

    // Optie 1: Email verzenden via SMTP (bijv. Gmail, Office365)
    // await sendEmailViaSMTP(formData);

    // Optie 2: Email verzenden via SendGrid
    // await sendEmailViaSendGrid(formData);

    // Optie 3: Email verzenden via Resend (aanbevolen - makkelijk)
    // await sendEmailViaResend(formData);

    // Optie 4: Slack notificatie
    // await sendSlackNotification(formData);

    // Optie 5: Google Sheets logging
    // await logToGoogleSheets(formData);

    // Send via WordPress Contact Form 7
    await sendViaContactForm7(formData);

    return res.status(200).json({
      success: true,
      message: 'Bedankt voor uw bericht! We nemen zo spoedig mogelijk contact met u op.'
    });

  } catch (error: any) {
    console.error('Contact form error:', error);
    return res.status(500).json({
      error: 'Er is iets misgegaan bij het verzenden van uw bericht. Probeer het later opnieuw of bel ons direct.'
    });
  }
}

// Contact Form 7 WordPress Integration
async function sendViaContactForm7(data: ContactFormData): Promise<void> {
  const WORDPRESS_URL = process.env.WORDPRESS_URL || 'https://www.zwijsen.net';
  const CF7_FORM_ID = process.env.CF7_FORM_ID || '123'; // Update this with your Form ID

  // Contact Form 7 REST API often requires multipart/form-data
  // and specific fields like _wpcf7_unit_tag to work correctly
  const formData = new FormData();
  formData.append('your-name', data.name);
  formData.append('your-email', data.email);
  formData.append('your-phone', data.phone || '');
  formData.append('your-message', data.message);
  formData.append('regio', data.region || '');
  formData.append('locatie', data.location || '');
  formData.append('_wpcf7_unit_tag', `wpcf7-f${CF7_FORM_ID}-p1-o1`);

  const response = await fetch(`${WORDPRESS_URL}/wp-json/contact-form-7/v1/contact-forms/${CF7_FORM_ID}/feedback`, {
    method: 'POST',
    body: formData,
    // Note: Fetch handles the Boundary and Content-Type header automatically for FormData
  });

  const result: any = await response.json();

  if (!response.ok || result.status === 'validation_failed' || result.status === 'mail_failed') {
    console.error('CF7 Error details:', result);
    throw new Error(result.message || 'WordPress form submission failed');
  }

  console.log('CF7 Success:', result);
}

// Voorbeeld implementaties hieronder:

/*
// OPTIE 1: Resend (Aanbevolen - €0/maand tot 3000 emails)
import { Resend } from 'resend';

async function sendEmailViaResend(data: ContactFormData) {
  const resend = new Resend(process.env.RESEND_API_KEY);

  await resend.emails.send({
    from: 'Website <noreply@zwijsen.net>',
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
*/

/*
// OPTIE 2: SendGrid
import sgMail from '@sendgrid/mail';

async function sendEmailViaSendGrid(data: ContactFormData) {
  sgMail.setApiKey(process.env.SENDGRID_API_KEY!);

  const msg = {
    to: 'info@zwijsen.net',
    from: 'noreply@zwijsen.net',
    replyTo: data.email,
    subject: `Nieuw contactverzoek van ${data.name}`,
    html: `
      <h2>Nieuw contactverzoek</h2>
      <p><strong>Naam:</strong> ${data.name}</p>
      <p><strong>Email:</strong> ${data.email}</p>
      ${data.phone ? `<p><strong>Telefoon:</strong> ${data.phone}</p>` : ''}
      ${data.region ? `<p><strong>Regio:</strong> ${data.region}</p>` : ''}
      <p><strong>Bericht:</strong></p>
      <p>${data.message.replace(/\n/g, '<br>')}</p>
    `
  };

  await sgMail.send(msg);
}
*/

/*
// OPTIE 3: Slack Webhook
async function sendSlackNotification(data: ContactFormData) {
  const webhookUrl = process.env.SLACK_WEBHOOK_URL;

  await fetch(webhookUrl!, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      text: `🔔 Nieuw contactverzoek van ${data.name}`,
      blocks: [
        {
          type: 'section',
          text: {
            type: 'mrkdwn',
            text: `*Naam:* ${data.name}\n*Email:* ${data.email}\n${data.phone ? `*Telefoon:* ${data.phone}\n` : ''}${data.region ? `*Regio:* ${data.region}\n` : ''}*Bericht:*\n${data.message}`
          }
        }
      ]
    })
  });
}
*/
