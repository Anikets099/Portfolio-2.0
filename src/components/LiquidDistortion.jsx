import React, { useEffect, useRef, useState, useCallback } from 'react';
import gsap from 'gsap';

/**
 * Interactive Liquid Distortion + Mouse-Triggered Ripple
 *
 * Implements:
 * 1. Physical refraction and displacement of DOM elements (text, buttons, background)
 *    via a dynamically modulated SVG feDisplacementMap + feTurbulence filter.
 * 2. Hardware-accelerated canvas water ripple surface with refractive wave crests,
 *    specular highlights, and subtle chromatic aberration fringes.
 * 3. Cinematic initial load center wave that smoothly dissipates, returning the
 *    screen to crystal-clear sharpness.
 * 4. Velocity-sensitive cursor ripple generation smoothed with GSAP.
 */
export default function LiquidDistortion({ containerRef, contentRef }) {
  const canvasRef = useRef(null);
  const displacementMapRef = useRef(null);
  const turbulenceRef = useRef(null);

  const ripplesRef = useRef([]);
  const animFrameIdRef = useRef(null);
  const isLoopRunningRef = useRef(false);
  const lastMousePosRef = useRef({ x: 0, y: 0, time: 0 });
  const filterStateRef = useRef({ scale: 0, frequency: 0.014 });

  const [filterActive, setFilterActive] = useState(false);

  // Update SVG displacement map attributes smoothly
  const applyFilterScale = useCallback((scaleVal, freqVal = 0.014) => {
    if (displacementMapRef.current) {
      displacementMapRef.current.setAttribute('scale', scaleVal.toFixed(2));
    }
    if (turbulenceRef.current && freqVal) {
      turbulenceRef.current.setAttribute('baseFrequency', `${freqVal.toFixed(4)} ${(freqVal * 1.2).toFixed(4)}`);
    }

    if (scaleVal > 0.05) {
      setFilterActive(true);
    } else {
      setFilterActive(false);
    }
  }, []);

  // Add a ripple into the physics simulation
  const addRipple = useCallback((x, y, strength = 0.5, maxRadius = 380, speed = 2.2) => {
    ripplesRef.current.push({
      x,
      y,
      radius: 6,
      maxRadius,
      strength: Math.min(0.9, strength),
      speed,
      wavelength: 40,
      decay: 0.984, // Slower decay for a gentle, long-lasting smooth glide
    });

    // Start render loop if sleeping
    if (!isLoopRunningRef.current) {
      isLoopRunningRef.current = true;
      runRenderLoop();
    }
  }, []);

  // Canvas drawing loop
  const runRenderLoop = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) {
      isLoopRunningRef.current = false;
      return;
    }

    const ctx = canvas.getContext('2d');
    if (!ctx) {
      isLoopRunningRef.current = false;
      return;
    }

    const width = canvas.width;
    const height = canvas.height;
    ctx.clearRect(0, 0, width, height);

    const ripples = ripplesRef.current;

    for (let i = ripples.length - 1; i >= 0; i--) {
      const r = ripples[i];
      r.radius += r.speed;
      r.strength *= r.decay;

      if (r.strength < 0.008 || r.radius > r.maxRadius) {
        ripples.splice(i, 1);
        continue;
      }

      // Smooth easing curve for the wave visibility
      const alpha = Math.sin(Math.min(1, r.radius / r.maxRadius) * Math.PI) * r.strength;

      // 1. Refractive wave trough (soft subtle displacement shadow)
      ctx.beginPath();
      ctx.arc(r.x, r.y, Math.max(0, r.radius - 2), 0, Math.PI * 2);
      ctx.lineWidth = 3;
      ctx.strokeStyle = `rgba(6, 20, 27, ${alpha * 0.35})`;
      ctx.stroke();

      // 2. Chromatic aberration fringe (delicate cyan-blue refraction edge)
      ctx.beginPath();
      ctx.arc(r.x, r.y, r.radius, 0, Math.PI * 2);
      ctx.lineWidth = 2.2;
      ctx.strokeStyle = `rgba(125, 211, 252, ${alpha * 0.28})`;
      ctx.stroke();

      // 3. Specular highlight (water surface crest reflection)
      ctx.beginPath();
      ctx.arc(r.x, r.y, r.radius + 1.5, 0, Math.PI * 2);
      ctx.lineWidth = 1.2;
      ctx.strokeStyle = `rgba(204, 208, 207, ${alpha * 0.42})`;
      ctx.stroke();

      // 4. Soft outer caustic ring
      ctx.beginPath();
      ctx.arc(r.x, r.y, r.radius + 5, 0, Math.PI * 2);
      ctx.lineWidth = 1.8;
      ctx.strokeStyle = `rgba(74, 92, 106, ${alpha * 0.2})`;
      ctx.stroke();
    }

    if (ripples.length > 0) {
      animFrameIdRef.current = requestAnimationFrame(runRenderLoop);
    } else {
      isLoopRunningRef.current = false;
    }
  }, []);

  // Handle canvas sizing
  useEffect(() => {
    const handleResize = () => {
      const canvas = canvasRef.current;
      const container = containerRef.current;
      if (!canvas || !container) return;

      const rect = container.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);

      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      canvas.style.width = `${rect.width}px`;
      canvas.style.height = `${rect.height}px`;

      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.scale(dpr, dpr);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize, { passive: true });
    return () => window.removeEventListener('resize', handleResize);
  }, [containerRef]);

  // Initial Page Load Wave & Liquid Distortion using GSAP
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const timer = setTimeout(() => {
      const rect = container.getBoundingClientRect();
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const maxDist = Math.max(rect.width, rect.height) * 0.85;

      // 1. Spawn primary center wave (gentle, steady glide)
      addRipple(centerX, centerY, 0.75, maxDist, 2.4);

      // 2. Secondary soft trailing ripple for serene liquid resonance
      setTimeout(() => {
        addRipple(centerX, centerY, 0.35, maxDist * 0.65, 1.9);
      }, 400);

      // 3. GSAP Timeline to bend hero content and smoothly settle to crystal-clear sharpness
      const tl = gsap.timeline({
        onUpdate: () => {
          applyFilterScale(filterStateRef.current.scale, filterStateRef.current.frequency);
        },
        onComplete: () => {
          applyFilterScale(0);
        },
      });

      // Start with gentle liquid refraction, wave rolls slowly, then becomes completely sharp
      tl.fromTo(
        filterStateRef.current,
        { scale: 16, frequency: 0.015 },
        {
          scale: 0,
          frequency: 0.012,
          duration: 3.6,
          ease: 'power2.out',
        }
      );
    }, 200);

    return () => clearTimeout(timer);
  }, [containerRef, addRipple, applyFilterScale]);

  // Mouse Movement Ripple Generation (Smooth & Calmer)
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let tweenInstance = null;

    const handleMouseMove = (e) => {
      const rect = container.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      // Check boundary
      if (x < 0 || x > rect.width || y < 0 || y > rect.height) return;

      const now = performance.now();
      const last = lastMousePosRef.current;
      const dt = now - last.time;
      const dx = x - last.x;
      const dy = y - last.y;
      const dist = Math.hypot(dx, dy);

      // Calmer throttle so ripples emerge smoothly and gracefully
      if (dist > 35 && dt > 85) {
        const speed = dt > 0 ? (dist / dt) * 16 : 1;
        // Subtle ripple strength
        const strength = Math.min(0.7, Math.max(0.25, speed * 0.035));
        const maxRadius = Math.min(420, 200 + speed * 8);
        // Calm wave propagation speed (2.0 - 3.2 px/frame)
        const waveSpeed = Math.min(3.2, 1.9 + speed * 0.06);

        addRipple(x, y, strength, maxRadius, waveSpeed);

        lastMousePosRef.current = { x, y, time: now };

        // Modulate SVG displacement filter via GSAP smoothly
        const targetScale = Math.min(7.5, 1.0 + strength * 5.5);
        const targetFreq = 0.013 + Math.min(0.006, strength * 0.004);

        if (tweenInstance) tweenInstance.kill();

        tweenInstance = gsap.timeline({
          onUpdate: () => {
            applyFilterScale(filterStateRef.current.scale, filterStateRef.current.frequency);
          },
        })
        .to(filterStateRef.current, {
          scale: targetScale,
          frequency: targetFreq,
          duration: 0.35,
          ease: 'sine.out',
        })
        .to(filterStateRef.current, {
          scale: 0,
          frequency: 0.012,
          duration: 1.25,
          ease: 'power2.out',
          onComplete: () => {
            applyFilterScale(0);
          },
        });
      }
    };

    container.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => {
      container.removeEventListener('mousemove', handleMouseMove);
      if (tweenInstance) tweenInstance.kill();
    };
  }, [containerRef, addRipple, applyFilterScale]);

  // Apply or remove SVG filter on contentRef
  useEffect(() => {
    const content = contentRef?.current;
    if (!content) return;

    if (filterActive) {
      content.style.filter = 'url(#liquid-distortion-filter)';
      content.style.willChange = 'filter';
    } else {
      content.style.filter = 'none';
      content.style.willChange = 'auto';
    }
  }, [filterActive, contentRef]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (animFrameIdRef.current) {
        cancelAnimationFrame(animFrameIdRef.current);
      }
    };
  }, []);

  return (
    <>
      {/* SVG Liquid Refraction Filter (Zero layout footprint) */}
      <svg
        className="absolute w-0 h-0 pointer-events-none opacity-0 overflow-hidden"
        aria-hidden="true"
      >
        <defs>
          <filter
            id="liquid-distortion-filter"
            x="-10%"
            y="-10%"
            width="120%"
            height="120%"
            filterUnits="objectBoundingBox"
            colorInterpolationFilters="sRGB"
          >
            <feTurbulence
              ref={turbulenceRef}
              type="fractalNoise"
              baseFrequency="0.014 0.016"
              numOctaves="2"
              result="liquidNoise"
            />
            <feDisplacementMap
              ref={displacementMapRef}
              in="SourceGraphic"
              in2="liquidNoise"
              scale="0"
              xChannelSelector="R"
              yChannelSelector="G"
            />
          </filter>
        </defs>
      </svg>

      {/* Water Ripple Surface Canvas */}
      <canvas
        ref={canvasRef}
        className="pointer-events-none absolute inset-0 z-20 overflow-hidden"
        style={{ mixBlendMode: 'screen' }}
      />
    </>
  );
}
