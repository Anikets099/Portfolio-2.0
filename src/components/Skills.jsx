import React, { useState, useEffect, useRef, useCallback } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ChevronLeft, ChevronRight, Pause, Play } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

// Custom SVG Icons
const JavaIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5 text-[#C084FC]" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M7 2c0 2 2 3 2 4s-2 2-2 3" />
    <path d="M12 1c0 2 2 3 2 4s-2 2-2 3" />
    <path d="M17 2c0 2 2 3 2 4s-2 2-2 3" />
    <path d="M5 11h14a1 1 0 0 1 1 1v5a4 4 0 0 1-4 4H8a4 4 0 0 1-4-4v-5a1 1 0 0 1 1-1z" />
    <path d="M3 21h18" />
  </svg>
);

const HtmlIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 text-[#E44D26]">
    <path d="M12 2L3 5l2.5 14L12 22l6.5-3L21 5l-9-3zm0 2.2l6.8 2.3-2 11.2-4.8 2.2-4.8-2.2-2-11.2 6.8-2.3z" opacity="0.3"/>
    <path d="M7.5 8h9l-.4 2.5h-5.8l.2 1.8h5.4l-.6 4-3.7 1.2-3.7-1.2-.3-2h2.2l.1 1 1.7.5 1.7-.5.3-1.8H7.5L7.5 8z" />
  </svg>
);

const CssIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 text-[#38BDF8]">
    <path d="M12 2L3 5l2.5 14L12 22l6.5-3L21 5l-9-3zm0 2.2l6.8 2.3-2 11.2-4.8 2.2-4.8-2.2-2-11.2 6.8-2.3z" opacity="0.3"/>
    <path d="M16.5 8H7.5l.3 2.5h5.8l-.2 1.8H7.9l.3 2.2h5.2l-.3 2.3-1.8.6-1.8-.6-.2-1.2H7.2l.4 2.4 4.4 1.4 4.4-1.4.9-6.3.2-1.3H16.5V8z" />
  </svg>
);

const JsIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 text-[#FBBF24]">
    <rect x="2" y="2" width="20" height="20" rx="4" fill="#FBBF24" fillOpacity="0.15" stroke="#FBBF24" strokeWidth="1.5" />
    <path d="M7 16.5c.5.8 1.3 1.3 2.2 1.3 1.2 0 2-.7 2-2.2V9H9.4v6.5c0 .6-.3.9-.8.9-.4 0-.8-.3-1-.7l-.6.8zM14 16.3c.6.9 1.6 1.5 2.8 1.5 1.5 0 2.5-.9 2.5-2.2 0-1.4-.9-2-2.1-2.5-.9-.4-1.3-.7-1.3-1.2 0-.5.4-.9 1-.9.6 0 1 .3 1.3.8l1.3-.9c-.6-.9-1.5-1.4-2.6-1.4-1.5 0-2.5.9-2.5 2.2 0 1.3.8 2 2 2.5.9.4 1.4.7 1.4 1.3 0 .6-.5 1-1.2 1-.8 0-1.4-.4-1.8-1.1l-1.4.9z" fill="#FBBF24" />
  </svg>
);

const SpringIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5 text-[#4ADE80]" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 2C6.5 2 2 6.5 2 12c0 3.5 1.8 6.5 4.5 8.2L12 12V2z" fill="#4ADE80" fillOpacity="0.2"/>
    <path d="M12 2c5.5 0 10 4.5 10 10 0 3.5-1.8 6.5-4.5 8.2L12 12V2z" />
    <path d="M12 12l5.5 8.2A10 10 0 0 1 12 22a10 10 0 0 1-5.5-1.8L12 12z" />
  </svg>
);

const DatabaseIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5 text-[#60A5FA]" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <ellipse cx="12" cy="5" rx="9" ry="3" fill="#60A5FA" fillOpacity="0.2" />
    <path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3" />
    <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5" />
  </svg>
);

