import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Link } from 'react-router-dom';
import Header from './Header';
import ColorSelector from './ColorSelector';
import { StaggeredWord, DriftingOutlineRow } from './StaggeredWord';
import { useAudience } from '../context/AudienceContext';
import {
  HERO_TRANSITIONS,
  getRandomTransition
} from '../animations/heroTransitions';
import {
  AnimatedMerayWord,
  getRandomMerayEffect,
  getRandomOutlineEffect
} from '../animations/textEffects';

const AUTOPLAY_DURATION_MS = 5000;
const USER_PAUSE_DURATION_MS = 12000;

const Hero = ({ activeVariant, setActiveVariant }) => {
  const { AUDIENCES } = useAudience();
  const heroRef = useRef(null);

  // Animation & Transition state
  const [prevVariant, setPrevVariant] = useState(null);
  const [currentTransition, setCurrentTransition] = useState('circle');
  const [transitionOrigin, setTransitionOrigin] = useState({ originX: '50%', originY: '85%' });
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [merayEffect, setMerayEffect] = useState('rise');
  const [outlineEffect, setOutlineEffect] = useState('staggerSlide');

  // Autoplay & Progress state
  const [progress, setProgress] = useState(0);
  const pauseUntilRef = useRef(0);
  const [isHovered, setIsHovered] = useState(false);
  const [isHeroVisible, setIsHeroVisible] = useState(true);
  const [isTabVisible, setIsTabVisible] = useState(true);

  // Check prefers-reduced-motion
  const [reducedMotion, setReducedMotion] = useState(() => {
    if (typeof window !== 'undefined') {
      return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    }
    return false;
  });

  // Preload all 4 phone and desktop images
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const isMobile = window.innerWidth < 768;
    AUDIENCES.forEach((aud) => {
      const img = new Image();
      img.src = isMobile ? aud.phoneImage : aud.image;
    });
  }, [AUDIENCES]);

  // Reduced motion listener
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    const handler = (e) => setReducedMotion(e.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);

  // Intersection Observer for Hero visibility
  useEffect(() => {
    if (!heroRef.current || typeof IntersectionObserver === 'undefined') return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsHeroVisible(entry.isIntersecting);
      },
      { threshold: 0.25 }
    );
    observer.observe(heroRef.current);
    return () => observer.disconnect();
  }, []);

  // Document visibility listener
  useEffect(() => {
    const handleVisibility = () => {
      setIsTabVisible(document.visibilityState === 'visible');
    };
    document.addEventListener('visibilitychange', handleVisibility);
    return () => document.removeEventListener('visibilitychange', handleVisibility);
  }, []);

  // Perform audience switch with random transitions
  const triggerSwitch = useCallback(
    (nextAudience, options = {}) => {
      if (nextAudience.id === activeVariant.id && !options.force) return;

      if (options.userInitiated) {
        pauseUntilRef.current = Date.now() + USER_PAUSE_DURATION_MS;
      }

      if (reducedMotion) {
        setActiveVariant(nextAudience);
        setProgress(0);
        return;
      }

      // Pick random transition different from current
      const nextTransition = getRandomTransition(currentTransition);
      const nextMerayEffect = getRandomMerayEffect(merayEffect);
      const nextOutlineEffect = getRandomOutlineEffect(outlineEffect);

      setPrevVariant(activeVariant);
      setCurrentTransition(nextTransition);
      setMerayEffect(nextMerayEffect);
      setOutlineEffect(nextOutlineEffect);

      if (options.originX && options.originY) {
        setTransitionOrigin({ originX: options.originX, originY: options.originY });
      } else {
        setTransitionOrigin({ originX: '50%', originY: '85%' });
      }

      setIsTransitioning(true);
      setActiveVariant(nextAudience);
      setProgress(0);

      const duration = HERO_TRANSITIONS[nextTransition]?.duration || 850;
      setTimeout(() => {
        setIsTransitioning(false);
        setPrevVariant(null);
      }, duration);
    },
    [activeVariant, currentTransition, merayEffect, outlineEffect, reducedMotion, setActiveVariant]
  );

  // Autoplay Loop via requestAnimationFrame
  useEffect(() => {
    if (reducedMotion) return;

    let animFrameId;
    let lastTime = performance.now();

    const loop = (currentTime) => {
      const delta = currentTime - lastTime;
      lastTime = currentTime;

      const now = Date.now();
      const isUserPaused = now < pauseUntilRef.current;
      const canAutoplay = isHeroVisible && isTabVisible && !isHovered && !isUserPaused;

      if (canAutoplay) {
        setProgress((prev) => {
          const next = prev + delta / AUTOPLAY_DURATION_MS;
          if (next >= 1) {
            // Find next audience
            const curIdx = AUDIENCES.findIndex((a) => a.id === activeVariant.id);
            const nextIdx = (curIdx + 1) % AUDIENCES.length;
            triggerSwitch(AUDIENCES[nextIdx]);
            return 0;
          }
          return next;
        });
      }

      animFrameId = requestAnimationFrame(loop);
    };

    animFrameId = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(animFrameId);
  }, [reducedMotion, isHeroVisible, isTabVisible, isHovered, activeVariant, AUDIENCES, triggerSwitch]);

  const activeTransitionDef = HERO_TRANSITIONS[currentTransition] || HERO_TRANSITIONS.circle;

  return (
    <div
      ref={heroRef}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="relative w-full overflow-hidden overflow-x-hidden transition-colors duration-700 ease-in-out font-sans select-none hero-mobile-height md:h-[100dvh]"
      style={{ backgroundColor: activeVariant.bgHex }}
    >
      {/* Top subtle vignette */}
      <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-black/5 to-transparent z-40 pointer-events-none" />

      {/* =========================================================================
          DESKTOP BACKGROUND TEXT (>= 768px):
          Left & Right side columns with continuous drift and shine
         ========================================================================= */}
      <div className="hidden md:flex absolute inset-0 pointer-events-none z-0 overflow-hidden">
        {/* Left column */}
        <div className="absolute left-0 top-0 bottom-0 flex flex-col justify-center gap-3 md:gap-6 pl-4 md:pl-10 opacity-35 select-none items-start outline-shine">
          {activeVariant.words.map((word, idx) => (
            <span
              key={`${activeVariant.id}-left-${idx}`}
              className="text-[16vh] md:text-[22vh] font-thunder font-bold text-stroke leading-[0.85] tracking-tight inline-block"
            >
              <StaggeredWord
                word={word}
                audienceId={activeVariant.id}
                baseDelay={idx * 120}
                effect={outlineEffect}
              />
            </span>
          ))}
        </div>

        {/* Right column */}
        <div className="absolute right-0 top-0 bottom-0 flex flex-col justify-center gap-3 md:gap-6 pr-4 md:pr-10 opacity-35 select-none items-end outline-shine">
          {activeVariant.words.map((word, idx) => (
            <span
              key={`${activeVariant.id}-right-${idx}`}
              className="text-[16vh] md:text-[22vh] font-thunder font-bold text-stroke leading-[0.85] tracking-tight inline-block"
            >
              <StaggeredWord
                word={word}
                audienceId={activeVariant.id}
                baseDelay={idx * 120}
                effect={outlineEffect}
              />
            </span>
          ))}
        </div>
      </div>

      {/* Desktop Layer 3 (z-10): Giant Solid Center MERAY Text */}
      <div className="hidden md:flex absolute inset-0 items-center justify-center z-10 pointer-events-none">
        <h1
          key={`${activeVariant.id}-${merayEffect}`}
          className="text-[35vw] leading-none font-bold text-white tracking-tighter font-thunder drop-shadow-2xl scale-y-110 -translate-y-[15%] md:translate-y-[-6%]"
        >
          <AnimatedMerayWord effect={merayEffect} />
        </h1>
      </div>

      {/* =========================================================================
          MOBILE BACKGROUND TEXT (< 768px):
          Pinned below header:
          position: absolute; left: 0; right: 0;
          top: calc(env(safe-area-inset-top, 0px) + 88px);
          - Row 1 outline: directly ABOVE MERAY (between header & MERAY)
          - Giant solid MERAY (31vw, 27vw on <700px height): 100% visible, fully above cap
          - Row 2 & Row 3 outline: directly BELOW MERAY (behind cap/person)
         ========================================================================= */}
      <div
        className="md:hidden absolute inset-x-0 z-10 pointer-events-none text-center hero-meray-wrapper"
        style={{
          top: "calc(env(safe-area-inset-top, 0px) + 88px)",
          transform: "none"
        }}
      >
        {/* Row 1 outline: directly ABOVE MERAY */}
        <div className="absolute bottom-full left-0 right-0 mb-[-4px] overflow-hidden">
          <DriftingOutlineRow
            word={activeVariant.words[0]}
            audienceId={activeVariant.id}
            direction="left"
            delay={0}
            className="text-[20vw] sm:text-[22vw]"
            effect={outlineEffect}
          />
        </div>

        {/* Giant Solid MERAY Word (~31vw, 27vw on <700px height, fully above cap) */}
        <h1
          key={`${activeVariant.id}-${merayEffect}`}
          className="hero-meray-title font-thunder font-bold text-white leading-[0.82] tracking-tighter uppercase select-none drop-shadow-2xl scale-y-110 my-0 inline-block"
        >
          <AnimatedMerayWord effect={merayEffect} />
        </h1>

        {/* Row 2 outline: directly BELOW MERAY (passes behind cap/person) */}
        <div className="w-full mt-[-4px] overflow-hidden">
          <DriftingOutlineRow
            word={activeVariant.words[1]}
            audienceId={activeVariant.id}
            direction="right"
            delay={120}
            className="text-[20vw] sm:text-[22vw]"
            effect={outlineEffect}
          />
        </div>

        {/* Row 3 outline: directly BELOW Row 2 (passes behind person) */}
        <div className="w-full -mt-1 overflow-hidden">
          <DriftingOutlineRow
            word={activeVariant.words[2]}
            audienceId={activeVariant.id}
            direction="left"
            delay={240}
            className="text-[20vw] sm:text-[22vw]"
            effect={outlineEffect}
          />
        </div>
      </div>

      {/* =========================================================================
          Layer 4 (z-20): Centered Person Picture with Stacked Transitions
          During transition: OLD and NEW images stacked (absolute, same size & position)
          Zero blank frame, removes old when finished.
         ========================================================================= */}
      <div className="absolute left-0 right-0 bottom-0 z-20 pointer-events-none w-full aspect-[2/3] h-auto md:aspect-auto md:inset-0 md:h-[80dvh] md:my-auto md:flex md:items-end md:justify-center overflow-visible">
        {/* Old (outgoing) Image Layer */}
        {isTransitioning && prevVariant && (
          <div
            className="absolute inset-0 w-full h-full block md:flex md:items-end md:justify-center"
            style={activeTransitionDef.oldStyle}
          >
            <picture className="w-full h-full block md:flex md:items-end md:justify-center">
              <source media="(max-width: 767px)" srcSet={prevVariant.phoneImage} />
              <img
                src={prevVariant.image}
                alt={`Meray Hair Salon — ${prevVariant.label}`}
                className="w-full h-full block object-contain object-bottom md:w-auto md:h-full md:max-w-[70vw] md:object-contain md:object-bottom select-none pointer-events-none hero-person-img"
              />
            </picture>
          </div>
        )}

        {/* New (incoming) Image Layer */}
        <div
          key={activeVariant.id}
          className="w-full h-full block md:flex md:items-end md:justify-center"
          style={
            isTransitioning
              ? activeTransitionDef.newStyle(transitionOrigin.originX, transitionOrigin.originY)
              : { opacity: 1 }
          }
        >
          <picture className="w-full h-full block md:flex md:items-end md:justify-center">
            <source media="(max-width: 767px)" srcSet={activeVariant.phoneImage} />
            <img
              src={activeVariant.image}
              alt={`Meray Hair Salon — ${activeVariant.label}`}
              className="w-full h-full block object-contain object-bottom md:w-auto md:h-full md:max-w-[70vw] md:object-contain md:object-bottom select-none pointer-events-none hero-person-img"
            />
          </picture>
        </div>
      </div>

      {/* =========================================================================
          Layer 5 (z-30): UI Overlay Controls
         ========================================================================= */}
      <div className="absolute inset-0 z-30 flex flex-col justify-between pointer-events-none">
        {/* Top Section: Header only */}
        <div className="p-4 sm:p-6 pb-0 md:px-16 md:py-10">
          <div className="pointer-events-auto relative z-50">
            <Header />
          </div>
        </div>

        <div className="flex-grow" />

        {/* Bottom Section:
            Mobile: Stacked centered over the black cape area:
              a) ColorSelector with white progress ring
              b) Description (max 2 lines, text-[13px]) with blur-to-sharp fade
              c) Book Now button
            Desktop: Original 3-column grid
        */}
        <div className="w-full pt-16 pb-5 px-4 bg-gradient-to-t from-black/85 via-black/55 to-transparent md:bg-none md:p-6 md:px-16 md:py-10">
          {/* Mobile Bottom Layout (< 768px): Stacked & Centered over cape */}
          <div className="md:hidden flex flex-col items-center text-center gap-2 max-w-sm mx-auto pointer-events-auto">
            {/* a) "SELECT STYLE FOR" label + glass dot pill with progress ring */}
            <ColorSelector
              currentVariant={activeVariant}
              onSelect={triggerSwitch}
              progress={progress}
            />

            {/* b) description text with blur-to-sharp fade up */}
            <p
              key={`mobile-desc-${activeVariant.id}`}
              className="text-[13px] font-mina font-normal leading-snug line-clamp-2 text-white/95 max-w-[320px] drop-shadow-md px-1 mt-0.5 animate-hero-fade-up"
            >
              {activeVariant.description}
            </p>

            {/* c) BOOK NOW white pill button */}
            <Link
              to={`/book?for=${activeVariant.id}`}
              className="bg-white text-black text-xs font-bold py-2.5 px-10 rounded-full uppercase tracking-wider hover:bg-gray-100 transition-all shadow-xl font-trade inline-block mt-0.5"
            >
              Book Now
            </Link>
          </div>

          {/* Desktop Bottom Layout (>= 768px): Original 3-column grid */}
          <div className="hidden md:grid md:grid-cols-3 items-center md:items-end gap-6 md:gap-8 pb-1 md:pb-0">
            {/* Left: Audience Category & Starting Price with blur-to-sharp */}
            <div
              key={`desktop-left-${activeVariant.id}`}
              className="text-white text-left pointer-events-auto font-thunder z-40 animate-hero-fade-up"
            >
              <h2 className="text-4xl md:text-5xl font-bold uppercase tracking-tight mb-0 leading-none scale-y-110 origin-left drop-shadow-md">
                {activeVariant.label}
              </h2>
              <div className="flex items-baseline gap-2 mt-2">
                <span className="text-white/70 text-xs md:text-sm font-trade font-medium tracking-widest uppercase">
                  STARTING FROM
                </span>
                <span className="text-2xl md:text-3xl font-bold text-white font-thunder">
                  ${activeVariant.priceFrom}
                </span>
              </div>
            </div>

            {/* Center: Style Selector with progress ring */}
            <div className="flex justify-center pointer-events-auto z-40">
              <ColorSelector
                currentVariant={activeVariant}
                onSelect={triggerSwitch}
                progress={progress}
              />
            </div>

            {/* Right: Description & Action Button with blur-to-sharp */}
            <div
              key={`desktop-right-${activeVariant.id}`}
              className="text-white text-right flex flex-col items-end pointer-events-auto z-40 animate-hero-fade-up"
            >
              <p className="text-sm md:text-base font-mina font-normal text-white/90 max-w-sm mb-4 leading-relaxed drop-shadow-md">
                {activeVariant.description}
              </p>
              <div className="flex items-center gap-3">
                <Link
                  to={`/services?for=${activeVariant.id}`}
                  className="text-white/80 hover:text-white text-xs font-bold uppercase tracking-wider px-4 py-2 border border-white/20 rounded-full hover:bg-white/10 transition-all font-trade"
                >
                  View Services
                </Link>
                <Link
                  to={`/book?for=${activeVariant.id}`}
                  className="bg-white text-black text-xs md:text-sm font-bold py-2.5 px-6 md:px-8 rounded-full uppercase tracking-wider hover:bg-gray-100 transition-all shadow-xl font-trade inline-block"
                >
                  Book Appointment
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
