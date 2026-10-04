import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Lightbulb, Paintbrush, Code2 } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const HIGHLIGHT_CARDS = [
  {
    icon: Lightbulb,
    title: 'Innovative',
    description:
      'I love creating unique solutions to complex problems with cutting-edge technologies.',
  },
  {
    icon: Paintbrush,
    title: 'Design Oriented',
    description:
      'Beautiful design and user experience are at the heart of everything I create.',
  },
  {
    icon: Code2,
    title: 'Clean Code',
    description:
      'I write maintainable, efficient code following best practices and modern patterns.',
  },
];

// 3D Perspective Tilt Card with GSAP & Cursor Follower
function TiltCard({ card }) {
  const cardRef = useRef(null);
  const glareRef = useRef(null);
  const Icon = card.icon;

  const handleMouseMove = (e) => {
    const cardEl = cardRef.current;
    if (!cardEl) return;

    const rect = cardEl.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;

    // Cursor-driven 3D perspective tilt animation via GSAP
    gsap.to(cardEl, {
      rotationY: x * 22,
      rotationX: -y * 22,
      transformPerspective: 1000,
      scale: 1.025,
      duration: 0.35,
      ease: 'power2.out',
    });

    // Dynamic radial glare tracking cursor
    if (glareRef.current) {
      const px = e.clientX - rect.left;
      const py = e.clientY - rect.top;
      glareRef.current.style.background = `radial-gradient(circle 220px at ${px}px ${py}px, rgba(168, 85, 247, 0.22), transparent 75%)`;
      glareRef.current.style.opacity = '1';
    }
  };

  const handleMouseLeave = () => {
    const cardEl = cardRef.current;
    if (!cardEl) return;

    gsap.to(cardEl, {
      rotationY: 0,
      rotationX: 0,
      scale: 1,
      duration: 0.7,
      ease: 'power3.out',
    });

    if (glareRef.current) {
      glareRef.current.style.opacity = '0';
    }
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ transformStyle: 'preserve-3d' }}
      className="group relative flex flex-col items-start text-left p-6 sm:p-7 rounded-2xl bg-[#11212D]/35 hover:bg-[#11212D]/55 border border-[#253745]/60 hover:border-[#A855F7]/55 backdrop-blur-md shadow-[0_10px_30px_rgba(0,0,0,0.4)] hover:shadow-[0_20px_45px_rgba(168,85,247,0.2)] transition-colors duration-300 will-change-transform cursor-pointer select-none"
    >
      {/* Dynamic Cursor-driven Glare / Spotlight */}
      <div
        ref={glareRef}
        className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-300"
        aria-hidden="true"
      />

      {/* Subtle top inner gradient sheen */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-white/[0.05] to-transparent rounded-t-2xl" />

      {/* Icon with glowing purple accent popping in 3D */}
      <div
        style={{ transform: 'translateZ(28px)' }}
        className="w-12 h-12 rounded-xl bg-[#A855F7]/15 border border-[#A855F7]/30 flex items-center justify-center mb-6 text-[#C084FC] group-hover:scale-110 group-hover:bg-[#A855F7]/25 transition-all duration-300 shadow-[0_0_20px_rgba(168,85,247,0.25)]"
      >
        <Icon className="w-6 h-6 text-[#C084FC]" />
      </div>

      {/* Title popping in 3D */}
      <h3
        style={{ transform: 'translateZ(20px)' }}
        className="text-xl font-bold text-white mb-3 group-hover:text-white transition-colors"
      >
        {card.title}
      </h3>

      {/* Description popping in 3D */}
      <p
        style={{ transform: 'translateZ(14px)' }}
        className="text-sm sm:text-[15px] text-[#9BA8AB] leading-relaxed"
      >
        {card.description}
      </p>
    </div>
  );
}