const PythonIcon = () => (
  <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none">
    <path
      d="M11.9 2c-3.1 0-2.9 1.3-2.9 1.3l.01 1.4h2.9v.4H6.2s-2.1.2-2.1 3.1 1.8 3 1.8 3h1.1v-1.5c0-1.7 1.4-1.7 1.4-1.7h3.5s1.4 0 1.4-1.4V3.5s.3-1.5-1.5-1.5zm-1.6 1a.5.5 0 1 1 0 1 .5.5 0 0 1 0-1z"
      fill="#38BDF8"
    />
    <path
      d="M12.1 22c3.1 0 2.9-1.3 2.9-1.3l-.01-1.4h-2.9v-.4h5.7s2.1-.2 2.1-3.1-1.8-3-1.8-3h-1.1v1.5c0 1.7-1.4 1.7-1.4 1.7h-3.5s-1.4 0-1.4 1.4v2.6s-.3 1.5 1.5 1.5zm1.6-1a.5.5 0 1 1 0-1 .5.5 0 0 1 0 1z"
      fill="#FBBF24"
    />
  </svg>
);

const DockerIcon = () => (
  <svg viewBox="0 0 24 24" className="w-5 h-5 text-[#38BDF8]" fill="currentColor">
    <rect x="5" y="7" width="2" height="2" rx="0.3" />
    <rect x="8" y="7" width="2" height="2" rx="0.3" />
    <rect x="11" y="7" width="2" height="2" rx="0.3" />
    <rect x="8" y="4.5" width="2" height="2" rx="0.3" />
    <rect x="11" y="4.5" width="2" height="2" rx="0.3" />
    <rect x="14" y="4.5" width="2" height="2" rx="0.3" />
    <path d="M22 11.5c-.3-.2-1.3-.4-2-.2-.5-.8-1.3-1.3-2.3-1.3h-.7c-.3-1.4-1.6-2.5-3.1-2.5v1.5H3.5C2.7 9 2 9.7 2 10.5c0 4.7 3.8 8.5 8.5 8.5 5 0 9.1-3.8 9.5-8.7.6-.2 1.5.3 2 1.2z" />
  </svg>
);

const GitIcon = () => (
  <svg viewBox="0 0 24 24" className="w-5 h-5 text-[#F87171]" fill="currentColor">
    <path d="M21.6 10.9L13.1 2.4a1.7 1.7 0 0 0-2.4 0L8.3 4.8l3 3a1.9 1.9 0 0 1 2.4 2.4l2.9 2.9a1.9 1.9 0 1 1-1.2 1.2l-2.7-2.7v4.6a1.9 1.9 0 1 1-1.7 0v-5.2a1.9 1.9 0 0 1-1-2.5l-2.9-3-4.7 4.7a1.7 1.7 0 0 0 0 2.4l8.5 8.5a1.7 1.7 0 0 0 2.4 0l8.5-8.5a1.7 1.7 0 0 0 0-2.4z" />
  </svg>
);

