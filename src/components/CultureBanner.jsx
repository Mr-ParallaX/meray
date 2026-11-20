import React from 'react';
import { Link } from 'react-router-dom';
import RevealOnScroll from './RevealOnScroll';
import { useAudience } from '../context/AudienceContext';

const CultureBanner = () => {
  const { activeAudience } = useAudience();
  const styles = activeAudience.styles;

  return (
    <section className="bg-black py-0 relative h-[60vh] md:h-[80vh] flex flex-col md:flex-row overflow-hidden border-t border-b border-white/10">
      {styles.map((style, idx) => (
        <Link
          key={`${activeAudience.id}-${style.title}`}
          to={`/styles?for=${activeAudience.id}&style=${style.id || idx}`}
          className="relative flex-1 group hover:flex-[2] transition-all duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] overflow-hidden cursor-pointer border-b md:border-b-0 md:border-r border-black/40 block"
        >
          {/* Background Style Photo */}
          <div
            className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110 grayscale group-hover:grayscale-0"
            style={{ backgroundImage: `url(${style.image})` }}
          />

          {/* Vignette Overlay */}
          <div className="absolute inset-0 bg-black/55 group-hover:bg-black/20 transition-colors duration-500" />

          {/* Text Info */}
          <div className="absolute inset-0 flex flex-col justify-end p-8 md:p-12 opacity-85 group-hover:opacity-100 transition-opacity">
            <RevealOnScroll delay={idx * 150 + 200}>
              <span
                className="font-mono text-xs tracking-[0.2em] mb-2 block translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 delay-100 uppercase"
                style={{ color: "var(--accent)" }}
              >
                {style.subtitle}
              </span>
              <h2 className="text-white font-thunder text-4xl md:text-6xl uppercase tracking-tighter leading-none transform translate-y-0 group-hover:-translate-y-2 transition-transform duration-500">
                {style.title}
              </h2>
            </RevealOnScroll>
          </div>

          {/* Card Number */}
          <span className="absolute top-6 left-6 text-stroke text-4xl font-thunder opacity-30 group-hover:opacity-100 transition-opacity select-none">
            0{idx + 1}
          </span>
        </Link>
      ))}
    </section>
  );
};

export default CultureBanner;
