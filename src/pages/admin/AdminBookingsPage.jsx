import React, { useState, useEffect } from 'react';
import CrmLayout from '../../components/crm/CrmLayout';
import ConfirmModal from '../../components/crm/ConfirmModal';
import {
  getBookings,
  updateBookingStatus,
  deleteBooking,
  rescheduleBooking,
  createBooking,
  getStylists,
  getServices
} from '../../services/crmApi';
import { useToast } from '../../components/crm/ToastContext';
import {
  Search,
  Filter,
  Download,
  Plus,
  Phone,
  Clock,
  Calendar as CalendarIcon,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  Scissors,
  User,
  X
} from 'lucide-react';

const AUDIENCE_COLORS = {
  men: '#F5A623',
  women: '#E54C43',
  girl: '#9B59B6',
  boy: '#3FA8D6'
};

const AdminBookingsPage = () => {
  const [bookings, setBookings] = useState([]);
  const [stylists, setStylists] = useState([]);
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);

  // Filters & Search
  const [activeTab, setActiveTab] = useState('all'); // all | today | upcoming | past
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedAudience, setSelectedAudience] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [selectedStylist, setSelectedStylist] = useState('all');
  const [dateFilter, setDateFilter] = useState('');

  // Modals state
  const [confirmDeleteId, setConfirmDeleteId] = useState(null);
  const [rescheduleBookingTarget, setRescheduleBookingTarget] = useState(null);
  const [rescheduleDate, setRescheduleDate] = useState('');
  const [rescheduleTime, setRescheduleTime] = useState('10:00 AM');
  const [newBookingModalOpen, setNewBookingModalOpen] = useState(false);

  // New Booking Wizard Form
  const [newClientName, setNewClientName] = useState('');
  const [newPhone, setNewPhone] = useState('');
  const [newAudience, setNewAudience] = useState('men');
  const [newService, setNewService] = useState('');
  const [newStylistId, setNewStylistId] = useState('');
  const [newDate, setNewDate] = useState(new Date().toISOString().split('T')[0]);
  const [newTime, setNewTime] = useState('11:00 AM');
  const [newNotes, setNewNotes] = useState('');

  const { addToast } = useToast();

  const loadAll = async () => {
    try {
      setLoading(true);
      const [b, st, sr] = await Promise.all([getBookings(), getStylists(), getServices()]);
      setBookings(b);
      setStylists(st);
      setServices(sr);
      if (st.length > 0) setNewStylistId(st[0].id);
      if (sr.length > 0) setNewService(sr[0].name);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadAll();
  }, []);

  const todayStr = new Date().toISOString().split('T')[0];

  // Filtering logic
  const filteredBookings = bookings.filter((b) => {
    // Quick Tab filter
    if (activeTab === 'today' && b.date !== todayStr) return false;
    if (activeTab === 'upcoming' && b.date < todayStr) return false;
    if (activeTab === 'past' && b.date >= todayStr) return false;

    // Date picker filter
    if (dateFilter && b.date !== dateFilter) return false;

    // Audience filter
    if (selectedAudience !== 'all' && b.audience !== selectedAudience) return false;

    // Status filter
    if (selectedStatus !== 'all' && b.status !== selectedStatus) return false;

    // Stylist filter
    if (selectedStylist !== 'all' && b.stylistId !== selectedStylist) return false;

    // Search query (name, phone, ref, service)
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const match =
        b.clientName.toLowerCase().includes(q) ||
        b.phone.toLowerCase().includes(q) ||
        (b.ref && b.ref.toLowerCase().includes(q)) ||
        b.service.toLowerCase().includes(q);
      if (!match) return false;
    }

    return true;
  });

  const handleStatusChange = async (id, status) => {
    try {
      await updateBookingStatus(id, status);
      addToast(`Booking marked as ${status}`, 'success');
      loadAll();
    } catch (e) {
      addToast('Error updating status', 'error');
    }
  };

  const handleConfirmDelete = async () => {
    if (!confirmDeleteId) return;
    try {
      await deleteBooking(confirmDeleteId);
      addToast('Booking deleted', 'info');
      setConfirmDeleteId(null);
      loadAll();
    } catch (e) {
      addToast('Error deleting booking', 'error');
    }
  };

  const handleConfirmReschedule = async () => {
    if (!rescheduleBookingTarget || !rescheduleDate || !rescheduleTime) return;
    try {
      await rescheduleBooking(rescheduleBookingTarget.id, rescheduleDate, rescheduleTime);
      addToast(`Booking rescheduled to ${rescheduleDate} at ${rescheduleTime}`, 'success');
      setRescheduleBookingTarget(null);
      loadAll();
    } catch (e) {
      addToast('Error rescheduling booking', 'error');
    }
  };

  const handleCreateNewBooking = async (e) => {
    e.preventDefault();
    if (!newClientName || !newPhone) {
      addToast('Please provide client name and phone', 'error');
      return;
    }
    const stylistObj = stylists.find((s) => s.id === newStylistId) || stylists[0];
    const serviceObj = services.find((s) => s.name === newService) || services[0];

    try {
      await createBooking({
        clientName: newClientName,
        phone: newPhone,
        audience: newAudience,
        service: newService || 'Haircut & Styling',
        style: 'Custom Salon Style',
        stylistId: stylistObj?.id || 'stylist-1',
        stylistName: stylistObj?.name || 'Marcus Vance',
        date: newDate,
        time: newTime,
        price: serviceObj?.price || 35,
        status: 'confirmed',
        notes: newNotes || 'Phone/Walk-in appointment'
      });

      addToast(`New booking confirmed for ${newClientName}!`, 'success');
      setNewBookingModalOpen(false);
      setNewClientName('');
      setNewPhone('');
      setNewNotes('');
      loadAll();
    } catch (e) {
      addToast('Failed to create booking', 'error');
    }
  };

  const handleExportCSV = () => {
    const headers = ['Reference,Client Name,Phone,Audience,Service,Stylist,Date,Time,Price,Status,Notes'];
    const rows = filteredBookings.map((b) =>
      `"${b.ref || ''}","${b.clientName}","${b.phone}","${b.audience}","${b.service}","${b.stylistName}","${b.date}","${b.time}","$${b.price}","${b.status}","${b.notes || ''}"`
    );
    const csvContent = 'data:text/csv;charset=utf-8,' + [headers, ...rows].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `meray_bookings_${todayStr}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    addToast('Bookings exported to CSV', 'success');
  };

  return (
    <CrmLayout pageTitle="Salon Bookings">
      {/* Top Controls: Search, New Booking & Export */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 mb-6">
        {/* Search Input */}
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 text-zinc-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search client, phone, ref or service..."
            className="w-full bg-[#141417] border border-zinc-800 rounded-xl pl-10 pr-4 py-2.5 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-[#FF7A1A] transition-colors"
          />
        </div>

        <div className="flex items-center gap-2.5">
          <button
            onClick={handleExportCSV}
            className="flex items-center gap-1.5 px-3 py-2.5 rounded-xl bg-zinc-900 border border-zinc-800 text-zinc-300 hover:text-white hover:bg-zinc-800 transition-colors text-xs font-semibold"
            title="Download CSV report"
          >
            <Download className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Export CSV</span>
          </button>

          <button
            onClick={() => setNewBookingModalOpen(true)}
            className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-[#FF7A1A] hover:bg-[#FF8A30] text-black font-bold text-xs uppercase tracking-wider transition-all shadow-lg shadow-[#FF7A1A]/20"
          >
            <Plus className="w-4 h-4" />
            <span>New Booking</span>
          </button>
        </div>
      </div>

      {/* Filter Tabs & Dropdowns */}
      <div className="bg-[#121215] border border-zinc-800/80 rounded-2xl p-3 sm:p-4 mb-6 flex flex-wrap items-center justify-between gap-3">
        {/* Quick Tabs */}
        <div className="flex items-center gap-1 bg-zinc-900 p-1 rounded-xl border border-zinc-800 text-xs">
          {[
            { id: 'all', label: 'All' },
            { id: 'today', label: 'Today' },
            { id: 'upcoming', label: 'Upcoming' },
            { id: 'past', label: 'Past' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-3 py-1.5 rounded-lg font-bold transition-all ${
                activeTab === tab.id
                  ? 'bg-[#FF7A1A] text-black shadow-sm'
                  : 'text-zinc-400 hover:text-white'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Filters Grid */}
        <div className="flex flex-wrap items-center gap-2 text-xs">
          {/* Audience Filter */}
          <select
            value={selectedAudience}
            onChange={(e) => setSelectedAudience(e.target.value)}
            className="bg-zinc-900 border border-zinc-800 text-zinc-300 rounded-xl px-3 py-1.5 focus:outline-none focus:border-[#FF7A1A]"
          >
            <option value="all">All Audiences</option>
            <option value="men">Men</option>
            <option value="women">Women</option>
            <option value="girl">Girl</option>
            <option value="boy">Boy</option>
          </select>

          {/* Status Filter */}
          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="bg-zinc-900 border border-zinc-800 text-zinc-300 rounded-xl px-3 py-1.5 focus:outline-none focus:border-[#FF7A1A]"
          >
            <option value="all">All Statuses</option>
            <option value="pending">Pending</option>
            <option value="confirmed">Confirmed</option>
            <option value="completed">Completed</option>
            <option value="cancelled">Cancelled</option>
            <option value="no_show">No Show</option>
          </select>

          {/* Stylist Filter */}
          <select
            value={selectedStylist}
            onChange={(e) => setSelectedStylist(e.target.value)}
            className="bg-zinc-900 border border-zinc-800 text-zinc-300 rounded-xl px-3 py-1.5 focus:outline-none focus:border-[#FF7A1A]"
          >
            <option value="all">All Stylists</option>
            {stylists.map((st) => (
              <option key={st.id} value={st.id}>
                {st.name}
              </option>
            ))}
          </select>

          {/* Date filter */}
          <input
            type="date"
            value={dateFilter}
            onChange={(e) => setDateFilter(e.target.value)}
            className="bg-zinc-900 border border-zinc-800 text-zinc-300 rounded-xl px-3 py-1.5 focus:outline-none focus:border-[#FF7A1A]"
          />

          {dateFilter && (
            <button
              onClick={() => setDateFilter('')}
              className="text-zinc-500 hover:text-white p-1"
              title="Clear date"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      {/* Bookings List Table */}
      <div className="bg-[#121215] border border-zinc-800/80 rounded-3xl overflow-hidden shadow-2xl">
        {filteredBookings.length === 0 ? (
          <div className="py-16 text-center text-zinc-500 text-sm">
            No bookings match your current filter criteria.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-[#17171C] border-b border-zinc-800/80 text-zinc-400 font-bold uppercase tracking-wider text-[10px]">
                <tr>
                  <th className="py-3.5 px-4">Ref / Client</th>
                  <th className="py-3.5 px-4">Date & Time</th>
                  <th className="py-3.5 px-4">Service & Style</th>
                  <th className="py-3.5 px-4">Stylist</th>
                  <th className="py-3.5 px-4">Price</th>
                  <th className="py-3.5 px-4">Status</th>
                  <th className="py-3.5 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-800/50">
                {filteredBookings.map((b) => {
                  const audColor = AUDIENCE_COLORS[b.audience] || '#FF7A1A';
                  return (
                    <tr key={b.id} className="hover:bg-zinc-900/50 transition-colors">
                      {/* Client Info */}
                      <td className="py-3.5 px-4">
                        <div className="flex items-center gap-2.5">
                          <span
                            className="w-2 h-8 rounded-full flex-shrink-0"
                            style={{ backgroundColor: audColor }}
                          />
                          <div>
                            <div className="font-bold text-white flex items-center gap-2">
                              <span>{b.clientName}</span>
                              <span className="text-[10px] font-mono text-zinc-500">{b.ref}</span>
                            </div>
                            <a
                              href={`tel:${b.phone}`}
                              className="text-[11px] text-zinc-400 hover:text-[#FF7A1A] flex items-center gap-1 mt-0.5 transition-colors"
                            >
                              <Phone className="w-3 h-3" />
                              <span>{b.phone}</span>
                            </a>
                          </div>
                        </div>
                      </td>

                      {/* Date & Time */}
                      <td className="py-3.5 px-4">
                        <div className="text-white font-semibold">{b.time}</div>
                        <div className="text-[11px] text-zinc-400">{b.date}</div>
                      </td>

                      {/* Service & Style */}
                      <td className="py-3.5 px-4">
                        <div className="text-white font-medium">{b.service}</div>
                        <div className="text-[11px] text-zinc-500 italic">{b.notes || b.style}</div>
                      </td>

                      {/* Stylist */}
                      <td className="py-3.5 px-4 text-zinc-300 font-medium">
                        {b.stylistName}
                      </td>

                      {/* Price */}
                      <td className="py-3.5 px-4 font-thunder font-bold text-base text-white">
                        ${b.price}
                      </td>

                      {/* Status */}
                      <td className="py-3.5 px-4">
                        <span
                          className={`text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-md inline-block ${
                            b.status === 'completed'
                              ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                              : b.status === 'confirmed'
                              ? 'bg-blue-500/10 text-blue-400 border border-blue-500/20'
                              : b.status === 'cancelled'
                              ? 'bg-red-500/10 text-red-400 border border-red-500/20'
                              : b.status === 'no_show'
                              ? 'bg-purple-500/10 text-purple-400 border border-purple-500/20'
                              : 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                          }`}
                        >
                          {b.status.replace('_', ' ')}
                        </span>
                      </td>

                      {/* Action buttons */}
                      <td className="py-3.5 px-4 text-right">
                        <div className="flex items-center justify-end gap-1.5">
                          {b.status === 'pending' && (
                            <button
                              onClick={() => handleStatusChange(b.id, 'confirmed')}
                              className="px-2.5 py-1 rounded-lg bg-[#FF7A1A]/15 text-[#FF7A1A] hover:bg-[#FF7A1A] hover:text-black font-bold text-[11px] transition-colors"
                            >
                              Confirm
                            </button>
                          )}
                          {b.status === 'confirmed' && (
                            <button
                              onClick={() => handleStatusChange(b.id, 'completed')}
                              className="px-2.5 py-1 rounded-lg bg-emerald-500/15 text-emerald-400 hover:bg-emerald-500 hover:text-black font-bold text-[11px] transition-colors"
                            >
                              Done
                            </button>
                          )}
                          <button
                            onClick={() => {
                              setRescheduleBookingTarget(b);
                              setRescheduleDate(b.date);
                              setRescheduleTime(b.time);
                            }}
                            className="px-2 py-1 rounded-lg bg-zinc-800 text-zinc-300 hover:text-white font-medium text-[11px] transition-colors"
                          >
                            Reschedule
                          </button>
                          <button
                            onClick={() => setConfirmDeleteId(b.id)}
                            className="px-2 py-1 rounded-lg bg-red-500/10 text-red-400 hover:bg-red-500 hover:text-white font-medium text-[11px] transition-colors"
                          >
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* =====================================================================
          NEW BOOKING MODAL (WALK-IN / PHONE WIZARD)
         ===================================================================== */}
      {newBookingModalOpen && (
        <div className="fixed inset-0 z-[9990] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in">
          <div className="bg-[#141417] border border-zinc-800 rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl relative">
            <button
              onClick={() => setNewBookingModalOpen(false)}
              className="absolute top-5 right-5 text-zinc-400 hover:text-white p-1 rounded-lg hover:bg-zinc-800"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="text-2xl font-thunder font-bold uppercase tracking-tight text-white mb-1">
              New Salon Booking
            </h3>
            <p className="text-xs text-zinc-400 mb-6">Create a walk-in or direct phone appointment</p>

            <form onSubmit={handleCreateNewBooking} className="flex flex-col gap-4 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-zinc-300 font-bold uppercase text-[10px] mb-1">
                    Client Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={newClientName}
                    onChange={(e) => setNewClientName(e.target.value)}
                    placeholder="e.g. John Doe"
                    className="w-full bg-zinc-900 border border-zinc-700 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-[#FF7A1A]"
                  />
                </div>
                <div>
                  <label className="block text-zinc-300 font-bold uppercase text-[10px] mb-1">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    required
                    value={newPhone}
                    onChange={(e) => setNewPhone(e.target.value)}
                    placeholder="(847) 555-0199"
                    className="w-full bg-zinc-900 border border-zinc-700 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-[#FF7A1A]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-zinc-300 font-bold uppercase text-[10px] mb-1">
                    Audience Category
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
                    Stylist
                  </label>
                  <select
                    value={newStylistId}
                    onChange={(e) => setNewStylistId(e.target.value)}
                    className="w-full bg-zinc-900 border border-zinc-700 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-[#FF7A1A]"
                  >
                    {stylists.map((st) => (
                      <option key={st.id} value={st.id}>
                        {st.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-zinc-300 font-bold uppercase text-[10px] mb-1">
                  Service
                </label>
                <select
                  value={newService}
                  onChange={(e) => setNewService(e.target.value)}
                  className="w-full bg-zinc-900 border border-zinc-700 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-[#FF7A1A]"
                >
                  {services
                    .filter((s) => s.audience === newAudience)
                    .map((s) => (
                      <option key={s.id} value={s.name}>
                        {s.name} (${s.price})
                      </option>
                    ))}
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-zinc-300 font-bold uppercase text-[10px] mb-1">
                    Date
                  </label>
                  <input
                    type="date"
                    required
                    value={newDate}
                    onChange={(e) => setNewDate(e.target.value)}
                    className="w-full bg-zinc-900 border border-zinc-700 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-[#FF7A1A]"
                  />
                </div>
                <div>
                  <label className="block text-zinc-300 font-bold uppercase text-[10px] mb-1">
                    Time Slot
                  </label>
                  <select
                    value={newTime}
                    onChange={(e) => setNewTime(e.target.value)}
                    className="w-full bg-zinc-900 border border-zinc-700 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-[#FF7A1A]"
                  >
                    {[
                      '09:00 AM',
                      '09:30 AM',
                      '10:00 AM',
                      '10:30 AM',
                      '11:00 AM',
                      '11:30 AM',
                      '12:00 PM',
                      '01:00 PM',
                      '01:30 PM',
                      '02:00 PM',
                      '02:30 PM',
                      '03:00 PM',
                      '03:30 PM',
                      '04:00 PM',
                      '04:30 PM',
                      '05:00 PM',
                      '05:30 PM',
                      '06:00 PM',
                    ].map((t) => (
                      <option key={t} value={t}>
                        {t}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-zinc-300 font-bold uppercase text-[10px] mb-1">
                  Notes / Requests
                </label>
                <textarea
                  rows="2"
                  value={newNotes}
                  onChange={(e) => setNewNotes(e.target.value)}
                  placeholder="Special instructions, hair texture, etc."
                  className="w-full bg-zinc-900 border border-zinc-700 rounded-xl p-3 text-white focus:outline-none focus:border-[#FF7A1A]"
                />
              </div>

              <div className="flex items-center justify-end gap-3 mt-4 pt-4 border-t border-zinc-800">
                <button
                  type="button"
                  onClick={() => setNewBookingModalOpen(false)}
                  className="px-4 py-2 text-zinc-400 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-[#FF7A1A] hover:bg-[#FF8A30] text-black font-bold uppercase px-6 py-2.5 rounded-xl shadow-lg shadow-[#FF7A1A]/20"
                >
                  Confirm Appointment
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* =====================================================================
          RESCHEDULE MODAL
         ===================================================================== */}
      {rescheduleBookingTarget && (
        <div className="fixed inset-0 z-[9990] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in">
          <div className="bg-[#141417] border border-zinc-800 rounded-3xl max-w-sm w-full p-6 shadow-2xl relative">
            <button
              onClick={() => setRescheduleBookingTarget(null)}
              className="absolute top-4 right-4 text-zinc-400 hover:text-white p-1"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="text-xl font-thunder font-bold uppercase tracking-tight text-white mb-1">
              Reschedule Appointment
            </h3>
            <p className="text-xs text-zinc-400 mb-4">
              {rescheduleBookingTarget.clientName} ({rescheduleBookingTarget.service})
            </p>

            <div className="flex flex-col gap-3 text-xs mb-6">
              <div>
                <label className="block text-zinc-400 font-bold uppercase text-[10px] mb-1">
                  Select New Date
                </label>
                <input
                  type="date"
                  value={rescheduleDate}
                  onChange={(e) => setRescheduleDate(e.target.value)}
                  className="w-full bg-zinc-900 border border-zinc-700 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-[#FF7A1A]"
                />
              </div>

              <div>
                <label className="block text-zinc-400 font-bold uppercase text-[10px] mb-1">
                  Select Free Slot
                </label>
                <select
                  value={rescheduleTime}
                  onChange={(e) => setRescheduleTime(e.target.value)}
                  className="w-full bg-zinc-900 border border-zinc-700 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-[#FF7A1A]"
                >
                  {[
                    '09:00 AM',
                    '10:00 AM',
                    '11:00 AM',
                    '01:00 PM',
                    '02:00 PM',
                    '03:00 PM',
                    '04:00 PM',
                    '05:00 PM',
                  ].map((t) => (
                    <option key={t} value={t}>
                      {t}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="flex items-center justify-end gap-2">
              <button
                onClick={() => setRescheduleBookingTarget(null)}
                className="px-4 py-2 text-zinc-400 hover:text-white text-xs font-semibold"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmReschedule}
                className="bg-[#FF7A1A] hover:bg-[#FF8A30] text-black font-bold uppercase text-xs px-5 py-2.5 rounded-xl shadow-lg"
              >
                Save New Time
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      <ConfirmModal
        isOpen={!!confirmDeleteId}
        title="Delete Appointment"
        message="Are you sure you want to permanently delete this booking record? This action cannot be undone."
        confirmText="Delete Booking"
        onConfirm={handleConfirmDelete}
        onCancel={() => setConfirmDeleteId(null)}
        isDanger={true}
      />
    </CrmLayout>
  );
};

export default AdminBookingsPage;