// Skills dataset matching user reference images and new requested cards
const SKILLS_DATA = [
  {
    id: '01',
    name: 'Java Development',
    category: 'Backend Core',
    accentColor: '#A855F7',
    icon: JavaIcon,
    description: 'Building robust backend applications and solving complex programming logic.',
    tags: ['OOP', 'JavaFX', 'Multithreading'],
  },
  {
    id: '02',
    name: 'HTML Development',
    category: 'Web Structure',
    accentColor: '#E44D26',
    icon: HtmlIcon,
    description: 'Building clean and semantic website structures with SEO-friendly markup.',
    tags: ['HTML5', 'Responsive Design'],
  },
  {
    id: '03',
    name: 'CSS Styling',
    category: 'Design & Motion',
    accentColor: '#38BDF8',
    icon: CssIcon,
    description: 'Creating visually appealing and responsive UI with modern CSS techniques.',
    tags: ['Flexbox', 'Grid', 'Animations'],
  },
  {
    id: '04',
    name: 'JavaScript Development',
    category: 'Frontend Logic',
    accentColor: '#FBBF24',
    icon: JsIcon,
    description: 'Developing dynamic, interactive user interfaces and frontend logic.',
    tags: ['ES6+', 'Async / Await', 'React'],
  },
  {
    id: '05',
    name: 'Spring Boot',
    category: 'Enterprise API',
    accentColor: '#4ADE80',
    icon: SpringIcon,
    description: 'Architecting scalable REST APIs, microservices, and secure server applications.',
    tags: ['REST APIs', 'Spring Security', 'JPA'],
  },
  {
    id: '06',
    name: 'SQL & Databases',
    category: 'Data Storage',
    accentColor: '#60A5FA',
    icon: DatabaseIcon,
    description: 'Designing optimized relational schemas, complex joins, and efficient queries.',
    tags: ['PostgreSQL', 'MySQL', 'Indexing'],
  },
  {
    id: '07',
    name: 'Python Development',
    category: 'Scripting & Automation',
    accentColor: '#FBBF24',
    icon: PythonIcon,
    description: 'Writing clean, efficient Python scripts for automation, data processing, and backend tasks.',
    tags: ['Python 3', 'Automation', 'Data Structures'],
  },
  {
    id: '08',
    name: 'Cloud & DevOps',
    category: 'Docker & Infrastructure',
    accentColor: '#38BDF8',
    icon: DockerIcon,
    description: 'Containerizing applications with Docker and configuring scalable automated deployment pipelines.',
    tags: ['Docker', 'Containers', 'CI/CD', 'Cloud'],
  },
  {
    id: '09',
    name: 'Git & GitHub',
    category: 'Tools & Technologies',
    accentColor: '#F87171',
    icon: GitIcon,
    description: 'Managing version control, collaborative team workflows, branching strategies, and repository deployment.',
    tags: ['Git', 'GitHub', 'Version Control'],
  },
];

