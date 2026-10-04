import React, { useState, useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Sparkles } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

// Clean, borderless SVG icons without outer boundary frames
const PicsartIcon = () => (
  <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-[0_2px_6px_rgba(233,64,87,0.35)]">
    <defs>
      <linearGradient id="picsartP" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#8A2387" />
        <stop offset="45%" stopColor="#E94057" />
        <stop offset="100%" stopColor="#F27121" />
      </linearGradient>
    </defs>
    <path
      d="M26 12h28c19.8 0 36 15.2 36 34s-16.2 34-36 34H42v12c0 3.3-2.7 6-6 6s-6-2.7-6-6V18c0-3.3 2.7-6 6-6zm16 20v28h12c13.2 0 24-9.8 24-22s-10.8-22-24-22H42c-3.3 0-6 2.7-6 6v10z"
      fill="url(#picsartP)"
    />
    <circle cx="56" cy="46" r="10" fill="#00C9FF" opacity="0.95" />
  </svg>
);

const FigmaIcon = () => (
  <svg viewBox="0 0 76 114" className="w-full h-full drop-shadow-[0_2px_6px_rgba(162,89,255,0.35)]">
    <path d="M38 0H19C8.5 0 0 8.5 0 19s8.5 19 19 19h19V0z" fill="#F24E1E" />
    <path d="M38 0h19c10.5 0 19 8.5 19 19s-8.5 19-19 19H38V0z" fill="#FF7262" />
    <path d="M38 38H19c-10.5 0-19 8.5-19 19s8.5 19 19 19h19V38z" fill="#A259FF" />
    <circle cx="57" cy="57" r="19" fill="#1ABCFE" />
    <path d="M0 95c0-10.5 8.5-19 19-19h19v19c0 10.5-8.5 19-19 19S0 105.5 0 95z" fill="#0ACF83" />
  </svg>
);

const PhotoshopIcon = () => (
  <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-[0_2px_6px_rgba(49,168,255,0.35)]">
    <rect width="90" height="90" x="5" y="5" rx="20" fill="#001E36" />
    <text x="50" y="63" textAnchor="middle" fill="#31A8FF" fontFamily="system-ui, -apple-system, sans-serif" fontWeight="900" fontSize="42">
      Ps
    </text>
  </svg>
);

const CanvaIcon = () => (
  <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-[0_2px_6px_rgba(0,196,204,0.35)]">
    <defs>
      <linearGradient id="canvaCircle" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#00C4CC" />
        <stop offset="100%" stopColor="#7D2AE8" />
      </linearGradient>
    </defs>
    <circle cx="50" cy="50" r="45" fill="url(#canvaCircle)" />
    <text x="50" y="65" textAnchor="middle" fill="#ffffff" fontFamily="Brush Script MT, cursive, Georgia, serif" fontWeight="bold" fontSize="56">
      C
    </text>
  </svg>
);

const VNVideoIcon = () => (
  <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-[0_2px_6px_rgba(0,180,255,0.4)]">
    <defs>
      <linearGradient id="vnGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#0072FF" />
        <stop offset="100%" stopColor="#00C6FF" />
      </linearGradient>
    </defs>
    <rect width="90" height="90" x="5" y="5" rx="22" fill="url(#vnGrad)" />
    <text x="50" y="63" textAnchor="middle" fill="#ffffff" fontFamily="system-ui, -apple-system, sans-serif" fontWeight="900" fontSize="38" letterSpacing="1">
      VN
    </text>
    <circle cx="78" cy="22" r="5" fill="#FF4B4B" />
  </svg>
);

const CapCutIcon = () => (
  <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-[0_2px_6px_rgba(255,255,255,0.3)]">
    <defs>
      <linearGradient id="capcutGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#00F2FE" />
        <stop offset="100%" stopColor="#4FACFE" />
      </linearGradient>
    </defs>
    <path d="M12 24h56l-20 22H12V24z" fill="#FFFFFF" />
    <path d="M32 54h56v22H52l-20-22z" fill="#FFFFFF" />
    <polygon points="68,24 88,24 68,46 48,46" fill="url(#capcutGrad)" />
    <polygon points="12,54 32,54 52,76 32,76" fill="#FF3366" />
  </svg>
);

