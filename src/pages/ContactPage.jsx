import React, { useState } from 'react';
import { MapPin, Phone, Mail, Clock, Send, Check } from 'lucide-react';
import Layout from '../components/Layout';
import RevealOnScroll from '../components/RevealOnScroll';
import { SITE_CONFIG } from '../config/site';
import { useSEO } from '../hooks/useSEO';

const ContactPage = () => {
  const [formSent, setFormSent] = useState(false);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");

  useSEO({
    title: "Contact & Location — Meray Hair Salon",
    description: "Visit Meray Hair Salon at 1582 Busse Rd, Mt Prospect, IL 60056. Call (847) 258-3604 for appointments or contact us online."
  });

  const todayIndex = new Date().getDay(); // 0 is Sunday, 1 is Monday...
  // map getDay() to SITE_CONFIG.hours index (Monday=0 ... Sunday=6)
  const mappedTodayIndex = todayIndex === 0 ? 6 : todayIndex - 1;

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormSent(true);
  };

  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-6 md:px-16 py-16 md:py-24">
        {/* Header Bar */}
        <div className="pb-12 border-b border-white/10">
          <span className="text-white/60 font-mono text-xs tracking-widest uppercase block mb-3">
            GET IN TOUCH & VISIT OUR SHOP
          </span>
          <h1 className="text-5xl md:text-8xl font-thunder font-bold uppercase tracking-tighter leading-none">
            Contact <span className="text-stroke">& Location</span>
          </h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 py-16">
          {/* Left Column: Direct Info & Hours Table */}
          <RevealOnScroll>
            <div className="space-y-8">
              {/* Quick Info Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <a
                  href={`tel:${SITE_CONFIG.phone.replace(/[^0-9]/g, '')}`}
                  className="p-6 bg-neutral-900 border border-white/10 rounded-2xl hover:border-white/30 transition-colors flex items-start gap-4 group"
                >
                  <div className="p-3 rounded-full bg-white/5 group-hover:scale-110 transition-transform" style={{ color: "var(--accent)" }}>
                    <Phone className="w-6 h-6" />
                  </div>
                  <div>
                    <span className="font-mono text-xs text-white/60 uppercase tracking-wider block">Call Direct</span>
                    <span className="font-thunder text-2xl font-bold uppercase text-white block mt-0.5">{SITE_CONFIG.phone}</span>
                    <span className="text-[11px] text-gray-400 font-sans">Tap to dial salon</span>
                  </div>
                </a>

                <div className="p-6 bg-neutral-900 border border-white/10 rounded-2xl flex items-start gap-4">
                  <div className="p-3 rounded-full bg-white/5" style={{ color: "var(--accent)" }}>
                    <MapPin className="w-6 h-6" />
                  </div>
                  <div>
                    <span className="font-mono text-xs text-white/60 uppercase tracking-wider block">Location</span>
                    <span className="font-thunder text-xl font-bold uppercase text-white block mt-0.5">{SITE_CONFIG.address.street}</span>
                    <span className="text-[11px] text-gray-400 font-sans">{SITE_CONFIG.address.city}, {SITE_CONFIG.address.state} {SITE_CONFIG.address.zip}</span>
                  </div>
                </div>
              </div>

              {/* Opening Hours Table */}
              <div className="p-8 bg-neutral-900 border border-white/10 rounded-2xl">
                <div className="flex items-center gap-3 mb-6 pb-4 border-b border-white/10">
                  <Clock className="w-6 h-6" style={{ color: "var(--accent)" }} />
                  <h3 className="font-thunder text-3xl font-bold uppercase text-white">
                    Salon Hours
                  </h3>
                </div>

                <div className="space-y-3 font-sans text-sm">
                  {SITE_CONFIG.hours.map((item, idx) => {
                    const isToday = idx === mappedTodayIndex;
                    return (
                      <div
                        key={item.day}
                        className={`flex items-center justify-between py-2 px-3 rounded-lg transition-colors ${
                          isToday ? "bg-white/10 font-bold border border-white/20" : "text-gray-300"
                        }`}
                      >
                        <span className="flex items-center gap-2">
                          {item.day}
                          {isToday && (
                            <span className="text-[10px] font-mono px-2 py-0.5 rounded uppercase" style={{ backgroundColor: "var(--accent)", color: "#000" }}>
                              TODAY
                            </span>
                          )}
                        </span>
                        <span className="font-mono text-xs">
                          {item.open} – {item.close}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </RevealOnScroll>

          {/* Right Column: Contact Message Form */}
          <RevealOnScroll delay={200}>
            <div className="p-8 md:p-10 bg-neutral-900 border border-white/15 rounded-2xl shadow-2xl">
              <h2 className="font-thunder text-4xl font-bold uppercase text-white mb-2">
                Send a Message
              </h2>
              <p className="text-gray-400 font-sans text-sm mb-6">
                Have questions regarding custom hair coloring, bridal packages, or group bookings? Write to us directly.
              </p>

              {formSent ? (
                <div className="p-8 bg-white/5 border border-white/20 rounded-xl text-center">
                  <Check className="w-12 h-12 mx-auto mb-3 text-green-400" />
                  <h3 className="font-thunder text-3xl font-bold uppercase text-white mb-2">
                    Message Delivered
                  </h3>
                  <p className="text-gray-300 font-sans text-sm max-w-sm mx-auto">
                    Thank you, {name}! Our front desk team will reach back out shortly via phone or message.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4 font-sans text-sm">
                  <div>
                    <label className="block text-xs font-mono uppercase tracking-wider text-white/70 mb-1">
                      Your Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="e.g. Michael Smith"
                      className="w-full bg-black/60 border border-white/15 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-white transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono uppercase tracking-wider text-white/70 mb-1">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="e.g. (847) 555-0123"
                      className="w-full bg-black/60 border border-white/15 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-white transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono uppercase tracking-wider text-white/70 mb-1">
                      Your Message *
                    </label>
                    <textarea
                      required
                      rows={4}
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="How can our stylists assist you?"
                      className="w-full bg-black/60 border border-white/15 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-white transition-colors"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-4 rounded-full bg-white text-black font-trade font-bold uppercase tracking-wider hover:bg-gray-200 transition-colors shadow-xl flex items-center justify-center gap-2"
                  >
                    <span>Send Message</span>
                    <Send className="w-4 h-4" />
                  </button>
                </form>
              )}
            </div>
          </RevealOnScroll>
        </div>

        {/* Dark Google Maps Embed */}
        <div className="mt-8 rounded-2xl overflow-hidden border border-white/15 shadow-2xl h-96 relative">
          <iframe
            title="Meray Hair Salon Location Map"
            src={SITE_CONFIG.address.mapUrl}
            width="100%"
            height="100%"
            style={{ border: 0, filter: "invert(90%) hue-rotate(180deg) contrast(120%)" }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </div>
    </Layout>
  );
};

export default ContactPage;
