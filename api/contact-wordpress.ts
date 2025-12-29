import type { VercelRequest, VercelResponse } from '@vercel/node';

interface ContactFormData {
  name: string;
  email: string;
  phone?: string;
  message: string;
  region?: string;
}

export default async function handler(
  req: VercelRequest,
  res: VercelResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  // CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  try {
    const formData: ContactFormData = req.body;

    // Validatie
    if (!formData.name || !formData.email || !formData.message) {
      return res.status(400).json({
        error: 'Vul alle verplichte velden in'
      });
    }

    // Honeypot check
    if (req.body.website) {
      return res.status(200).json({
        success: true,
        message: 'Bedankt voor uw bericht!'
      });
    }

    // OPTIE A: Contact Form 7 REST API
    // Gebruik de Contact Form 7 REST API (als je CF7 gebruikt)
    const cf7Response = await sendViaContactForm7(formData);

    // OPTIE B: WPForms REST API
    // const wpformsResponse = await sendViaWPForms(formData);

    // OPTIE C: Custom WordPress REST endpoint
    // const customResponse = await sendViaCustomEndpoint(formData);

    return res.status(200).json({
      success: true,
      message: 'Bedankt voor uw bericht! We nemen zo spoedig mogelijk contact met u op.'
    });

  } catch (error) {
    console.error('WordPress form error:', error);
    return res.status(500).json({
      error: 'Er is iets misgegaan. Probeer het later opnieuw of bel ons direct.'
    });
  }
}

// OPTIE A: Contact Form 7
async function sendViaContactForm7(data: ContactFormData) {
  const WORDPRESS_URL = process.env.WORDPRESS_URL || 'https://zwijsen.net';
  const CF7_FORM_ID = process.env.CF7_FORM_ID || '123'; // Je Contact Form 7 ID

  // Contact Form 7 REST API (via plugin: Contact Form 7 REST API)
  const response = await fetch(`${WORDPRESS_URL}/wp-json/contact-form-7/v1/contact-forms/${CF7_FORM_ID}/feedback`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      'your-name': data.name,
      'your-email': data.email,
      'your-phone': data.phone || '',
      'your-message': data.message,
      'regio': data.region || '',
    }),
  });

  if (!response.ok) {
    throw new Error(`CF7 Error: ${response.statusText}`);
  }

  return await response.json();
}

// OPTIE B: WPForms
async function sendViaWPForms(data: ContactFormData) {
  const WORDPRESS_URL = process.env.WORDPRESS_URL || 'https://zwijsen.net';
  const WPFORMS_ID = process.env.WPFORMS_FORM_ID || '456';

  const response = await fetch(`${WORDPRESS_URL}/wp-json/wpforms/v1/form/${WPFORMS_ID}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      fields: {
        '0': data.name,      // Field ID 0 = Name
        '1': data.email,     // Field ID 1 = Email
        '2': data.phone,     // Field ID 2 = Phone
        '3': data.message,   // Field ID 3 = Message
      }
    }),
  });

  if (!response.ok) {
    throw new Error(`WPForms Error: ${response.statusText}`);
  }

  return await response.json();
}

// OPTIE C: Custom WordPress REST Endpoint
// Je maakt dit zelf in WordPress (zie WORDPRESS_INTEGRATION.md)
async function sendViaCustomEndpoint(data: ContactFormData) {
  const WORDPRESS_URL = process.env.WORDPRESS_URL || 'https://zwijsen.net';

  const response = await fetch(`${WORDPRESS_URL}/wp-json/zwijsen/v1/contact`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      name: data.name,
      email: data.email,
      phone: data.phone,
      message: data.message,
      region: data.region,
      source: 'react-app',
      timestamp: new Date().toISOString()
    }),
  });

  if (!response.ok) {
    throw new Error(`WordPress Error: ${response.statusText}`);
  }

  return await response.json();
}
