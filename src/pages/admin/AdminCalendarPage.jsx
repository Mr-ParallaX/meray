import React, { useState, useEffect } from 'react';
import CrmLayout from '../../components/crm/CrmLayout';
import { getBookings, getStylists, createBooking } from '../../services/crmApi';
import { useToast } from '../../components/crm/ToastContext';
import {
  ChevronLeft,
  ChevronRight,
  Clock,
  User,
  Scissors,
  Phone,
  X,
  Plus
} from 'lucide-react';

const AUDIENCE_COLORS = {
  men: '#F5A623',
  women: '#E54C43',
  girl: '#9B59B6',
  boy: '#3FA8D6'
};

const TIME_SLOTS = [
  '09:00 AM',
  '10:00 AM',
  '11:00 AM',
  '12:00 PM',
  '01:00 PM',
  '02:00 PM',
  '03:00 PM',
  '04:00 PM',
  '05:00 PM',
  '06:00 PM',
  '07:00 PM'
];

const AdminCalendarPage = () => {
  const [bookings, setBookings] = useState([]);
  const [stylists, setStylists] = useState([]);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [viewMode, setViewMode] = useState('day'); // 'day' | 'week'
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [slotPrefill, setSlotPrefill] = useState(null);
  const [newClientName, setNewClientName] = useState('');
  const [newClientPhone, setNewClientPhone] = useState('');
  const [newService, setNewService] = useState('Haircut & Styling');
  const [newAudience, setNewAudience] = useState('men');

  const { addToast } = useToast();

  const loadData = async () => {
    try {
      const [b, st] = await Promise.all([getBookings(), getStylists()]);
      setBookings(b);
      setStylists(st);
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const curDateStr = currentDate.toISOString().split('T')[0];

  const handlePrevDay = () => {
    const next = new Date(currentDate);
    next.setDate(next.getDate() - (viewMode === 'day' ? 1 : 7));
    setCurrentDate(next);
  };

  const handleNextDay = () => {
    const next = new Date(currentDate);
    next.setDate(next.getDate() + (viewMode === 'day' ? 1 : 7));
    setCurrentDate(next);
  };

  const handleToday = () => {
    setCurrentDate(new Date());
  };

  const handleCreatePrefilled = async (e) => {
    e.preventDefault();
    if (!slotPrefill || !newClientName) return;

    try {
      await createBooking({
        clientName: newClientName,
        phone: newClientPhone || '(847) 555-0100',
        audience: newAudience,
        service: newService,
        style: 'Modern Salon Cut',
        stylistId: slotPrefill.stylist.id,
        stylistName: slotPrefill.stylist.name,
        date: curDateStr,
        time: slotPrefill.time,
        price: 35,
        status: 'confirmed',
        notes: 'Booked directly via interactive Calendar'
      });
      addToast(`Appointment booked for ${newClientName}!`, 'success');
      setSlotPrefill(null);
      setNewClientName('');
      setNewClientPhone('');
      loadData();
    } catch (e) {
      addToast('Error saving calendar booking', 'error');
    }
  };

  return (
    <CrmLayout pageTitle="Salon Calendar">
      {/* Calendar Header Controls */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 mb-6 bg-[#121215] border border-zinc-800/80 p-4 rounded-2xl">
        {/* Date Navigation */}
        <div className="flex items-center gap-3">
          <button
            onClick={handleToday}
            className="px-3 py-1.5 rounded-xl bg-zinc-800 text-zinc-300 hover:text-white text-xs font-bold transition-colors"
          >
            Today
          </button>
          <div className="flex items-center gap-1">
            <button
              onClick={handlePrevDay}
              className="p-1.5 rounded-lg bg-zinc-800/80 hover:bg-zinc-700 text-white transition-colors"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={handleNextDay}
              className="p-1.5 rounded-lg bg-zinc-800/80 hover:bg-zinc-700 text-white transition-colors"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
          <span className="text-base sm:text-lg font-thunder font-bold text-white uppercase tracking-tight">
            {currentDate.toLocaleDateString('en-US', {
              weekday: 'short',
              month: 'long',
              day: 'numeric',
              year: 'numeric'
            })}
          </span>
        </div>

        {/* View Switcher & Color Legend */}
        <div className="flex items-center gap-4 text-xs">
          <div className="hidden sm:flex items-center gap-3">
            {Object.entries(AUDIENCE_COLORS).map(([aud, col]) => (
              <div key={aud} className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: col }} />
                <span className="text-zinc-400 capitalize text-[11px] font-medium">{aud}</span>
              </div>
            ))}
          </div>

          <div className="flex items-center bg-zinc-900 p-1 rounded-xl border border-zinc-800">
            <button
              onClick={() => setViewMode('day')}
              className={`px-3 py-1 rounded-lg font-bold text-xs transition-all ${
                viewMode === 'day' ? 'bg-[#FF7A1A] text-black shadow-sm' : 'text-zinc-400 hover:text-white'
              }`}
            >
              Day
            </button>
            <button
              onClick={() => setViewMode('week')}
              className={`px-3 py-1 rounded-lg font-bold text-xs transition-all ${
                viewMode === 'week' ? 'bg-[#FF7A1A] text-black shadow-sm' : 'text-zinc-400 hover:text-white'
              }`}
            >
              Week
            </button>
          </div>
        </div>
      </div>

      {/* Grid: Stylist Columns with Time Slots */}
      <div className="bg-[#121215] border border-zinc-800/80 rounded-3xl overflow-hidden shadow-2xl">
        <div className="overflow-x-auto">
          <div className="min-w-[700px]">
            {/* Columns Header (Stylists) */}
            <div className="grid grid-cols-4 bg-[#17171C] border-b border-zinc-800 text-xs font-bold uppercase tracking-wider text-zinc-400">
              <div className="py-3.5 px-4 text-center border-r border-zinc-800/80 w-24">
                Time
              </div>
              {stylists.map((st) => (
                <div key={st.id} className="py-3 px-4 flex items-center justify-between border-r border-zinc-800/60 last:border-r-0">
                  <div className="flex items-center gap-2">
                    <img
                      src={st.photo}
                      alt={st.name}
                      className="w-7 h-7 rounded-full object-cover border border-zinc-700"
                    />
                    <div>
                      <div className="text-white font-bold">{st.name}</div>
                      <div className="text-[10px] text-zinc-500 font-normal normal-case">{st.role}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Time Slot Rows */}
            <div className="divide-y divide-zinc-800/40">
              {TIME_SLOTS.map((timeStr) => {
                return (
                  <div key={timeStr} className="grid grid-cols-4 min-h-[64px] hover:bg-zinc-900/20 transition-colors">
                    {/* Time Label */}
                    <div className="py-3 px-2 border-r border-zinc-800/80 text-center text-[11px] font-mono text-zinc-500 flex items-center justify-center">
                      {timeStr}
                    </div>

                    {/* Stylist Columns */}
                    {stylists.map((st) => {
                      // Find booking matching this stylist, date and time
                      const bookingMatch = bookings.find(
                        (b) =>
                          b.stylistId === st.id &&
                          b.date === curDateStr &&
                          b.time.split(' ')[0] === timeStr.split(' ')[0]
                      );

                      if (bookingMatch) {
                        const audCol = AUDIENCE_COLORS[bookingMatch.audience] || '#FF7A1A';
                        return (
                          <div
                            key={st.id}
                            onClick={() => setSelectedBooking(bookingMatch)}
                            className="p-1.5 border-r border-zinc-800/60 last:border-r-0 cursor-pointer"
                          >
                            <div
                              className="h-full rounded-xl p-2.5 flex flex-col justify-between border transition-all hover:scale-[1.01] hover:shadow-lg"
                              style={{
                                backgroundColor: `${audCol}20`,
                                borderColor: `${audCol}60`
                              }}
                            >
                              <div className="flex items-start justify-between">
                                <span className="font-bold text-white text-xs truncate">
                                  {bookingMatch.clientName}
                                </span>
                                <span className="text-[10px] font-bold text-white font-thunder">
                                  ${bookingMatch.price}
                                </span>
                              </div>
                              <div className="text-[10px] text-zinc-300 truncate mt-1">
                                {bookingMatch.service}
                              </div>
                            </div>
                          </div>
                        );
                      }

                      // Empty slot -> click to book
                      return (
                        <div
                          key={st.id}
                          onClick={() => setSlotPrefill({ stylist: st, time: timeStr })}
                          className="p-1.5 border-r border-zinc-800/60 last:border-r-0 group cursor-pointer hover:bg-zinc-800/20 flex items-center justify-center transition-colors"
                        >
                          <span className="opacity-0 group-hover:opacity-100 transition-opacity text-[11px] text-zinc-500 flex items-center gap-1 font-semibold">
                            <Plus className="w-3.5 h-3.5 text-[#FF7A1A]" />
                            <span>Book slot</span>
                          </span>
                        </div>
                      );
                    })}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* =====================================================================
          BOOKING DETAILS DRAWER
         ===================================================================== */}
      {selectedBooking && (
        <div className="fixed inset-0 z-[9990] flex items-center justify-end bg-black/70 backdrop-blur-sm animate-fade-in">
          <div className="bg-[#141417] border-l border-zinc-800 w-full max-w-md h-full p-6 sm:p-8 flex flex-col justify-between shadow-2xl overflow-y-auto">
            <div>
              <div className="flex items-center justify-between pb-4 border-b border-zinc-800 mb-6">
                <div>
                  <span className="text-[10px] font-mono text-[#FF7A1A] font-bold tracking-wider">
                    {selectedBooking.ref}
                  </span>
                  <h3 className="text-2xl font-thunder font-bold uppercase tracking-tight text-white">
                    {selectedBooking.clientName}
                  </h3>
                </div>
                <button
                  onClick={() => setSelectedBooking(null)}
                  className="p-2 text-zinc-400 hover:text-white rounded-lg hover:bg-zinc-800"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="flex flex-col gap-4 text-xs">
                <div className="p-4 rounded-2xl bg-zinc-900/60 border border-zinc-800 flex items-center justify-between">
                  <div>
                    <span className="text-zinc-500 text-[10px] uppercase font-bold">Schedule</span>
                    <div className="text-sm font-bold text-white mt-0.5">
                      {selectedBooking.date} at {selectedBooking.time}
                    </div>
                  </div>
                  <span
                    className="px-2.5 py-1 rounded-md text-[10px] font-bold uppercase"
                    style={{
                      backgroundColor: `${AUDIENCE_COLORS[selectedBooking.audience]}25`,
                      color: AUDIENCE_COLORS[selectedBooking.audience]
                    }}
                  >
                    {selectedBooking.audience}
                  </span>
                </div>

                <div className="p-4 rounded-2xl bg-zinc-900/60 border border-zinc-800">
                  <span className="text-zinc-500 text-[10px] uppercase font-bold">Service & Stylist</span>
                  <div className="text-sm font-bold text-white mt-0.5">{selectedBooking.service}</div>
                  <div className="text-xs text-zinc-400 mt-1">Stylist: {selectedBooking.stylistName}</div>
                  <div className="text-base font-thunder font-bold text-[#FF7A1A] mt-2">
                    ${selectedBooking.price}
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-zinc-900/60 border border-zinc-800">
                  <span className="text-zinc-500 text-[10px] uppercase font-bold">Contact</span>
                  <a
                    href={`tel:${selectedBooking.phone}`}
                    className="flex items-center gap-2 text-sm font-bold text-white hover:text-[#FF7A1A] transition-colors mt-1"
                  >
                    <Phone className="w-4 h-4 text-[#FF7A1A]" />
                    <span>{selectedBooking.phone}</span>
                  </a>
                </div>

                <div className="p-4 rounded-2xl bg-zinc-900/60 border border-zinc-800">
                  <span className="text-zinc-500 text-[10px] uppercase font-bold">Notes</span>
                  <p className="text-zinc-300 italic mt-1 leading-relaxed">
                    {selectedBooking.notes || 'No specific notes.'}
                  </p>
                </div>
              </div>
            </div>

            <div className="pt-6 border-t border-zinc-800 flex gap-2">
              <a
                href={`tel:${selectedBooking.phone}`}
                className="flex-1 py-3 bg-[#FF7A1A] hover:bg-[#FF8A30] text-black font-bold text-xs uppercase tracking-wider rounded-xl text-center shadow-lg transition-all"
              >
                Call Client
              </a>
              <button
                onClick={() => setSelectedBooking(null)}
                className="px-5 py-3 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-white font-semibold text-xs"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* =====================================================================
          PRE-FILLED NEW BOOKING MODAL
         ===================================================================== */}
      {slotPrefill && (
        <div className="fixed inset-0 z-[9990] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in">
          <div className="bg-[#141417] border border-zinc-800 rounded-3xl max-w-sm w-full p-6 shadow-2xl relative">
            <button
              onClick={() => setSlotPrefill(null)}
              className="absolute top-4 right-4 text-zinc-400 hover:text-white p-1"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="text-xl font-thunder font-bold uppercase tracking-tight text-white mb-1">
              Book Slot
            </h3>
            <p className="text-xs text-zinc-400 mb-4">
              {curDateStr} • {slotPrefill.time} with <strong className="text-white">{slotPrefill.stylist.name}</strong>
            </p>

            <form onSubmit={handleCreatePrefilled} className="flex flex-col gap-3 text-xs">
              <div>
                <label className="block text-zinc-300 font-bold uppercase text-[10px] mb-1">
                  Client Name *
                </label>
                <input
                  type="text"
                  required
                  value={newClientName}
                  onChange={(e) => setNewClientName(e.target.value)}
                  placeholder="Client name"
                  className="w-full bg-zinc-900 border border-zinc-700 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-[#FF7A1A]"
                />
              </div>

              <div>
                <label className="block text-zinc-300 font-bold uppercase text-[10px] mb-1">
                  Client Phone
                </label>
                <input
                  type="tel"
                  value={newClientPhone}
                  onChange={(e) => setNewClientPhone(e.target.value)}
                  placeholder="(847) 555-0199"
                  className="w-full bg-zinc-900 border border-zinc-700 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-[#FF7A1A]"
                />
              </div>

              <div>
                <label className="block text-zinc-300 font-bold uppercase text-[10px] mb-1">
                  Audience
                </label>
                <select
                  value={newAudience}
                  onChange={(e) => setNewAudience(e.target.value)}
                  className="w-full bg-zinc-900 border border-zinc-700 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-[#FF7A1A]"
                >
                  <option value="men">Men</option>
                  <option value="women">Women</option>
                  <option value="girl">Girl</option>
                  <option value="boy">Boy</option>
                </select>
              </div>

              <div>
                <label className="block text-zinc-300 font-bold uppercase text-[10px] mb-1">
                  Service
                </label>
                <input
                  type="text"
                  value={newService}
                  onChange={(e) => setNewService(e.target.value)}
                  className="w-full bg-zinc-900 border border-zinc-700 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-[#FF7A1A]"
                />
              </div>

              <div className="flex items-center justify-end gap-2 mt-4 pt-3 border-t border-zinc-800">
                <button
                  type="button"
                  onClick={() => setSlotPrefill(null)}
                  className="px-4 py-2 text-zinc-400 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-[#FF7A1A] hover:bg-[#FF8A30] text-black font-bold uppercase px-5 py-2.5 rounded-xl shadow-lg"
                >
                  Confirm Slot
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </CrmLayout>
  );
};

export default AdminCalendarPage;