const ChatGPTIcon = () => (
  <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-[0_2px_6px_rgba(16,163,127,0.4)]">
    <circle cx="50" cy="50" r="45" fill="#10A37F" />
    <g fill="none" stroke="#FFFFFF" strokeWidth="4.2" strokeLinecap="round" strokeLinejoin="round" transform="translate(50,50) scale(0.65) translate(-50,-50)">
      <path d="M84.5 61.2a21 21 0 0 0-1.7-18.4 21.6 21.6 0 0 0-12.7-10 21.4 21.4 0 0 0-14.7.7 21 21 0 0 0-13-13.8 21.7 21.7 0 0 0-21.7 5.7 21.2 21.2 0 0 0-5.8 14.8 21 21 0 0 0-11.4 8.7 21.7 21.7 0 0 0-.6 22.4 21.2 21.2 0 0 0 8.9 12.3 21 21 0 0 0 1.7 18.4 21.6 21.6 0 0 0 12.7 10 21.4 21.4 0 0 0 14.7-.7 21 21 0 0 0 13 13.8 21.7 21.7 0 0 0 21.7-5.7 21.2 21.2 0 0 0 5.8-14.8 21 21 0 0 0 11.4-8.7 21.7 21.7 0 0 0 .6-22.4 21.2 21.2 0 0 0-8.9-12.3z" />
      <path d="M50 36v28M36 43l28 14M36 57l28-14" />
    </g>
  </svg>
);

const ClaudeIcon = () => (
  <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-[0_2px_6px_rgba(217,119,87,0.4)]">
    <circle cx="50" cy="50" r="45" fill="#D97757" />
    <g fill="#FFFFFF" transform="translate(50,50) scale(0.68) translate(-50,-50)">
      <path d="M44.5 12h11v26h-11z" />
      <path d="M44.5 62h11v26h-11z" />
      <path d="M12 44.5h26v11H12z" />
      <path d="M62 44.5h26v11H62z" />
      <path d="M25 21.5l7.8-7.8 18.4 18.4-7.8 7.8z" />
      <path d="M60.4 56.8l7.8-7.8 18.4 18.4-7.8 7.8z" />
      <path d="M78.8 25l7.8 7.8-18.4 18.4-7.8-7.8z" />
      <path d="M43.4 60.4l7.8 7.8-18.4 18.4-7.8-7.8z" />
    </g>
  </svg>
);

const GeminiIcon = () => (
  <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-[0_2px_6px_rgba(92,128,254,0.45)]">
    <defs>
      <linearGradient id="geminiGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#1BA1E3" />
        <stop offset="48%" stopColor="#5C80FE" />
        <stop offset="100%" stopColor="#9B68FE" />
      </linearGradient>
    </defs>
    <circle cx="50" cy="50" r="45" fill="#0B132B" />
    <path
      d="M50 14c0 19.9-16.1 36-36 36 19.9 0 36 16.1 36 36 0-19.9 16.1-36 36-36-19.9 0-36-16.1-36-36z"
      fill="url(#geminiGrad)"
    />
  </svg>
);

