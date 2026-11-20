import React from 'react';
import { Link } from 'react-router-dom';
import { Scissors, Sparkles, Wind, Zap, Crown, Palette, Layers, ArrowRight } from 'lucide-react';
import RevealOnScroll from './RevealOnScroll';
import { useAudience } from '../context/AudienceContext';

const iconMap = {
  Scissors: <Scissors className="w-8 h-8 md:w-12 md:h-12 text-white" />,
  Sparkles: <Sparkles className="w-8 h-8 md:w-12 md:h-12 text-white" />,
  Wind: <Wind className="w-8 h-8 md:w-12 md:h-12 text-white" />,
  Zap: <Zap className="w-8 h-8 md:w-12 md:h-12 text-white" />,
  Crown: <Crown className="w-8 h-8 md:w-12 md:h-12 text-white" />,
  Palette: <Palette className="w-8 h-8 md:w-12 md:h-12 text-white" />,
  Layers: <Layers className="w-8 h-8 md:w-12 md:h-12 text-white" />,
};

const TechSpecs = () => {
  const { activeAudience } = useAudience();
  const topServices = activeAudience.services.slice(0, 3);

  return (
    <section className="bg-neutral-900 py-24 md:py-32 px-6 md:px-16 relative overflow-hidden">
      {/* Background large decorative text */}
      <div className="absolute top-0 right-0 w-full h-full opacity-10 pointer-events-none">
        <h2 className="text-[20vw] font-thunder text-white font-bold leading-none absolute -right-16 top-20 text-stroke">
          CUT
        </h2>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="mb-16 md:mb-24 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <RevealOnScroll>
            <span className="text-white/60 font-mono text-xs tracking-widest uppercase block mb-3">
              SIGNATURE SERVICES
            </span>
            <h2 className="text-white text-5xl md:text-8xl font-thunder font-bold uppercase tracking-tighter mb-4">
              {activeAudience.tagline.split(' ')[0]} <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-gray-300 via-white to-gray-400">
                {activeAudience.tagline.split(' ').slice(1).join(' ')}
              </span>
            </h2>
            <div className="w-24 h-1 bg-white" />
          </RevealOnScroll>

          <RevealOnScroll delay={150}>
            <Link
              to={`/services?for=${activeAudience.id}`}
              className="inline-flex items-center gap-2 text-white font-trade font-bold text-lg uppercase tracking-wider hover:text-gray-300 transition-colors group"
            >
              <span>View All Services</span>
              <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-2" />
            </Link>
          </RevealOnScroll>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
          {topServices.map((service, idx) => {
            const icon = iconMap[service.icon] || iconMap.Scissors;
            return (
              <RevealOnScroll key={`${activeAudience.id}-${service.id}`} delay={idx * 150}>
                <div className="group p-8 border border-white/10 bg-white/5 backdrop-blur-sm rounded-2xl hover:bg-white/10 transition-all duration-300 hover:-translate-y-2 flex flex-col justify-between h-full">
                  <div>
                    <div className="mb-6 bg-white/10 w-16 h-16 md:w-20 md:h-20 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      {icon}
                    </div>
                    <div className="flex items-center justify-between gap-2 mb-2">
                      <h3 className="text-2xl md:text-3xl font-thunder text-white font-bold uppercase tracking-wide">
                        {service.name}
                      </h3>
                    </div>
                    <p className="text-gray-400 font-sans text-base leading-relaxed mb-6">
                      {service.desc}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-white/10 flex items-center justify-between">
                    <div className="flex flex-col">
                      <span className="text-white font-thunder text-2xl font-bold">
                        ${service.price}
                      </span>
                      <span className="text-gray-400 font-mono text-xs">
                        {service.durationMin} mins
                      </span>
                    </div>
                    <Link
                      to={`/book?for=${activeAudience.id}&service=${service.id}`}
                      className="px-5 py-2 rounded-full bg-white/10 text-white font-trade font-bold text-xs uppercase tracking-wider hover:bg-white hover:text-black transition-all"
                    >
                      Book
                    </Link>
                  </div>
                </div>
              </RevealOnScroll>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default TechSpecs;
