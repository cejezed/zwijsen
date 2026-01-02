'use client';

import React, { useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { ArrowUpRight, Filter, Hash, ChevronDown } from 'lucide-react';
import { PROJECTS_DETAIL } from '../../data/projecten';
import { ProjectCategory } from '../../data/types';
import { Footer, InquiryOverlay, ProjectDetailOverlay } from '../../components';

const ProjectCard = ({ project, idx, onClick }: { project: any; idx: number; onClick: () => void }) => {
    // Support both light projects (image) and full projects (featuredImage)
    const imageSrc = project.image || project.featuredImage?.url || '';
    const imageAlt = project.featuredImage?.alt || project.title || '';

    return (
        <motion.div
            layout
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="group cursor-pointer bg-white shadow-sm hover:shadow-2xl transition-all duration-700"
            onClick={onClick}
        >
            {/* Image Container */}
            <div className="relative overflow-hidden aspect-[4/3]">
                {imageSrc && (
                    <img
                        src={imageSrc}
                        alt={imageAlt}
                        className="w-full h-full object-cover transition-transform duration-[3s] group-hover:scale-110 grayscale-[0.1] group-hover:grayscale-0"
                    />
                )}

                {/* Flash UI Overlays (Blueprint View) - Only on Hover */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700">
                    {/* Architectural Crosshairs */}
                    <div className="absolute top-4 left-4 right-4 h-[1px] bg-white/40" />
                    <div className="absolute bottom-4 left-4 right-4 h-[1px] bg-white/40" />
                    <div className="absolute top-4 bottom-4 left-4 w-[1px] bg-white/40" />
                    <div className="absolute top-4 bottom-4 right-4 w-[1px] bg-white/40" />

                    {/* Technical Metadata */}
                    <div className="absolute top-8 left-8 flex flex-col gap-1">
                        <span className="mono text-[8px] text-white font-black tracking-[0.3em] uppercase bg-black/40 px-2 py-1">REF_0{idx + 1}</span>
                        <span className="mono text-[8px] text-white/70 tracking-widest uppercase">LAT_52.1284 / LON_5.0234</span>
                    </div>

                    <div className="absolute bottom-8 right-8">
                        <div className="bg-amber-600 text-white p-4 rounded-full shadow-2xl transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                            <ArrowUpRight size={20} />
                        </div>
                    </div>
                </div>

                {/* Subtle gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-40 group-hover:opacity-20 transition-opacity" />
            </div>

            {/* Content Info - Below Image */}
            <div className="p-6 bg-white border-t border-stone-100">
                <div className="space-y-3">
                    <div className="flex items-center gap-3">
                        <span className="mono text-[8px] font-black uppercase tracking-[0.4em] text-amber-600">
                            REF_0{idx + 1}
                        </span>
                        <span className="mono text-[8px] font-black uppercase tracking-[0.3em] text-stone-400">
                            {project.location || project.locationLabel?.replace('Locatie: ', '')}
                        </span>
                    </div>
                    <h3 className="text-lg md:text-xl font-serif text-black leading-tight group-hover:text-amber-700 transition-colors duration-500">
                        {project.title}
                    </h3>
                </div>
            </div>
        </motion.div>
    );
};

export const PortfolioClient: React.FC = () => {
    const router = useRouter();
    const [filter, setFilter] = useState<ProjectCategory | 'all'>('all');
    const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);
    const [isInquiryOpen, setIsInquiryOpen] = useState(false);
    const [selectedProject, setSelectedProject] = useState<{ project: any; idx: number } | null>(null);
    const footerRef = useRef<HTMLDivElement>(null);

    // Scroll to top when component mounts
    React.useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const { scrollYProgress } = useScroll();

    // Footer scroll animations
    const { scrollYProgress: footerScroll } = useScroll({
        target: footerRef,
        offset: ["start end", "end end"]
    });
    const footerParallaxText = useTransform(footerScroll, [0, 1], [0, -1500]);
    const footerOpacity = useTransform(footerScroll, [0, 0.4], [0, 1]);

    const allCategories = ['all', ...Array.from(new Set(PROJECTS_DETAIL.flatMap(p => 'categories' in p ? p.categories || [] : [])))];
    const filteredProjects = filter === 'all'
        ? PROJECTS_DETAIL
        : PROJECTS_DETAIL.filter(p => 'categories' in p && p.categories?.includes(filter as ProjectCategory));

    const toOverlayProject = (p: any, idx: number) => {
        // Support both "light" projects (with image/gallery) and full projects (with featuredImage/heroImages)
        const isLightProject = p.openMode === 'overlay';

        let primaryImage: string;
        let baseGallery: string[];

        if (isLightProject) {
            // Light project format
            primaryImage = p.image || '';
            baseGallery = p.gallery || (primaryImage ? [primaryImage] : []);
        } else {
            // Full project format
            const gallery = (p.heroImages || []).map((img: any) => img.url).filter(Boolean);
            primaryImage = p.featuredImage?.url || gallery[0] || '';
            baseGallery = gallery.length ? gallery : primaryImage ? [primaryImage] : [];
        }

        const paddedGallery = baseGallery.length >= 3
            ? baseGallery
            : [...baseGallery, ...Array.from({ length: 3 - baseGallery.length }, () => primaryImage || baseGallery[0]).filter(Boolean)];

        return {
            id: p.id || 1000 + idx,
            title: p.title,
            location: p.location || (p.locationLabel || '').replace('Locatie: ', ''),
            slug: p.slug,
            image: primaryImage,
            year: p.year || 'N.N.B.',
            area: p.area || 'N.N.B.',
            tag: p.tag || (p.categories?.includes('nieuwbouw') ? 'Nieuwbouw' : p.categories?.includes('verbouw') ? 'Verbouw' : p.categories?.[0] || 'Project'),
            subtitle: p.subtitle,
            description: p.description || p.subtitle,
            gallery: paddedGallery,
            snapshot: p.snapshot
        };
    };

    const openOverlay = (p: any, idx: number) => setSelectedProject({ project: toOverlayProject(p, idx), idx });
    const showPrev = () => {
        if (!selectedProject || filteredProjects.length === 0) return;
        const prevIdx = (selectedProject.idx - 1 + filteredProjects.length) % filteredProjects.length;
        openOverlay(filteredProjects[prevIdx], prevIdx);
    };
    const showNext = () => {
        if (!selectedProject || filteredProjects.length === 0) return;
        const nextIdx = (selectedProject.idx + 1) % filteredProjects.length;
        openOverlay(filteredProjects[nextIdx], nextIdx);
    };

    return (
        <>
            {/* Inquiry Overlay */}
            <InquiryOverlay
                isOpen={isInquiryOpen}
                onClose={() => setIsInquiryOpen(false)}
            />

            <AnimatePresence>
                {selectedProject && (
                    <ProjectDetailOverlay
                        project={selectedProject.project}
                        onClose={() => setSelectedProject(null)}
                        onPrev={filteredProjects.length > 1 ? showPrev : undefined}
                        onNext={filteredProjects.length > 1 ? showNext : undefined}
                        onContact={() => {
                            setSelectedProject(null);
                            setIsInquiryOpen(true);
                        }}
                    />
                )}
            </AnimatePresence>

            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="min-h-screen bg-stone-50 pt-24 pb-32 px-6 md:px-12 relative overflow-hidden selection:bg-amber-100"
            >
                {/* Fixed Navigation Bar */}
                <nav className="fixed top-6 md:top-8 left-1/2 -translate-x-1/2 z-[100] pointer-events-none">
                    <div className="flex items-center gap-8 bg-white/80 backdrop-blur-xl border border-stone-200 px-8 py-4 rounded-full shadow-sm pointer-events-auto">
                        <div className="flex items-center gap-3 mono text-[10px] font-black text-stone-400">
                            <Hash size={12} className="text-amber-500" />
                            <span>{filteredProjects.length} PROJECTEN</span>
                        </div>
                    </div>
                </nav>

                <div className="max-w-[2500px] mx-auto relative z-10">
                    <header className="mb-24 flex flex-col md:flex-row md:items-end justify-between gap-12">
                        <div className="space-y-10">
                            <div className="flex items-center gap-6">
                                <div className="w-12 h-[1px] bg-amber-600" />
                                <span className="mono text-amber-700 text-[10px] font-black tracking-[0.6em] uppercase">Uitgelichte Projecten</span>
                            </div>
                            <h1 className="text-6xl md:text-[8vw] font-serif italic tracking-tighter text-black leading-[0.85] uppercase">
                                Vormgegeven <br /> <span className="text-stone-300">Ambities.</span>
                            </h1>
                        </div>

                        <div className="flex flex-col gap-6 items-start md:items-end relative">
                            <div className="flex items-center gap-2 mono text-[10px] font-black text-stone-400 uppercase tracking-widest mb-2">
                                <Filter size={14} className="text-amber-500" /> Filter op type
                            </div>

                            {/* Dropdown Button */}
                            <div className="relative">
                                <button
                                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                                    className={`px-8 py-4 rounded-full border-2 mono text-[9px] font-black uppercase tracking-widest transition-all duration-500 flex items-center gap-3 min-w-[200px] justify-between ${isDropdownOpen
                                        ? 'bg-amber-600 text-white border-amber-600 shadow-xl'
                                        : 'bg-white text-stone-700 border-stone-200 hover:border-amber-600/30'
                                        }`}
                                >
                                    <span>{filter.replace(/-/g, ' ')}</span>
                                    <ChevronDown
                                        size={14}
                                        className={`transition-transform duration-300 ${isDropdownOpen ? 'rotate-180' : ''}`}
                                    />
                                </button>

                                {/* Dropdown Menu */}
                                <AnimatePresence>
                                    {isDropdownOpen && (
                                        <motion.div
                                            initial={{ opacity: 0, y: -10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, y: -10 }}
                                            transition={{ duration: 0.2 }}
                                            className="absolute top-full mt-2 right-0 bg-white border-2 border-stone-200 rounded-2xl shadow-2xl overflow-hidden min-w-[200px] z-50"
                                        >
                                            <div className="py-2">
                                                {allCategories.map((category) => (
                                                    <button
                                                        key={category}
                                                        onClick={() => {
                                                            setFilter(category as ProjectCategory | 'all');
                                                            setIsDropdownOpen(false);
                                                        }}
                                                        className={`w-full px-6 py-3 text-left mono text-[9px] font-black uppercase tracking-widest transition-all duration-300 ${filter === category
                                                            ? 'bg-amber-600 text-white'
                                                            : 'text-stone-600 hover:bg-stone-50'
                                                            }`}
                                                    >
                                                        {category.replace(/-/g, ' ')}
                                                    </button>
                                                ))}
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        </div>
                    </header>

                    {/* Uniform Dossier Grid */}
                    <motion.div
                        layout
                        className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-2 md:gap-02"
                    >
                        <AnimatePresence mode="popLayout">
                            {filteredProjects.map((project, idx) => (
                                <ProjectCard
                                    key={project.slug}
                                    project={project}
                                    idx={idx}
                                    onClick={() => {
                                        if ((project as any).openMode === 'overlay') {
                                            openOverlay(project, idx);
                                            return;
                                        }
                                        router.push(`/portfolio/${project.slug}`);
                                    }}
                                />
                            ))}
                        </AnimatePresence>
                    </motion.div>
                </div>

                {/* Footer */}
                <Footer
                    footerRef={footerRef}
                    parallaxText={footerParallaxText}
                    opacity={footerOpacity}
                />
            </motion.div>
        </>
    );
};
