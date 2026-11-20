import React, { useState, useEffect } from 'react';
import CrmLayout from '../../components/crm/CrmLayout';
import ConfirmModal from '../../components/crm/ConfirmModal';
import { getSettings, saveSettings, resetDemoData } from '../../services/crmApi';
import { useToast } from '../../components/crm/ToastContext';
import {
  Settings,
  Clock,
  MapPin,
  Phone,
  Mail,
  Instagram,
  RotateCcw,
  Save,
  Check,
  Sparkles,
  Sliders
} from 'lucide-react';

const AdminSettingsPage = () => {
  const [settings, setSettings] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [resetModalOpen, setResetModalOpen] = useState(false);

  const { addToast } = useToast();

  const loadData = async () => {
    try {
      setLoading(true);
      const data = await getSettings();
      setSettings(data);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleHourChange = (index, field, value) => {
    setSettings((prev) => {
      const updatedHours = [...prev.hours];
      updatedHours[index] = { ...updatedHours[index], [field]: value };
      return { ...prev, hours: updatedHours };
    });
  };

  const handleHeroTextChange = (aud, field, value) => {
    setSettings((prev) => ({
      ...prev,
      heroTexts: {
        ...prev.heroTexts,
        [aud]: {
          ...prev.heroTexts[aud],
          [field]: value
        }
      }
    }));
  };

  const handleWordsChange = (aud, wordIndex, value) => {
    setSettings((prev) => {
      const currentWords = [...(prev.heroTexts[aud]?.words || [])];
      currentWords[wordIndex] = value.toUpperCase();
      return {
        ...prev,
        heroTexts: {
          ...prev.heroTexts,
          [aud]: {
            ...prev.heroTexts[aud],
            words: currentWords
          }
        }
      };
    });
  };

  const handleSaveAll = async (e) => {
    e.preventDefault();
    if (!settings) return;
    try {
      setSaving(true);
      await saveSettings(settings);
      addToast('Salon settings & hero texts saved live!', 'success');
    } catch (e) {
      addToast('Error saving settings', 'error');
    } finally {
      setSaving(false);
    }
  };

  const handleResetData = async () => {
    try {
      await resetDemoData();
      addToast('All demo CRM and website data reset to defaults!', 'info');
      setResetModalOpen(false);
      loadData();
    } catch (e) {
      addToast('Error resetting demo data', 'error');
    }
  };

  if (loading || !settings) {
    return (
      <CrmLayout pageTitle="Salon Settings">
        <div className="py-20 text-center text-zinc-500 text-sm">Loading salon configuration...</div>
      </CrmLayout>
    );
  }

  return (
    <CrmLayout pageTitle="Salon Settings & Configuration">
      <form onSubmit={handleSaveAll} className="flex flex-col gap-8">
        {/* Top Sticky Action Bar */}
        <div className="flex items-center justify-between bg-[#121215] border border-zinc-800/80 p-4 rounded-2xl">
          <div>
            <h2 className="text-xl font-thunder font-bold uppercase tracking-tight text-white">
              Salon Controls
            </h2>
            <p className="text-xs text-zinc-400">
              Changes reflect instantly across the public website and CRM
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setResetModalOpen(true)}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-red-500/10 text-red-400 hover:bg-red-500 hover:text-white transition-colors text-xs font-bold"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset Demo Data</span>
            </button>

            <button
              type="submit"
              disabled={saving}
              className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-[#FF7A1A] hover:bg-[#FF8A30] text-black font-bold text-xs uppercase tracking-wider transition-all shadow-lg shadow-[#FF7A1A]/20 disabled:opacity-50"
            >
              <Save className="w-4 h-4" />
              <span>{saving ? 'Saving...' : 'Save All Settings'}</span>
            </button>
          </div>
        </div>

        {/* 1. GENERAL CONTACT & LOCATION */}
        <div className="bg-[#121215] border border-zinc-800/80 rounded-3xl p-6 sm:p-8 shadow-xl">
          <h3 className="text-xl font-thunder font-bold uppercase tracking-tight text-white mb-4 flex items-center gap-2">
            <MapPin className="w-5 h-5 text-[#FF7A1A]" />
            <span>Salon Location & Contact Information</span>
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div>
              <label className="block text-zinc-300 font-bold uppercase text-[10px] mb-1">
                Salon Name
              </label>
              <input
                type="text"
                value={settings.salonName}
                onChange={(e) => setSettings({ ...settings, salonName: e.target.value })}
                className="w-full bg-zinc-900 border border-zinc-700 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-[#FF7A1A]"
              />
            </div>

            <div>
              <label className="block text-zinc-300 font-bold uppercase text-[10px] mb-1">
                Physical Address
              </label>
              <input
                type="text"
                value={settings.address}
                onChange={(e) => setSettings({ ...settings, address: e.target.value })}
                className="w-full bg-zinc-900 border border-zinc-700 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-[#FF7A1A]"
              />
            </div>

            <div>
              <label className="block text-zinc-300 font-bold uppercase text-[10px] mb-1">
                Phone Number
              </label>
              <input
                type="text"
                value={settings.phone}
                onChange={(e) => setSettings({ ...settings, phone: e.target.value })}
                className="w-full bg-zinc-900 border border-zinc-700 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-[#FF7A1A]"
              />
            </div>

            <div>
              <label className="block text-zinc-300 font-bold uppercase text-[10px] mb-1">
                Email Address
              </label>
              <input
                type="email"
                value={settings.email}
                onChange={(e) => setSettings({ ...settings, email: e.target.value })}
                className="w-full bg-zinc-900 border border-zinc-700 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-[#FF7A1A]"
              />
            </div>

            <div>
              <label className="block text-zinc-300 font-bold uppercase text-[10px] mb-1">
                Instagram Handle
              </label>
              <input
                type="text"
                value={settings.instagram}
                onChange={(e) => setSettings({ ...settings, instagram: e.target.value })}
                className="w-full bg-zinc-900 border border-zinc-700 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-[#FF7A1A]"
              />
            </div>

            <div>
              <label className="block text-zinc-300 font-bold uppercase text-[10px] mb-1">
                Appointment Slot Length
              </label>
              <select
                value={settings.slotLengthMinutes}
                onChange={(e) => setSettings({ ...settings, slotLengthMinutes: Number(e.target.value) })}
                className="w-full bg-zinc-900 border border-zinc-700 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-[#FF7A1A]"
              >
                <option value={15}>15 Minutes</option>
                <option value={30}>30 Minutes</option>
                <option value={45}>45 Minutes</option>
                <option value={60}>60 Minutes</option>
              </select>
            </div>
          </div>
        </div>

        {/* 2. WEEKLY OPENING HOURS */}
        <div className="bg-[#121215] border border-zinc-800/80 rounded-3xl p-6 sm:p-8 shadow-xl">
          <h3 className="text-xl font-thunder font-bold uppercase tracking-tight text-white mb-4 flex items-center gap-2">
            <Clock className="w-5 h-5 text-[#FF7A1A]" />
            <span>Weekly Opening Hours</span>
          </h3>

          <div className="divide-y divide-zinc-800/60">
            {settings.hours.map((h, i) => (
              <div key={h.day} className="py-3 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs">
                <div className="flex items-center gap-3 w-36">
                  <button
                    type="button"
                    onClick={() => handleHourChange(i, 'isOpen', !h.isOpen)}
                    className={`w-9 h-5 rounded-full transition-colors relative flex items-center px-0.5 ${
                      h.isOpen ? 'bg-[#FF7A1A]' : 'bg-zinc-800'
                    }`}
                  >
                    <span
                      className={`w-4 h-4 rounded-full bg-black transition-transform ${
                        h.isOpen ? 'translate-x-4' : 'translate-x-0'
                      }`}
                    />
                  </button>
                  <span className={`font-bold text-sm ${h.isOpen ? 'text-white' : 'text-zinc-500 line-through'}`}>
                    {h.day}
                  </span>
                </div>

                {h.isOpen ? (
                  <div className="flex items-center gap-2 text-xs">
                    <input
                      type="text"
                      value={h.openTime}
                      onChange={(e) => handleHourChange(i, 'openTime', e.target.value)}
                      className="bg-zinc-900 border border-zinc-700 rounded-lg px-2.5 py-1 text-white text-xs w-24 text-center focus:outline-none focus:border-[#FF7A1A]"
                    />
                    <span className="text-zinc-500">to</span>
                    <input
                      type="text"
                      value={h.closeTime}
                      onChange={(e) => handleHourChange(i, 'closeTime', e.target.value)}
                      className="bg-zinc-900 border border-zinc-700 rounded-lg px-2.5 py-1 text-white text-xs w-24 text-center focus:outline-none focus:border-[#FF7A1A]"
                    />
                  </div>
                ) : (
                  <span className="text-zinc-600 italic">Closed all day</span>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* 3. HERO TEXTS & AUTOPLAY SETTINGS (PER AUDIENCE) */}
        <div className="bg-[#121215] border border-zinc-800/80 rounded-3xl p-6 sm:p-8 shadow-xl">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-thunder font-bold uppercase tracking-tight text-white flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-[#FF7A1A]" />
              <span>Hero Copy & Autoplay Engine</span>
            </h3>
          </div>

          <div className="mb-6 p-4 rounded-2xl bg-zinc-900/60 border border-zinc-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs">
            <div>
              <span className="font-bold text-white text-sm block">Hero Autoplay Engine</span>
              <span className="text-zinc-400">
                Rotates through Men, Women, Girl, Boy with animated transitions every 5 seconds
              </span>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-xs text-zinc-300 font-semibold">5s Interval</span>
              <span className="px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 text-[10px] font-bold uppercase">
                Active
              </span>
            </div>
          </div>

          {/* Audience Tabs Accordion */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {['men', 'women', 'girl', 'boy'].map((aud) => {
              const audData = settings.heroTexts[aud] || {};
              const words = audData.words || ['WORD1', 'WORD2', 'WORD3'];

              return (
                <div key={aud} className="bg-zinc-950/80 border border-zinc-800 rounded-2xl p-5 text-xs">
                  <div className="flex items-center justify-between pb-3 border-b border-zinc-800 mb-3">
                    <span className="font-thunder text-lg font-bold uppercase tracking-wider text-[#FF7A1A]">
                      {aud} Hero Configuration
                    </span>
                    <span className="text-[10px] text-zinc-500 uppercase font-mono">Live Sync</span>
                  </div>

                  <div className="flex flex-col gap-3">
                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <label className="block text-zinc-400 text-[10px] uppercase font-bold mb-1">
                          Heading Label
                        </label>
                        <input
                          type="text"
                          value={audData.label || ''}
                          onChange={(e) => handleHeroTextChange(aud, 'label', e.target.value)}
                          className="w-full bg-zinc-900 border border-zinc-700 rounded-lg px-2.5 py-1.5 text-white focus:outline-none focus:border-[#FF7A1A]"
                        />
                      </div>
                      <div>
                        <label className="block text-zinc-400 text-[10px] uppercase font-bold mb-1">
                          Price From ($)
                        </label>
                        <input
                          type="number"
                          value={audData.priceFrom || 0}
                          onChange={(e) => handleHeroTextChange(aud, 'priceFrom', Number(e.target.value))}
                          className="w-full bg-zinc-900 border border-zinc-700 rounded-lg px-2.5 py-1.5 text-white focus:outline-none focus:border-[#FF7A1A]"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-zinc-400 text-[10px] uppercase font-bold mb-1">
                        Hero Description Text
                      </label>
                      <textarea
                        rows="2"
                        value={audData.description || ''}
                        onChange={(e) => handleHeroTextChange(aud, 'description', e.target.value)}
                        className="w-full bg-zinc-900 border border-zinc-700 rounded-lg p-2 text-white focus:outline-none focus:border-[#FF7A1A]"
                      />
                    </div>

                    <div>
                      <label className="block text-zinc-400 text-[10px] uppercase font-bold mb-1">
                        3 Outline Drift Words
                      </label>
                      <div className="grid grid-cols-3 gap-2">
                        {[0, 1, 2].map((wIdx) => (
                          <input
                            key={wIdx}
                            type="text"
                            value={words[wIdx] || ''}
                            onChange={(e) => handleWordsChange(aud, wIdx, e.target.value)}
                            placeholder={`Word ${wIdx + 1}`}
                            className="w-full bg-zinc-900 border border-zinc-700 rounded-lg px-2 py-1 text-white font-mono uppercase text-center focus:outline-none focus:border-[#FF7A1A]"
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </form>

      {/* Reset Confirmation */}
      <ConfirmModal
        isOpen={resetModalOpen}
        title="Reset All Salon Data"
        message="This will overwrite all bookings, customers, services, gallery items, and settings with fresh pristine sample data. Are you sure?"
        confirmText="Confirm Reset"
        onConfirm={handleResetData}
        onCancel={() => setResetModalOpen(false)}
        isDanger={true}
      />
    </CrmLayout>
  );
};

export default AdminSettingsPage;
