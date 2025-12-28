import type { VercelRequest, VercelResponse } from '@vercel/node';

// Email service configuratie
// Je kunt kiezen uit: SendGrid, Resend, Nodemailer, etc.
// Hieronder een voorbeeld met basis node-mailer

interface ContactFormData {
  name: string;
  email: string;
  phone?: string;
  message: string;
  subject?: string;
  region?: string;
}

export default async function handler(
  req: VercelRequest,
  res: VercelResponse
) {
  // Alleen POST requests toestaan
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  // CORS headers (pas aan voor productie)
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // Handle preflight
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  try {
    const formData: ContactFormData = req.body;

    // Validatie
    if (!formData.name || !formData.email || !formData.message) {
      return res.status(400).json({
        error: 'Vul alle verplichte velden in (naam, email, bericht)'
      });
    }

    // Email validatie
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      return res.status(400).json({
        error: 'Ongeldig e-mailadres'
      });
    }

    // Spam protection - basic honeypot check
    if (req.body.website) {
      // Honeypot field - bots vullen dit vaak in
      return res.status(200).json({
        success: true,
        message: 'Bedankt voor uw bericht!'
      });
    }

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

    // Voor nu: simuleer success (vervang met echte email service)
    await simulateEmailSend(formData);

    return res.status(200).json({
      success: true,
      message: 'Bedankt voor uw bericht! We nemen zo spoedig mogelijk contact met u op.'
    });

  } catch (error) {
    console.error('Contact form error:', error);
    return res.status(500).json({
      error: 'Er is iets misgegaan. Probeer het later opnieuw of bel ons direct.'
    });
  }
}

// Simulatie functie (vervang met echte implementatie)
async function simulateEmailSend(data: ContactFormData): Promise<void> {
  // In productie: vervang dit met echte email service
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log('Email zou verzonden zijn naar: info@zwijsen.net');
      console.log('Van:', data.name, data.email);
      console.log('Bericht:', data.message);
      resolve();
    }, 1000);
  });
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