export default function About() {
  const sectionRef = useRef(null);
  const headingWrapperRef = useRef(null);
  const descRef = useRef(null);
  const cardsRef = useRef(null);
  const glowRef = useRef(null);
  const bgGridRef = useRef(null);

  // Cinematic Bottom-to-Top Information Rise on Scroll & Nav Click
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    let tl;

    const ctx = gsap.context(() => {
      // Timeline triggered when About enters viewport
      tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top 75%',
          toggleActions: 'play none none reset',
        },
        defaults: { ease: 'power3.out' },
      });

      // 1. Heading moves visibly from bottom to top
      tl.fromTo(
        headingWrapperRef.current,
        {
          y: 75,
          opacity: 0,
        },
        {
          y: 0,
          opacity: 1,
          duration: 0.95,
          ease: 'power3.out',
        },
        0
      )

      // 2. Bio Paragraphs rise sequentially from bottom to top
      .fromTo(
        descRef.current?.children || [],
        {
          y: 65,
          opacity: 0,
        },
        {
          y: 0,
          opacity: 1,
          duration: 0.95,
          stagger: 0.16,
          ease: 'power3.out',
        },
        0.18
      )

      // 3. Transparent Highlight Cards rise sequentially from bottom to top
      .fromTo(
        cardsRef.current?.children || [],
        {
          y: 75,
          opacity: 0,
        },
        {
          y: 0,
          opacity: 1,
          duration: 0.95,
          stagger: 0.14,
          ease: 'power3.out',
        },
        0.35
      );

    }, section);

    // Listen for Navbar clicks to #about to guarantee the rising animation plays
    const handleAboutNavClick = () => {
      if (tl) {
        setTimeout(() => {
          tl.restart();
        }, 220);
      }
    };

    const aboutLinks = document.querySelectorAll('a[href="#about"]');
    aboutLinks.forEach((link) => link.addEventListener('click', handleAboutNavClick));

    return () => {
      ctx.revert();
      aboutLinks.forEach((link) => link.removeEventListener('click', handleAboutNavClick));
    };
  }, []);

  // Subtle Mouse Parallax & Background Depth
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const handleMouseMove = (e) => {
      if (window.innerWidth < 768) return;
      const rect = section.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
      const y = ((e.clientY - rect.top) / rect.height - 0.5) * 2;

      if (glowRef.current) {
        gsap.to(glowRef.current, {
          x: x * 18,
          y: y * 14,
          duration: 1.2,
          ease: 'power2.out',
        });
      }
      if (bgGridRef.current) {
        gsap.to(bgGridRef.current, {
          x: x * 8,
          y: y * 6,
          duration: 1.5,
          ease: 'power1.out',
        });
      }
    };

    const handleMouseLeave = () => {
      if (glowRef.current) {
        gsap.to(glowRef.current, {
          x: 0,
          y: 0,
          duration: 1.4,
          ease: 'power2.out',
        });
      }
      if (bgGridRef.current) {
        gsap.to(bgGridRef.current, {
          x: 0,
          y: 0,
          duration: 1.5,
          ease: 'power2.out',
        });
      }
    };

    section.addEventListener('mousemove', handleMouseMove);
    section.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      section.removeEventListener('mousemove', handleMouseMove);
      section.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative min-h-screen py-24 sm:py-32 bg-[#06141B] text-[#CCD0CF] overflow-hidden flex items-center justify-center border-t border-[#11212D]/80"
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
        className="pointer-events-none absolute top-1/3 left-1/4 w-[520px] h-[520px] bg-gradient-to-tr from-[#7DD3FC]/10 via-[#A855F7]/10 to-transparent rounded-full blur-3xl opacity-75 -z-10 will-change-transform"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute bottom-12 right-12 w-96 h-96 bg-[#253745]/20 rounded-full blur-3xl -z-10"
        aria-hidden="true"
      />

      {/* Main About Information Container */}
      <div className="relative max-w-5xl mx-auto px-6 sm:px-8 w-full z-10">
        <div className="flex flex-col items-start text-left">

          {/* Small Heading: About Me (Clean, without underline bar) */}
          <div ref={headingWrapperRef} className="overflow-hidden mb-6 will-change-transform">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight leading-tight flex items-center gap-2">
              <span className="text-white">About</span>
              <span className="text-[#7DD3FC] drop-shadow-[0_0_16px_rgba(125,211,252,0.4)]">Me</span>
            </h2>
          </div>

          {/* Description Text: Rising sequentially from Bottom to Top */}
          <div ref={descRef} className="space-y-6 text-base sm:text-lg text-[#9BA8AB] leading-relaxed max-w-3xl">
            <p className="will-change-transform">
              I'm <strong className="text-white font-semibold">Aniket Jadhav</strong>, a Java-focused Full Stack Developer passionate about building scalable backend systems and modern web applications.
            </p>
            <p className="will-change-transform">
              I work with <span className="text-[#CCD0CF] font-medium">Java</span>, <span className="text-[#CCD0CF] font-medium">Spring Boot</span>, <span className="text-[#CCD0CF] font-medium">React</span> and <span className="text-[#CCD0CF] font-medium">SQL</span> to turn ideas into reliable, production-ready software. I enjoy solving problems, learning new technologies and continuously pushing my development skills further.
            </p>
          </div>

          {/* Transparent Highlight Boxes in Horizontal Layout with GSAP 3D Tilt */}
          <div
            ref={cardsRef}
            className="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-6 mt-12 w-full will-change-transform"
            style={{ perspective: 1200 }}
          >
            {HIGHLIGHT_CARDS.map((card) => (
              <TiltCard key={card.title} card={card} />
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}