// Updated creative & AI tools dataset
const TOOLS = [
  {
    name: 'Picsart',
    category: 'Photo & Graphic Editing',
    description: 'Creative photo manipulation, image retouching, design layering, and social graphics.',
    icon: PicsartIcon,
    accent: '#E94057',
  },
  {
    name: 'Figma',
    category: 'UI/UX & Prototyping',
    description: 'Interface architecture, responsive wireframes, design systems, and vector components.',
    icon: FigmaIcon,
    accent: '#A259FF',
  },
  {
    name: 'Photoshop',
    category: 'Raster Image Editing',
    description: 'High-res image compositing, visual branding assets, textures, and digital mockups.',
    icon: PhotoshopIcon,
    accent: '#31A8FF',
  },
  {
    name: 'Canva',
    category: 'Visual Media Publishing',
    description: 'Rapid marketing collateral, social banners, presentations, and digital graphics.',
    icon: CanvaIcon,
    accent: '#00C4CC',
  },
  {
    name: 'VN Video Editor',
    category: 'Timeline Video Editing',
    description: 'Multi-track timeline editing, smooth cuts, keyframe animations, and color grading.',
    icon: VNVideoIcon,
    accent: '#00C6FF',
  },
  {
    name: 'CapCut',
    category: 'Smart Video & Motion',
    description: 'Dynamic video cutting, automated captions, beat syncing, visual transitions, and audio FX.',
    icon: CapCutIcon,
    accent: '#00F2FE',
  },
  {
    name: 'ChatGPT',
    category: 'Generative AI & Productivity',
    description: 'Conversational problem-solving, algorithmic synthesis, workflow automation, and rapid prototyping.',
    icon: ChatGPTIcon,
    accent: '#10A37F',
  },
  {
    name: 'Claude',
    category: 'AI Reasoning & Code Analysis',
    description: 'Deep analytical reasoning, codebase architecture, complex logic processing, and technical drafting.',
    icon: ClaudeIcon,
    accent: '#D97757',
  },
  {
    name: 'Gemini',
    category: 'Multimodal AI & Innovation',
    description: 'Multimodal intelligence, creative research synthesis, and cross-domain reasoning.',
    icon: GeminiIcon,
    accent: '#5C80FE',
  },
];

