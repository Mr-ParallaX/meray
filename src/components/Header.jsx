import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { CalendarCheck, User, Menu, X } from 'lucide-react';
import { useAudience } from '../context/AudienceContext';

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { activeAudience } = useAudience();
  const location = useLocation();

  const navLinks = [
    { label: "HOME", path: "/" },
    { label: "SERVICES", path: "/services" },
    { label: "STYLES", path: "/styles" },
    { label: "GALLERY", path: "/gallery" },
    { label: "OFFERS", path: "/offers" },
    { label: "ABOUT", path: "/about" },
    { label: "CONTACT", path: "/contact" },
  ];

  const getHref = (path) => `${path}?for=${activeAudience.id}`;

  return (
    <>
      <header className="w-full flex items-center justify-between font-trade relative z-50">
        {/* Brand Logo */}
        <Link to={getHref("/")} className="select-none flex items-center group">
          <span className="text-white font-thunder font-bold text-4xl tracking-tighter italic leading-none drop-shadow-md cursor-pointer transition-transform group-hover:scale-105">
            MERAY
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-6 xl:gap-10">
          {navLinks.map((link) => {
            const isActive = location.pathname === link.path;
            return (
              <Link
                key={link.label}
                to={getHref(link.path)}
                className={`text-white text-base font-bold tracking-wider uppercase drop-shadow-md transition-all relative py-1 ${
                  isActive ? "opacity-100" : "opacity-85 hover:opacity-100"
                }`}
              >
                {link.label}
                {isActive && (
                  <span className="absolute bottom-0 left-0 w-full h-[2px] bg-white transition-all rounded-full" />
                )}
              </Link>
            );
          })}
        </nav>

        {/* Right Action Icons & Mobile Menu Button */}
        <div className="flex items-center gap-4 md:gap-6">
          {/* Booking Icon Button */}
          <Link
            to={getHref("/book")}
            className="p-2 text-white hover:scale-110 transition-transform flex items-center gap-2 group"
            title="Book an Appointment"
            aria-label="Book an Appointment"
          >
            <CalendarCheck className="w-6 h-6 text-white drop-shadow-md" strokeWidth={2} />
            <span className="hidden sm:inline font-thunder text-sm tracking-widest uppercase bg-white/20 backdrop-blur-md px-3 py-1 rounded-full border border-white/20 text-white">
              Book
            </span>
          </Link>

          {/* Admin / Client Portal */}
          <Link
            to="/admin"
            className="p-2 text-white hover:scale-110 transition-transform"
            title="Salon Portal"
            aria-label="Salon Portal"
          >
            <User className="w-6 h-6 text-white drop-shadow-md" strokeWidth={2} />
          </Link>

          {/* Mobile Menu Trigger */}
          <button
            onClick={() => setMobileMenuOpen(true)}
            className="lg:hidden p-2 text-white hover:opacity-80 transition-opacity"
            aria-label="Open Navigation Menu"
          >
            <Menu className="w-7 h-7" strokeWidth={2.5} />
          </button>
        </div>
      </header>

      {/* Mobile Drawer Menu Overlay */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-xl flex flex-col justify-between p-8 animate-person-fade-in-up">
          <div className="flex items-center justify-between pb-6 border-b border-white/10">
            <span className="text-white font-thunder font-bold text-4xl tracking-tighter italic">
              MERAY
            </span>
            <button
              onClick={() => setMobileMenuOpen(false)}
              className="p-2 text-white/80 hover:text-white"
              aria-label="Close Navigation Menu"
            >
              <X className="w-8 h-8" strokeWidth={2} />
            </button>
          </div>

          <div className="flex flex-col gap-6 my-auto">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                to={getHref(link.path)}
                onClick={() => setMobileMenuOpen(false)}
                className="text-white font-thunder text-4xl sm:text-5xl font-bold tracking-tight uppercase hover:text-gray-300 transition-colors"
              >
                {link.label}
              </Link>
            ))}
            <Link
              to={getHref("/book")}
              onClick={() => setMobileMenuOpen(false)}
              className="mt-4 inline-flex items-center justify-center bg-white text-black font-thunder text-2xl font-bold uppercase tracking-wider py-4 rounded-full shadow-2xl"
            >
              Book Appointment Now
            </Link>
          </div>

          <div className="text-white/40 text-xs font-mono tracking-widest uppercase border-t border-white/10 pt-6 text-center">
            1582 Busse Rd, Mt Prospect, IL 60056 • (847) 258-3604
          </div>
        </div>
      )}
    </>
  );
};

export default Header;
