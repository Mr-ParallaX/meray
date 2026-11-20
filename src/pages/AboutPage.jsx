import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Phone, Award, Sparkles, Scissors, Clock } from 'lucide-react';
import Layout from '../components/Layout';
import RevealOnScroll from '../components/RevealOnScroll';
import { useAudience } from '../context/AudienceContext';
import { SITE_CONFIG } from '../config/site';
import { SALON_INTERIOR_IMAGES } from '../data/audiences';
import { useSEO } from '../hooks/useSEO';

const AboutPage = () => {
  const { activeAudience } = useAudience();

  useSEO({
    title: "About Us & Craft Philosophy — Meray Hair Salon",
    description: "Learn about Meray Hair Salon in Mt Prospect, IL. Our heritage, experienced barbers and stylists, and commitment to precision grooming."
  });

  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-6 md:px-16 py-16 md:py-24">
        {/* Header Bar */}
        <div className="pb-12 border-b border-white/10">
          <span className="text-white/60 font-mono text-xs tracking-widest uppercase block mb-3">
            ESTABLISHED IN MT PROSPECT, ILLINOIS
          </span>
          <h1 className="text-5xl md:text-8xl font-thunder font-bold uppercase tracking-tighter leading-none">
            The Meray <span className="text-stroke">Story</span>
          </h1>
        </div>

        {/* Story Intro Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 items-center py-16">
          <RevealOnScroll>
            <div className="space-y-6 text-gray-300 font-sans text-lg leading-relaxed">
              <p className="text-white font-thunder text-3xl uppercase font-bold tracking-tight leading-snug">
                "We built Meray Hair Salon around a simple premise: every client who sits in our chair deserves uncompromising craftsmanship, authentic hospitality, and a look that commands respect."
              </p>
              <p>
                Conveniently located at 1582 Busse Rd in Mt Prospect, IL, Meray brings together classical European barbershop traditions with contemporary American salon styling. Whether you are coming in for an ultra-clean razor skin fade, a sun-kissed balayage blend, a rejuvenating blowout, or your son’s first fade, our chairs are dedicated to your comfort and confidence.
              </p>
              <p>
                Our shop is designed to be your neighborhood grooming sanctuary: clean lines, state-of-the-art barber chairs, professional ventilation, and relaxing music.
              </p>
            </div>
          </RevealOnScroll>

          <RevealOnScroll delay={200}>
            <div className="relative rounded-2xl overflow-hidden border border-white/15 shadow-2xl h-[440px]">
              <img
                src={SALON_INTERIOR_IMAGES[0]}
                alt="Meray Hair Salon Interior"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-60" />
              <div className="absolute bottom-6 left-6 right-6">
                <span className="font-mono text-xs text-white/70 uppercase tracking-widest block">
                  1582 Busse Rd, Mt Prospect, IL
                </span>
                <span className="font-thunder text-2xl font-bold uppercase text-white">
                  State-of-the-Art Styling Stations
                </span>
              </div>
            </div>
          </RevealOnScroll>
        </div>

        {/* Pillars / Values */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 py-16 border-t border-b border-white/10">
          <RevealOnScroll delay={0}>
            <div className="p-8 bg-neutral-900 border border-white/10 rounded-2xl">
              <Scissors className="w-10 h-10 mb-4" style={{ color: "var(--accent)" }} />
              <h3 className="font-thunder text-3xl font-bold uppercase text-white mb-2">
                Pinpoint Precision
              </h3>
              <p className="text-gray-400 font-sans text-sm leading-relaxed">
                We calibrate scissors and clippers to your hair density, cowlicks, and head shape. No rushed cuts; only deliberate artistry.
              </p>
            </div>
          </RevealOnScroll>

          <RevealOnScroll delay={150}>
            <div className="p-8 bg-neutral-900 border border-white/10 rounded-2xl">
              <Sparkles className="w-10 h-10 mb-4" style={{ color: "var(--accent)" }} />
              <h3 className="font-thunder text-3xl font-bold uppercase text-white mb-2">
                Premium Formulations
              </h3>
              <p className="text-gray-400 font-sans text-sm leading-relaxed">
                We use ammonia-free European color creams, botanical cleansing masques, and skin-calming aftershave tonics.
              </p>
            </div>
          </RevealOnScroll>

          <RevealOnScroll delay={300}>
            <div className="p-8 bg-neutral-900 border border-white/10 rounded-2xl">
              <Award className="w-10 h-10 mb-4" style={{ color: "var(--accent)" }} />
              <h3 className="font-thunder text-3xl font-bold uppercase text-white mb-2">
                Family & Community
              </h3>
              <p className="text-gray-400 font-sans text-sm leading-relaxed">
                Dedicated specialized care for all generations: executive gentlemen, glamorous women, and patient, joyful styling for kids.
              </p>
            </div>
          </RevealOnScroll>
        </div>

        {/* Interior Photos Gallery */}
        <div className="py-20">
          <h2 className="font-thunder text-4xl md:text-6xl font-bold uppercase tracking-tight text-white mb-10 text-center">
            Inside the <span className="text-stroke">Shop</span>
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {SALON_INTERIOR_IMAGES.slice(1).map((src, i) => (
              <div key={i} className="h-64 rounded-xl overflow-hidden border border-white/10 shadow-lg">
                <img
                  src={src}
                  alt={`Meray Salon Interior ${i + 2}`}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                />
              </div>
            ))}
          </div>
        </div>

        {/* CTA Banner */}
        <div className="p-10 md:p-14 bg-neutral-900 border border-white/20 rounded-2xl flex flex-col md:flex-row items-center justify-between gap-8 text-center md:text-left shadow-2xl">
          <div>
            <h2 className="text-4xl md:text-5xl font-thunder font-bold uppercase text-white mb-2">
              Ready For Your Transformation?
            </h2>
            <p className="text-gray-400 font-sans text-base max-w-lg">
              Book your chair today or call us at (847) 258-3604 for any questions.
            </p>
          </div>
          <Link
            to={`/book?for=${activeAudience.id}`}
            className="px-10 py-4 bg-white text-black font-trade font-bold uppercase tracking-wider rounded-full hover:bg-gray-200 transition-all shadow-xl whitespace-nowrap"
          >
            Book Appointment
          </Link>
        </div>
      </div>
    </Layout>
  );
};

export default AboutPage;
