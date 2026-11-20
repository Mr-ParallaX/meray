import React from 'react';
import { Star } from 'lucide-react';
import RevealOnScroll from './RevealOnScroll';
import { useAudience } from '../context/AudienceContext';

const Testimonial = () => {
  const { activeAudience } = useAudience();

  return (
    <section className="bg-white py-32 px-6 relative flex items-center justify-center overflow-hidden">
      {/* Huge quote mark in background */}
      <div className="absolute right-0 top-1/2 -translate-y-1/2 opacity-5 font-thunder text-[40vw] leading-none select-none pointer-events-none text-black">
        "
      </div>

      <div className="max-w-5xl mx-auto text-center relative z-10">
        <RevealOnScroll>
          <div className="flex justify-center gap-1 mb-8">
            {[...Array(5)].map((_, idx) => (
              <Star key={idx} className="w-6 h-6 fill-black text-black" />
            ))}
          </div>
        </RevealOnScroll>

        <RevealOnScroll delay={100}>
          <h2 className="text-4xl md:text-7xl font-thunder font-bold uppercase leading-[0.9] tracking-tighter mb-12 text-black max-w-4xl mx-auto">
            "Your review could be here — guest reviews coming soon for{" "}
            <span className="inline-block px-3 py-1 bg-black text-white transform -skew-x-12 mx-2">
              {activeAudience.label}
            </span>
            ."
          </h2>
        </RevealOnScroll>

        <RevealOnScroll delay={200}>
          <div className="flex flex-col items-center gap-2">
            <div className="w-16 h-16 bg-neutral-900 text-white rounded-full mb-2 flex items-center justify-center font-thunder font-bold text-2xl border-2 border-black">
              M
            </div>
            <span className="text-black font-bold uppercase tracking-widest text-sm">
              Meray Guest
            </span>
            <span className="text-gray-500 font-sans text-xs">
              Mt Prospect, IL • Real Reviews Loading in Phase 3
            </span>
          </div>
        </RevealOnScroll>
      </div>
    </section>
  );
};

export default Testimonial;
