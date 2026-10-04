import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ArrowRight, Mail, Camera, Sparkles } from 'lucide-react';
import LiquidDistortion from './LiquidDistortion.jsx';

const TYPING_WORDS = [
  'Java Full Stack Developer',
  'Spring Boot & React Specialist',
  'Backend & Frontend Engineer',
];

const DEFAULT_AVATAR = '/images/aniketjadhav.jpeg';

export default function Hero() {
  const heroRef = useRef(null);
  const contentWrapperRef = useRef(null);
  const introRef = useRef(null);
  const headingRef = useRef(null);
  const roleRef = useRef(null);
  const descRef = useRef(null);
  const buttonsRef = useRef(null);
  const photoContainerRef = useRef(null);
  const glowRingRef = useRef(null);
  const innerPhotoRef = useRef(null);
  const floatTweenRef = useRef(null);
  const primaryBtnRef = useRef(null);
  const secondaryBtnRef = useRef(null);
  // Typewriter state
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [currentText, setCurrentText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [typingSpeed, setTypingSpeed] = useState(120);

  // Permanent profile photo for the portfolio
  const userPhoto = DEFAULT_AVATAR;

  // Typewriter effect
  useEffect(() => {
    const fullWord = TYPING_WORDS[currentWordIndex];

    const timer = setTimeout(() => {
      if (!isDeleting) {
        // Typing
        setCurrentText(fullWord.substring(0, currentText.length + 1));
        setTypingSpeed(90);

        if (currentText.length + 1 === fullWord.length) {
          // Pause at end of word
          setTimeout(() => setIsDeleting(true), 1800);
        }
      } else {
        // Deleting
        setCurrentText(fullWord.substring(0, currentText.length - 1));
        setTypingSpeed(45);

        if (currentText.length === 0) {
          setIsDeleting(false);
          setCurrentWordIndex((prev) => (prev + 1) % TYPING_WORDS.length);
        }
      }
    }, typingSpeed);

    return () => clearTimeout(timer);
  }, [currentText, isDeleting, currentWordIndex, typingSpeed]);

  // GSAP Entrance Animations
  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        defaults: { ease: 'power3.out' },
        delay: 0.15,
      });

      tl.from(introRef.current, {
        y: 20,
        opacity: 0,
        duration: 0.6,
      })
      .from(
        headingRef.current,
        {
          y: 25,
          opacity: 0,
          duration: 0.7,
        },
        '-=0.4'
      )
      .from(
        roleRef.current,
        {
          y: 20,
          opacity: 0,
          duration: 0.6,
        },
        '-=0.4'
      )
      .from(
        descRef.current,
        {
          y: 20,
          opacity: 0,
          duration: 0.6,
        },
        '-=0.4'
      )
      .from(
        buttonsRef.current.children,
        {
          y: 20,
          opacity: 0,
          duration: 0.5,
          stagger: 0.1,
        },
        '-=0.3'
      )
      .from(
        photoContainerRef.current,
        {
          scale: 0.88,
          opacity: 0,
          duration: 0.9,
          ease: 'back.out(1.4)',
        },
        '-=0.7'
      );
    }, heroRef);

    return () => ctx.revert();
  }, []);

  // Button hover animations
  const handlePrimaryMouseEnter = () => {
    gsap.to(primaryBtnRef.current, {
      scale: 1.03,
      y: -2,
      duration: 0.2,
      ease: 'power1.out',
    });
  };

  const handlePrimaryMouseLeave = () => {
    gsap.to(primaryBtnRef.current, {
      scale: 1,
      y: 0,
      duration: 0.2,
      ease: 'power1.out',
    });
  };

  const handleSecondaryMouseEnter = () => {
    gsap.to(secondaryBtnRef.current, {
      scale: 1.03,
      y: -2,
      duration: 0.2,
      ease: 'power1.out',
    });
  };

  const handleSecondaryMouseLeave = () => {
    gsap.to(secondaryBtnRef.current, {
      scale: 1,
      y: 0,
      duration: 0.2,
      ease: 'power1.out',
    });
  };

  // Idle floating animation for the photo
  useEffect(() => {
    if (photoContainerRef.current) {
      floatTweenRef.current = gsap.to(photoContainerRef.current, {
        y: -10,
        duration: 2.8,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
      });
    }

    return () => {
      floatTweenRef.current?.kill();
    };
  }, []);

  // Photo hover & moving effect handlers
  const handlePhotoMouseMove = (e) => {
    if (!photoContainerRef.current) return;
    const rect = photoContainerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;

    // Smooth magnetic tilt and 3D movement following cursor
    gsap.to(photoContainerRef.current, {
      x: x * 0.22,
      y: y * 0.22 - 6,
      rotateX: -y * 0.1,
      rotateY: x * 0.1,
      scale: 1.05,
      duration: 0.35,
      ease: 'power2.out',
      transformPerspective: 1000,
      overwrite: 'auto',
    });

    // Parallax depth movement for the inner photo
    if (innerPhotoRef.current) {
      gsap.to(innerPhotoRef.current, {
        x: x * 0.1,
        y: y * 0.1,
        scale: 1.07,
        duration: 0.35,
        ease: 'power2.out',
        overwrite: 'auto',
      });
    }

    // Outer glow ring dynamic rotation & scale
    if (glowRingRef.current) {
      gsap.to(glowRingRef.current, {
        rotation: (x + y) * 0.15,
        scale: 1.1,
        duration: 0.4,
        ease: 'power2.out',
        overwrite: 'auto',
      });
    }
  };

  const handlePhotoMouseEnter = () => {
    floatTweenRef.current?.pause();
  };

  const handlePhotoMouseLeave = () => {
    // Reset to center smoothly with elastic bounce-back
    gsap.to(photoContainerRef.current, {
      x: 0,
      y: 0,
      rotateX: 0,
      rotateY: 0,
      scale: 1,
      duration: 0.8,
      ease: 'elastic.out(1, 0.5)',
      onComplete: () => {
        floatTweenRef.current?.resume();
      },
    });

    if (innerPhotoRef.current) {
      gsap.to(innerPhotoRef.current, {
        x: 0,
        y: 0,
        scale: 1,
        duration: 0.8,
        ease: 'elastic.out(1, 0.5)',
      });
    }

    if (glowRingRef.current) {
      gsap.to(glowRingRef.current, {
        rotation: 0,
        scale: 1,
        duration: 0.8,
        ease: 'elastic.out(1, 0.5)',
      });
    }
  };

  const scrollToProjects = (e) => {
    e.preventDefault();
    const elem = document.querySelector('#projects');
    if (elem) {
      elem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToContact = (e) => {
    e.preventDefault();
    const elem = document.querySelector('#contact');
    if (elem) {
      elem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      id="home"
      ref={heroRef}
      className="relative min-h-[90vh] flex items-center justify-center pt-28 pb-16 md:pt-36 md:pb-24 overflow-hidden bg-[#06141B]"
    >
      {/* Background Subtle Ambience with Palette Colors */}
      <div
        className="pointer-events-none absolute top-10 left-1/2 -translate-x-1/2 w-[700px] sm:w-[900px] h-[500px] bg-gradient-to-b from-[#11212D]/40 via-[#253745]/20 to-transparent rounded-full blur-3xl opacity-80"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute top-1/4 right-5 w-80 h-80 bg-[#4A5C6A]/15 rounded-full blur-3xl"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute bottom-10 left-10 w-96 h-96 bg-[#11212D]/50 rounded-full blur-3xl"
        aria-hidden="true"
      />

      {/* Subtle Background Pattern */}
      <div
        className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,#CCD0CF06_1px,transparent_1px),linear-gradient(to_bottom,#CCD0CF06_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_45%,#000_70%,transparent_100%)]"
        aria-hidden="true"
      />

      {/* Interactive Liquid Distortion + Mouse-Triggered Ripple Layer */}
      <LiquidDistortion containerRef={heroRef} contentRef={contentWrapperRef} />

      <div
        ref={contentWrapperRef}
        className="relative max-w-7xl mx-auto px-6 sm:px-8 w-full z-10 transition-[filter] duration-75"
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Hero Content matching old portfolio style */}
          <div className="lg:col-span-7 flex flex-col items-start text-left order-2 lg:order-1">
            {/* Small Introduction */}
            <div ref={introRef} className="mb-2">
              <span className="text-xl sm:text-2xl font-bold tracking-tight text-white">
                Hi, I'm
              </span>
            </div>

            {/* Main Heading: Aniket Jadhav */}
            <h1
              ref={headingRef}
              className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-[#7DD3FC] leading-[1.08] mb-4"
            >
              Aniket Jadhav
            </h1>

            {/* Dynamic Typing Subtitle matching old portfolio */}
            <div
              ref={roleRef}
              className="flex items-center gap-1 text-xl sm:text-2xl lg:text-3xl font-semibold text-[#CCD0CF] mb-5 tracking-tight min-h-[40px]"
            >
              <span className="text-[#CCD0CF]">{currentText}</span>
              <span className="inline-block w-[3px] h-7 bg-[#9BA8AB] ml-1 animate-pulse" />
            </div>

            {/* Short Description */}
            <p
              ref={descRef}
              className="text-base sm:text-lg text-[#9BA8AB] max-w-xl font-normal leading-relaxed mb-8 text-balance"
            >
              I turn logic into systems and ideas into working products.
            </p>

            {/* Action Buttons matching old portfolio layout & colors */}
            <div
              ref={buttonsRef}
              className="flex flex-wrap items-center gap-4 w-full sm:w-auto"
            >
              {/* Primary Button: View Work */}
              <a
                ref={primaryBtnRef}
                href="#projects"
                onClick={scrollToProjects}
                onMouseEnter={handlePrimaryMouseEnter}
                onMouseLeave={handlePrimaryMouseLeave}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-7 py-3.5 text-sm font-semibold text-[#CCD0CF] bg-[#253745] hover:bg-[#4A5C6A] border border-[#4A5C6A]/80 rounded-xl shadow-[0_0_20px_rgba(37,55,69,0.5)] transition-all cursor-pointer"
              >
                <span>View Work</span>
                <ArrowRight className="w-4 h-4 text-[#CCD0CF]" />
              </a>

              {/* Secondary Button: Contact Me */}
              <a
                ref={secondaryBtnRef}
                href="#contact"
                onClick={scrollToContact}
                onMouseEnter={handleSecondaryMouseEnter}
                onMouseLeave={handleSecondaryMouseLeave}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-7 py-3.5 text-sm font-medium text-[#CCD0CF] bg-[#11212D] hover:bg-[#253745]/70 border border-[#253745] hover:border-[#4A5C6A] rounded-xl shadow-sm transition-all cursor-pointer"
              >
                <Mail className="w-4 h-4 text-[#9BA8AB]" />
                <span>Contact Me</span>
              </a>
            </div>
          </div>

          {/* Right Column: Circular Photo Frame with Glowing Arc Border and Moving Hover Effect */}
          <div className="lg:col-span-5 flex justify-center lg:justify-end order-1 lg:order-2">
            <div
              ref={photoContainerRef}
              onMouseEnter={handlePhotoMouseEnter}
              onMouseMove={handlePhotoMouseMove}
              onMouseLeave={handlePhotoMouseLeave}
              className="relative w-64 h-64 sm:w-80 sm:h-80 lg:w-96 lg:h-96 group cursor-pointer select-none"
              style={{ transformStyle: 'preserve-3d', willChange: 'transform' }}
            >
              {/* Ambient Glowing Crescent Arc around circle */}
              <div
                className="absolute -inset-3 sm:-inset-4 rounded-full bg-gradient-to-tr from-[#4A5C6A]/70 via-[#253745]/40 to-transparent blur-xl opacity-75 group-hover:opacity-100 transition-opacity pointer-events-none"
                aria-hidden="true"
              />

              {/* SVG Glowing Arc Ring matching screenshot crescent border */}
              <svg
                ref={glowRingRef}
                className="absolute -inset-2 sm:-inset-2.5 w-[calc(100%+16px)] sm:w-[calc(100%+20px)] h-[calc(100%+16px)] sm:h-[calc(100%+20px)] pointer-events-none z-10 -rotate-45"
                viewBox="0 0 100 100"
              >
                <defs>
                  <linearGradient id="arcGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#CCD0CF" stopOpacity="0.9" />
                    <stop offset="50%" stopColor="#4A5C6A" stopOpacity="0.8" />
                    <stop offset="100%" stopColor="#11212D" stopOpacity="0" />
                  </linearGradient>
                </defs>
                <circle
                  cx="50"
                  cy="50"
                  r="48"
                  fill="none"
                  stroke="url(#arcGradient)"
                  strokeWidth="2.5"
                  strokeDasharray="180 180"
                  strokeLinecap="round"
                />
              </svg>

              {/* Round Photo Container with Inner Parallax Movement */}
              <div
                ref={innerPhotoRef}
                className="relative w-full h-full rounded-full overflow-hidden border-2 border-[#253745] group-hover:border-[#4A5C6A] bg-[#11212D] shadow-2xl flex items-center justify-center transition-colors duration-300"
              >
                <div className="relative w-full h-full bg-[#11212D] flex items-center justify-center overflow-hidden">
                  <img
                    src={DEFAULT_AVATAR}
                    alt="Aniket Jadhav"
                    onError={(e) => {
                      // If the avatar image is unavailable, show the styled vector portrait fallback.
                      e.currentTarget.style.display = 'none';
                      const fallbackElem = document.getElementById('aniket-vector-avatar');
                      if (fallbackElem) fallbackElem.style.display = 'flex';
                    }}
                    className="w-full h-full object-cover object-center bg-[#11212D] scale-[1.18] filter grayscale contrast-110 brightness-90"
                  />

                  {/* High-fidelity Vector Fallback representing Aniket in chair with sunglasses */}
                  <div
                    id="aniket-vector-avatar"
                    className="w-full h-full flex flex-col items-center justify-end bg-gradient-to-b from-[#11212D] via-[#1a2d3d] to-[#06141B] relative"
                    style={{ display: 'none' }}
                  >
                    <svg
                      viewBox="0 0 200 200"
                      className="w-full h-full"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      {/* Background light streak */}
                      <path d="M0 60 L200 120" stroke="#253745" strokeWidth="2" strokeDasharray="6 6" opacity="0.4" />
                      <path d="M0 80 L200 140" stroke="#253745" strokeWidth="2" strokeDasharray="6 6" opacity="0.4" />

                      {/* Head & Neck */}
                      <circle cx="100" cy="80" r="32" fill="#CCD0CF" opacity="0.85" />

                      {/* Textured Stylish Hair */}
                      <path
                        d="M68 76 C68 50, 132 50, 132 76 C124 58, 76 58, 68 76 Z"
                        fill="#06141B"
                      />
                      <path
                        d="M72 65 C85 45, 115 45, 128 65 C120 54, 80 54, 72 65 Z"
                        fill="#11212D"
                      />

                      {/* Dark Sunglasses */}
                      <rect x="76" y="74" width="20" height="12" rx="3" fill="#06141B" />
                      <rect x="104" y="74" width="20" height="12" rx="3" fill="#06141B" />
                      <line x1="96" y1="79" x2="104" y2="79" stroke="#06141B" strokeWidth="2.5" />
                      {/* Glass reflection */}
                      <line x1="79" y1="77" x2="88" y2="83" stroke="#4A5C6A" strokeWidth="1.5" />
                      <line x1="107" y1="77" x2="116" y2="83" stroke="#4A5C6A" strokeWidth="1.5" />

                      {/* Jaw / Smile line */}
                      <path d="M93 96 Q100 99 107 96" stroke="#4A5C6A" strokeWidth="2" strokeLinecap="round" />

                      {/* Hand under chin pose */}
                      <path
                        d="M90 108 C88 98, 102 98, 106 108 L114 125 L92 125 Z"
                        fill="#9BA8AB"
                        opacity="0.9"
                      />

                      {/* Suit Jacket & Shoulders */}
                      <path
                        d="M40 180 L52 124 C62 118, 78 116, 100 118 C122 116, 138 118, 148 124 L160 180 Z"
                        fill="#06141B"
                      />
                      {/* Suit Lapels & Black Shirt */}
                      <path d="M86 120 L100 152 L114 120" fill="#11212D" />
                      <path d="M100 120 L100 148" stroke="#4A5C6A" strokeWidth="2" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
