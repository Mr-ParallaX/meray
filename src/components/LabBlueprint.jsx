import React, { useState } from 'react';
import { PenTool, Layers, Ruler, Cpu } from 'lucide-react';
import RevealOnScroll from './RevealOnScroll';
import { useAudience } from '../context/AudienceContext';
import { BEFORE_AFTER_PAIRS } from '../data/audiences';

const stepIcons = [
  <PenTool className="w-8 h-8" />,
  <Layers className="w-8 h-8" />,
  <Ruler className="w-8 h-8" />,
  <Cpu className="w-8 h-8" />
];

const LabBlueprint = () => {
  const { activeAudience } = useAudience();
  const [sliderPos, setSliderPos] = useState(50); // 0 to 100 percentage

  // Pick before/after pair for active audience or fallback
  const pair = BEFORE_AFTER_PAIRS.find(p => p.audience === activeAudience.id) || BEFORE_AFTER_PAIRS[0];

  const handleSliderMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const clientX = e.clientX || (e.touches && e.touches[0].clientX);
    if (!clientX) return;
    const x = Math.max(0, Math.min(clientX - rect.left, rect.width));
    setSliderPos((x / rect.width) * 100);
  };

  return (
    <section className="bg-black py-32 px-6 md:px-16 relative overflow-hidden border-t border-white/10">
      {/* Blueprint grid background */}
      <div
        className="absolute inset-0 opacity-20 pointer-events-none"
        style={{
          backgroundImage: "radial-gradient(circle, #333 1px, transparent 1px)",
          backgroundSize: "40px 40px"
        }}
      />

      <div className="max-w-7xl mx-auto relative z-10">
        <RevealOnScroll>
          <div className="flex flex-col md:flex-row justify-between items-end mb-24 border-b border-white/20 pb-8">
            <div>
              <span className="text-white/60 font-mono mb-4 block tracking-widest text-xs uppercase">
                SECTION 03 — THE CHAIR
              </span>
              <h2 className="text-5xl md:text-7xl font-thunder font-bold text-white uppercase tracking-tighter leading-none">
                The Meray <span className="text-stroke">Process</span>
              </h2>
            </div>
            <p className="text-white/70 font-sans max-w-md mt-6 md:mt-0 text-right md:text-left">
              Every cut, angle, and hot towel is calculated. We blend timeless barber craft with modern styling to deliver your sharpest look.
            </p>
          </div>
        </RevealOnScroll>

        {/* 4 Process Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {activeAudience.process.map((step, idx) => (
            <RevealOnScroll key={`${activeAudience.id}-${step.code}`} delay={idx * 100}>
              <div className="bg-neutral-900/50 backdrop-blur-sm border border-white/10 p-8 group hover:border-white/40 transition-colors duration-300 relative overflow-hidden h-full">
                <div className="absolute top-4 right-4 text-xs font-mono text-white/30">
                  {step.code}
                </div>
                <div
                  className="text-white mb-6 transition-colors duration-300 group-hover:text-yellow-400"
                  style={{ color: "var(--accent)" }}
                >
                  {stepIcons[idx % stepIcons.length]}
                </div>
                <h3 className="text-white font-thunder text-3xl uppercase tracking-wide mb-3">
                  {step.title}
                </h3>
                <p className="text-neutral-400 text-sm leading-relaxed font-sans">
                  {step.desc}
                </p>
                <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-white/30" />
                <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-white/30" />
              </div>
            </RevealOnScroll>
          ))}
        </div>

        {/* Interactive Before & After Transformation Slider Box */}
        <RevealOnScroll delay={300}>
          <div className="mt-20 border border-dashed border-white/20 p-4 md:p-8 relative">
            <div className="flex items-center justify-between mb-4 px-2">
              <span className="text-xs font-mono text-white/60 tracking-widest uppercase">
                TRANSFORMATION SHOWCASE — {pair.title}
              </span>
              <span className="text-xs font-mono text-white/40 hidden sm:inline">
                DRAG OR MOVE TO COMPARE
              </span>
            </div>

            {/* Drag Container */}
            <div
              className="relative w-full h-72 md:h-[460px] overflow-hidden select-none cursor-ew-resize rounded-lg border border-white/10"
              onMouseMove={(e) => e.buttons === 1 && handleSliderMove(e)}
              onClick={handleSliderMove}
              onTouchMove={handleSliderMove}
            >
              {/* After Photo (Base) */}
              <img
                src={pair.after}
                alt="After Transformation"
                className="absolute inset-0 w-full h-full object-cover"
              />
              <span className="absolute bottom-4 right-4 bg-black/70 backdrop-blur-md px-3 py-1 text-xs font-mono uppercase text-white rounded border border-white/20">
                AFTER
              </span>

              {/* Before Photo (Clipped) */}
              <div
                className="absolute inset-0 overflow-hidden"
                style={{ width: `${sliderPos}%` }}
              >
                <img
                  src={pair.before}
                  alt="Before Transformation"
                  className="absolute inset-0 w-full h-full object-cover max-w-none"
                  style={{ width: "100%", height: "100%" }}
                />
                <span className="absolute bottom-4 left-4 bg-black/70 backdrop-blur-md px-3 py-1 text-xs font-mono uppercase text-white rounded border border-white/20">
                  BEFORE
                </span>
              </div>

              {/* Center Slider Divider & Handle */}
              <div
                className="absolute top-0 bottom-0 w-[2px] bg-white cursor-ew-resize shadow-[0_0_12px_rgba(255,255,255,0.8)]"
                style={{ left: `${sliderPos}%` }}
              >
                <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-black border-2 border-white flex items-center justify-center text-white text-[10px] font-bold shadow-xl">
                  ↔
                </div>
              </div>

              {/* Scanning laser line */}
              <div
                className="absolute top-0 bottom-0 left-0 w-[2px] blur-[2px] animate-marquee pointer-events-none"
                style={{
                  animationDuration: "3.5s",
                  backgroundColor: "var(--accent)"
                }}
              />
            </div>
            <p className="text-xs text-white/50 font-mono mt-3 px-2">
              {pair.caption}
            </p>
          </div>
        </RevealOnScroll>
      </div>
    </section>
  );
};

export default LabBlueprint;
