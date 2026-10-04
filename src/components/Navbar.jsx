import React, { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { Menu, X } from 'lucide-react';

const NAV_LINKS = [
  { name: 'Home', href: '#home' },
  { name: 'About', href: '#about' },
  { name: 'Skills', href: '#skills' },
  { name: 'Tools', href: '#tools' },
  { name: 'Projects', href: '#projects' },
  { name: 'Experience', href: '#experience' },
  { name: 'Contact', href: '#contact' },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeLink, setActiveLink] = useState('Home');
  const [blinkingLink, setBlinkingLink] = useState(null);

  const navRef = useRef(null);
  const logoRef = useRef(null);
  const linksRef = useRef([]);
  const mobileMenuRef = useRef(null);

  // Monitor scroll for glass backdrop effect
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 24) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // GSAP initial load entrance stagger animation
  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      // Subtle entrance of nav elements
      tl.from(logoRef.current, {
        y: -20,
        opacity: 0,
        duration: 0.8,
        delay: 0.1,
      })
      .from(
        linksRef.current,
        {
          y: -15,
          opacity: 0,
          duration: 0.6,
          stagger: 0.08,
        },
        '-=0.5'
      );
    }, navRef);

    return () => ctx.revert();
  }, []);

  // Animate mobile menu open/close
  useEffect(() => {
    if (mobileMenuOpen && mobileMenuRef.current) {
      gsap.fromTo(
        mobileMenuRef.current,
        { opacity: 0, y: -16 },
        { opacity: 1, y: 0, duration: 0.35, ease: 'power2.out' }
      );
    }
  }, [mobileMenuOpen]);

  // Smooth scroll handler with Temporary Light Blue Blink Effect
  const handleNavClick = (e, link) => {
    e.preventDefault();
    setActiveLink(link.name);
    setBlinkingLink(link.name);
    setMobileMenuOpen(false);

    // 1. Immediately reset ALL nav items back to original color & clear inline props
    if (navRef.current) {
      const allChars = navRef.current.querySelectorAll('.char-primary, .char-secondary');
      gsap.killTweensOf(allChars);
      gsap.set(allChars, { clearProps: 'color,textShadow' });

      const allIndicators = navRef.current.querySelectorAll('.nested-ignore-element');
      gsap.killTweensOf(allIndicators);
      gsap.set(allIndicators, { clearProps: 'backgroundColor,boxShadow' });
    }

    // 2. Light blue blink animation using GSAP on the clicked nav item only
    const linkEl = e.currentTarget;
    const textChars = linkEl.querySelectorAll('.char-primary, .char-secondary');
    const indicator = linkEl.querySelector('.nested-ignore-element');

    // 2 crisp pulses in bright light blue (#7DD3FC) that return to original color
    const blinkTl = gsap.timeline({
      onComplete: () => {
        setBlinkingLink(null);
        // Clear props so element strictly uses original CSS colors
        gsap.set(textChars, { clearProps: 'color,textShadow' });
        if (indicator) {
          gsap.set(indicator, { clearProps: 'backgroundColor,boxShadow' });
        }
      },
    });

    blinkTl
      .to(textChars, {
        color: '#7DD3FC',
        textShadow: '0 0 14px rgba(125, 211, 252, 0.9), 0 0 24px rgba(125, 211, 252, 0.6)',
        duration: 0.12,
        ease: 'power1.out',
      })
      .to(textChars, {
        color: '#CCD0CF',
        textShadow: 'none',
        duration: 0.12,
        ease: 'power1.in',
      })
      .to(textChars, {
        color: '#7DD3FC',
        textShadow: '0 0 16px rgba(125, 211, 252, 0.95), 0 0 28px rgba(125, 211, 252, 0.7)',
        duration: 0.14,
        ease: 'power1.out',
      })
      .to(textChars, {
        color: '#CCD0CF',
        textShadow: 'none',
        duration: 0.18,
        ease: 'power2.out',
        clearProps: 'color,textShadow',
      });

    if (indicator) {
      gsap.timeline({
        onComplete: () => {
          gsap.set(indicator, { clearProps: 'backgroundColor,boxShadow' });
        },
      })
        .to(indicator, {
          backgroundColor: '#7DD3FC',
          boxShadow: '0 0 12px #7DD3FC',
          duration: 0.12,
        })
        .to(indicator, {
          boxShadow: 'none',
          duration: 0.12,
        })
        .to(indicator, {
          boxShadow: '0 0 14px #7DD3FC',
          duration: 0.14,
        })
        .to(indicator, {
          boxShadow: 'none',
          duration: 0.18,
          clearProps: 'backgroundColor,boxShadow',
        });
    }

    const targetElement = document.querySelector(link.href);
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
    } else {
      // If target section is not yet created, smoothly scroll to top if Home
      if (link.href === '#home') {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    }
  };

  // GSAP Hover Effect with "Ignore Nested Elements" logic
  // Targets only the text characters and explicitly ignores nested indicator elements (.nested-ignore-element)
  const handleLinkMouseEnter = (e) => {
    const linkEl = e.currentTarget;
    const chars1 = linkEl.querySelectorAll('.char-primary');
    const chars2 = linkEl.querySelectorAll('.char-secondary');

    if (chars1.length > 0 && chars2.length > 0) {
      gsap.to(chars1, {
        yPercent: -100,
        stagger: 0.022,
        duration: 0.32,
        ease: 'power2.inOut',
        overwrite: 'auto',
      });
      gsap.to(chars2, {
        yPercent: -100,
        stagger: 0.022,
        duration: 0.32,
        ease: 'power2.inOut',
        overwrite: 'auto',
      });
    }
  };

  const handleLinkMouseLeave = (e) => {
    const linkEl = e.currentTarget;
    const chars1 = linkEl.querySelectorAll('.char-primary');
    const chars2 = linkEl.querySelectorAll('.char-secondary');

    if (chars1.length > 0 && chars2.length > 0) {
      gsap.to(chars1, {
        yPercent: 0,
        stagger: 0.022,
        duration: 0.32,
        ease: 'power2.inOut',
        overwrite: 'auto',
      });
      gsap.to(chars2, {
        yPercent: 0,
        stagger: 0.022,
        duration: 0.32,
        ease: 'power2.inOut',
        overwrite: 'auto',
      });
    }
  };

  return (
    <header
      ref={navRef}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-[#06141B]/90 backdrop-blur-md border-b border-[#253745]/80 py-3.5 shadow-lg shadow-[#06141B]/80'
          : 'bg-transparent py-5 border-b border-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-8 flex items-center justify-between">
        {/* Brand / Logo matching user screenshot */}
        <a
          ref={logoRef}
          href="#home"
          onClick={(e) => handleNavClick(e, { name: 'Home', href: '#home' })}
          className="group flex flex-col items-start transition-colors"
        >
          <div className="flex items-center text-xl font-bold tracking-tight">
            <span className="text-white group-hover:text-white transition-colors">
              Aniket
            </span>
            <span className="text-[#7DD3FC] group-hover:text-[#BAE6FD] transition-colors ml-0.5">
              Jadhav
            </span>
          </div>
          <div className="w-2.5 h-2.5 rounded-full bg-[#7DD3FC] group-hover:bg-[#BAE6FD] transition-colors -mt-0.5 ml-0.5" />
        </a>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-1 lg:gap-2">
          {NAV_LINKS.map((link, index) => {
            const isActive = activeLink === link.name;
            const isBlinking = blinkingLink === link.name;
            return (
              <a
                key={link.name}
                ref={(el) => (linksRef.current[index] = el)}
                href={link.href}
                onClick={(e) => handleNavClick(e, link)}
                onMouseEnter={handleLinkMouseEnter}
                onMouseLeave={handleLinkMouseLeave}
                className={`relative px-3.5 py-1.5 text-sm font-medium transition-colors duration-200 cursor-pointer ${
                  isBlinking
                    ? 'text-[#7DD3FC]'
                    : isActive
                    ? 'text-[#CCD0CF]'
                    : 'text-[#9BA8AB] hover:text-[#CCD0CF]'
                }`}
              >
                {/* Character split text container - animated by GSAP */}
                <span className="relative inline-block overflow-hidden leading-tight align-middle pointer-events-none">
                  <span className="char-layer-1 inline-flex">
                    {link.name.split('').map((char, cIndex) => (
                      <span
                        key={`c1-${cIndex}`}
                        className="char-primary inline-block transition-colors"
                      >
                        {char === ' ' ? '\u00A0' : char}
                      </span>
                    ))}
                  </span>
                  <span
                    className="char-layer-2 absolute top-0 left-0 inline-flex pointer-events-none select-none text-[#CCD0CF]"
                    aria-hidden="true"
                  >
                    {link.name.split('').map((char, cIndex) => (
                      <span
                        key={`c2-${cIndex}`}
                        className="char-secondary inline-block translate-y-full"
                      >
                        {char === ' ' ? '\u00A0' : char}
                      </span>
                    ))}
                  </span>
                </span>

                {/* Nested Element: Active Indicator Bar (IGNORED by GSAP text animation) */}
                {isActive && (
                  <span
                    className={`nested-ignore-element pointer-events-none absolute bottom-0 left-3.5 right-3.5 h-[2px] rounded-full transition-colors ${
                      isBlinking ? 'bg-[#7DD3FC] shadow-[0_0_8px_#7DD3FC]' : 'bg-gradient-to-r from-[#4A5C6A] to-[#CCD0CF]'
                    }`}
                    data-gsap-ignore="true"
                  />
                )}
              </a>
            );
          })}
        </nav>

        {/* Mobile Menu Button */}
        <div className="md:hidden flex items-center">
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label={mobileMenuOpen ? 'Close Menu' : 'Open Menu'}
            className="p-2 text-[#9BA8AB] hover:text-[#CCD0CF] rounded-lg hover:bg-[#11212D] focus:outline-none transition-colors"
          >
            {mobileMenuOpen ? (
              <X className="w-5 h-5" />
            ) : (
              <Menu className="w-5 h-5" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div
          ref={mobileMenuRef}
          className="md:hidden border-b border-[#253745] bg-[#06141B]/95 backdrop-blur-xl px-6 py-5 shadow-2xl"
        >
          <nav className="flex flex-col gap-2">
            {NAV_LINKS.map((link) => {
              const isActive = activeLink === link.name;
              const isBlinking = blinkingLink === link.name;
              return (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link)}
                  onMouseEnter={handleLinkMouseEnter}
                  onMouseLeave={handleLinkMouseLeave}
                  className={`relative flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                    isBlinking
                      ? 'bg-[#11212D] text-[#7DD3FC] font-semibold border border-[#7DD3FC]/50 shadow-[0_0_10px_rgba(125,211,252,0.3)]'
                      : isActive
                      ? 'bg-[#11212D] text-[#CCD0CF] font-semibold border border-[#253745]'
                      : 'text-[#9BA8AB] hover:text-[#CCD0CF] hover:bg-[#11212D]/50'
                  }`}
                >
                  {/* Split Character text container */}
                  <span className="relative inline-block overflow-hidden leading-tight align-middle pointer-events-none">
                    <span className="char-layer-1 inline-flex">
                      {link.name.split('').map((char, cIndex) => (
                        <span
                          key={`mc1-${cIndex}`}
                          className="char-primary inline-block"
                        >
                          {char === ' ' ? '\u00A0' : char}
                        </span>
                      ))}
                    </span>
                    <span
                      className="char-layer-2 absolute top-0 left-0 inline-flex pointer-events-none select-none text-[#CCD0CF]"
                      aria-hidden="true"
                    >
                      {link.name.split('').map((char, cIndex) => (
                        <span
                          key={`mc2-${cIndex}`}
                          className="char-secondary inline-block translate-y-full"
                        >
                          {char === ' ' ? '\u00A0' : char}
                        </span>
                      ))}
                    </span>
                  </span>

                  {/* Nested indicator dot (IGNORED by GSAP text animation) */}
                  {isActive && (
                    <span
                      className={`nested-ignore-element w-1.5 h-1.5 rounded-full transition-colors ${
                        isBlinking ? 'bg-[#7DD3FC] shadow-[0_0_6px_#7DD3FC]' : 'bg-[#7DD3FC]'
                      }`}
                      data-gsap-ignore="true"
                    />
                  )}
                </a>
              );
            })}
          </nav>
        </div>
      )}
    </header>
  );
}
