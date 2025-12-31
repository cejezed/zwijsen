import type { NextApiRequest, NextApiResponse } from 'next';

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
  formType?: string;
  // Extra Quickscan fields
  projectType?: string;
  budget?: string;
  timeframe?: string;
  hasLocation?: string;
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

  if (limit.count >= 10) {
    // Max 10 submissions per hour
    return false;
  }

  limit.count++;
  return true;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // CORS headers
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

    if (name.length < 2 || name.length > 200) {
      return res.status(400).json({
        error: 'Naam moet tussen 2 en 200 karakters zijn'
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
    console.log('Form submission:', {
      name: formData.name,
      email: formData.email,
      formType: formData.formType || 'contact',
      timestamp: new Date().toISOString()
    });

    // Send via WordPress Contact Form 7
    await sendViaContactForm7(formData);

    return res.status(200).json({
      success: true,
      message: 'Bedankt voor uw bericht! We nemen zo spoedig mogelijk contact met u op.'
    });

  } catch (error: any) {
    console.error('Contact form error:', error);
    return res.status(500).json({
      error: 'Er is iets misgegaan bij het verzenden van uw bericht. Probeer het later opnieuw.'
    });
  }
}

// Contact Form 7 WordPress Integration
async function sendViaContactForm7(data: ContactFormData): Promise<void> {
  const WORDPRESS_URL = process.env.WORDPRESS_URL || 'https://www.zwijsen.net';

  // Decide which Form ID to use
  // Default is the general contact form
  let CF7_FORM_ID = process.env.CF7_FORM_ID || '21383';

  // If it's a quickscan and a specific ID is provided, use that
  if (data.formType === 'quickscan' && process.env.CF7_QUICKSCAN_FORM_ID) {
    CF7_FORM_ID = process.env.CF7_QUICKSCAN_FORM_ID;
  }

  const formData = new FormData();
  formData.append('your-name', data.name);
  formData.append('your-email', data.email);
  formData.append('your-phone', data.phone || '');
  formData.append('your-message', data.message);
  formData.append('regio', data.region || '');
  formData.append('locatie', data.location || '');

  // Extra fields for Quickscan form (in case they are defined in CF7)
  if (data.projectType) formData.append('project-type', data.projectType);
  if (data.budget) formData.append('budget', data.budget);
  if (data.timeframe) formData.append('timeframe', data.timeframe);
  if (data.hasLocation) formData.append('has-location', data.hasLocation);
  if (data.formType) formData.append('form-type', data.formType);

  formData.append('_wpcf7_unit_tag', `wpcf7-f${CF7_FORM_ID}-p1-o1`);

  console.log(`Sending ${data.formType || 'contact'} form to WordPress CF7 (ID: ${CF7_FORM_ID})...`);

  const response = await fetch(`${WORDPRESS_URL}/wp-json/contact-form-7/v1/contact-forms/${CF7_FORM_ID}/feedback`, {
    method: 'POST',
    body: formData,
  });

  const result: any = await response.json();

  if (!response.ok || result.status === 'validation_failed' || result.status === 'mail_failed') {
    console.error('CF7 Error details:', result);
    throw new Error(result.message || 'WordPress form submission failed');
  }

  console.log('CF7 Success:', result);
}
