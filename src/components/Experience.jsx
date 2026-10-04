import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Code2, Cpu, Sparkles, Terminal } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const EXPERIENCE_HIGHLIGHTS = [
  {
    icon: Code2,
    title: 'Real-World Project Engineering',
    desc: 'Acquiring hands-on technical proficiency by designing, developing, and deploying functional applications from the ground up.',
  },
  {
    icon: Terminal,
    title: 'Autonomous Problem Solving',
    desc: 'Resolving real architecture bottlenecks, debugging intricate state cycles, and writing resilient, maintainable code.',
  },
  {
    icon: Cpu,
    title: 'Modern Tech Stack Fluency',
    desc: 'Actively mastering modern frameworks, database design, REST APIs, and emerging AI architectures through daily building.',
  },
];

export default function Experience() {
  const sectionRef = useRef(null);
  const headerRef = useRef(null);
  const quoteCardRef = useRef(null);
  const highlightsRef = useRef([]);

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
        headerRef.current,
        { y: 70, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.9, ease: 'power3.out' },
        0
      )
      .fromTo(
        quoteCardRef.current,
        { y: 55, opacity: 0, scale: 0.96 },
        { y: 0, opacity: 1, scale: 1, duration: 0.9, ease: 'power3.out' },
        0.18
      );

      highlightsRef.current.forEach((el) => {
        if (!el) return;
        gsap.fromTo(
          el,
          { y: 40, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: el,
              start: 'top 88%',
              toggleActions: 'play none none reset',
            },
          }
        );
      });
    }, section);

    const handleExperienceNavClick = () => {
      if (tl) {
        setTimeout(() => {
          tl.restart();
        }, 220);
      }
    };

    const expLinks = document.querySelectorAll('a[href="#experience"]');
    expLinks.forEach((link) => link.addEventListener('click', handleExperienceNavClick));

    return () => {
      ctx.revert();
      expLinks.forEach((link) => link.removeEventListener('click', handleExperienceNavClick));
    };
  }, []);

  return (
    <section
      id="experience"
      ref={sectionRef}
      className="relative min-h-[75vh] py-24 sm:py-32 bg-[#06141B] text-[#CCD0CF] overflow-hidden flex flex-col items-center justify-center border-t border-[#11212D]/80 select-none"
    >
      {/* Background Ambience & Fine Coordinate Grid */}
      <div
        className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,#CCD0CF04_1px,transparent_1px),linear-gradient(to_bottom,#CCD0CF04_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_75%_65%_at_50%_50%,#000_65%,transparent_100%)] will-change-transform"
        aria-hidden="true"
      />

      {/* Atmospheric Ambient Accent Glow */}
      <div
        className="pointer-events-none absolute top-1/3 left-1/2 -translate-x-1/2 w-[550px] h-[550px] bg-gradient-to-tr from-[#38BDF8]/10 via-[#34D399]/8 to-transparent rounded-full blur-3xl opacity-70 -z-10"
        aria-hidden="true"
      />

      <div className="relative max-w-5xl mx-auto px-4 sm:px-8 w-full z-10 flex flex-col items-center">

        {/* Section Heading: Same typography as My Skills & Projects */}
        <div ref={headerRef} className="overflow-hidden mb-4 text-center will-change-transform">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight leading-tight flex items-center justify-center gap-2">
            <span className="text-white">Hands-on</span>
            <span className="text-[#7DD3FC] drop-shadow-[0_0_16px_rgba(125,211,252,0.4)]">
              Experience
            </span>
          </h2>
        </div>

        {/* User's Thought Statement inside an elegant Frosted Glass Banner */}
        <div
          ref={quoteCardRef}
          className="relative max-w-3xl w-full p-8 sm:p-12 rounded-3xl bg-[#0C1B24]/75 backdrop-blur-2xl border border-[#253745]/80 shadow-[0_20px_50px_rgba(0,0,0,0.6)] text-center mb-12 will-change-transform overflow-hidden"
        >
          {/* Subtle Top Inner Gloss Glow */}
          <div
            className="pointer-events-none absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-white/[0.06] to-transparent rounded-t-3xl"
            aria-hidden="true"
          />

          <div className="relative z-10 flex flex-col items-center">
            <div className="w-10 h-10 rounded-2xl bg-[#11212D] border border-[#253745] flex items-center justify-center mb-5 text-[#7DD3FC] shadow-[0_0_15px_rgba(125,211,252,0.2)]">
              <Sparkles className="w-5 h-5" />
            </div>

            <blockquote className="text-lg sm:text-xl md:text-2xl text-white font-medium italic leading-relaxed max-w-2xl mb-4">
              “Turning knowledge into practical solutions through development, experimentation and real-world projects.”
            </blockquote>

            <p className="text-xs sm:text-sm text-[#9BA8AB] max-w-lg leading-relaxed">
              Focused on direct hands-on execution, rigorous experimentation, and mastering technologies by actively building end-to-end solutions.
            </p>
          </div>
        </div>

        {/* Core Pillars / Execution Principles */}
        <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-6">
          {EXPERIENCE_HIGHLIGHTS.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={item.title}
                ref={(el) => (highlightsRef.current[idx] = el)}
                className="rounded-2xl p-5 sm:p-6 bg-[#09151F]/65 border border-[#253745]/70 backdrop-blur-md hover:border-[#7DD3FC]/40 transition-all duration-300 shadow-lg will-change-transform flex flex-col gap-3 group"
              >
                <div className="w-10 h-10 rounded-xl bg-[#11212D] border border-[#253745] flex items-center justify-center text-[#7DD3FC] group-hover:scale-105 transition-transform shadow-[0_0_12px_rgba(125,211,252,0.15)]">
                  <Icon className="w-5 h-5" />
                </div>
                <h3 className="text-sm sm:text-base font-bold text-white tracking-tight">
                  {item.title}
                </h3>
                <p className="text-xs text-[#9BA8AB] leading-relaxed">
                  {item.desc}
                </p>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
