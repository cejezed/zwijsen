import React, { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { MapPin, Phone, Mail, Send } from 'lucide-react';
import { BRAND_NAME, ADDRESS, EMAIL, PHONE_NUMBER, PHONE_LINK } from '../data';
import {
  Footer,
  InquiryOverlay,
  ContactBar
} from '../components';

export const Contact: React.FC = () => {
  const footerRef = useRef<HTMLDivElement>(null);
  const [isInquiryOpen, setIsInquiryOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const { scrollYProgress, scrollY } = useScroll();
  const heroOpacity = useTransform(scrollYProgress, [0, 0.3], [1, 0]);
  const heroScale = useTransform(scrollYProgress, [0, 0.3], [1, 0.95]);

  const footerScroll = useScroll({
    target: footerRef,
    offset: ["start end", "end end"]
  });
  const footerParallaxText = useTransform(footerScroll.scrollYProgress, [0, 1], [0, -1500]);
  const footerOpacity = useTransform(footerScroll.scrollYProgress, [0, 0.4], [0, 1]);

  // ContactBar opacity
  const contactBarOpacity = useTransform(scrollY, [300, 600], [0, 1]);

  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // SEO management
  useEffect(() => {
    document.title = 'Contact architect Jules Zwijsen | Kennismaking & quickscan';

    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Neem contact op met architect Jules Zwijsen voor een kennismaking, gratis quickscan of vrijblijvend schetsontwerp.');
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setSubmitStatus('success');
        setFormData({ name: '', email: '', phone: '', message: '' });
      } else {
        setSubmitStatus('error');
      }
    } catch (error) {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <>
      {/* Inquiry Overlay */}
      <InquiryOverlay
        isOpen={isInquiryOpen}
        onClose={() => setIsInquiryOpen(false)}
      /> 

      {/* ContactBar */}
      <motion.div style={{ opacity: contactBarOpacity }}>
        <ContactBar
          opacity={contactBarOpacity}
          onStartTraject={() => setIsInquiryOpen(true)}
        />
      </motion.div>

      <div className="bg-white min-h-screen selection:bg-amber-100">
        {/* Hero Section */}
        <motion.section
          style={{ opacity: heroOpacity, scale: heroScale }}
          className="relative min-h-[60vh] flex items-center justify-center px-6 md:px-12 pt-32 pb-20 bg-gradient-to-b from-stone-50 to-white overflow-hidden"
        >
          {/* Achtergrondafbeelding - plaats contact-hero.jpg in /public/images/ om te gebruiken */}
          <div className="absolute inset-0 z-0">
            <img
              src="/images/contact-hero.jpg"
              alt=""
              className="w-full h-full object-cover opacity-0"
              onLoad={(e) => e.currentTarget.classList.replace('opacity-0', 'opacity-20')}
              onError={(e) => e.currentTarget.style.display = 'none'}
            />
          </div>

          <div className="relative z-10 max-w-4xl mx-auto text-center space-y-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <span className="mono text-sm uppercase tracking-[0.6em] text-amber-600 font-black block mb-6">
                Contact
              </span>
              <h1 className="text-5xl md:text-7xl font-serif italic text-black leading-tight mb-8">
                Contact
              </h1>
              <p className="text-xl md:text-2xl text-stone-700 leading-relaxed max-w-3xl mx-auto">
                Sta je aan de start van een verbouwing of nieuwbouw en wil je kennismaken? Neem gerust contact op.
              </p>
            </motion.div>
          </div>
        </motion.section>

        {/* Contact Section */}
        <section className="py-20 px-6 md:px-12 bg-white">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
              {/* Contact Information */}
              <div className="space-y-12">
                <div>
                  <h2 className="text-3xl md:text-4xl font-serif italic text-black mb-8">
                    Contactgegevens
                  </h2>
                  <div className="space-y-8">
                    {/* Address */}
                    <motion.div
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      className="flex items-start gap-4 group"
                    >
                      <div className="p-4 bg-amber-50 rounded-lg group-hover:bg-amber-100 transition-colors">
                        <MapPin className="text-amber-600" size={24} />
                      </div>
                      <div>
                        <p className="mono text-xs uppercase tracking-wider text-stone-500 font-bold mb-2">
                          Adres
                        </p>
                        <p className="text-lg text-stone-800 font-medium">
                          {ADDRESS.street}
                        </p>
                        <p className="text-lg text-stone-800 font-medium">
                          {ADDRESS.city}
                        </p>
                      </div>
                    </motion.div>

                    {/* Phone */}
                    <motion.div
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.1 }}
                      className="flex items-start gap-4 group"
                    >
                      <div className="p-4 bg-amber-50 rounded-lg group-hover:bg-amber-100 transition-colors">
                        <Phone className="text-amber-600" size={24} />
                      </div>
                      <div>
                        <p className="mono text-xs uppercase tracking-wider text-stone-500 font-bold mb-2">
                          Telefoon
                        </p>
                        <a
                          href={PHONE_LINK}
                          className="text-lg text-stone-800 font-medium hover:text-amber-600 transition-colors"
                        >
                          {PHONE_NUMBER}
                        </a>
                      </div>
                    </motion.div>

                    {/* Email */}
                    <motion.div
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.2 }}
                      className="flex items-start gap-4 group"
                    >
                      <div className="p-4 bg-amber-50 rounded-lg group-hover:bg-amber-100 transition-colors">
                        <Mail className="text-amber-600" size={24} />
                      </div>
                      <div>
                        <p className="mono text-xs uppercase tracking-wider text-stone-500 font-bold mb-2">
                          E-mail
                        </p>
                        <a
                          href={`mailto:${EMAIL}`}
                          className="text-lg text-stone-800 font-medium hover:text-amber-600 transition-colors"
                        >
                          {EMAIL}
                        </a>
                      </div>
                    </motion.div>
                  </div>
                </div>

                {/* Quick Actions */}
                <div className="bg-stone-50 p-8 rounded-lg space-y-6">
                  <h3 className="font-serif italic text-2xl text-black">
                    Snelle acties
                  </h3>
                  <div className="space-y-4">
                    <button
                      onClick={() => setIsInquiryOpen(true)}
                      className="w-full bg-amber-600 text-white px-8 py-4 rounded-lg hover:bg-amber-700 transition-all flex items-center justify-between group"
                    >
                      <span className="mono text-xs uppercase tracking-wider font-black">
                        Gratis quickscan aanvragen
                      </span>
                      <Send size={18} className="group-hover:translate-x-1 transition-transform" />
                    </button>
                    <a
                      href="/quickscan"
                      className="w-full bg-white border-2 border-stone-200 text-black px-8 py-4 rounded-lg hover:border-amber-600 transition-all flex items-center justify-between group"
                    >
                      <span className="mono text-xs uppercase tracking-wider font-black">
                        Meer over quickscan
                      </span>
                      <Send size={18} className="group-hover:translate-x-1 transition-transform" />
                    </a>
                  </div>
                </div>
              </div>

              {/* Contact Form */}
              <div>
                <h2 className="text-3xl md:text-4xl font-serif italic text-black mb-8">
                  Stuur een bericht
                </h2>

                {/* Wat gebeurt er na contact - NIEUW */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8 }}
                  className="mb-8 bg-amber-50 border-2 border-amber-100 p-6 rounded-lg"
                >
                  <h3 className="font-serif italic text-xl text-black mb-3">
                    Wat kunt u verwachten na uw bericht?
                  </h3>
                  <p className="text-stone-700 leading-relaxed">
                    Na ontvangst van uw aanvraag nemen wij persoonlijk contact met u op. We bespreken globaal uw plannen en bekijken of en hoe wij u kunnen helpen. Dit gesprek is vrijblijvend en bedoeld om helderheid te geven — niet om te verkopen.
                  </p>
                </motion.div>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label htmlFor="name" className="block mono text-xs uppercase tracking-wider text-stone-500 font-bold mb-2">
                      Naam *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border-2 border-stone-200 rounded-lg focus:border-amber-600 focus:outline-none transition-colors"
                      placeholder="Uw naam"
                    />
                  </div>

                  <div>
                    <label htmlFor="email" className="block mono text-xs uppercase tracking-wider text-stone-500 font-bold mb-2">
                      E-mailadres *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border-2 border-stone-200 rounded-lg focus:border-amber-600 focus:outline-none transition-colors"
                      placeholder="uw@email.nl"
                    />
                  </div>

                  <div>
                    <label htmlFor="phone" className="block mono text-xs uppercase tracking-wider text-stone-500 font-bold mb-2">
                      Telefoonnummer
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border-2 border-stone-200 rounded-lg focus:border-amber-600 focus:outline-none transition-colors"
                      placeholder="06 1234 5678"
                    />
                  </div>

                  <div>
                    <label htmlFor="message" className="block mono text-xs uppercase tracking-wider text-stone-500 font-bold mb-2">
                      Bericht *
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows={6}
                      className="w-full px-4 py-3 border-2 border-stone-200 rounded-lg focus:border-amber-600 focus:outline-none transition-colors resize-none"
                      placeholder="Vertel ons over uw project..."
                    />
                  </div>

                  <div className="space-y-4">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full bg-black text-white px-8 py-4 rounded-lg hover:bg-amber-600 transition-all flex items-center justify-center gap-3 group disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <span className="mono text-xs uppercase tracking-wider font-black">
                        {isSubmitting ? 'Verzenden...' : 'Verstuur bericht'}
                      </span>
                      <Send size={18} className="group-hover:translate-x-1 transition-transform" />
                    </button>

                    {submitStatus === 'success' && (
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="p-4 bg-green-50 border-2 border-green-200 rounded-lg"
                      >
                        <p className="text-sm text-green-800 text-center font-medium">
                          Bedankt voor uw bericht! We nemen zo snel mogelijk contact met u op.
                        </p>
                      </motion.div>
                    )}

                    {submitStatus === 'error' && (
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="p-4 bg-red-50 border-2 border-red-200 rounded-lg"
                      >
                        <p className="text-sm text-red-800 text-center font-medium">
                          Er is iets misgegaan. Probeer het later opnieuw of neem telefonisch contact op.
                        </p>
                      </motion.div>
                    )}

                    <p className="text-xs text-stone-500 text-center">
                      Uw gegevens worden uitsluitend gebruikt om contact op te nemen over uw aanvraag.
                    </p>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <Footer
          footerRef={footerRef}
          parallaxText={footerParallaxText}
          opacity={footerOpacity}
        />
      </div>
    </>
  );
};
