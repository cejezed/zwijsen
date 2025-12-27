import React, { useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { MosaicItem } from './ProjectUI';
import { ArrowRight } from 'lucide-react';

interface PortfolioSectionProps {
  projects: any[];
  onProjectClick: (project: any) => void;
}

export const PortfolioSection: React.FC<PortfolioSectionProps> = ({ projects, onProjectClick }) => {
  const wallContainerRef = useRef<HTMLDivElement>(null);
  const portfolioScrollRef = useRef<HTMLDivElement>(null);
  const [hoveredRow, setHoveredRow] = useState<number | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  // Limiteer projecten tot maximaal 5
  const limitedProjects = projects.slice(0, 15);

  // Natuurlijke scroll parallax
  const { scrollYProgress: wallScrollProgress } = useScroll({
    target: wallContainerRef,
    offset: ["start end", "end start"]
  });

  const track1X = useTransform(wallScrollProgress, [0, 1], ["5%", "-25%"]);
  const track2X = useTransform(wallScrollProgress, [0, 1], ["-5%", "-15%"]);

  // Drag to scroll handlers
  const handleMouseDown = (e: React.MouseEvent) => {
    if (!portfolioScrollRef.current) return;
    setIsDragging(true);
    setStartX(e.pageX - portfolioScrollRef.current.offsetLeft);
    setScrollLeft(portfolioScrollRef.current.scrollLeft);
  };

  const handleMouseLeave = () => setIsDragging(false);
  const handleMouseUp = () => setIsDragging(false);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !portfolioScrollRef.current) return;
    e.preventDefault();
    const x = e.pageX - portfolioScrollRef.current.offsetLeft;
    const walk = (x - startX) * 2;
    portfolioScrollRef.current.scrollLeft = scrollLeft - walk;
  };

  // Veilig dupliceren van projecten voor de tracks
  const track1Projects = [...limitedProjects, ...(limitedProjects.length > 0 ? [limitedProjects[0]] : []), ...(limitedProjects.length > 1 ? [limitedProjects[1]] : []), ...(limitedProjects.length > 2 ? [limitedProjects[2]] : [])];
  const track2Projects = [...limitedProjects.slice().reverse(), ...(limitedProjects.length > 3 ? [limitedProjects[3]] : []), ...(limitedProjects.length > 2 ? [limitedProjects[2]] : []), ...(limitedProjects.length > 0 ? [limitedProjects[0]] : [])];

  return (
    <section ref={wallContainerRef} className="relative pt-80 pb-0 bg-white z-10 overflow-hidden" id="projects">
      <div className="px-12 md:px-32 mb-40 flex flex-col md:flex-row justify-between items-end gap-12">
        <div className="relative">
          <span className="mono text-amber-900 text-sm tracking-[1.2em] block uppercase mb-6 font-black">Interlocking Wall</span>
          <h3 className="text-7xl md:text-[8vw] font-serif italic tracking-tighter text-black leading-[0.85]">Vertaal uw <br/>Droom.</h3>
        </div>
        <div className="max-w-md">
          <p className="text-stone-500 text-xl italic font-light leading-relaxed">Scroll horizontaal door ons portfolio. Sleep of scroll naar rechts voor meer inspiratie.</p>
        </div>
      </div>

      <div
        ref={portfolioScrollRef}
        onMouseDown={handleMouseDown}
        onMouseLeave={handleMouseLeave}
        onMouseUp={handleMouseUp}
        onMouseMove={handleMouseMove}
        className={`relative w-full overflow-x-auto overflow-y-visible flex flex-col pointer-events-auto custom-scrollbar ${isDragging ? 'cursor-grabbing' : 'cursor-grab'}`}
        style={{ userSelect: isDragging ? 'none' : 'auto' }}
      >
        <style>{`
          .custom-scrollbar::-webkit-scrollbar {
            height: 8px;
          }
          .custom-scrollbar::-webkit-scrollbar-track {
            background: #f5f5f4;
          }
          .custom-scrollbar::-webkit-scrollbar-thumb {
            background: #d97706;
            border-radius: 4px;
          }
          .custom-scrollbar::-webkit-scrollbar-thumb:hover {
            background: #b45309;
          }
        `}</style>
        {/* Track 1 */}
        <motion.div
          style={{ x: track1X, zIndex: hoveredRow === 0 ? 50 : 20 }}
          onMouseEnter={() => setHoveredRow(0)}
          onMouseLeave={() => setHoveredRow(null)}
          className="flex gap-0 items-end overflow-visible relative transition-all duration-300"
        >
          {track1Projects.map((project, idx) => {
            const offsets = ["0px", "30px", "10px", "25px", "15px", "35px"];
            return (
              <MosaicItem
                key={`t1-${idx}`}
                project={project}
                height="60vh"
                width={["40vw", "45vw", "30vw", "55vw", "40vw", "45vw"][idx % 6]}
                offsetY={offsets[idx % offsets.length]}
                onOpen={onProjectClick}
              />
            );
          })}
        </motion.div>

        {/* Track 2 */}
        <motion.div
          style={{ x: track2X, zIndex: hoveredRow === 1 ? 50 : 10 }}
          onMouseEnter={() => setHoveredRow(1)}
          onMouseLeave={() => setHoveredRow(null)}
          className="flex gap-0 items-start -mt-8 overflow-visible relative transition-all duration-300"
        >
          {track2Projects.map((project, idx) => {
            const offsets = ["-15px", "-30px", "-10px", "-25px", "-20px", "-35px"];
            return (
              <MosaicItem
                key={`t2-${idx}`}
                project={project}
                height="60vh"
                width={["45vw", "35vw", "50vw", "40vw", "55vw", "35vw"][idx % 6]}
                isBottomRow
                offsetY={offsets[idx % offsets.length]}
                onOpen={onProjectClick}
              />
            );
          })}
        </motion.div>
      </div>

      {/* CTA direct onder de portfolio - volle breedte */}
      <div className="w-full bg-stone-900">
        <div className="max-w-screen-2xl mx-auto px-8 md:px-32 py-16 md:py-24">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative text-white overflow-hidden group"
          >
            {/* Decoratieve accent lijn */}
            <div className="absolute top-0 left-0 w-full h-1 bg-amber-600" />

            <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-10 pt-10">
              <div className="space-y-6 max-w-2xl">
                <span className="mono text-xs uppercase tracking-[0.5em] text-amber-500 font-black block">
                  Meer Inspiratie
                </span>
                <h4 className="text-4xl md:text-6xl font-serif italic text-white leading-[0.95] tracking-tighter">
                  Nieuwsgierig naar <br/>
                  <span className="text-amber-500">andere oplossingen?</span>
                </h4>
                <p className="text-lg md:text-xl font-light italic text-stone-300 leading-relaxed">
                  Ontdek ons volledige portfolio met gerealiseerde projecten. Van moderne villa's tot landelijke hofwoningen.
                </p>
              </div>

              <a
                href="#"
                className="inline-flex items-center gap-6 bg-white text-black px-10 py-5 rounded-full mono text-xs uppercase tracking-[0.4em] font-black hover:bg-amber-600 hover:text-white transition-all group/btn shadow-2xl whitespace-nowrap"
              >
                Alle Projecten
                <ArrowRight size={18} className="group-hover/btn:translate-x-2 transition-transform" />
              </a>
            </div>

            {/* Subtiele achtergrond gradient */}
            <div className="absolute inset-0 bg-gradient-to-br from-stone-800/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
          </motion.div>
        </div>
      </div>
    </section>
  );
};
