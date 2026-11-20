import React, { useState, useEffect } from 'react';
import CrmLayout from '../../components/crm/CrmLayout';
import { getStylists, saveStylist } from '../../services/crmApi';
import { useToast } from '../../components/crm/ToastContext';
import {
  UserCheck,
  Plus,
  Edit2,
  Calendar,
  X,
  Upload,
  Check
} from 'lucide-react';

const ALL_DAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

const AdminStylistsPage = () => {
  const [stylists, setStylists] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingStylistId, setEditingStylistId] = useState(null);

  // Form State
  const [name, setName] = useState('');
  const [role, setRole] = useState('');
  const [bio, setBio] = useState('');
  const [photo, setPhoto] = useState('https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&auto=format&fit=crop&q=80');
  const [audiences, setAudiences] = useState(['men']);
  const [workingDays, setWorkingDays] = useState(['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday']);

  const { addToast } = useToast();

  const loadData = async () => {
    try {
      const data = await getStylists();
      setStylists(data);
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleOpenAdd = () => {
    setEditingStylistId(null);
    setName('');
    setRole('Master Stylist');
    setBio('');
    setPhoto('https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&auto=format&fit=crop&q=80');
    setAudiences(['men']);
    setWorkingDays(['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday']);
    setModalOpen(true);
  };

  const handleOpenEdit = (st) => {
    setEditingStylistId(st.id);
    setName(st.name);
    setRole(st.role);
    setBio(st.bio);
    setPhoto(st.photo);
    setAudiences(st.audiences || ['men']);
    setWorkingDays(st.workingDays || []);
    setModalOpen(true);
  };

  const handleToggleDay = (day) => {
    setWorkingDays((prev) =>
      prev.includes(day) ? prev.filter((d) => d !== day) : [...prev, day]
    );
  };

  const handleToggleAudience = (aud) => {
    setAudiences((prev) =>
      prev.includes(aud) ? prev.filter((a) => a !== aud) : [...prev, aud]
    );
  };

  const handleSaveStylist = async (e) => {
    e.preventDefault();
    if (!name) return;

    try {
      await saveStylist({
        id: editingStylistId,
        name,
        role,
        bio,
        photo,
        audiences,
        workingDays,
        active: true
      });
      addToast(editingStylistId ? 'Stylist profile updated!' : 'New stylist added to team!', 'success');
      setModalOpen(false);
      loadData();
    } catch (e) {
      addToast('Error saving stylist', 'error');
    }
  };

  const handleToggleActive = async (st) => {
    try {
      await saveStylist({ ...st, active: !st.active });
      addToast(`Updated ${st.name} status`, 'info');
      loadData();
    } catch (e) {
      addToast('Error updating status', 'error');
    }
  };

  return (
    <CrmLayout pageTitle="Stylists & Staff">
      {/* Top Controls */}
      <div className="flex items-center justify-between gap-4 mb-6">
        <p className="text-xs text-zinc-400">
          Manage Meray salon master barbers, color specialists, working schedules, and categories
        </p>
        <button
          onClick={handleOpenAdd}
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#FF7A1A] hover:bg-[#FF8A30] text-black font-bold text-xs uppercase tracking-wider transition-all shadow-lg"
        >
          <Plus className="w-4 h-4" />
          <span>Add Stylist</span>
        </button>
      </div>

      {/* Stylist Profiles Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {stylists.map((st) => (
          <div
            key={st.id}
            className="bg-[#121215] border border-zinc-800/80 rounded-3xl p-6 shadow-xl flex flex-col justify-between group hover:border-zinc-700 transition-all"
          >
            <div>
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <img
                    src={st.photo}
                    alt={st.name}
                    className="w-14 h-14 rounded-2xl object-cover border-2 border-zinc-700"
                  />
                  <div>
                    <h3 className="text-xl font-thunder font-bold uppercase tracking-tight text-white">
                      {st.name}
                    </h3>
                    <span className="text-xs text-[#FF7A1A] font-semibold">{st.role}</span>
                  </div>
                </div>

                <button
                  onClick={() => handleToggleActive(st)}
                  className={`text-[10px] font-bold uppercase px-2.5 py-1 rounded-full ${
                    st.active ? 'bg-emerald-500 text-black' : 'bg-zinc-800 text-zinc-500'
                  }`}
                >
                  {st.active ? 'Active' : 'Off'}
                </button>
              </div>

              <p className="text-xs text-zinc-300 leading-relaxed italic mb-4">
                "{st.bio}"
              </p>

              {/* Audiences Served */}
              <div className="mb-4">
                <span className="text-[10px] uppercase font-bold text-zinc-500 block mb-1.5">
                  Audiences Served
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {st.audiences.map((aud) => (
                    <span
                      key={aud}
                      className="text-[10px] font-bold uppercase px-2.5 py-0.5 rounded-md bg-zinc-900 border border-zinc-800 text-zinc-300"
                    >
                      {aud}
                    </span>
                  ))}
                </div>
              </div>

              {/* Working Days */}
              <div>
                <span className="text-[10px] uppercase font-bold text-zinc-500 block mb-1.5">
                  Roster Schedule
                </span>
                <div className="flex flex-wrap gap-1">
                  {ALL_DAYS.map((day) => {
                    const isWorking = st.workingDays.includes(day);
                    return (
                      <span
                        key={day}
                        className={`text-[9px] font-bold px-2 py-0.5 rounded ${
                          isWorking
                            ? 'bg-[#FF7A1A]/20 text-[#FF7A1A] border border-[#FF7A1A]/30'
                            : 'bg-zinc-900 text-zinc-600'
                        }`}
                      >
                        {day.substring(0, 3)}
                      </span>
                    );
                  })}
                </div>
              </div>
            </div>

            <div className="pt-5 border-t border-zinc-800/60 mt-6 flex justify-end">
              <button
                onClick={() => handleOpenEdit(st)}
                className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-white text-xs font-semibold transition-colors"
              >
                <Edit2 className="w-3.5 h-3.5" />
                <span>Edit Profile</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Edit / Add Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-[9990] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in">
          <div className="bg-[#141417] border border-zinc-800 rounded-3xl max-w-md w-full p-6 shadow-2xl relative max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setModalOpen(false)}
              className="absolute top-4 right-4 text-zinc-400 hover:text-white p-1"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="text-xl font-thunder font-bold uppercase tracking-tight text-white mb-1">
              {editingStylistId ? 'Edit Stylist' : 'Add New Stylist'}
            </h3>
            <p className="text-xs text-zinc-400 mb-4">Set credentials, specialty, and weekly working days</p>

            <form onSubmit={handleSaveStylist} className="flex flex-col gap-3 text-xs">
              <div>
                <label className="block text-zinc-300 font-bold uppercase text-[10px] mb-1">
                  Stylist Name *
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Marcus Vance"
                  className="w-full bg-zinc-900 border border-zinc-700 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-[#FF7A1A]"
                />
              </div>

              <div>
                <label className="block text-zinc-300 font-bold uppercase text-[10px] mb-1">
                  Title / Role
                </label>
                <input
                  type="text"
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  placeholder="Master Barber, Color Director..."
                  className="w-full bg-zinc-900 border border-zinc-700 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-[#FF7A1A]"
                />
              </div>

              <div>
                <label className="block text-zinc-300 font-bold uppercase text-[10px] mb-1">
                  Bio / Specialties
                </label>
                <textarea
                  rows="2"
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                  placeholder="Experience, signature techniques..."
                  className="w-full bg-zinc-900 border border-zinc-700 rounded-xl p-3 text-white focus:outline-none focus:border-[#FF7A1A]"
                />
              </div>

              <div>
                <label className="block text-zinc-300 font-bold uppercase text-[10px] mb-1">
                  Photo URL
                </label>
                <input
                  type="url"
                  value={photo}
                  onChange={(e) => setPhoto(e.target.value)}
                  className="w-full bg-zinc-900 border border-zinc-700 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-[#FF7A1A]"
                />
              </div>

              {/* Audience toggles */}
              <div>
                <label className="block text-zinc-300 font-bold uppercase text-[10px] mb-1.5">
                  Audiences Served
                </label>
                <div className="flex flex-wrap gap-2">
                  {['men', 'women', 'girl', 'boy'].map((aud) => (
                    <button
                      type="button"
                      key={aud}
                      onClick={() => handleToggleAudience(aud)}
                      className={`px-3 py-1.5 rounded-xl font-bold uppercase text-xs transition-colors ${
                        audiences.includes(aud)
                          ? 'bg-[#FF7A1A] text-black'
                          : 'bg-zinc-900 text-zinc-500 border border-zinc-800'
                      }`}
                    >
                      {aud}
                    </button>
                  ))}
                </div>
              </div>

              {/* Working Days */}
              <div>
                <label className="block text-zinc-300 font-bold uppercase text-[10px] mb-1.5">
                  Working Days
                </label>
                <div className="flex flex-wrap gap-1.5">
                  {ALL_DAYS.map((day) => (
                    <button
                      type="button"
                      key={day}
                      onClick={() => handleToggleDay(day)}
                      className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition-colors ${
                        workingDays.includes(day)
                          ? 'bg-zinc-200 text-black'
                          : 'bg-zinc-900 text-zinc-600 border border-zinc-800'
                      }`}
                    >
                      {day.substring(0, 3)}
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex items-center justify-end gap-2 mt-4 pt-3 border-t border-zinc-800">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="px-4 py-2 text-zinc-400 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-[#FF7A1A] hover:bg-[#FF8A30] text-black font-bold uppercase px-5 py-2.5 rounded-xl shadow-lg"
                >
                  Save Stylist
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </CrmLayout>
  );
};

export default AdminStylistsPage;
