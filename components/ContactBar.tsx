
import React from 'react';
import { motion, MotionValue } from 'framer-motion';
import { Phone, MessageCircle, Mail, MoveRight } from 'lucide-react';
import { PHONE_LINK, PHONE_NUMBER, WHATSAPP_LINK, EMAIL } from '../data';

interface ContactBarProps {
  opacity: MotionValue<number>;
  onStartTraject: () => void;
}

export const ContactBar: React.FC<ContactBarProps> = ({ opacity, onStartTraject }) => {
  return (
    <motion.div 
      style={{ opacity }} 
      className="fixed bottom-0 left-0 w-full z-[140] pointer-events-none p-6 md:p-10"
    >
      <div className="max-w-6xl mx-auto flex justify-center">
        <motion.div 
          initial={{ y: 50, opacity: 0 }} 
          animate={{ y: 0, opacity: 1 }} 
          className="bg-stone-950/60 backdrop-blur-3xl border border-white/20 pointer-events-auto flex items-center p-2 rounded-full shadow-[0_30px_60px_-15px_rgba(0,0,0,0.4)] overflow-hidden"
        >
           <div className="flex items-center px-4 md:px-8 py-3 divide-x divide-white/10">
              <a 
                href={PHONE_LINK} 
                className="px-4 md:px-6 flex items-center gap-4 text-white hover:text-amber-500 transition-colors group" 
                title="Bellen"
              >
                <Phone size={18} className="text-amber-500" />
                <span className="mono text-sm font-black tracking-tight hidden sm:block">{PHONE_NUMBER}</span>
              </a>
              
              <a 
                href={WHATSAPP_LINK} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="px-4 md:px-6 flex items-center gap-4 text-white hover:text-emerald-400 transition-colors group" 
                title="WhatsApp"
              >
                <MessageCircle size={20} className="text-emerald-500 group-hover:scale-110 transition-transform" />
                <span className="mono text-sm font-black tracking-tight hidden md:block">WhatsApp</span>
              </a>
              
              <a 
                href={`mailto:${EMAIL}`} 
                className="px-4 md:px-6 hidden lg:flex items-center gap-4 text-white hover:text-amber-500 transition-colors group" 
                title="E-mail"
              >
                <Mail size={18} className="text-amber-500" />
                <span className="mono text-sm font-black tracking-tight">{EMAIL}</span>
              </a>
           </div>
           
           <button
             onClick={onStartTraject}
             className="bg-amber-600 text-white px-8 md:px-12 py-4 rounded-full flex items-center gap-6 hover:bg-white hover:text-black transition-all group"
           >
              <span className="mono text-sm uppercase tracking-[0.3em] font-black">Stel een Vraag</span>
              <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center group-hover:bg-black/10 transition-colors">
                <MoveRight size={16} />
              </div>
           </button>
        </motion.div>
      </div>
    </motion.div>
  );
};
