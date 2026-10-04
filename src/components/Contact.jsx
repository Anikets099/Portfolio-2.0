import React, { useState, useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { MapPin, Mail, Phone, Github, Linkedin, Send, CheckCircle2, AlertCircle, ExternalLink } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const SOCIAL_LINKS = [
  {
    name: 'GitHub',
    icon: Github,
    href: 'https://github.com',
  },
  {
    name: 'LinkedIn',
    icon: Linkedin,
    href: 'https://www.linkedin.com/in/aniket-jadhav-329033393/',
  },
];

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [status, setStatus] = useState('idle'); // idle | submitting | success | error
  const [errorMessage, setErrorMessage] = useState('');

  const sectionRef = useRef(null);
  const headerRef = useRef(null);
  const formRef = useRef(null);
  const detailsRef = useRef(null);
  const sendButtonRef = useRef(null);

  // Entrance animations
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
        { y: 60, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.9, ease: 'power3.out' },
        0
      )
      .fromTo(
        formRef.current,
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.85, ease: 'power3.out' },
        0.18
      )
      .fromTo(
        detailsRef.current,
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out' },
        0.32
      );
    }, section);

    const handleContactNavClick = () => {
      if (tl) {
        setTimeout(() => {
          tl.restart();
        }, 220);
      }
    };

    const contactLinks = document.querySelectorAll('a[href="#contact"]');
    contactLinks.forEach((link) => link.addEventListener('click', handleContactNavClick));

    return () => {
      ctx.revert();
      contactLinks.forEach((link) => link.removeEventListener('click', handleContactNavClick));
    };
  }, []);

  // Physics-based particle burst effect matching Screenshot (141).png
  const triggerPhysicsBurst = (originX, originY) => {
    if (typeof window === 'undefined') return;

    const particleCount = 45;
    const colors = ['#7DD3FC', '#38BDF8', '#E0F2FE', '#67E8F9', '#BAE6FD', '#FFFFFF'];

    for (let i = 0; i < particleCount; i++) {
      const p = document.createElement('div');
      const size = gsap.utils.random(4, 10);
      const color = gsap.utils.random(colors);

      p.style.position = 'fixed';
      p.style.left = `${originX}px`;
      p.style.top = `${originY}px`;
      p.style.width = `${size}px`;
      p.style.height = `${size}px`;
      p.style.borderRadius = '50%';
      p.style.backgroundColor = color;
      p.style.boxShadow = `0 0 ${size * 1.8}px ${color}, 0 0 ${size * 3}px #38BDF8`;
      p.style.pointerEvents = 'none';
      p.style.zIndex = '99999';
      p.style.transform = 'translate(-50%, -50%)';

      document.body.appendChild(p);

      // Radial physics trajectory
      const angle = Math.random() * Math.PI * 2;
      const speed = gsap.utils.random(70, 260);
      const targetX = Math.cos(angle) * speed;
      const targetY = Math.sin(angle) * speed + gsap.utils.random(-15, 45); // Subtle gravitational drift

      gsap.to(p, {
        x: targetX,
        y: targetY,
        scale: gsap.utils.random(0.2, 0.8),
        opacity: 0,
        duration: gsap.utils.random(0.9, 1.5),
        ease: 'power3.out',
        onComplete: () => {
          if (p.parentNode) {
            p.parentNode.removeChild(p);
          }
        },
      });
    }
  };

  const handleButtonClick = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX || (rect.left + rect.width / 2);
    const y = e.clientY || (rect.top + rect.height / 2);

    // Spring compress button on click
    gsap.fromTo(
      sendButtonRef.current,
      { scale: 0.95 },
      { scale: 1, duration: 0.45, ease: 'elastic.out(1.2, 0.4)' }
    );

    triggerPhysicsBurst(x, y);
  };

  // Real Email Delivery to aniketjadhav77999@gmail.com
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) return;

    if (sendButtonRef.current) {
      const rect = sendButtonRef.current.getBoundingClientRect();
      triggerPhysicsBurst(rect.left + rect.width / 2, rect.top + rect.height / 2);
    }

    setStatus('submitting');
    setErrorMessage('');

    try {
      // Dispatches email directly to aniketjadhav77999@gmail.com via FormSubmit AJAX service
      const response = await fetch('https://formsubmit.co/ajax/aniketjadhav77999@gmail.com', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          name: formData.name.trim(),
          email: formData.email.trim(),
          message: formData.message.trim(),
          _subject: `New Portfolio Message from ${formData.name.trim()}`,
          _template: 'table',
          _captcha: 'false',
        }),
      });

      if (response.ok) {
        setStatus('success');
        setFormData({ name: '', email: '', message: '' });
        setTimeout(() => setStatus('idle'), 7000);
      } else {
        throw new Error('Failed to deliver message via primary service');
      }
    } catch {
      // Provide graceful mailto fallback if network or adblocker interrupts the request
      setStatus('error');
      setErrorMessage(
        'Unable to send automatically. You can launch your mail client below to deliver your message directly.'
      );
    }
  };

  const handleMailtoFallback = () => {
    const subject = encodeURIComponent(`Portfolio Inquiry from ${formData.name || 'Visitor'}`);
    const body = encodeURIComponent(
      `Hi Aniket,\n\nName: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}\n`
    );
    window.location.href = `mailto:aniketjadhav77999@gmail.com?subject=${subject}&body=${body}`;
  };

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="relative py-20 sm:py-28 bg-[#06141B] text-[#CCD0CF] overflow-hidden flex flex-col items-center border-t border-[#11212D]/80 select-none"
    >
      {/* Background Ambience & Fine Coordinate Grid */}
      <div
        className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,#CCD0CF04_1px,transparent_1px),linear-gradient(to_bottom,#CCD0CF04_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_75%_65%_at_50%_50%,#000_65%,transparent_100%)] will-change-transform"
        aria-hidden="true"
      />

      {/* Atmospheric Ambient Light Blue Glow */}
      <div
        className="pointer-events-none absolute top-1/3 left-1/2 -translate-x-1/2 w-[550px] h-[550px] bg-gradient-to-tr from-[#38BDF8]/15 via-[#7DD3FC]/10 to-transparent rounded-full blur-3xl opacity-70 -z-10"
        aria-hidden="true"
      />

      <div className="relative max-w-xl mx-auto px-5 sm:px-8 w-full z-10 flex flex-col items-center">

        {/* Section Heading: Get In Touch (Touch in Light Blue #7DD3FC) */}
        <div ref={headerRef} className="overflow-hidden mb-10 text-center will-change-transform">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight leading-tight flex items-center justify-center gap-2 mb-3">
            <span className="text-white">Get In</span>
            <span className="text-[#7DD3FC] drop-shadow-[0_0_18px_rgba(125,211,252,0.5)]">
              Touch
            </span>
          </h2>
          <p className="text-sm sm:text-base text-[#9BA8AB] leading-relaxed max-w-sm sm:max-w-md mx-auto">
            Have a project in mind or want to collaborate?
            <br />
            Send a message directly to my inbox!
          </p>
        </div>

        {/* Form Container */}
        <form
          ref={formRef}
          onSubmit={handleSubmit}
          className="w-full flex flex-col gap-5 will-change-transform"
        >
          {/* Your Name */}
          <div className="flex flex-col gap-2">
            <label className="text-sm sm:text-base font-medium text-white">
              Your Name
            </label>
            <input
              type="text"
              required
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full px-4 py-3.5 rounded-xl bg-[#0B1720] border border-[#1E2D3B] text-white placeholder-[#9BA8AB]/40 focus:outline-none focus:border-[#7DD3FC] focus:ring-1 focus:ring-[#7DD3FC] transition-all text-sm sm:text-base"
              placeholder="e.g. John Doe"
            />
          </div>

          {/* Email Address */}
          <div className="flex flex-col gap-2">
            <label className="text-sm sm:text-base font-medium text-white">
              Email Address
            </label>
            <input
              type="email"
              required
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full px-4 py-3.5 rounded-xl bg-[#0B1720] border border-[#1E2D3B] text-white placeholder-[#9BA8AB]/40 focus:outline-none focus:border-[#7DD3FC] focus:ring-1 focus:ring-[#7DD3FC] transition-all text-sm sm:text-base"
              placeholder="e.g. john@example.com"
            />
          </div>

          {/* Your Message */}
          <div className="flex flex-col gap-2">
            <label className="text-sm sm:text-base font-medium text-white">
              Your Message
            </label>
            <textarea
              rows={5}
              required
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              className="w-full px-4 py-3.5 rounded-xl bg-[#0B1720] border border-[#1E2D3B] text-white placeholder-[#9BA8AB]/40 focus:outline-none focus:border-[#7DD3FC] focus:ring-1 focus:ring-[#7DD3FC] transition-all text-sm sm:text-base resize-none"
              placeholder="Describe your project, question, or opportunity..."
            />
          </div>

          {/* Success Message Banner */}
          {status === 'success' && (
            <div className="p-4 rounded-xl bg-[#092B1E]/90 border border-[#34D399]/40 text-[#6EE7B7] flex items-start gap-3 text-sm animate-in fade-in duration-300">
              <CheckCircle2 className="w-5 h-5 shrink-0 text-[#34D399] mt-0.5" />
              <div>
                <p className="font-semibold text-white">Message Delivered!</p>
                <p className="text-xs text-[#A7F3D0] mt-0.5">
                  Your message has been sent to <strong>aniketjadhav77999@gmail.com</strong>. I will get back to you shortly!
                </p>
              </div>
            </div>
          )}

          {/* Fallback Banner on Network Error */}
          {status === 'error' && (
            <div className="p-4 rounded-xl bg-[#2A1215]/90 border border-[#F87171]/40 text-[#FECACA] flex flex-col gap-2.5 text-sm animate-in fade-in duration-300">
              <div className="flex items-start gap-2.5">
                <AlertCircle className="w-5 h-5 shrink-0 text-[#F87171] mt-0.5" />
                <p className="text-xs text-[#FECACA] leading-relaxed">{errorMessage}</p>
              </div>
              <button
                type="button"
                onClick={handleMailtoFallback}
                className="self-start px-3.5 py-1.5 rounded-lg bg-[#F87171]/20 hover:bg-[#F87171]/30 border border-[#F87171]/50 text-white text-xs font-medium flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                <span>Open in Mail App</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </button>
            </div>
          )}

          {/* Send Button with Physics2D Particle Burst */}
          <button
            ref={sendButtonRef}
            type="submit"
            onClick={handleButtonClick}
            disabled={status === 'submitting'}
            className="group relative w-full py-3.5 px-6 rounded-xl bg-[#38BDF8] hover:bg-[#7DD3FC] text-[#06141B] font-bold text-base shadow-[0_4px_20px_rgba(56,189,248,0.35)] hover:shadow-[0_6px_25px_rgba(125,211,252,0.5)] active:scale-[0.98] transition-all duration-200 cursor-pointer disabled:opacity-60 flex items-center justify-center gap-2 mt-2 overflow-hidden"
          >
            {status === 'submitting' ? (
              <span className="flex items-center gap-2">
                <span className="w-4 h-4 border-2 border-[#06141B] border-t-transparent rounded-full animate-spin" />
                <span>Sending to Inbox...</span>
              </span>
            ) : status === 'success' ? (
              <span className="flex items-center gap-2 text-[#06141B]">
                <CheckCircle2 className="w-5 h-5 text-[#06141B]" />
                <span>Message Sent!</span>
              </span>
            ) : (
              <span className="flex items-center gap-2">
                <span>Send</span>
                <Send className="w-4 h-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
              </span>
            )}
          </button>
        </form>

        {/* Contact Info & Details */}
        <div
          ref={detailsRef}
          className="w-full flex flex-col gap-6 mt-12 sm:mt-14 will-change-transform"
        >
          {/* Location */}
          <div className="flex items-start gap-4">
            <div className="w-6 h-6 flex items-center justify-center mt-0.5 shrink-0">
              <MapPin className="w-6 h-6 text-[#7DD3FC]" />
            </div>
            <div className="flex flex-col">
              <h3 className="text-base sm:text-lg font-bold text-white leading-snug">
                Location
              </h3>
              <p className="text-sm text-[#CCD0CF] leading-relaxed">
                At post.Lohata(west) Tal.Kallamb
                <br />
                Dist.Dharashiv
              </p>
            </div>
          </div>

          {/* Email */}
          <div className="flex items-start gap-4">
            <div className="w-6 h-6 flex items-center justify-center mt-0.5 shrink-0">
              <Mail className="w-6 h-6 text-[#7DD3FC]" />
            </div>
            <div className="flex flex-col">
              <h3 className="text-base sm:text-lg font-bold text-white leading-snug">
                Email
              </h3>
              <a
                href="mailto:aniketjadhav77999@gmail.com"
                className="text-sm text-[#CCD0CF] hover:text-[#7DD3FC] transition-colors leading-relaxed"
              >
                aniketjadhav77999@gmail.com
              </a>
            </div>
          </div>

          {/* Phone */}
          <div className="flex items-start gap-4">
            <div className="w-6 h-6 flex items-center justify-center mt-0.5 shrink-0">
              <Phone className="w-6 h-6 text-[#7DD3FC]" />
            </div>
            <div className="flex flex-col">
              <h3 className="text-base sm:text-lg font-bold text-white leading-snug">
                Phone
              </h3>
              <a
                href="tel:+917774050976"
                className="text-sm text-[#CCD0CF] hover:text-[#7DD3FC] transition-colors leading-relaxed"
              >
                +91 7774050976
              </a>
            </div>
          </div>

          {/* Follow Me with GitHub and LinkedIn */}
          <div className="flex flex-col gap-3.5 pt-4">
            <h3 className="text-base sm:text-lg font-bold text-white">
              Follow Me
            </h3>
            <div className="flex items-center gap-3">
              {SOCIAL_LINKS.map((item) => {
                const Icon = item.icon;
                return (
                  <a
                    key={item.name}
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Follow on ${item.name}`}
                    className="w-11 h-11 rounded-full bg-[#11212D]/90 hover:bg-[#1C2D3A] text-[#7DD3FC] hover:text-white border border-[#253745] hover:border-[#7DD3FC]/60 flex items-center justify-center transition-all duration-200 shadow-sm hover:shadow-[0_0_15px_rgba(125,211,252,0.3)] hover:scale-105 active:scale-95 cursor-pointer"
                  >
                    <Icon className="w-5 h-5" />
                  </a>
                );
              })}
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
