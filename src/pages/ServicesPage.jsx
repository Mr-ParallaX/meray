import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Scissors, Sparkles, Wind, Zap, Crown, Palette, Layers, ArrowRight } from 'lucide-react';
import Layout from '../components/Layout';
import AudiencePill from '../components/AudiencePill';
import RevealOnScroll from '../components/RevealOnScroll';
import { useAudience } from '../context/AudienceContext';
import { useSEO } from '../hooks/useSEO';

const iconMap = {
  Scissors: <Scissors className="w-6 h-6" />,
  Sparkles: <Sparkles className="w-6 h-6" />,
  Wind: <Wind className="w-6 h-6" />,
  Zap: <Zap className="w-6 h-6" />,
  Crown: <Crown className="w-6 h-6" />,
  Palette: <Palette className="w-6 h-6" />,
  Layers: <Layers className="w-6 h-6" />,
};

const ServicesPage = () => {
  const { activeAudience } = useAudience();
  const [selectedCategory, setSelectedCategory] = useState("All");

  useSEO({
    title: `Services & Pricing — ${activeAudience.label}`,
    description: `Complete menu of services and transparent pricing for ${activeAudience.label} at Meray Hair Salon in Mt Prospect, IL.`
  });

  const allServices = activeAudience.services;
  const categories = ["All", ...new Set(allServices.map(s => s.category))];

  const filteredServices = selectedCategory === "All"
    ? allServices
    : allServices.filter(s => s.category === selectedCategory);

  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-6 md:px-16 py-16 md:py-24">
        {/* Header Bar */}
        <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-6 pb-12 border-b border-white/10">
          <div>
            <span className="text-white/60 font-mono text-xs tracking-widest uppercase block mb-3">
              PRICE LIST & APPOINTMENT MENU
            </span>
            <h1 className="text-5xl md:text-8xl font-thunder font-bold uppercase tracking-tighter leading-none">
              Services <span className="text-stroke">Menu</span>
            </h1>
          </div>
          <AudiencePill />
        </div>

        {/* Category Filters */}
        <div className="flex items-center gap-2 overflow-x-auto py-8 no-scrollbar">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-5 py-2 rounded-full text-xs font-thunder font-bold tracking-wider uppercase transition-all whitespace-nowrap ${
                selectedCategory === cat
                  ? "bg-white text-black shadow-lg scale-105"
                  : "bg-white/5 text-white/70 hover:bg-white/10 hover:text-white border border-white/10"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Service Rows */}
        <div className="space-y-4 pt-4">
          {filteredServices.map((service, idx) => {
            const icon = iconMap[service.icon] || iconMap.Scissors;
            return (
              <RevealOnScroll key={service.id} delay={idx * 50}>
                <div className="group p-6 md:p-8 bg-neutral-900/60 hover:bg-neutral-800/80 border border-white/10 rounded-2xl transition-all duration-300 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 hover:border-white/30">
                  <div className="flex items-start gap-5">
                    <div
                      className="p-3 rounded-full bg-white/5 text-white group-hover:scale-110 transition-transform"
                      style={{ color: "var(--accent)" }}
                    >
                      {icon}
                    </div>
                    <div>
                      <div className="flex items-center gap-3">
                        <h3 className="text-2xl md:text-3xl font-thunder font-bold text-white uppercase tracking-wide">
                          {service.name}
                        </h3>
                        <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/10 text-white/60 uppercase">
                          {service.category}
                        </span>
                      </div>
                      <p className="text-gray-400 font-sans text-sm md:text-base leading-relaxed mt-2 max-w-2xl">
                        {service.desc}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between w-full md:w-auto md:justify-end gap-6 pt-4 md:pt-0 border-t md:border-t-0 border-white/10">
                    <div className="text-left md:text-right">
                      <div className="text-3xl font-thunder font-bold text-white">
                        ${service.price}
                      </div>
                      <div className="text-xs font-mono text-gray-400">
                        approx. {service.durationMin} mins
                      </div>
                    </div>
                    <Link
                      to={`/book?for=${activeAudience.id}&service=${service.id}`}
                      className="px-8 py-3 rounded-full bg-white text-black font-trade font-bold text-xs uppercase tracking-wider hover:bg-gray-200 transition-all flex items-center gap-2 group-hover:scale-105 shadow-md"
                    >
                      <span>Book</span>
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                </div>
              </RevealOnScroll>
            );
          })}
        </div>

        {/* Note on Prices */}
        <div className="mt-16 p-6 rounded-xl border border-dashed border-white/15 bg-white/5 text-center">
          <p className="font-mono text-xs text-white/60 tracking-wider uppercase">
            * Prices are subject to consultation based on hair density, length, and specialized coloring technique requirements.
          </p>
        </div>
      </div>
    </Layout>
  );
};

export default ServicesPage;
