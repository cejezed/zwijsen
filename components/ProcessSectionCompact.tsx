
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Ruler, CheckCircle, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { PROCESS_STEPS } from '../data';
import { SafeImage } from './UIElements';
import type { ProcessStep } from '../data/index';

interface ProcessSectionCompactProps {
  processSteps?: ProcessStep[];
}

export const ProcessSectionCompact: React.FC<ProcessSectionCompactProps> = ({ processSteps }) => {
  const steps = processSteps || PROCESS_STEPS;
  const [activeTab, setActiveTab] = useState(0);
  const navigate = useNavigate();

  return (
    <section className="relative bg-white py-12 md:py-24 px-6 md:px-12">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-12 md:mb-16 space-y-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-[1px] bg-amber-600" />
            <span className="mono text-amber-700 text-[10px] font-black tracking-[0.6em] uppercase">
              Werkwijze
            </span>
          </div>
          <h2 className="text-4xl md:text-6xl font-serif italic text-black leading-tight tracking-tight">
            Hoe we <span className="text-stone-300">samenwerken.</span>
          </h2>
          <p className="text-lg md:text-xl text-stone-600 max-w-2xl leading-relaxed">
            Een helder proces in fases, afgestemd op uw project.
          </p>
        </div>

        {/* Tab Navigation - Horizontal scroll on mobile */}
        <div className="mb-8 overflow-x-auto scrollbar-hide -mx-6 px-6">
          <div className="flex gap-2 md:gap-3 min-w-max md:min-w-0">
            {steps.map((step, index) => (
              <button
                key={step.id}
                onClick={() => setActiveTab(index)}
                className={`
                  flex-shrink-0 px-6 py-3 rounded-full border-2 transition-all duration-300
                  ${activeTab === index
                    ? 'bg-amber-600 border-amber-600 text-white'
                    : 'bg-white border-stone-200 text-stone-600 hover:border-amber-600/50'
                  }
                `}
              >
                <div className="flex items-center gap-3">
                  <span className="mono text-xs font-black">{step.id}</span>
                  <span className="text-sm font-serif italic whitespace-nowrap">{step.title}</span>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Tab Content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="relative"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
              {/* Image */}
              <div className="relative aspect-[4/3] md:aspect-square overflow-hidden rounded-lg shadow-lg">
                <SafeImage
                  localSrc={steps[activeTab].img}
                  fallbackSrc={steps[activeTab].img}
                  className="w-full h-full object-cover"
                  alt={steps[activeTab].title}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />

                {/* Phase Badge */}
                <div className="absolute top-4 left-4 bg-amber-600 text-white w-14 h-14 flex items-center justify-center rounded-full shadow-xl">
                  <span className="font-serif italic text-2xl">{steps[activeTab].id}</span>
                </div>
              </div>

              {/* Content */}
              <div className="flex flex-col justify-center space-y-6">
                <div className="space-y-3">
                  <span className="mono text-xs uppercase tracking-[0.5em] text-amber-600 font-black block">
                    {steps[activeTab].subtitle}
                  </span>
                  <h3 className="text-3xl md:text-5xl font-serif italic text-black leading-tight">
                    {steps[activeTab].title}
                  </h3>
                </div>

                <p className="text-lg md:text-xl text-stone-600 leading-relaxed font-light italic">
                  {steps[activeTab].description}
                </p>

                <div className="pt-6 border-t border-stone-200 flex items-center gap-4">
                  <Ruler size={18} className="text-amber-600" />
                  <span className="mono text-xs uppercase tracking-[0.4em] text-stone-400 font-black">
                    FASE {steps[activeTab].id}
                  </span>
                </div>

                {/* Progress indicator */}
                <div className="flex items-center gap-2 pt-4">
                  {steps.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setActiveTab(index)}
                      className={`
                        h-1.5 rounded-full transition-all duration-300
                        ${activeTab === index ? 'bg-amber-600 w-12' : 'bg-stone-200 w-8 hover:bg-stone-300'}
                      `}
                      aria-label={`Ga naar fase ${index + 1}`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Summary Footer */}
        <div className="mt-16 p-8 md:p-12 bg-stone-50 border border-stone-200 rounded-lg">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div className="space-y-2 flex-1">
              <div className="flex items-center gap-3">
                <CheckCircle size={20} className="text-amber-600" />
                <span className="mono text-xs uppercase tracking-[0.4em] text-stone-500 font-black">
                  Flexibel Process
                </span>
              </div>
              <p className="text-base text-stone-600 leading-relaxed">
                Elk project is uniek. Dit proces wordt flexibel op maat afgestemd op uw situatie en wensen.
              </p>
            </div>
            <button
              onClick={() => navigate('/werkwijze')}
              className="flex items-center gap-3 px-8 py-4 bg-amber-600 text-white rounded-full hover:bg-amber-700 transition-all shadow-lg hover:shadow-xl mono text-xs uppercase tracking-[0.3em] font-black whitespace-nowrap"
            >
              Volledige werkwijze
              <ArrowRight size={18} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
