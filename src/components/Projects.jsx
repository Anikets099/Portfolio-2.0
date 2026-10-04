import React, { useState, useRef, useEffect, useCallback } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ChevronLeft, ChevronRight, ExternalLink, Github, Sparkles } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

// Project Data with specific details provided by user
const PROJECTS_DATA = [
  {
    id: '01',
    title: 'Hiking Trail Explorer',
    category: 'MERN Stack',
    accent: '#34D399', // Emerald Neon
    accentBg: 'rgba(52, 211, 153, 0.12)',
    description:
      'A full-stack hiking platform for discovering trails, exploring locations on interactive maps, saving favorites, tracking completed hikes, and managing hiking progress.',
    tech: ['React', 'Node.js', 'Express', 'MongoDB', 'Leaflet', 'OSM'],
    githubUrl: 'https://github.com',
    liveUrl: '#',
    glyph: (
      <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5 text-[#34D399]" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="m8 3 4 8 5-5 5 15H2L8 3z" />
        <path d="M4.14 15.08c2.62-1.57 5.24-1.43 7.86.42 2.74 1.94 5.49 2 8.23.19" />
      </svg>
    ),
  },
  {
    id: '02',
    title: 'Urban Health Assessment',
    category: 'MERN Stack',
    accent: '#38BDF8', // Sky Blue Neon
    accentBg: 'rgba(56, 189, 248, 0.12)',
    description:
      'A web application that provides weather, air-quality, map-based and environmental insights to help users understand urban health conditions.',
    tech: ['React', 'Node.js', 'Express', 'MongoDB', 'Open-Meteo', 'AQI'],
    githubUrl: 'https://github.com',
    liveUrl: '#',
    glyph: (
      <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5 text-[#38BDF8]" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M14 4v10.54a4 4 0 1 1-4 0V4a2 2 0 0 1 4 0Z" />
        <path d="M12 9v6" />
      </svg>
    ),
  },
  {
    id: '03',
    title: 'RAG Chatbot',
    category: 'MERN Stack / AI',
    accent: '#C084FC', // Purple Neon
    accentBg: 'rgba(192, 132, 252, 0.12)',
    description:
      'An AI-powered chatbot that retrieves relevant information from provided knowledge sources and generates contextual answers using Retrieval-Augmented Generation.',
    tech: ['React', 'Node.js', 'Express', 'MongoDB', 'RAG', 'LLM'],
    githubUrl: 'https://github.com',
    liveUrl: '#',
    glyph: (
      <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5 text-[#C084FC]" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2a8 8 0 0 0-8 8c0 3.37 2.08 6.25 5 7.42V20a2 2 0 0 0 2 2h2a2 2 0 0 0 2-2v-2.58c2.92-1.17 5-4.05 5-7.42a8 8 0 0 0-8-8z" />
        <path d="M9 10h.01M15 10h.01M10 14h4" />
      </svg>
    ),
  },
  {
    id: '04',
    title: 'Distributed CDN',
    category: 'Python / Backend',
    accent: '#FB923C', // Orange Neon
    accentBg: 'rgba(251, 146, 60, 0.12)',
    description:
      'A distributed content delivery system that routes requests across multiple regional servers to improve content delivery, caching, and system performance.',
    tech: ['Python', 'Flask', 'SQLite', 'REST API', 'Distributed'],
    githubUrl: 'https://github.com',
    liveUrl: '#',
    glyph: (
      <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5 text-[#FB923C]" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="2" width="20" height="8" rx="2" />
        <rect x="2" y="14" width="20" height="8" rx="2" />
        <line x1="6" y1="6" x2="6.01" y2="6" strokeWidth="3" />
        <line x1="6" y1="18" x2="6.01" y2="18" strokeWidth="3" />
      </svg>
    ),
  },
  {
    id: '05',
    title: 'EchoChain',
    category: 'Blockchain / Climate',
    accent: '#FB7185', // Rose Pink Neon
    accentBg: 'rgba(251, 113, 133, 0.12)',
    description:
      'A transparent carbon-market platform designed to improve visibility and trust in carbon credits by tracking carbon transactions through a verifiable digital system.',
    tech: ['Blockchain', 'Solidity', 'Smart Contracts', 'Web3'],
    githubUrl: 'https://github.com',
    liveUrl: '#',
    glyph: (
      <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5 text-[#FB7185]" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="7" width="20" height="14" rx="2" />
        <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
      </svg>
    ),
  },
  {
    id: '06',
    title: 'Java ChatApp',
    category: 'Java / Networking',
    accent: '#818CF8', // Indigo Neon
    accentBg: 'rgba(129, 140, 248, 0.12)',
    description:
      'A real-time chat application built with Java that enables users to communicate through a client-server architecture and network-based messaging.',
    tech: ['Java', 'Socket Programming', 'Client-Server', 'Threads'],
    githubUrl: 'https://github.com',
    liveUrl: '#',
    glyph: (
      <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5 text-[#818CF8]" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
      </svg>
    ),
  },
];

export default function Projects() {
  const sectionRef = useRef(null);
  const headingWrapperRef = useRef(null);
  const descRef = useRef(null);
  const stackContainerRef = useRef(null);
  const controlsRef = useRef(null);
  const cardElementsRef = useRef([]);

  // Active top card index
  const [topIndex, setTopIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const totalCards = PROJECTS_DATA.length;

  // Touch drag coordinates for mobile swipe
  const touchStartX = useRef(0);
  const touchStartY = useRef(0);

  // GSAP Shuffle Next: top card slides out and shifts to back of stack
  const handleNext = useCallback(() => {
    if (isAnimating) return;
    setIsAnimating(true);

    const activeEl = cardElementsRef.current[topIndex];
    if (!activeEl) {
      setTopIndex((prev) => (prev + 1) % totalCards);
      setIsAnimating(false);
      return;
    }

    gsap.to(activeEl, {
      x: -240,
      y: 15,
      rotation: -12,
      opacity: 0,
      duration: 0.35,
      ease: 'power2.in',
      onComplete: () => {
        setTopIndex((prev) => (prev + 1) % totalCards);
        gsap.set(activeEl, {
          x: 40,
          y: -35,
          rotation: 0,
          opacity: 1,
        });
        setTimeout(() => setIsAnimating(false), 70);
      },
    });
  }, [topIndex, totalCards, isAnimating]);

  // GSAP Shuffle Prev: back card flies in onto top
  const handlePrev = useCallback(() => {
    if (isAnimating) return;
    setIsAnimating(true);

    const prevIndex = (topIndex - 1 + totalCards) % totalCards;
    const incomingEl = cardElementsRef.current[prevIndex];

    if (!incomingEl) {
      setTopIndex(prevIndex);
      setIsAnimating(false);
      return;
    }

    gsap.fromTo(
      incomingEl,
      {
        x: -240,
        y: -20,
        rotation: 10,
        opacity: 0,
        zIndex: 30,
      },
      {
        x: 0,
        y: 0,
        rotation: 0,
        opacity: 1,
        duration: 0.38,
        ease: 'power3.out',
        onComplete: () => {
          setTopIndex(prevIndex);
          setIsAnimating(false);
        },
      }
    );
  }, [topIndex, totalCards, isAnimating]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowRight') handleNext();
      if (e.key === 'ArrowLeft') handlePrev();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleNext, handlePrev]);

  // Touch Swipe Handlers
  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
    touchStartY.current = e.touches[0].clientY;
  };

  const handleTouchEnd = (e) => {
    const deltaX = e.changedTouches[0].clientX - touchStartX.current;
    const deltaY = e.changedTouches[0].clientY - touchStartY.current;

    if (Math.abs(deltaX) > 35 && Math.abs(deltaX) > Math.abs(deltaY)) {
      if (deltaX < 0) {
        handleNext();
      } else {
        handlePrev();
      }
    }
  };

  // Section Entrance Animation
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    let tl;

    const ctx = gsap.context(() => {
      tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top 75%',
          toggleActions: 'play none none reset',
        },
        defaults: { ease: 'power3.out' },
      });

      tl.fromTo(
        headingWrapperRef.current,
        { y: 70, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.9, ease: 'power3.out' },
        0
      )
      .fromTo(
        descRef.current,
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.85, ease: 'power3.out' },
        0.16
      )
      .fromTo(
        stackContainerRef.current,
        { y: 70, opacity: 0, scale: 0.95 },
        { y: 0, opacity: 1, scale: 1, duration: 0.95, ease: 'power3.out' },
        0.28
      )
      .fromTo(
        controlsRef.current,
        { y: 35, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.75, ease: 'power3.out' },
        0.42
      );
    }, section);

    const handleProjectsNavClick = () => {
      if (tl) {
        setTimeout(() => {
          tl.restart();
        }, 220);
      }
    };

    const projectsLinks = document.querySelectorAll('a[href="#projects"]');
    projectsLinks.forEach((link) => link.addEventListener('click', handleProjectsNavClick));

    return () => {
      ctx.revert();
      projectsLinks.forEach((link) => link.removeEventListener('click', handleProjectsNavClick));
    };
  }, []);

  return (
    <section
      id="projects"
      ref={sectionRef}
      className="relative min-h-screen py-20 sm:py-28 bg-[#06141B] text-[#CCD0CF] overflow-hidden flex flex-col items-center justify-center border-t border-[#11212D]/80 select-none"
    >
      {/* Background Ambience & Fine Grid Pattern */}
      <div
        className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,#CCD0CF04_1px,transparent_1px),linear-gradient(to_bottom,#CCD0CF04_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_75%_65%_at_50%_50%,#000_65%,transparent_100%)] will-change-transform"
        aria-hidden="true"
      />

      {/* Atmospheric Ambient Accent Glow */}
      <div
        className="pointer-events-none absolute top-1/3 left-1/2 -translate-x-1/2 w-[520px] h-[520px] bg-gradient-to-tr from-[#38BDF8]/12 via-[#A855F7]/10 to-transparent rounded-full blur-3xl opacity-70 -z-10"
        aria-hidden="true"
      />

      <div className="relative max-w-6xl mx-auto px-4 sm:px-8 w-full z-10 flex flex-col items-center">

        {/* Section Heading: Same typography as My Skills */}
        <div ref={headingWrapperRef} className="overflow-hidden mb-3 text-center will-change-transform">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight leading-tight flex items-center justify-center gap-2">
            <span className="text-white">Featured</span>
            <span className="text-[#7DD3FC] drop-shadow-[0_0_16px_rgba(125,211,252,0.4)]">
              Projects
            </span>
          </h2>
        </div>

        {/* Subtitle Description */}
        <p
          ref={descRef}
          className="text-sm sm:text-base text-[#9BA8AB] text-center max-w-xl mb-10 will-change-transform leading-relaxed"
        >
          Explore a compact stack of full-stack platforms, distributed systems, AI architectures, and interactive applications.
        </p>

        {/* ========================================================= */}
        {/* COMPACT GSAP CARD STACK SHOWCASE                          */}
        {/* ========================================================= */}
        <div
          ref={stackContainerRef}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
          className="relative w-full max-w-[270px] sm:max-w-[310px] md:max-w-[330px] h-[375px] sm:h-[405px] md:h-[425px] flex items-center justify-center will-change-transform cursor-pointer"
        >
          {PROJECTS_DATA.map((project, index) => {
            // Stack distance calculation relative to active top card
            const stackPos = (index - topIndex + totalCards) % totalCards;
            const isTop = stackPos === 0;

            // Compact isometric stack offsets matching Screenshot (139).png
            const isMobile = typeof window !== 'undefined' && window.innerWidth < 640;
            const stepX = isMobile ? 8 : 12;
            const stepY = isMobile ? -8 : -10;
            const stepScale = 0.035;

            const targetX = stackPos * stepX;
            const targetY = stackPos * stepY;
            const targetScale = Math.max(0.82, 1 - stackPos * stepScale);
            const targetZIndex = 20 - stackPos;
            const targetOpacity = stackPos > 4 ? 0 : 1 - stackPos * 0.12;

            return (
              <div
                key={project.id}
                ref={(el) => (cardElementsRef.current[index] = el)}
                onClick={() => {
                  if (isTop) {
                    handleNext();
                  } else {
                    setTopIndex(index);
                  }
                }}
                style={{
                  transform: `translate(${targetX}px, ${targetY}px) scale(${targetScale})`,
                  zIndex: targetZIndex,
                  opacity: targetOpacity,
                  borderColor: project.accent,
                  boxShadow: isTop
                    ? `0 0 28px ${project.accent}35, 0 20px 45px rgba(0,0,0,0.85)`
                    : `0 0 12px ${project.accent}15, 0 12px 30px rgba(0,0,0,0.6)`,
                  transition: 'transform 0.45s cubic-bezier(0.25, 1, 0.5, 1), opacity 0.38s ease, box-shadow 0.38s ease',
                }}
                className={`absolute inset-0 rounded-2xl sm:rounded-3xl p-4 sm:p-5 flex flex-col justify-between backdrop-blur-2xl border-2 bg-[#09151F]/95 text-left select-none overflow-hidden ${
                  isTop ? 'cursor-pointer' : 'cursor-pointer hover:brightness-110'
                }`}
              >
                {/* Top Subtle Gloss Sheen */}
                <div
                  className="pointer-events-none absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-white/[0.06] to-transparent rounded-t-2xl sm:rounded-t-3xl"
                  aria-hidden="true"
                />

                {/* Background Watermark Numeral */}
                <div
                  className="pointer-events-none absolute -bottom-3 -right-2 font-black text-6xl sm:text-7xl text-white/[0.04] leading-none select-none font-mono"
                  aria-hidden="true"
                >
                  {project.id}
                </div>

                {/* Card Top Header: Category, Index & Compact Glyph */}
                <div className="relative z-10 flex items-start justify-between w-full">
                  <div>
                    <span
                      className="text-[10px] sm:text-[11px] font-mono tracking-widest uppercase font-bold block mb-0.5"
                      style={{ color: project.accent }}
                    >
                      {project.category}
                    </span>
                    <span className="font-mono text-[10px] sm:text-[11px] tracking-wider text-[#9BA8AB] font-semibold">
                      PROJECT {project.id} / 0{totalCards}
                    </span>
                  </div>

                  {/* Compact Geometric Glyph Emblem */}
                  <div
                    className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl flex items-center justify-center border shrink-0"
                    style={{
                      backgroundColor: project.accentBg,
                      borderColor: `${project.accent}50`,
                      boxShadow: `0 0 14px ${project.accent}25`,
                    }}
                  >
                    {project.glyph}
                  </div>
                </div>

                {/* Card Center: Project Title & Description */}
                <div className="relative z-10 my-auto py-1">
                  <h3 className="text-base sm:text-lg font-bold text-white tracking-tight leading-snug mb-1.5 line-clamp-1">
                    {project.title}
                  </h3>
                  <p className="text-xs text-[#9BA8AB] leading-relaxed line-clamp-3">
                    {project.description}
                  </p>
                </div>

                {/* Card Bottom: Tech Stack Pills & Actions */}
                <div className="relative z-10 pt-2.5 border-t border-[#253745]/70 flex flex-col gap-2.5">
                  {/* Tech stack badges */}
                  <div className="flex flex-wrap gap-1">
                    {project.tech.map((item) => (
                      <span
                        key={item}
                        className="px-2 py-0.5 rounded-full text-[9px] sm:text-[10px] font-medium bg-[#06141B]/80 text-[#CCD0CF] border border-[#253745]"
                      >
                        {item}
                      </span>
                    ))}
                  </div>

                  {/* Action Links & Flip Hint */}
                  <div className="flex items-center justify-between pt-0.5">
                    <span className="text-[10px] font-mono text-[#9BA8AB]/70 flex items-center gap-1">
                      <Sparkles className="w-3 h-3 text-[#7DD3FC]" />
                      <span>Flip next</span>
                    </span>

                    <div className="flex items-center gap-1.5" onClick={(e) => e.stopPropagation()}>
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-1.5 rounded-lg bg-[#11212D]/80 hover:bg-[#1C2D3A] text-white border border-[#253745] hover:border-[#7DD3FC]/50 transition-colors"
                        aria-label="View Github Repository"
                      >
                        <Github className="w-3.5 h-3.5" />
                      </a>
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-1.5 rounded-lg bg-[#11212D]/80 hover:bg-[#1C2D3A] text-white border border-[#253745] hover:border-[#7DD3FC]/50 transition-colors"
                        aria-label="View Live Project"
                      >
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                    </div>
                  </div>
                </div>

              </div>
            );
          })}
        </div>

        {/* ========================================================= */}
        {/* STACK CONTROLS & PAGINATION                               */}
        {/* ========================================================= */}
        <div
          ref={controlsRef}
          className="flex items-center justify-center gap-3.5 mt-8 sm:mt-10 will-change-transform z-20"
        >
          <button
            type="button"
            onClick={handlePrev}
            disabled={isAnimating}
            aria-label="Previous project card"
            className="group px-4 py-2 rounded-full bg-[#11212D]/80 hover:bg-[#1C2D3A] text-white border border-[#253745] hover:border-[#7DD3FC]/50 transition-all font-medium text-xs sm:text-sm flex items-center gap-1.5 shadow-md hover:shadow-[0_0_16px_rgba(125,211,252,0.2)] hover:scale-105 active:scale-95 cursor-pointer backdrop-blur-md disabled:opacity-50"
          >
            <ChevronLeft className="w-3.5 h-3.5 text-[#7DD3FC] group-hover:-translate-x-0.5 transition-transform" />
            <span>Prev</span>
          </button>

          {/* Stack Deck Indicator Dots */}
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#11212D]/50 border border-[#253745]/50 backdrop-blur-md">
            {PROJECTS_DATA.map((proj, i) => (
              <button
                key={proj.id}
                type="button"
                onClick={() => setTopIndex(i)}
                aria-label={`Go to project ${i + 1}`}
                style={{
                  backgroundColor: i === topIndex ? proj.accent : '#253745',
                  boxShadow: i === topIndex ? `0 0 8px ${proj.accent}` : 'none',
                }}
                className={`transition-all duration-300 rounded-full cursor-pointer ${
                  i === topIndex ? 'w-4 h-1.5' : 'w-1.5 h-1.5 hover:bg-[#9BA8AB]'
                }`}
              />
            ))}
          </div>

          <button
            type="button"
            onClick={handleNext}
            disabled={isAnimating}
            aria-label="Next project card"
            className="group px-4 py-2 rounded-full bg-[#11212D]/80 hover:bg-[#1C2D3A] text-white border border-[#253745] hover:border-[#7DD3FC]/50 transition-all font-medium text-xs sm:text-sm flex items-center gap-1.5 shadow-md hover:shadow-[0_0_16px_rgba(125,211,252,0.2)] hover:scale-105 active:scale-95 cursor-pointer backdrop-blur-md disabled:opacity-50"
          >
            <span>Next</span>
            <ChevronRight className="w-3.5 h-3.5 text-[#7DD3FC] group-hover:translate-x-0.5 transition-transform" />
          </button>
        </div>

      </div>
    </section>
  );
}
