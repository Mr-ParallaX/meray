import React, { useState, useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { Check, Calendar, Clock, Scissors, User, Sparkles, ArrowRight, ArrowLeft } from 'lucide-react';
import Layout from '../components/Layout';
import { useAudience } from '../context/AudienceContext';
import { SITE_CONFIG } from '../config/site';
import { useSEO } from '../hooks/useSEO';

const STYLISTS = [
  { id: "any", name: "Any Available Master Stylist", role: "First available specialist", image: "https://images.unsplash.com/photo-1580618672591-eb180b1a973f?auto=format&fit=crop&w=500&q=75" },
  { id: "meray", name: "Meray", role: "Founder & Master Barber / Colorist", image: "https://images.unsplash.com/photo-1503951914875-452162b0f3f1?auto=format&fit=crop&w=500&q=75" },
  { id: "alex", name: "Alex K.", role: "Senior Skin Fade & Beard Specialist", image: "https://images.unsplash.com/photo-1621605815971-fbc98d665033?auto=format&fit=crop&w=500&q=75" },
  { id: "elena", name: "Elena V.", role: "Balayage & Women's Layering Artist", image: "https://images.unsplash.com/photo-1595476108010-b4d1f102b1b1?auto=format&fit=crop&w=500&q=75" },
];

const BookPage = () => {
  const { activeAudience, setActiveAudience, AUDIENCES } = useAudience();
  const location = useLocation();

  useSEO({
    title: "Book an Appointment — Meray Hair Salon",
    description: "Book your haircut, skin fade, blowout, or styling session at Meray Hair Salon (1582 Busse Rd, Mt Prospect, IL). Instant confirmation."
  });

  // Steps: 1: Who, 2: Service, 3: Style, 4: Stylist, 5: Date & Time, 6: Details
  const [step, setStep] = useState(1);

  // Form State
  const [selectedService, setSelectedService] = useState(null);
  const [selectedStyle, setSelectedStyle] = useState("Stylist's Recommendation");
  const [selectedStylist, setSelectedStylist] = useState(STYLISTS[0]);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);

  const [customerName, setCustomerName] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");
  const [customerEmail, setCustomerEmail] = useState("");
  const [notes, setNotes] = useState("");

  const [bookingRef, setBookingRef] = useState(null);

  // Check URL query params for prefilled service or style
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const serviceParam = params.get("service");
    const styleParam = params.get("style");

    if (serviceParam) {
      const match = activeAudience.services.find(s => s.id === serviceParam);
      if (match) {
        setSelectedService(match);
        setStep(3); // jump forward
      }
    } else if (!selectedService && activeAudience.services.length > 0) {
      setSelectedService(activeAudience.services[0]);
    }

    if (styleParam) {
      setSelectedStyle(styleParam);
    }
  }, [location.search, activeAudience]);

  // Generate next 14 dates for appointment booking
  const dates = Array.from({ length: 14 }).map((_, i) => {
    const d = new Date();
    d.setDate(d.getDate() + i + 1);
    return {
      iso: d.toISOString().split('T')[0],
      dayName: d.toLocaleDateString('en-US', { weekday: 'short' }),
      dayNumber: d.getDate(),
      month: d.toLocaleDateString('en-US', { month: 'short' })
    };
  });

  // Time slots (30-min intervals)
  const timeSlots = [
    "09:00 AM", "09:30 AM", "10:00 AM", "10:30 AM",
    "11:00 AM", "11:30 AM", "12:00 PM", "12:30 PM",
    "01:00 PM", "01:30 PM", "02:00 PM", "02:30 PM",
    "03:00 PM", "03:30 PM", "04:00 PM", "04:30 PM",
    "05:00 PM", "05:30 PM", "06:00 PM", "06:30 PM"
  ];

  const handleBookingSubmit = (e) => {
    e.preventDefault();
    if (!customerName || !customerPhone) {
      alert("Please provide your name and contact phone number.");
      return;
    }
    const randomCode = `MRY-${Math.floor(1000 + Math.random() * 9000)}`;
    setBookingRef(randomCode);
    setStep(7); // success
  };

  const stepsList = [
    { num: 1, label: "Who" },
    { num: 2, label: "Service" },
    { num: 3, label: "Style" },
    { num: 4, label: "Stylist" },
    { num: 5, label: "Date & Time" },
    { num: 6, label: "Details" }
  ];

  return (
    <Layout>
      <div className="max-w-6xl mx-auto px-6 md:px-16 py-16 md:py-24">
        {/* Title */}
        <div className="text-center mb-12">
          <span className="text-white/60 font-mono text-xs tracking-widest uppercase block mb-3">
            EASY APPOINTMENT SCHEDULER
          </span>
          <h1 className="text-5xl md:text-7xl font-thunder font-bold uppercase tracking-tight">
            Reserve Your <span className="text-stroke">Chair</span>
          </h1>
        </div>

        {/* Success Screen */}
        {step === 7 ? (
          <div className="bg-neutral-900 border border-white/20 rounded-2xl p-8 md:p-14 text-center max-w-2xl mx-auto shadow-2xl animate-person-fade-in-up">
            <div
              className="w-20 h-20 rounded-full mx-auto flex items-center justify-center mb-6 shadow-xl"
              style={{ backgroundColor: "var(--accent)", color: "#000" }}
            >
              <Check className="w-10 h-10 stroke-[3]" />
            </div>

            <span className="font-mono text-xs tracking-widest uppercase text-white/60 block mb-2">
              CONFIRMATION CODE
            </span>
            <div className="text-4xl md:text-5xl font-thunder font-bold tracking-wider text-white mb-6">
              {bookingRef}
            </div>

            <h2 className="text-3xl font-thunder uppercase font-bold text-white mb-4">
              You're All Booked, {customerName}!
            </h2>
            <p className="text-gray-300 font-sans text-base leading-relaxed mb-8 max-w-md mx-auto">
              We look forward to seeing you at <strong className="text-white">1582 Busse Rd, Mt Prospect, IL</strong> on <strong className="text-white">{selectedDate}</strong> at <strong className="text-white">{selectedTime}</strong>.
            </p>

            <div className="p-6 bg-white/5 border border-white/10 rounded-xl text-left text-sm space-y-2 mb-8 font-sans">
              <div className="flex justify-between"><span className="text-gray-400">Audience:</span><span className="text-white font-bold">{activeAudience.label}</span></div>
              <div className="flex justify-between"><span className="text-gray-400">Service:</span><span className="text-white font-bold">{selectedService?.name}</span></div>
              <div className="flex justify-between"><span className="text-gray-400">Stylist:</span><span className="text-white font-bold">{selectedStylist?.name}</span></div>
              <div className="flex justify-between"><span className="text-gray-400">Total Due at Chair:</span><span className="text-white font-thunder text-xl font-bold">${selectedService?.price}</span></div>
            </div>

            <Link
              to="/"
              className="inline-block px-10 py-4 bg-white text-black font-trade font-bold uppercase tracking-wider rounded-full hover:bg-gray-200 transition-colors shadow-lg"
            >
              Back to Home
            </Link>
          </div>
        ) : (
          <div>
            {/* Wizard Progress Bar */}
            <div className="flex items-center justify-between max-w-2xl mx-auto mb-12">
              {stepsList.map((s, idx) => (
                <React.Fragment key={s.num}>
                  <div className="flex flex-col items-center">
                    <div
                      className={`w-9 h-9 rounded-full flex items-center justify-center font-thunder font-bold text-sm transition-all duration-300 ${
                        step === s.num
                          ? "bg-white text-black scale-110 shadow-lg"
                          : step > s.num
                            ? "bg-white/30 text-white"
                            : "bg-white/10 text-white/40"
                      }`}
                    >
                      {step > s.num ? "✓" : s.num}
                    </div>
                    <span className="text-[10px] font-mono tracking-wider uppercase mt-1 hidden sm:block text-white/70">
                      {s.label}
                    </span>
                  </div>
                  {idx < stepsList.length - 1 && (
                    <div
                      className={`flex-1 h-[2px] mx-2 transition-all duration-300 ${
                        step > idx + 1 ? "bg-white/50" : "bg-white/10"
                      }`}
                    />
                  )}
                </React.Fragment>
              ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Wizard Interactive Form Panel */}
              <div className="lg:col-span-2 bg-neutral-900/60 border border-white/10 rounded-2xl p-6 md:p-10 shadow-xl">
                {/* STEP 1: WHO */}
                {step === 1 && (
                  <div>
                    <h2 className="text-3xl font-thunder uppercase font-bold text-white mb-2">
                      1. Who's In The Chair?
                    </h2>
                    <p className="text-gray-400 text-sm font-sans mb-6">
                      Select who this appointment is for so we present the exact specialized services and barbers.
                    </p>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                      {AUDIENCES.map((a) => {
                        const isSelected = activeAudience.id === a.id;
                        return (
                          <button
                            key={a.id}
                            type="button"
                            onClick={() => setActiveAudience(a)}
                            className={`p-5 rounded-xl border text-center flex flex-col items-center gap-3 transition-all ${
                              isSelected
                                ? "bg-white/15 border-white shadow-xl scale-105"
                                : "bg-white/5 border-white/10 hover:border-white/30 opacity-75 hover:opacity-100"
                            }`}
                          >
                            <div
                              className="w-12 h-12 rounded-full border-2 border-white flex items-center justify-center"
                              style={{ backgroundColor: a.hex }}
                            >
                              <span className="font-thunder font-bold text-black text-xl">
                                {a.name[0]}
                              </span>
                            </div>
                            <div>
                              <div className="font-thunder text-xl font-bold uppercase text-white">
                                {a.name}
                              </div>
                              <div className="text-[10px] font-mono text-white/60">
                                {a.label}
                              </div>
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* STEP 2: SERVICE */}
                {step === 2 && (
                  <div>
                    <h2 className="text-3xl font-thunder uppercase font-bold text-white mb-2">
                      2. Select Service
                    </h2>
                    <p className="text-gray-400 text-sm font-sans mb-6">
                      All services tailored for {activeAudience.label}.
                    </p>
                    <div className="space-y-3 max-h-[460px] overflow-y-auto pr-2 no-scrollbar">
                      {activeAudience.services.map((s) => {
                        const isSelected = selectedService?.id === s.id;
                        return (
                          <div
                            key={s.id}
                            onClick={() => setSelectedService(s)}
                            className={`p-5 rounded-xl border cursor-pointer transition-all flex items-center justify-between ${
                              isSelected
                                ? "bg-white/15 border-white shadow-lg"
                                : "bg-white/5 border-white/10 hover:border-white/30"
                            }`}
                          >
                            <div>
                              <h3 className="text-2xl font-thunder font-bold text-white uppercase">
                                {s.name}
                              </h3>
                              <p className="text-gray-400 text-xs font-sans mt-1 max-w-md">
                                {s.desc}
                              </p>
                              <span className="text-[10px] font-mono text-white/50 block mt-2">
                                {s.durationMin} mins • {s.category}
                              </span>
                            </div>
                            <div className="text-right">
                              <span className="text-3xl font-thunder font-bold text-white">
                                ${s.price}
                              </span>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* STEP 3: STYLE */}
                {step === 3 && (
                  <div>
                    <h2 className="text-3xl font-thunder uppercase font-bold text-white mb-2">
                      3. Desired Style (Optional)
                    </h2>
                    <p className="text-gray-400 text-sm font-sans mb-6">
                      Pick an inspiration look from our lookbook, or let your stylist guide you.
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div
                        onClick={() => setSelectedStyle("Stylist's Recommendation")}
                        className={`p-5 rounded-xl border cursor-pointer transition-all flex items-center gap-4 ${
                          selectedStyle === "Stylist's Recommendation"
                            ? "bg-white/15 border-white shadow-lg"
                            : "bg-white/5 border-white/10 hover:border-white/30"
                        }`}
                      >
                        <Sparkles className="w-8 h-8 text-yellow-400" />
                        <div>
                          <div className="font-thunder text-xl font-bold uppercase text-white">
                            Stylist's Recommendation
                          </div>
                          <div className="text-xs text-gray-400">
                            Custom consultation in the chair
                          </div>
                        </div>
                      </div>

                      {activeAudience.styles.map((st) => (
                        <div
                          key={st.title}
                          onClick={() => setSelectedStyle(st.title)}
                          className={`p-5 rounded-xl border cursor-pointer transition-all flex items-center gap-4 ${
                            selectedStyle === st.title
                              ? "bg-white/15 border-white shadow-lg"
                              : "bg-white/5 border-white/10 hover:border-white/30"
                          }`}
                        >
                          <img
                            src={st.image}
                            alt={st.title}
                            className="w-12 h-12 rounded-lg object-cover"
                          />
                          <div>
                            <div className="font-thunder text-xl font-bold uppercase text-white">
                              {st.title}
                            </div>
                            <div className="text-xs text-gray-400">
                              {st.subtitle}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* STEP 4: STYLIST */}
                {step === 4 && (
                  <div>
                    <h2 className="text-3xl font-thunder uppercase font-bold text-white mb-2">
                      4. Choose Stylist
                    </h2>
                    <p className="text-gray-400 text-sm font-sans mb-6">
                      Select a preferred professional or choose any available.
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {STYLISTS.map((st) => {
                        const isSelected = selectedStylist?.id === st.id;
                        return (
                          <div
                            key={st.id}
                            onClick={() => setSelectedStylist(st)}
                            className={`p-5 rounded-xl border cursor-pointer transition-all flex items-center gap-4 ${
                              isSelected
                                ? "bg-white/15 border-white shadow-lg"
                                : "bg-white/5 border-white/10 hover:border-white/30"
                            }`}
                          >
                            <img
                              src={st.image}
                              alt={st.name}
                              className="w-14 h-14 rounded-full object-cover border border-white/20"
                            />
                            <div>
                              <div className="font-thunder text-2xl font-bold uppercase text-white">
                                {st.name}
                              </div>
                              <div className="text-xs text-gray-400">
                                {st.role}
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* STEP 5: DATE & TIME */}
                {step === 5 && (
                  <div>
                    <h2 className="text-3xl font-thunder uppercase font-bold text-white mb-2">
                      5. Pick Date & Time
                    </h2>
                    <p className="text-gray-400 text-sm font-sans mb-6">
                      Salon hours: Mon–Fri 9am–7pm, Sat 9am–6pm, Sun 10am–4pm (Central Time).
                    </p>

                    {/* Date Picker Horizontal Carousel */}
                    <div className="mb-6">
                      <span className="font-mono text-xs text-white/70 uppercase tracking-wider block mb-3">
                        Choose Day:
                      </span>
                      <div className="flex items-center gap-3 overflow-x-auto pb-3 no-scrollbar">
                        {dates.map((d) => {
                          const isSelected = selectedDate === d.iso;
                          return (
                            <button
                              key={d.iso}
                              type="button"
                              onClick={() => setSelectedDate(d.iso)}
                              className={`p-3 rounded-xl border text-center min-w-[76px] transition-all ${
                                isSelected
                                  ? "bg-white text-black shadow-lg scale-105"
                                  : "bg-white/5 border-white/10 text-white/70 hover:bg-white/10 hover:text-white"
                              }`}
                            >
                              <span className="text-[10px] font-mono uppercase block">
                                {d.dayName}
                              </span>
                              <span className="text-2xl font-thunder font-bold block my-0.5">
                                {d.dayNumber}
                              </span>
                              <span className="text-[10px] font-mono uppercase block opacity-75">
                                {d.month}
                              </span>
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    {/* Time Slot Picker Grid */}
                    <div>
                      <span className="font-mono text-xs text-white/70 uppercase tracking-wider block mb-3">
                        Available 30-min Slots:
                      </span>
                      <div className="grid grid-cols-3 sm:grid-cols-4 gap-2.5 max-h-56 overflow-y-auto pr-1 no-scrollbar">
                        {timeSlots.map((time) => {
                          const isSelected = selectedTime === time;
                          return (
                            <button
                              key={time}
                              type="button"
                              onClick={() => setSelectedTime(time)}
                              className={`py-2.5 px-2 rounded-lg border text-xs font-mono transition-all ${
                                isSelected
                                  ? "bg-white text-black font-bold shadow-md scale-105"
                                  : "bg-white/5 border-white/10 text-white/80 hover:bg-white/10 hover:text-white"
                              }`}
                            >
                              {time}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                )}

                {/* STEP 6: CONTACT DETAILS */}
                {step === 6 && (
                  <form onSubmit={handleBookingSubmit} className="space-y-4">
                    <h2 className="text-3xl font-thunder uppercase font-bold text-white mb-2">
                      6. Your Details
                    </h2>
                    <p className="text-gray-400 text-sm font-sans mb-6">
                      We will send an instant SMS and email reminder before your appointment.
                    </p>

                    <div>
                      <label className="block text-xs font-mono uppercase tracking-wider text-white/70 mb-1">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={customerName}
                        onChange={(e) => setCustomerName(e.target.value)}
                        placeholder="e.g. John Doe"
                        className="w-full bg-white/5 border border-white/15 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-white transition-colors"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-mono uppercase tracking-wider text-white/70 mb-1">
                        Mobile Phone Number *
                      </label>
                      <input
                        type="tel"
                        required
                        value={customerPhone}
                        onChange={(e) => setCustomerPhone(e.target.value)}
                        placeholder="e.g. (847) 555-0199"
                        className="w-full bg-white/5 border border-white/15 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-white transition-colors"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-mono uppercase tracking-wider text-white/70 mb-1">
                        Email Address (Optional)
                      </label>
                      <input
                        type="email"
                        value={customerEmail}
                        onChange={(e) => setCustomerEmail(e.target.value)}
                        placeholder="e.g. john@example.com"
                        className="w-full bg-white/5 border border-white/15 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-white transition-colors"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-mono uppercase tracking-wider text-white/70 mb-1">
                        Special Requests / Hair Notes
                      </label>
                      <textarea
                        rows={2}
                        value={notes}
                        onChange={(e) => setNotes(e.target.value)}
                        placeholder="Any sensitivities, hair history, or specific preferences..."
                        className="w-full bg-white/5 border border-white/15 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-white transition-colors"
                      />
                    </div>
                  </form>
                )}

                {/* Back / Next Buttons */}
                <div className="flex items-center justify-between pt-8 mt-8 border-t border-white/10">
                  {step > 1 ? (
                    <button
                      type="button"
                      onClick={() => setStep(step - 1)}
                      className="px-6 py-3 rounded-full border border-white/20 text-white font-trade text-xs uppercase tracking-wider hover:bg-white/10 transition-colors flex items-center gap-2"
                    >
                      <ArrowLeft className="w-4 h-4" />
                      Back
                    </button>
                  ) : <div />}

                  {step < 6 ? (
                    <button
                      type="button"
                      onClick={() => {
                        if (step === 2 && !selectedService) {
                          alert("Please select a service to proceed.");
                          return;
                        }
                        if (step === 5 && (!selectedDate || !selectedTime)) {
                          alert("Please select both a date and a time slot.");
                          return;
                        }
                        setStep(step + 1);
                      }}
                      className="px-8 py-3 rounded-full bg-white text-black font-trade font-bold text-xs uppercase tracking-wider hover:bg-gray-200 transition-colors flex items-center gap-2 shadow-lg"
                    >
                      Next Step
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  ) : (
                    <button
                      type="button"
                      onClick={handleBookingSubmit}
                      className="px-10 py-4 rounded-full bg-white text-black font-trade font-bold text-sm uppercase tracking-wider hover:bg-gray-200 transition-colors shadow-2xl flex items-center gap-2"
                    >
                      Confirm Booking
                      <Check className="w-5 h-5 stroke-[2.5]" />
                    </button>
                  )}
                </div>
              </div>

              {/* Order Summary Sidebar */}
              <div className="bg-neutral-900 border border-white/15 rounded-2xl p-6 md:p-8 flex flex-col justify-between h-fit shadow-2xl">
                <div>
                  <h3 className="font-thunder text-2xl font-bold uppercase text-white mb-4 pb-3 border-b border-white/10">
                    Booking Summary
                  </h3>

                  <div className="space-y-4 font-sans text-sm">
                    <div>
                      <span className="text-gray-400 block text-xs font-mono uppercase">Audience:</span>
                      <span className="text-white font-bold">{activeAudience.label}</span>
                    </div>

                    <div>
                      <span className="text-gray-400 block text-xs font-mono uppercase">Service:</span>
                      <span className="text-white font-bold">{selectedService?.name || "Not chosen yet"}</span>
                    </div>

                    <div>
                      <span className="text-gray-400 block text-xs font-mono uppercase">Style Look:</span>
                      <span className="text-white">{selectedStyle}</span>
                    </div>

                    <div>
                      <span className="text-gray-400 block text-xs font-mono uppercase">Stylist:</span>
                      <span className="text-white">{selectedStylist?.name}</span>
                    </div>

                    <div>
                      <span className="text-gray-400 block text-xs font-mono uppercase">Appointment:</span>
                      <span className="text-white font-bold">
                        {selectedDate && selectedTime ? `${selectedDate} at ${selectedTime}` : "Select in Step 5"}
                      </span>
                    </div>

                    <div className="pt-4 border-t border-white/10">
                      <span className="text-gray-400 block text-xs font-mono uppercase">Salon Address:</span>
                      <span className="text-white/80 text-xs block">{SITE_CONFIG.address.full}</span>
                      <span className="text-white/80 text-xs block mt-1">{SITE_CONFIG.phone}</span>
                    </div>
                  </div>
                </div>

                <div className="pt-6 mt-6 border-t border-white/10">
                  <div className="flex items-baseline justify-between mb-2">
                    <span className="font-mono text-xs uppercase text-gray-400">Total Price:</span>
                    <span className="font-thunder text-4xl font-bold text-white">
                      ${selectedService?.price || activeAudience.priceFrom}
                    </span>
                  </div>
                  <span className="text-[10px] font-mono text-white/50 block text-right">
                    Pay in salon after service
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default BookPage;