export default function CreativeTools() {
  const sectionRef = useRef(null);
  const headingWrapperRef = useRef(null);
  const descRef = useRef(null);
  const dockContainerRef = useRef(null);
  const infoCardRef = useRef(null);
  const iconRefs = useRef([]);

  const [activeTool, setActiveTool] = useState(TOOLS[0]);
  const [hoveredIndex, setHoveredIndex] = useState(null);

  // MacOS Dock Mouse Tracking & Balanced Magnification
  // Fully responsive for mobile touch and desktop cursor
  const handleMouseMove = (e) => {
    if (!dockContainerRef.current) return;
    const mouseX = e.clientX;
    const isMobile = typeof window !== 'undefined' && window.innerWidth < 640;
    const radius = isMobile ? 60 : 95; // Narrow radius on mobile to prevent overflow

    iconRefs.current.forEach((iconEl) => {
      if (!iconEl) return;
      const rect = iconEl.getBoundingClientRect();
      const iconCenterX = rect.left + rect.width / 2;
      const distance = Math.abs(mouseX - iconCenterX);

      if (distance < radius) {
        const factor = Math.cos((distance / radius) * (Math.PI / 2));
        const scale = 1 + factor * (isMobile ? 0.35 : 0.55); 
        const translateY = -factor * (isMobile ? 12 : 22);
        const zIndex = Math.round(10 + factor * 20);

        gsap.to(iconEl, {
          scale,
          y: translateY,
          zIndex,
          duration: 0.16,
          ease: 'power1.out',
          overwrite: 'auto',
        });
      } else {
        gsap.to(iconEl, {
          scale: 1,
          y: 0,
          zIndex: 1,
          duration: 0.22,
          ease: 'power2.out',
          overwrite: 'auto',
        });
      }
    });
  };

  const handleTouchMove = (e) => {
    if (e.touches && e.touches[0]) {
      handleMouseMove({ clientX: e.touches[0].clientX });
    }
  };

  const handleTouchStart = (e) => {
    if (e.touches && e.touches[0]) {
      handleMouseMove({ clientX: e.touches[0].clientX });
    }
  };

  const handleMouseLeave = () => {
    setHoveredIndex(null);
    iconRefs.current.forEach((iconEl) => {
      if (!iconEl) return;
      gsap.to(iconEl, {
        scale: 1,
        y: 0,
        zIndex: 1,
        duration: 0.35,
        ease: 'power3.out',
        overwrite: 'auto',
      });
    });
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
        0.15
      )
      .fromTo(
        dockContainerRef.current,
        { y: 65, opacity: 0, scale: 0.96 },
        { y: 0, opacity: 1, scale: 1, duration: 0.95, ease: 'power3.out' },
        0.28
      )
      .fromTo(
        infoCardRef.current,
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out' },
        0.42
      );
    }, section);

    const handleToolsNavClick = () => {
      if (tl) {
        setTimeout(() => {
          tl.restart();
        }, 220);
      }
    };

    const toolsLinks = document.querySelectorAll('a[href="#tools"]');
    toolsLinks.forEach((link) => link.addEventListener('click', handleToolsNavClick));

    return () => {
      ctx.revert();
      toolsLinks.forEach((link) => link.removeEventListener('click', handleToolsNavClick));
    };
  }, []);

  return (
    <section
      id="tools"
      ref={sectionRef}
      className="relative min-h-[80vh] py-16 sm:py-28 bg-[#06141B] text-[#CCD0CF] flex flex-col items-center justify-center border-t border-[#11212D]/80 select-none overflow-x-clip"
    >
      {/* Background Ambience & Fine Grid Pattern */}
      <div
        className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,#CCD0CF04_1px,transparent_1px),linear-gradient(to_bottom,#CCD0CF04_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_75%_65%_at_50%_50%,#000_65%,transparent_100%)] will-change-transform"
        aria-hidden="true"
      />

      {/* Ambient Glow */}
      <div
        className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[350px] bg-gradient-to-r from-[#10A37F]/10 via-[#5C80FE]/10 to-[#E94057]/10 rounded-full blur-3xl opacity-60 -z-10"
        aria-hidden="true"
      />

      <div className="relative max-w-6xl mx-auto px-2 sm:px-8 w-full z-10 flex flex-col items-center">

        {/* Section Heading: Smaller than My Skills */}
        <div ref={headingWrapperRef} className="overflow-hidden mb-2 sm:mb-3 text-center will-change-transform">
          <h2 className="text-xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight leading-tight flex items-center justify-center gap-2">
            <span className="text-white">Creative &</span>
            <span className="text-[#7DD3FC] drop-shadow-[0_0_14px_rgba(125,211,252,0.35)]">
              Digital Tools
            </span>
          </h2>
        </div>

        {/* Subtitle Description */}
        <p
          ref={descRef}
          className="text-xs sm:text-base text-[#9BA8AB] text-center max-w-xl mb-8 sm:mb-14 will-change-transform leading-relaxed px-3"
        >
          Design suites, video editing platforms, and advanced AI systems I utilize for rapid production and creative workflows.
        </p>

        {/* ========================================================= */}
        {/* MACOS DOCK CONTAINER (Mobile Optimized & Touch Ready)      */}
        {/* ========================================================= */}
        <div className="relative w-full flex flex-col items-center pt-4 sm:pt-8 pb-3 overflow-visible">

          {/* Frosted Glass macOS Dock Bar with Adaptive Sizing */}
          <div
            ref={dockContainerRef}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleMouseLeave}
            onTouchCancel={handleMouseLeave}
            className="relative max-w-full px-2.5 xs:px-3.5 sm:px-8 py-2.5 sm:py-4 rounded-2xl sm:rounded-3xl bg-[#0C1B24]/75 backdrop-blur-2xl border border-[#253745]/80 shadow-[0_20px_50px_rgba(0,0,0,0.65),0_0_24px_rgba(125,211,252,0.06)] flex items-end justify-center gap-2 xs:gap-3 sm:gap-6 md:gap-7 will-change-transform ring-1 ring-white/5 overflow-visible"
          >
            {/* Top Gloss Reflection */}
            <div className="pointer-events-none absolute inset-x-0 top-0 h-1/2 bg-gradient-to-b from-white/[0.08] to-transparent rounded-t-2xl sm:rounded-t-3xl" />

            {TOOLS.map((tool, index) => {
              const Icon = tool.icon;
              const isHovered = hoveredIndex === index;
              const isSelected = activeTool.name === tool.name;

              return (
                <div
                  key={tool.name}
                  ref={(el) => (iconRefs.current[index] = el)}
                  onMouseEnter={() => {
                    setHoveredIndex(index);
                    setActiveTool(tool);
                  }}
                  onClick={() => {
                    setActiveTool(tool);
                    setHoveredIndex(index);
                    setTimeout(() => setHoveredIndex(null), 1800);
                  }}
                  className="relative flex flex-col items-center justify-end group cursor-pointer origin-bottom will-change-transform overflow-visible touch-manipulation"
                  style={{ zIndex: 1 }}
                >
                  {/* Floating MacOS Tooltip */}
                  {isHovered && (
                    <div className="absolute -top-9 sm:-top-11 left-1/2 -translate-x-1/2 px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-md bg-[#06141B]/95 text-white text-[10px] sm:text-[11px] font-semibold tracking-wide border border-[#253745] shadow-2xl whitespace-nowrap pointer-events-none z-50 animate-in fade-in zoom-in-95 duration-150">
                      {tool.name}
                      <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 sm:w-2 sm:h-2 bg-[#06141B] rotate-45 border-b border-r border-[#253745]" />
                    </div>
                  )}

                  {/* Adaptive Responsive Icon: Compact on mobile, spacious on desktop */}
                  <div className="w-6 h-6 xs:w-7 xs:h-7 sm:w-10 sm:h-10 flex items-center justify-center overflow-visible pointer-events-none transition-all duration-200">
                    <Icon />
                  </div>

                  {/* MacOS Active App Running Dot */}
                  <div
                    className={`w-1 h-1 sm:w-1.5 sm:h-1.5 rounded-full mt-1.5 sm:mt-2 transition-all duration-300 pointer-events-none ${
                      isSelected
                        ? 'bg-[#7DD3FC] shadow-[0_0_6px_#7DD3FC] scale-125'
                        : 'bg-[#4A5C6A]/50'
                    }`}
                  />
                </div>
              );
            })}
          </div>

          {/* Dock Reflection Floor Shadow */}
          <div className="w-3/4 h-2.5 sm:h-3 bg-gradient-to-b from-[#11212D]/40 to-transparent blur-md -mt-1 rounded-full pointer-events-none" />

          {/* ========================================================= */}
          {/* ACTIVE TOOL DETAIL BADGE (Mobile Friendly)                */}
          {/* ========================================================= */}
          <div
            ref={infoCardRef}
            className="mt-6 sm:mt-8 px-4 sm:px-6 py-3 sm:py-4 rounded-xl sm:rounded-2xl bg-[#0C1B24]/50 border border-[#253745]/60 backdrop-blur-md max-w-lg w-full flex items-center gap-3 sm:gap-4 text-left shadow-lg will-change-transform"
          >
            <div className="w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center shrink-0">
              <activeTool.icon />
            </div>

            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-1.5 sm:gap-2 mb-0.5">
                <h4 className="text-xs sm:text-base font-bold text-white truncate">
                  {activeTool.name}
                </h4>
                <span className="text-[9px] sm:text-[10px] font-mono tracking-wider px-1.5 py-0.5 sm:px-2 rounded-full bg-[#11212D] text-[#7DD3FC] border border-[#253745] truncate">
                  {activeTool.category}
                </span>
              </div>
              <p className="text-[11px] sm:text-xs text-[#9BA8AB] leading-relaxed line-clamp-2 sm:line-clamp-none">
                {activeTool.description}
              </p>
            </div>

            <Sparkles className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#7DD3FC]/70 shrink-0 hidden sm:block" />
          </div>

        </div>

      </div>
    </section>
  );
}
