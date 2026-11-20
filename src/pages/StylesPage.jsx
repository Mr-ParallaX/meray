import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { X, ArrowRight, Sparkles } from 'lucide-react';
import Layout from '../components/Layout';
import AudiencePill from '../components/AudiencePill';
import RevealOnScroll from '../components/RevealOnScroll';
import { useAudience } from '../context/AudienceContext';
import { useSEO } from '../hooks/useSEO';

const StylesPage = () => {
  const { activeAudience } = useAudience();
  const [selectedStyle, setSelectedStyle] = useState(null);

  useSEO({
    title: `Styles Lookbook — ${activeAudience.label}`,
    description: `Explore trending cuts, color blends, and signature hairstyles for ${activeAudience.label} at Meray Hair Salon.`
  });

  const styles = activeAudience.styles;

  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-6 md:px-16 py-16 md:py-24">
        {/* Header Bar */}
        <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-6 pb-12 border-b border-white/10">
          <div>
            <span className="text-white/60 font-mono text-xs tracking-widest uppercase block mb-3">
              CURATED INSPIRATION LOOKBOOK
            </span>
            <h1 className="text-5xl md:text-8xl font-thunder font-bold uppercase tracking-tighter leading-none">
              Signature <span className="text-stroke">Styles</span>
            </h1>
          </div>
          <AudiencePill />
        </div>

        <p className="text-gray-400 font-sans text-lg max-w-2xl mt-8 mb-12">
          Click any style to view detailed consultation notes, technique breakdowns, and instantly reserve your appointment with our master stylists.
        </p>

        {/* Lookbook Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {styles.map((style, idx) => (
            <RevealOnScroll key={`${activeAudience.id}-${style.title}`} delay={idx * 150}>
              <div
                onClick={() => setSelectedStyle(style)}
                className="group relative h-[480px] rounded-2xl overflow-hidden cursor-pointer border border-white/10 hover:border-white/40 transition-all duration-500 shadow-2xl"
              >
                <div
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105 grayscale group-hover:grayscale-0"
                  style={{ backgroundImage: `url(${style.image})` }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent opacity-80 group-hover:opacity-60 transition-opacity" />

                <div className="absolute top-6 left-6 z-10">
                  <span className="text-stroke font-thunder text-4xl font-bold opacity-50 group-hover:opacity-100 transition-opacity">
                    0{idx + 1}
                  </span>
                </div>

                <div className="absolute bottom-6 left-6 right-6 z-10 flex flex-col justify-end">
                  <span
                    className="font-mono text-xs tracking-widest uppercase mb-1"
                    style={{ color: "var(--accent)" }}
                  >
                    {style.subtitle}
                  </span>
                  <h3 className="text-3xl md:text-4xl font-thunder font-bold text-white uppercase tracking-tight">
                    {style.title}
                  </h3>
                  <div className="mt-3 flex items-center gap-2 text-white/80 group-hover:text-white text-xs font-trade uppercase tracking-wider">
                    <span>View consultation spec</span>
                    <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                  </div>
                </div>
              </div>
            </RevealOnScroll>
          ))}
        </div>

        {/* Modal for Style Detail */}
        {selectedStyle && (
          <div className="fixed inset-0 z-[120] bg-black/90 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 animate-person-fade-in-up">
            <div className="relative w-full max-w-3xl bg-neutral-900 border border-white/20 rounded-2xl overflow-hidden shadow-2xl flex flex-col md:flex-row">
              <button
                onClick={() => setSelectedStyle(null)}
                className="absolute top-4 right-4 z-20 p-2 rounded-full bg-black/60 text-white hover:bg-black"
                aria-label="Close Modal"
              >
                <X className="w-6 h-6" />
              </button>

              <div
                className="w-full md:w-1/2 h-72 md:h-auto bg-cover bg-center"
                style={{ backgroundImage: `url(${selectedStyle.image})` }}
              />

              <div className="w-full md:w-1/2 p-8 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <Sparkles className="w-4 h-4" style={{ color: "var(--accent)" }} />
                    <span
                      className="font-mono text-xs tracking-widest uppercase font-bold"
                      style={{ color: "var(--accent)" }}
                    >
                      {selectedStyle.subtitle}
                    </span>
                  </div>
                  <h2 className="text-4xl font-thunder font-bold text-white uppercase tracking-tight mb-4">
                    {selectedStyle.title}
                  </h2>
                  <p className="text-gray-300 font-sans text-sm md:text-base leading-relaxed">
                    {selectedStyle.desc || "A custom tailored cut and finish designed to accentuate natural head contours and frame face geometry."}
                  </p>
                </div>

                <div className="pt-8 mt-6 border-t border-white/10 flex flex-col gap-3">
                  <Link
                    to={`/book?for=${activeAudience.id}&style=${selectedStyle.id || selectedStyle.title}`}
                    className="w-full py-4 rounded-full bg-white text-black font-trade font-bold text-center uppercase tracking-wider hover:bg-gray-200 transition-colors shadow-lg"
                  >
                    Book This Style Now
                  </Link>
                  <button
                    onClick={() => setSelectedStyle(null)}
                    className="w-full py-2 text-center text-xs font-mono uppercase text-gray-400 hover:text-white"
                  >
                    Close & Keep Browsing
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default StylesPage;
