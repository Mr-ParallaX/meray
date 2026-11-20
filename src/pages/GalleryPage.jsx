import React, { useState } from 'react';
import { X, ChevronLeft, ChevronRight, Eye } from 'lucide-react';
import Layout from '../components/Layout';
import AudiencePill from '../components/AudiencePill';
import RevealOnScroll from '../components/RevealOnScroll';
import { useAudience } from '../context/AudienceContext';
import { useSEO } from '../hooks/useSEO';
import { SALON_INTERIOR_IMAGES, BEFORE_AFTER_PAIRS } from '../data/audiences';

const GalleryPage = () => {
  const { activeAudience, AUDIENCES } = useAudience();
  const [filter, setFilter] = useState("all");
  const [lightboxIdx, setLightboxIdx] = useState(null);

  useSEO({
    title: `Salon Gallery & Transformations — Meray Hair Salon`,
    description: "Browse high-resolution photographs of real guest transformations, haircut details, color melts, and the luxury Meray salon environment."
  });

  // Build gallery items
  const galleryItems = [
    ...AUDIENCES.flatMap(a => a.styles.map(s => ({
      src: s.image,
      title: s.title,
      category: a.id,
      audienceLabel: a.label
    }))),
    ...SALON_INTERIOR_IMAGES.map((src, i) => ({
      src,
      title: `Meray Salon Station ${i + 1}`,
      category: "interior",
      audienceLabel: "Salon Interior"
    }))
  ];

  const filteredItems = filter === "all"
    ? galleryItems
    : filter === "interior"
      ? galleryItems.filter(item => item.category === "interior")
      : galleryItems.filter(item => item.category === filter);

  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-6 md:px-16 py-16 md:py-24">
        {/* Header Bar */}
        <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-6 pb-12 border-b border-white/10">
          <div>
            <span className="text-white/60 font-mono text-xs tracking-widest uppercase block mb-3">
              VISUAL PORTFOLIO & ATMOSPHERE
            </span>
            <h1 className="text-5xl md:text-8xl font-thunder font-bold uppercase tracking-tighter leading-none">
              Photo <span className="text-stroke">Gallery</span>
            </h1>
          </div>
          <AudiencePill />
        </div>

        {/* Filters */}
        <div className="flex items-center gap-2 overflow-x-auto py-8 no-scrollbar">
          {[
            { id: "all", label: "All Works" },
            { id: "men", label: "Men's Cuts" },
            { id: "women", label: "Women's Salon" },
            { id: "girl", label: "Girls' Styles" },
            { id: "boy", label: "Boys' Cuts" },
            { id: "interior", label: "Salon Interior" }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setFilter(tab.id)}
              className={`px-5 py-2 rounded-full text-xs font-thunder font-bold tracking-wider uppercase transition-all whitespace-nowrap ${
                filter === tab.id
                  ? "bg-white text-black shadow-lg scale-105"
                  : "bg-white/5 text-white/70 hover:bg-white/10 hover:text-white border border-white/10"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Gallery Masonry-like Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map((item, idx) => (
            <RevealOnScroll key={`${item.src}-${idx}`} delay={idx * 60}>
              <div
                onClick={() => setLightboxIdx(idx)}
                className="group relative h-80 rounded-xl overflow-hidden cursor-pointer border border-white/10 hover:border-white/40 transition-all duration-300 shadow-xl"
              >
                <img
                  src={item.src}
                  alt={item.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-between p-6">
                  <span className="self-end p-2 rounded-full bg-black/60 text-white">
                    <Eye className="w-5 h-5" />
                  </span>
                  <div>
                    <span className="font-mono text-xs uppercase tracking-wider block text-white/70">
                      {item.audienceLabel}
                    </span>
                    <h3 className="font-thunder text-2xl font-bold uppercase text-white">
                      {item.title}
                    </h3>
                  </div>
                </div>
              </div>
            </RevealOnScroll>
          ))}
        </div>

        {/* Lightbox Modal */}
        {lightboxIdx !== null && (
          <div className="fixed inset-0 z-[150] bg-black/95 backdrop-blur-xl flex items-center justify-center p-4">
            <button
              onClick={() => setLightboxIdx(null)}
              className="absolute top-6 right-6 p-3 rounded-full bg-white/10 text-white hover:bg-white/20 z-10"
              aria-label="Close Lightbox"
            >
              <X className="w-7 h-7" />
            </button>

            <button
              onClick={() => setLightboxIdx((lightboxIdx - 1 + filteredItems.length) % filteredItems.length)}
              className="absolute left-6 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/10 text-white hover:bg-white/20 z-10"
              aria-label="Previous Photo"
            >
              <ChevronLeft className="w-8 h-8" />
            </button>

            <button
              onClick={() => setLightboxIdx((lightboxIdx + 1) % filteredItems.length)}
              className="absolute right-6 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/10 text-white hover:bg-white/20 z-10"
              aria-label="Next Photo"
            >
              <ChevronRight className="w-8 h-8" />
            </button>

            <div className="max-w-5xl max-h-[85vh] flex flex-col items-center">
              <img
                src={filteredItems[lightboxIdx]?.src}
                alt={filteredItems[lightboxIdx]?.title}
                className="max-h-[75vh] w-auto max-w-full rounded-lg object-contain shadow-2xl"
              />
              <div className="mt-4 text-center">
                <h3 className="font-thunder text-3xl font-bold text-white uppercase">
                  {filteredItems[lightboxIdx]?.title}
                </h3>
                <p className="font-mono text-xs text-white/60 tracking-widest uppercase">
                  {filteredItems[lightboxIdx]?.audienceLabel} • Photo {lightboxIdx + 1} of {filteredItems.length}
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default GalleryPage;
