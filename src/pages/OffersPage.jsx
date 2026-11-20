import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Tag, Copy, Check, ArrowRight } from 'lucide-react';
import Layout from '../components/Layout';
import AudiencePill from '../components/AudiencePill';
import RevealOnScroll from '../components/RevealOnScroll';
import { useAudience } from '../context/AudienceContext';
import { useSEO } from '../hooks/useSEO';
import { OFFERS_DATA } from '../data/audiences';

const OffersPage = () => {
  const { activeAudience } = useAudience();
  const [copiedCode, setCopiedCode] = useState(null);

  useSEO({
    title: "Promotions & Special Offers — Meray Hair Salon",
    description: "Exclusive discounts, first-time client specials, and seasonal hair salon package deals at Meray Hair Salon in Mt Prospect, IL."
  });

  const handleCopy = (code) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    setTimeout(() => setCopiedCode(null), 2500);
  };

  const visibleOffers = OFFERS_DATA.filter(
    o => o.audience === "all" || o.audience === activeAudience.id
  );

  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-6 md:px-16 py-16 md:py-24">
        {/* Header Bar */}
        <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-6 pb-12 border-b border-white/10">
          <div>
            <span className="text-white/60 font-mono text-xs tracking-widest uppercase block mb-3">
              CLIENT APPRECIATION & DISCOUNTS
            </span>
            <h1 className="text-5xl md:text-8xl font-thunder font-bold uppercase tracking-tighter leading-none">
              Special <span className="text-stroke">Offers</span>
            </h1>
          </div>
          <AudiencePill />
        </div>

        <p className="text-gray-400 font-sans text-lg max-w-2xl mt-8 mb-12">
          Mention your promo code when you arrive at your appointment or enter it during online checkout.
        </p>

        {/* Offers Grid */}
        {visibleOffers.length === 0 ? (
          <div className="p-16 border border-dashed border-white/20 rounded-2xl text-center bg-white/5">
            <Tag className="w-12 h-12 text-white/40 mx-auto mb-4" />
            <h3 className="font-thunder text-3xl font-bold uppercase text-white mb-2">
              No Current Offers for {activeAudience.label}
            </h3>
            <p className="text-gray-400 font-sans text-sm max-w-md mx-auto mb-6">
              Check back soon or join the Meray Club below for immediate alerts on seasonal drops.
            </p>
            <Link
              to={`/services?for=${activeAudience.id}`}
              className="px-6 py-3 rounded-full bg-white text-black font-trade font-bold text-xs uppercase"
            >
              Browse Services
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {visibleOffers.map((offer, idx) => (
              <RevealOnScroll key={offer.id} delay={idx * 100}>
                <div className="bg-neutral-900 border border-white/15 rounded-2xl p-8 flex flex-col justify-between h-full hover:border-white/40 transition-colors shadow-2xl relative overflow-hidden group">
                  <div
                    className="absolute top-0 right-0 w-32 h-32 blur-3xl opacity-20 pointer-events-none"
                    style={{ backgroundColor: "var(--accent)" }}
                  />

                  <div>
                    <div className="flex items-center justify-between mb-6">
                      <span
                        className="px-3 py-1 rounded-full text-xs font-thunder font-bold uppercase tracking-wider text-black"
                        style={{ backgroundColor: "var(--accent)" }}
                      >
                        {offer.badge}
                      </span>
                      <span className="font-mono text-[10px] text-white/50 uppercase">
                        Exp: {offer.validUntil}
                      </span>
                    </div>

                    <h3 className="text-3xl font-thunder font-bold text-white uppercase tracking-tight mb-3">
                      {offer.title}
                    </h3>
                    <p className="text-gray-400 font-sans text-sm leading-relaxed mb-6">
                      {offer.description}
                    </p>
                  </div>

                  <div className="pt-6 border-t border-white/10 flex flex-col gap-3">
                    <div className="flex items-center justify-between bg-black/60 border border-white/15 rounded-xl px-4 py-3">
                      <span className="font-mono text-sm tracking-widest font-bold text-white">
                        {offer.code}
                      </span>
                      <button
                        onClick={() => handleCopy(offer.code)}
                        className="text-xs font-mono uppercase text-white/70 hover:text-white flex items-center gap-1.5"
                      >
                        {copiedCode === offer.code ? (
                          <>
                            <Check className="w-4 h-4 text-green-400" />
                            <span className="text-green-400">Copied</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-4 h-4" />
                            <span>Copy</span>
                          </>
                        )}
                      </button>
                    </div>

                    <Link
                      to={`/book?for=${activeAudience.id}`}
                      className="w-full py-3 rounded-full bg-white text-black font-trade font-bold text-xs uppercase tracking-wider text-center hover:bg-gray-200 transition-colors shadow-md flex items-center justify-center gap-2"
                    >
                      <span>Claim With Booking</span>
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                </div>
              </RevealOnScroll>
            ))}
          </div>
        )}
      </div>
    </Layout>
  );
};

export default OffersPage;