export default function Skills() {
  const sectionRef = useRef(null);
  const headingWrapperRef = useRef(null);
  const descRef = useRef(null);
  const carouselContainerRef = useRef(null);
  const controlsRef = useRef(null);
  const bgGridRef = useRef(null);
  const glowRef = useRef(null);

  // Active card index for infinite wrapping
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const totalCards = SKILLS_DATA.length;

  // Drag interaction state
  const isDragging = useRef(false);
  const startX = useRef(0);
  const currentTranslate = useRef(0);

  // Navigation handlers with modulo infinite wrap
  const handlePrev = useCallback(() => {
    setActiveIndex((prev) => (prev - 1 + totalCards) % totalCards);
  }, [totalCards]);

  const handleNext = useCallback(() => {
    setActiveIndex((prev) => (prev + 1) % totalCards);
  }, [totalCards]);

  // Automatic Movement (Auto-play carousel)
  useEffect(() => {
    if (isPaused) return;

    const autoPlayTimer = setInterval(() => {
      handleNext();
    }, 2800);

    return () => clearInterval(autoPlayTimer);
  }, [isPaused, handleNext]);

  // Keyboard navigation support
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowLeft') handlePrev();
      if (e.key === 'ArrowRight') handleNext();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handlePrev, handleNext]);

  // Touch and mouse drag handlers for swipe
  const handleTouchStart = (e) => {
    setIsPaused(true);
    isDragging.current = true;
    startX.current = e.touches ? e.touches[0].clientX : e.clientX;
  };

  const handleTouchMove = (e) => {
    if (!isDragging.current) return;
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    currentTranslate.current = clientX - startX.current;
  };

  const handleTouchEnd = () => {
    if (!isDragging.current) return;
    isDragging.current = false;
    if (currentTranslate.current > 35) {
      handlePrev();
    } else if (currentTranslate.current < -35) {
      handleNext();
    }
    currentTranslate.current = 0;
    setTimeout(() => {
      setIsPaused(false);
    }, 1200);
  };

  // GSAP Viewport Bottom-to-Top Reveal Animation
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

      // 1. Heading rises smoothly from bottom to top
      tl.fromTo(
        headingWrapperRef.current,
        { y: 75, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.95, ease: 'power3.out' },
        0
      )

      // 2. Subtitle rises smoothly
      .fromTo(
        descRef.current,
        { y: 60, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.9, ease: 'power3.out' },
        0.18
      )

      // 3. Carousel container rises from bottom
      .fromTo(
        carouselContainerRef.current,
        { y: 75, opacity: 0 },
        { y: 0, opacity: 1, duration: 1.0, ease: 'power3.out' },
        0.3
      )

      // 4. Controls pill buttons rise from bottom
      .fromTo(
        controlsRef.current,
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out' },
        0.45
      );
    }, section);

    // Navbar link listener for #skills
    const handleSkillsNavClick = () => {
      if (tl) {
        setTimeout(() => {
          tl.restart();
        }, 220);
      }
    };

    const skillsLinks = document.querySelectorAll('a[href="#skills"]');
    skillsLinks.forEach((link) => link.addEventListener('click', handleSkillsNavClick));

    return () => {
      ctx.revert();
      skillsLinks.forEach((link) => link.removeEventListener('click', handleSkillsNavClick));
    };
  }, []);

  // Compute 3D positioning transform for compact, high-quality cards
  const getCardStyle = (index) => {
    let diff = (index - activeIndex) % totalCards;
    if (diff > totalCards / 2) diff -= totalCards;
    if (diff < -totalCards / 2) diff += totalCards;

    const isCenter = diff === 0;
    const isAbsDiff1 = Math.abs(diff) === 1;
    const isAbsDiff2 = Math.abs(diff) === 2;

    const isMobile = typeof window !== 'undefined' && window.innerWidth < 640;
    const spreadX = isMobile ? 140 : 220;

    let translateX = diff * spreadX;
    let translateZ = isCenter ? 60 : isAbsDiff1 ? -70 : -190;
    let rotateY = diff * -18;
    let scale = isCenter ? 1.04 : isAbsDiff1 ? 0.88 : isAbsDiff2 ? 0.74 : 0.58;
    let opacity = isCenter ? 1 : isAbsDiff1 ? 0.62 : isAbsDiff2 ? 0.22 : 0;
    let zIndex = 30 - Math.abs(diff) * 10;
    let pointerEvents = isCenter || isAbsDiff1 ? 'auto' : 'none';

    return {
      transform: `translateX(${translateX}px) translateZ(${translateZ}px) rotateY(${rotateY}deg) scale(${scale})`,
      opacity,
      zIndex,
      pointerEvents,
      transition: 'transform 0.7s cubic-bezier(0.25, 1, 0.5, 1), opacity 0.7s cubic-bezier(0.25, 1, 0.5, 1), box-shadow 0.5s ease',
    };
  };

  return (
    <section
      id="skills"
      ref={sectionRef}
      className="relative min-h-screen py-24 sm:py-32 bg-[#06141B] text-[#CCD0CF] overflow-hidden flex flex-col items-center justify-center border-t border-[#11212D]/80 select-none"
    >
      {/* Background Ambience & Fine Grid Pattern */}
      <div
        ref={bgGridRef}
        className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,#CCD0CF04_1px,transparent_1px),linear-gradient(to_bottom,#CCD0CF04_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_75%_65%_at_50%_50%,#000_65%,transparent_100%)] will-change-transform"
        aria-hidden="true"
      />

      {/* Atmospheric Ambient Accent Glow */}
      <div
        ref={glowRef}
        className="pointer-events-none absolute top-1/3 left-1/2 -translate-x-1/2 w-[520px] h-[520px] bg-gradient-to-tr from-[#A855F7]/12 via-[#7DD3FC]/10 to-transparent rounded-full blur-3xl opacity-70 -z-10 will-change-transform"
        aria-hidden="true"
      />

      <div className="relative max-w-7xl mx-auto px-6 sm:px-8 w-full z-10 flex flex-col items-center">

        {/* Section Heading: Same font & typography as About Me */}
        <div ref={headingWrapperRef} className="overflow-hidden mb-4 text-center will-change-transform">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight leading-tight flex items-center justify-center gap-2">
            <span className="text-white">My</span>
            <span className="text-[#7DD3FC] drop-shadow-[0_0_16px_rgba(125,211,252,0.4)]">Skills</span>
          </h2>
        </div>

        {/* Subtitle Description */}
        <p
          ref={descRef}
          className="text-base sm:text-lg text-[#9BA8AB] text-center max-w-2xl mb-10 will-change-transform leading-relaxed"
        >
          Specialized technical competencies, robust backend development frameworks, and programming specializations.
        </p>

        {/* ========================================================= */}
        {/* COMPACT INFINITE 3D CARD SLIDER CAROUSEL (Auto-Moving)    */}
        {/* ========================================================= */}
        <div
          ref={carouselContainerRef}
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          onMouseDown={handleTouchStart}
          onMouseMove={handleTouchMove}
          onMouseUp={handleTouchEnd}
          className="relative w-full max-w-3xl h-[340px] sm:h-[370px] flex items-center justify-center will-change-transform cursor-grab active:cursor-grabbing"
          style={{ perspective: 1300 }}
        >
          {SKILLS_DATA.map((skill, index) => {
            const isCenter = index === activeIndex;
            const IconComponent = skill.icon;
            const style = getCardStyle(index);

            return (
              <div
                key={skill.id}
                onClick={() => {
                  setActiveIndex(index);
                  setIsPaused(true);
                  setTimeout(() => setIsPaused(false), 2500);
                }}
                style={style}
                className={`absolute w-[235px] sm:w-[265px] h-[310px] sm:h-[335px] rounded-2xl p-5 sm:p-6 flex flex-col justify-between backdrop-blur-xl transition-shadow duration-500 cursor-pointer ${
                  isCenter
                    ? 'bg-[#11212D]/90 border-2 border-[#A855F7]/80 shadow-[0_0_32px_rgba(168,85,247,0.32),0_15px_40px_rgba(0,0,0,0.6)] ring-1 ring-[#A855F7]/40'
                    : 'bg-[#11212D]/40 border border-[#253745]/70 hover:border-[#7DD3FC]/50 hover:bg-[#11212D]/60 shadow-[0_10px_25px_rgba(0,0,0,0.45)]'
                }`}
              >
                {/* Subtle top inner gradient sheen */}
                <div className="pointer-events-none absolute inset-x-0 top-0 h-20 bg-gradient-to-b from-white/[0.05] to-transparent rounded-t-2xl" />

                {/* Card Header: Compact Icon + Number Badge */}
                <div className="flex items-start justify-between w-full relative z-10">
                  <div
                    className={`w-11 h-11 rounded-xl flex items-center justify-center transition-all duration-300 ${
                      isCenter
                        ? 'bg-[#A855F7]/25 border border-[#A855F7]/50 shadow-[0_0_18px_rgba(168,85,247,0.35)] scale-105'
                        : 'bg-[#253745]/40 border border-[#253745]'
                    }`}
                  >
                    <IconComponent />
                  </div>

                  <span className="font-mono text-xs tracking-wider text-[#9BA8AB]/70 font-semibold px-2 py-0.5 rounded-full bg-[#06141B]/60 border border-[#253745]/50">
                    {skill.id}
                  </span>
                </div>

                {/* Card Body: Title & Bio Description */}
                <div className="relative z-10 my-auto text-left">
                  <span className="text-[10px] font-mono tracking-widest uppercase text-[#7DD3FC] block mb-1 font-semibold">
                    {skill.category}
                  </span>
                  <h3 className="text-base sm:text-lg font-bold text-white tracking-tight mb-2">
                    {skill.name}
                  </h3>
                  <p className="text-xs sm:text-[13px] text-[#9BA8AB] leading-relaxed line-clamp-3">
                    {skill.description}
                  </p>
                </div>

                {/* Card Footer: Skill Tags */}
                <div className="relative z-10 flex flex-wrap gap-1.5 pt-2.5 border-t border-[#253745]/60">
                  {skill.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2.5 py-0.5 rounded-full text-[10px] sm:text-[11px] font-medium bg-[#06141B]/70 text-[#CCD0CF] border border-[#253745] hover:border-[#7DD3FC]/40 transition-colors"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        {/* ========================================================= */}
        {/* PREV, AUTO-STATUS & NEXT CONTROLS                         */}
        {/* ========================================================= */}
        <div
          ref={controlsRef}
          className="flex items-center justify-center gap-3.5 mt-8 will-change-transform z-20"
        >
          <button
            type="button"
            onClick={handlePrev}
            aria-label="Previous Skill Card"
            className="group px-5 py-2 rounded-full bg-[#11212D]/80 hover:bg-[#1C2D3A] text-white border border-[#253745] hover:border-[#7DD3FC]/50 transition-all font-medium text-xs sm:text-sm flex items-center gap-1.5 shadow-md hover:shadow-[0_0_16px_rgba(125,211,252,0.2)] hover:scale-105 active:scale-95 cursor-pointer backdrop-blur-md"
          >
            <ChevronLeft className="w-3.5 h-3.5 text-[#7DD3FC] group-hover:-translate-x-0.5 transition-transform" />
            <span>Prev</span>
          </button>

          {/* Slider Pagination Indicator Dots */}
          <div className="flex items-center gap-1 px-2.5 py-1.5 rounded-full bg-[#11212D]/50 border border-[#253745]/50 backdrop-blur-md">
            {SKILLS_DATA.map((_, i) => (
              <button
                key={i}
                type="button"
                onClick={() => {
                  setActiveIndex(i);
                  setIsPaused(true);
                  setTimeout(() => setIsPaused(false), 2500);
                }}
                aria-label={`Go to slide ${i + 1}`}
                className={`transition-all duration-300 rounded-full cursor-pointer ${
                  i === activeIndex
                    ? 'w-4 h-1.5 bg-[#7DD3FC] shadow-[0_0_6px_#7DD3FC]'
                    : 'w-1.5 h-1.5 bg-[#253745] hover:bg-[#9BA8AB]'
                }`}
              />
            ))}
          </div>

          <button
            type="button"
            onClick={handleNext}
            aria-label="Next Skill Card"
            className="group px-5 py-2 rounded-full bg-[#11212D]/80 hover:bg-[#1C2D3A] text-white border border-[#253745] hover:border-[#7DD3FC]/50 transition-all font-medium text-xs sm:text-sm flex items-center gap-1.5 shadow-md hover:shadow-[0_0_16px_rgba(125,211,252,0.2)] hover:scale-105 active:scale-95 cursor-pointer backdrop-blur-md"
          >
            <span>Next</span>
            <ChevronRight className="w-3.5 h-3.5 text-[#7DD3FC] group-hover:translate-x-0.5 transition-transform" />
          </button>

          {/* Auto-Play Pause/Resume Button */}
          <button
            type="button"
            onClick={() => setIsPaused(!isPaused)}
            title={isPaused ? 'Resume auto-movement' : 'Pause auto-movement'}
            aria-label={isPaused ? 'Resume auto-play' : 'Pause auto-play'}
            className="p-2 rounded-full bg-[#11212D]/60 hover:bg-[#1C2D3A] text-[#9BA8AB] hover:text-[#7DD3FC] border border-[#253745] transition-colors cursor-pointer"
          >
            {isPaused ? <Play className="w-3.5 h-3.5" /> : <Pause className="w-3.5 h-3.5" />}
          </button>
        </div>

      </div>
    </section>
  );
}
