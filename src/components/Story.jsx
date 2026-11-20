import React from 'react';
import { Link } from 'react-router-dom';
import RevealOnScroll from './RevealOnScroll';
import { useAudience } from '../context/AudienceContext';

const Story = () => {
  const { activeAudience, AUDIENCES } = useAudience();
  const audienceIndex = AUDIENCES.findIndex(a => a.id === activeAudience.id) + 1;
  const bgPhoto = activeAudience.styles[0]?.image || "https://images.unsplash.com/photo-1585747860715-2ba37e788b70?auto=format&fit=crop&w=1600&q=75";

  return (
    <section className="bg-white py-20 md:py-0 relative overflow-hidden flex flex-col justify-center">
      {/* Tilted Marquee Ribbon */}
      <div
        className="w-full py-6 md:py-10 rotate-1 scale-110 border-y-4 shadow-2xl z-20 bg-black text-white"
        style={{ borderColor: "var(--accent)" }}
      >
        <div className="flex animate-marquee whitespace-nowrap">
          {[...Array(10)].map((_, idx) => (
            <span
              key={idx}
              className="text-4xl md:text-7xl font-thunder font-bold text-white uppercase tracking-wider mx-8 md:mx-16 italic"
            >
              {activeAudience.marqueeText}{" "}
              <span className="text-transparent text-stroke-strong mx-4">
                ///
              </span>{" "}
              MERAY
            </span>
          ))}
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="max-w-7xl mx-auto px-6 md:px-16 py-24 md:py-40 grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
        <RevealOnScroll>
          <div>
            <h2 className="text-black text-6xl md:text-9xl font-thunder font-bold uppercase leading-[0.85] tracking-tighter mb-8">
              {activeAudience.storyHeading[0]} <br />
              <span className="text-gray-500">{activeAudience.storyHeading[1]}</span> <br />
              {activeAudience.storyHeading[2]}
            </h2>
            <p className="text-xl md:text-2xl font-sans text-gray-800 leading-relaxed max-w-md border-l-4 border-black pl-6">
              {activeAudience.storyText}
            </p>
            <Link
              to={`/about?for=${activeAudience.id}`}
              className="mt-10 inline-block px-10 py-4 bg-black text-white font-trade font-bold uppercase tracking-widest hover:bg-neutral-800 transition-colors shadow-lg"
            >
              About Meray
            </Link>
          </div>
        </RevealOnScroll>

        <RevealOnScroll delay={200}>
          <div className="relative h-[50vh] md:h-[70vh] w-full bg-gray-100 rounded-lg overflow-hidden flex items-center justify-center group shadow-2xl">
            <div
              className="absolute inset-0 bg-cover bg-center grayscale group-hover:grayscale-0 transition-all duration-700 opacity-40 scale-105 group-hover:scale-100"
              style={{ backgroundImage: `url(${bgPhoto})` }}
            />
            <img
              key={activeAudience.id}
              src={activeAudience.image}
              alt={`Meray ${activeAudience.name}`}
              className="relative z-10 h-[80%] max-w-[85%] object-contain object-bottom drop-shadow-2xl animate-float"
            />
            <div className="absolute bottom-6 left-6 z-20">
              <span className="block text-6xl font-thunder font-bold text-black">
                0{audienceIndex}
              </span>
              <span className="block text-sm font-bold uppercase tracking-widest text-black/70">
                {activeAudience.name} Edition
              </span>
            </div>
          </div>
        </RevealOnScroll>
      </div>
    </section>
  );
};

export default Story;
