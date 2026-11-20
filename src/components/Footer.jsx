import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Instagram, Facebook, Youtube, Music2 } from 'lucide-react';
import RevealOnScroll from './RevealOnScroll';
import { SITE_CONFIG } from '../config/site';
import { useAudience } from '../context/AudienceContext';

const Footer = () => {
  const { activeAudience, AUDIENCES, setActiveAudience } = useAudience();

  const serviceLinks = AUDIENCES.map(a => ({
    label: a.label,
    path: `/services?for=${a.id}`,
    onClick: () => setActiveAudience(a.id)
  }));

  const salonLinks = [
    { label: "Book Appointment", path: `/book?for=${activeAudience.id}` },
    { label: "Styles Lookbook", path: `/styles?for=${activeAudience.id}` },
    { label: "Photo Gallery", path: `/gallery?for=${activeAudience.id}` },
    { label: "Special Offers", path: `/offers?for=${activeAudience.id}` },
  ];

  const visitInfo = [
    SITE_CONFIG.address.street,
    `${SITE_CONFIG.address.city}, ${SITE_CONFIG.address.state} ${SITE_CONFIG.address.zip}`,
    `Phone: ${SITE_CONFIG.phone}`,
    "Mon–Fri: 9am–7pm",
    "Sat: 9am–6pm | Sun: 10am–4pm"
  ];

  const companyLinks = [
    { label: "About Meray", path: `/about?for=${activeAudience.id}` },
    { label: "Contact & Location", path: `/contact?for=${activeAudience.id}` },
    { label: "Our Stylists", path: `/about?for=${activeAudience.id}#team` },
    { label: "Privacy Policy", path: "#" },
  ];

  const socialIcons = [
    { Icon: Instagram, href: SITE_CONFIG.socials.instagram, label: "Instagram" },
    { Icon: Facebook, href: SITE_CONFIG.socials.facebook, label: "Facebook" },
    { Icon: Youtube, href: SITE_CONFIG.socials.youtube, label: "YouTube" },
    { Icon: Music2, href: SITE_CONFIG.socials.tiktok, label: "TikTok" },
  ];

  return (
    <footer className="bg-black text-white relative overflow-hidden border-t border-white/10">
      {/* Top Section: Newsletter and Socials */}
      <div className="border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 md:px-16 py-20 md:py-28 flex flex-col md:flex-row items-start md:items-end justify-between gap-12">
          <RevealOnScroll className="flex-1 max-w-2xl">
            <h3 className="text-4xl md:text-6xl font-thunder font-bold uppercase tracking-tight mb-4">
              Join the <span className="text-transparent text-stroke">Meray Club</span>
            </h3>
            <p className="text-gray-400 font-sans text-base md:text-lg mb-8 max-w-md">
              Sign up for priority booking slots, exclusive season promotions, and grooming tips delivered right to your inbox.
            </p>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                alert("Thank you for joining the Meray Club!");
              }}
              className="flex items-center border-b border-white/30 hover:border-white transition-colors pb-4 group"
            >
              <input
                type="email"
                required
                placeholder="ENTER YOUR EMAIL"
                className="bg-transparent border-none outline-none text-xl md:text-2xl font-thunder tracking-wide placeholder:text-gray-600 w-full text-white"
              />
              <button
                type="submit"
                className="text-white group-hover:translate-x-2 transition-transform duration-300"
                aria-label="Submit Email"
              >
                <ArrowRight className="w-6 h-6 md:w-8 md:h-8" />
              </button>
            </form>
          </RevealOnScroll>

          <RevealOnScroll delay={200} className="flex gap-4 sm:gap-6">
            {socialIcons.map(({ Icon, href, label }, idx) => (
              <a
                key={idx}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center hover:bg-white hover:text-black transition-all duration-300"
                aria-label={label}
              >
                <Icon className="w-5 h-5" />
              </a>
            ))}
          </RevealOnScroll>
        </div>
      </div>

      {/* Middle Section: Navigation Columns */}
      <div className="max-w-7xl mx-auto px-6 md:px-16 py-16 md:py-20 grid grid-cols-2 lg:grid-cols-4 gap-10 md:gap-8">
        {/* Services Column */}
        <RevealOnScroll delay={0}>
          <h4 className="font-thunder text-xl uppercase tracking-widest text-white/40 mb-6">
            Services
          </h4>
          <ul className="space-y-3 font-sans text-base md:text-lg">
            {serviceLinks.map((link) => (
              <li key={link.label}>
                <Link
                  to={link.path}
                  onClick={link.onClick}
                  className="text-white hover:text-gray-400 transition-colors inline-block relative group"
                >
                  {link.label}
                  <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-white transition-all duration-300 group-hover:w-full" />
                </Link>
              </li>
            ))}
          </ul>
        </RevealOnScroll>

        {/* Salon Column */}
        <RevealOnScroll delay={100}>
          <h4 className="font-thunder text-xl uppercase tracking-widest text-white/40 mb-6">
            Salon
          </h4>
          <ul className="space-y-3 font-sans text-base md:text-lg">
            {salonLinks.map((link) => (
              <li key={link.label}>
                <Link
                  to={link.path}
                  className="text-white hover:text-gray-400 transition-colors inline-block relative group"
                >
                  {link.label}
                  <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-white transition-all duration-300 group-hover:w-full" />
                </Link>
              </li>
            ))}
          </ul>
        </RevealOnScroll>

        {/* Visit & Hours Column */}
        <RevealOnScroll delay={200}>
          <h4 className="font-thunder text-xl uppercase tracking-widest text-white/40 mb-6">
            Visit Us
          </h4>
          <ul className="space-y-2 font-sans text-sm md:text-base text-gray-300">
            {visitInfo.map((info, i) => (
              <li key={i}>{info}</li>
            ))}
          </ul>
        </RevealOnScroll>

        {/* Company Column */}
        <RevealOnScroll delay={300}>
          <h4 className="font-thunder text-xl uppercase tracking-widest text-white/40 mb-6">
            Company
          </h4>
          <ul className="space-y-3 font-sans text-base md:text-lg">
            {companyLinks.map((link) => (
              <li key={link.label}>
                <Link
                  to={link.path}
                  className="text-white hover:text-gray-400 transition-colors inline-block relative group"
                >
                  {link.label}
                  <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-white transition-all duration-300 group-hover:w-full" />
                </Link>
              </li>
            ))}
          </ul>
        </RevealOnScroll>
      </div>

      {/* Giant "LOOK SHARP" Background Outline Branding */}
      <div className="border-t border-white/10 bg-neutral-900/50">
        <RevealOnScroll>
          <h1 className="text-[18vw] leading-[0.8] font-thunder font-bold text-center tracking-tighter text-white select-none pointer-events-none mix-blend-overlay opacity-40">
            LOOK SHARP
          </h1>
        </RevealOnScroll>
      </div>

      {/* Bottom Legal & Copyright Bar */}
      <div className="max-w-7xl mx-auto px-6 md:px-16 py-8 flex flex-col md:flex-row justify-between items-center text-xs md:text-sm text-gray-500 font-sans border-t border-white/5">
        <p>© {new Date().getFullYear()} {SITE_CONFIG.name}. All Rights Reserved.</p>
        <div className="flex gap-6 mt-4 md:mt-0">
          <Link to={`/contact?for=${activeAudience.id}`} className="hover:text-white transition-colors">
            1582 Busse Rd, Mt Prospect, IL 60056
          </Link>
          <span className="hover:text-white transition-colors">
            Terms of Service
          </span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
