import React, { useState, useEffect } from 'react';
import CrmLayout from '../../components/crm/CrmLayout';
import { getCustomers, updateCustomerNotes, getBookings } from '../../services/crmApi';
import { useToast } from '../../components/crm/ToastContext';
import {
  Search,
  User,
  Phone,
  Mail,
  Calendar,
  DollarSign,
  Heart,
  Save,
  X,
  Plus
} from 'lucide-react';

const AdminCustomersPage = () => {
  const [customers, setCustomers] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [editableNotes, setEditableNotes] = useState('');
  const [savingNotes, setSavingNotes] = useState(false);
  const { addToast } = useToast();

  const loadData = async () => {
    try {
      const [c, b] = await Promise.all([getCustomers(), getBookings()]);
      setCustomers(c);
      setBookings(b);
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleSelectCustomer = (cust) => {
    setSelectedCustomer(cust);
    setEditableNotes(cust.notes || '');
  };

  const handleSaveNotes = async () => {
    if (!selectedCustomer) return;
    try {
      setSavingNotes(true);
      await updateCustomerNotes(selectedCustomer.id, editableNotes);
      addToast('Customer notes updated', 'success');
      loadData();
      setSelectedCustomer((prev) => (prev ? { ...prev, notes: editableNotes } : null));
    } catch (e) {
      addToast('Failed to save notes', 'error');
    } finally {
      setSavingNotes(false);
    }
  };

  const filtered = customers.filter((c) => {
    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase();
    return (
      c.name.toLowerCase().includes(q) ||
      c.phone.toLowerCase().includes(q) ||
      c.email.toLowerCase().includes(q) ||
      (c.favoriteService && c.favoriteService.toLowerCase().includes(q))
    );
  });

  // Client past bookings
  const clientBookings = selectedCustomer
    ? bookings.filter((b) => b.clientName.includes(selectedCustomer.name.split(' ')[0]))
    : [];

  return (
    <CrmLayout pageTitle="Client Directory">
      {/* Top Search Controls */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 mb-6">
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 text-zinc-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by client name, phone, email or favorite service..."
            className="w-full bg-[#141417] border border-zinc-800 rounded-xl pl-10 pr-4 py-2.5 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-[#FF7A1A] transition-colors"
          />
        </div>

        <div className="text-xs text-zinc-400 font-medium">
          Showing <strong className="text-white">{filtered.length}</strong> registered clients
        </div>
      </div>

      {/* Customers Table / Cards */}
      <div className="bg-[#121215] border border-zinc-800/80 rounded-3xl overflow-hidden shadow-2xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#17171C] border-b border-zinc-800/80 text-zinc-400 font-bold uppercase tracking-wider text-[10px]">
              <tr>
                <th className="py-3.5 px-4">Client</th>
                <th className="py-3.5 px-4">Contact</th>
                <th className="py-3.5 px-4">Visits</th>
                <th className="py-3.5 px-4">Total Spent</th>
                <th className="py-3.5 px-4">Favorite Service</th>
                <th className="py-3.5 px-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-800/50">
              {filtered.map((c) => (
                <tr
                  key={c.id}
                  onClick={() => handleSelectCustomer(c)}
                  className="hover:bg-zinc-900/50 transition-colors cursor-pointer"
                >
                  <td className="py-3.5 px-4">
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-full bg-[#FF7A1A]/15 border border-[#FF7A1A]/30 flex items-center justify-center font-thunder text-xs font-bold text-[#FF7A1A]">
                        {c.name.charAt(0)}
                      </div>
                      <div>
                        <div className="font-bold text-white">{c.name}</div>
                        <div className="text-[10px] text-zinc-500">Member since {c.createdAt}</div>
                      </div>
                    </div>
                  </td>

                  <td className="py-3.5 px-4">
                    <div className="text-zinc-300 font-medium">{c.phone}</div>
                    <div className="text-[11px] text-zinc-500">{c.email}</div>
                  </td>

                  <td className="py-3.5 px-4">
                    <span className="font-bold text-white bg-zinc-800 px-2 py-0.5 rounded-md">
                      {c.visits} visits
                    </span>
                  </td>

                  <td className="py-3.5 px-4 font-thunder font-bold text-base text-white">
                    ${c.totalSpent}
                  </td>

                  <td className="py-3.5 px-4">
                    <span className="text-zinc-300 font-medium">{c.favoriteService}</span>
                  </td>

                  <td className="py-3.5 px-4 text-right">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleSelectCustomer(c);
                      }}
                      className="px-3 py-1 rounded-lg bg-zinc-800 hover:bg-[#FF7A1A] hover:text-black text-zinc-300 font-semibold text-[11px] transition-colors"
                    >
                      View Profile
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* =====================================================================
          CUSTOMER PROFILE DRAWER
         ===================================================================== */}
      {selectedCustomer && (
        <div className="fixed inset-0 z-[9990] flex items-center justify-end bg-black/70 backdrop-blur-sm animate-fade-in">
          <div className="bg-[#141417] border-l border-zinc-800 w-full max-w-md h-full p-6 sm:p-8 flex flex-col justify-between shadow-2xl overflow-y-auto">
            <div>
              <div className="flex items-center justify-between pb-4 border-b border-zinc-800 mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-[#FF7A1A]/20 border border-[#FF7A1A]/40 flex items-center justify-center font-thunder text-xl font-bold text-[#FF7A1A]">
                    {selectedCustomer.name.charAt(0)}
                  </div>
                  <div>
                    <h3 className="text-xl font-thunder font-bold uppercase tracking-tight text-white">
                      {selectedCustomer.name}
                    </h3>
                    <span className="text-[10px] text-zinc-400">
                      ID: {selectedCustomer.id} • Joined {selectedCustomer.createdAt}
                    </span>
                  </div>
                </div>

                <button
                  onClick={() => setSelectedCustomer(null)}
                  className="p-2 text-zinc-400 hover:text-white rounded-lg hover:bg-zinc-800"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="flex flex-col gap-4 text-xs">
                {/* Contact box */}
                <div className="p-4 rounded-2xl bg-zinc-900/60 border border-zinc-800 flex flex-col gap-2">
                  <span className="text-zinc-500 text-[10px] uppercase font-bold">Contact Info</span>
                  <a
                    href={`tel:${selectedCustomer.phone}`}
                    className="flex items-center gap-2 text-white font-semibold hover:text-[#FF7A1A] transition-colors"
                  >
                    <Phone className="w-3.5 h-3.5 text-[#FF7A1A]" />
                    <span>{selectedCustomer.phone}</span>
                  </a>
                  <a
                    href={`mailto:${selectedCustomer.email}`}
                    className="flex items-center gap-2 text-zinc-400 hover:text-white transition-colors"
                  >
                    <Mail className="w-3.5 h-3.5 text-zinc-500" />
                    <span>{selectedCustomer.email}</span>
                  </a>
                </div>

                {/* Metrics */}
                <div className="grid grid-cols-2 gap-3">
                  <div className="p-4 rounded-2xl bg-zinc-900/60 border border-zinc-800">
                    <span className="text-zinc-500 text-[10px] uppercase font-bold">Total Visits</span>
                    <div className="text-xl font-thunder font-bold text-white mt-1">
                      {selectedCustomer.visits}
                    </div>
                  </div>
                  <div className="p-4 rounded-2xl bg-zinc-900/60 border border-zinc-800">
                    <span className="text-zinc-500 text-[10px] uppercase font-bold">Lifetime Spend</span>
                    <div className="text-xl font-thunder font-bold text-[#FF7A1A] mt-1">
                      ${selectedCustomer.totalSpent}
                    </div>
                  </div>
                </div>

                {/* Favorite Service */}
                <div className="p-4 rounded-2xl bg-zinc-900/60 border border-zinc-800 flex items-center justify-between">
                  <div>
                    <span className="text-zinc-500 text-[10px] uppercase font-bold">Preferred Service</span>
                    <div className="text-sm font-bold text-white mt-0.5">
                      {selectedCustomer.favoriteService}
                    </div>
                  </div>
                  <Heart className="w-5 h-5 text-[#FF7A1A]" />
                </div>

                {/* Editable Notes */}
                <div className="p-4 rounded-2xl bg-zinc-900/60 border border-zinc-800">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-zinc-500 text-[10px] uppercase font-bold">
                      Stylist Notes / Preferences
                    </span>
                    <button
                      onClick={handleSaveNotes}
                      disabled={savingNotes}
                      className="flex items-center gap-1 text-[10px] font-bold uppercase text-[#FF7A1A] hover:underline"
                    >
                      <Save className="w-3 h-3" />
                      <span>{savingNotes ? 'Saving...' : 'Save Notes'}</span>
                    </button>
                  </div>
                  <textarea
                    rows="3"
                    value={editableNotes}
                    onChange={(e) => setEditableNotes(e.target.value)}
                    className="w-full bg-zinc-950 border border-zinc-800 rounded-xl p-3 text-xs text-white focus:outline-none focus:border-[#FF7A1A] resize-none"
                    placeholder="Add formula, scalp notes, favorite coffee, etc."
                  />
                </div>
              </div>
            </div>

            <div className="pt-6 border-t border-zinc-800 flex gap-2">
              <a
                href={`tel:${selectedCustomer.phone}`}
                className="flex-1 py-3 bg-[#FF7A1A] hover:bg-[#FF8A30] text-black font-bold text-xs uppercase tracking-wider rounded-xl text-center shadow-lg transition-all"
              >
                Call Client
              </a>
              <button
                onClick={() => setSelectedCustomer(null)}
                className="px-5 py-3 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-white font-semibold text-xs"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </CrmLayout>
  );
};

export default AdminCustomersPage;
