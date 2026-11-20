import React, { useState, useEffect } from 'react';
import CrmLayout from '../../components/crm/CrmLayout';
import ConfirmModal from '../../components/crm/ConfirmModal';
import { getOffers, saveOffer, deleteOffer } from '../../services/crmApi';
import { useToast } from '../../components/crm/ToastContext';
import {
  Tag,
  Plus,
  Trash2,
  Edit2,
  Calendar,
  X,
  Upload,
  Sparkles
} from 'lucide-react';

const AdminOffersPage = () => {
  const [offers, setOffers] = useState([]);
  const [confirmDeleteId, setConfirmDeleteId] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingOfferId, setEditingOfferId] = useState(null);

  // Form state
  const [title, setTitle] = useState('');
  const [badge, setBadge] = useState('NEW SPECIAL');
  const [promoCode, setPromoCode] = useState('');
  const [description, setDescription] = useState('');
  const [audience, setAudience] = useState('all');
  const [validUntil, setValidUntil] = useState('2026-12-31');
  const [image, setImage] = useState('https://images.unsplash.com/photo-1503951914875-452162b0f3f1?w=600&auto=format&fit=crop&q=80');

  const { addToast } = useToast();

  const loadData = async () => {
    try {
      const data = await getOffers();
      setOffers(data);
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const todayStr = new Date().toISOString().split('T')[0];

  const handleOpenAdd = () => {
    setEditingOfferId(null);
    setTitle('');
    setBadge('SPECIAL PROMO');
    setPromoCode('MERAY20');
    setDescription('');
    setAudience('all');
    setValidUntil('2026-12-31');
    setModalOpen(true);
  };

  const handleOpenEdit = (off) => {
    setEditingOfferId(off.id);
    setTitle(off.title);
    setBadge(off.badge);
    setPromoCode(off.promoCode);
    setDescription(off.description);
    setAudience(off.audience);
    setValidUntil(off.validUntil);
    setImage(off.image);
    setModalOpen(true);
  };

  const handleSaveOffer = async (e) => {
    e.preventDefault();
    if (!title || !promoCode) return;

    try {
      await saveOffer({
        id: editingOfferId,
        title,
        badge,
        promoCode,
        description,
        audience,
        validUntil,
        image
      });
      addToast(editingOfferId ? 'Offer updated!' : 'New offer published!', 'success');
      setModalOpen(false);
      loadData();
    } catch (e) {
      addToast('Error saving offer', 'error');
    }
  };

  const handleToggleActive = async (off) => {
    try {
      await saveOffer({ ...off, active: !off.active });
      addToast(`Offer status updated`, 'info');
      loadData();
    } catch (e) {
      addToast('Error updating status', 'error');
    }
  };

  const handleDelete = async () => {
    if (!confirmDeleteId) return;
    try {
      await deleteOffer(confirmDeleteId);
      addToast('Offer deleted', 'info');
      setConfirmDeleteId(null);
      loadData();
    } catch (e) {
      addToast('Error deleting offer', 'error');
    }
  };

  return (
    <CrmLayout pageTitle="Promotions & Offers">
      {/* Top Controls */}
      <div className="flex items-center justify-between gap-4 mb-6">
        <p className="text-xs text-zinc-400">
          Manage seasonal promotional codes and featured specials shown on the public site
        </p>
        <button
          onClick={handleOpenAdd}
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#FF7A1A] hover:bg-[#FF8A30] text-black font-bold text-xs uppercase tracking-wider transition-all shadow-lg"
        >
          <Plus className="w-4 h-4" />
          <span>New Promo Offer</span>
        </button>
      </div>

      {/* Offers Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {offers.map((off) => {
          const isExpired = off.validUntil < todayStr;

          return (
            <div
              key={off.id}
              className="bg-[#121215] border border-zinc-800/80 rounded-3xl overflow-hidden shadow-2xl flex flex-col justify-between group hover:border-zinc-700 transition-all"
            >
              <div>
                {/* Image & Badges */}
                <div className="relative aspect-[16/9] w-full overflow-hidden bg-zinc-900">
                  <img
                    src={off.image}
                    alt={off.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-3 left-3 flex items-center gap-1.5">
                    <span className="bg-[#FF7A1A] text-black text-[10px] font-black uppercase tracking-wider px-2.5 py-1 rounded-md shadow-md">
                      {off.badge}
                    </span>
                    {isExpired && (
                      <span className="bg-red-500 text-white text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md">
                        Expired
                      </span>
                    )}
                  </div>

                  <button
                    onClick={() => handleToggleActive(off)}
                    className={`absolute top-3 right-3 text-[10px] font-bold uppercase px-2.5 py-1 rounded-full ${
                      off.active ? 'bg-emerald-500 text-black' : 'bg-zinc-800 text-zinc-400'
                    }`}
                  >
                    {off.active ? 'Active' : 'Draft'}
                  </button>
                </div>

                {/* Offer Content */}
                <div className="p-6">
                  <h3 className="text-xl font-thunder font-bold uppercase tracking-tight text-white mb-2 leading-snug">
                    {off.title}
                  </h3>
                  <p className="text-xs text-zinc-400 line-clamp-3 leading-relaxed mb-4">
                    {off.description}
                  </p>

                  <div className="flex items-center justify-between p-3 rounded-2xl bg-zinc-900/80 border border-zinc-800">
                    <div>
                      <span className="text-[10px] uppercase font-bold text-zinc-500 block">Promo Code</span>
                      <span className="text-sm font-mono font-bold text-[#FF7A1A]">{off.promoCode}</span>
                    </div>
                    <div className="text-right">
                      <span className="text-[10px] uppercase font-bold text-zinc-500 block">Valid Until</span>
                      <span className="text-xs text-zinc-300 font-semibold">{off.validUntil}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Actions Footer */}
              <div className="p-5 pt-0 flex items-center justify-between border-t border-zinc-800/60 mt-2">
                <span className="text-[11px] text-zinc-500 capitalize">{off.audience} Audience</span>
                <div className="flex items-center gap-1">
                  <button
                    onClick={() => handleOpenEdit(off)}
                    className="p-2 text-zinc-400 hover:text-white transition-colors"
                    title="Edit"
                  >
                    <Edit2 className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setConfirmDeleteId(off.id)}
                    className="p-2 text-zinc-500 hover:text-red-400 transition-colors"
                    title="Delete"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Create / Edit Modal with Live Preview */}
      {modalOpen && (
        <div className="fixed inset-0 z-[9990] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in">
          <div className="bg-[#141417] border border-zinc-800 rounded-3xl max-w-xl w-full p-6 sm:p-8 shadow-2xl relative max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setModalOpen(false)}
              className="absolute top-5 right-5 text-zinc-400 hover:text-white p-1"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="text-2xl font-thunder font-bold uppercase tracking-tight text-white mb-1">
              {editingOfferId ? 'Edit Promo Offer' : 'Create Special Offer'}
            </h3>
            <p className="text-xs text-zinc-400 mb-6">Live preview updates as you configure the offer</p>

            {/* LIVE PREVIEW CARD */}
            <div className="mb-6 p-4 rounded-2xl bg-zinc-950 border border-zinc-800">
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#FF7A1A] block mb-2">
                Live Website Card Preview:
              </span>
              <div className="bg-[#17171C] border border-zinc-700/60 rounded-2xl overflow-hidden shadow-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="bg-[#FF7A1A] text-black text-[9px] font-black px-2 py-0.5 rounded">
                    {badge || 'BADGE'}
                  </span>
                  <span className="text-[10px] font-mono text-[#FF7A1A] font-bold">
                    CODE: {promoCode || 'PROMO'}
                  </span>
                </div>
                <h4 className="text-lg font-thunder font-bold uppercase text-white mb-1">
                  {title || 'Offer Title Preview'}
                </h4>
                <p className="text-xs text-zinc-400 line-clamp-2">
                  {description || 'Offer details will appear here on the public website.'}
                </p>
              </div>
            </div>

            <form onSubmit={handleSaveOffer} className="flex flex-col gap-3 text-xs">
              <div>
                <label className="block text-zinc-300 font-bold uppercase text-[10px] mb-1">
                  Offer Title *
                </label>
                <input
                  type="text"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g. VIP New Client 20% Discount"
                  className="w-full bg-zinc-900 border border-zinc-700 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-[#FF7A1A]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-zinc-300 font-bold uppercase text-[10px] mb-1">
                    Badge Label
                  </label>
                  <input
                    type="text"
                    value={badge}
                    onChange={(e) => setBadge(e.target.value)}
                    placeholder="LIMITED TIME, 20% OFF..."
                    className="w-full bg-zinc-900 border border-zinc-700 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-[#FF7A1A]"
                  />
                </div>
                <div>
                  <label className="block text-zinc-300 font-bold uppercase text-[10px] mb-1">
                    Promo Code *
                  </label>
                  <input
                    type="text"
                    required
                    value={promoCode}
                    onChange={(e) => setPromoCode(e.target.value.toUpperCase())}
                    placeholder="WELCOME20"
                    className="w-full bg-zinc-900 border border-zinc-700 rounded-xl px-3 py-2 text-white font-mono uppercase focus:outline-none focus:border-[#FF7A1A]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-zinc-300 font-bold uppercase text-[10px] mb-1">
                    Audience
                  </label>
                  <select
                    value={audience}
                    onChange={(e) => setAudience(e.target.value)}
                    className="w-full bg-zinc-900 border border-zinc-700 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-[#FF7A1A]"
                  >
                    <option value="all">All Audiences</option>
                    <option value="men">Men</option>
                    <option value="women">Women</option>
                    <option value="girl">Girl</option>
                    <option value="boy">Boy</option>
                  </select>
                </div>
                <div>
                  <label className="block text-zinc-300 font-bold uppercase text-[10px] mb-1">
                    Valid Until
                  </label>
                  <input
                    type="date"
                    value={validUntil}
                    onChange={(e) => setValidUntil(e.target.value)}
                    className="w-full bg-zinc-900 border border-zinc-700 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-[#FF7A1A]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-zinc-300 font-bold uppercase text-[10px] mb-1">
                  Description
                </label>
                <textarea
                  rows="2"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Terms, conditions, and service inclusions"
                  className="w-full bg-zinc-900 border border-zinc-700 rounded-xl p-3 text-white focus:outline-none focus:border-[#FF7A1A]"
                />
              </div>

              <div className="flex items-center justify-end gap-2 mt-4 pt-4 border-t border-zinc-800">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="px-4 py-2 text-zinc-400 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-[#FF7A1A] hover:bg-[#FF8A30] text-black font-bold uppercase px-6 py-2.5 rounded-xl shadow-lg"
                >
                  {editingOfferId ? 'Save Changes' : 'Publish Offer'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation */}
      <ConfirmModal
        isOpen={!!confirmDeleteId}
        title="Delete Promo Offer"
        message="Are you sure you want to permanently delete this offer? Active promo codes will cease functioning."
        confirmText="Delete"
        onConfirm={handleDelete}
        onCancel={() => setConfirmDeleteId(null)}
        isDanger={true}
      />
    </CrmLayout>
  );
};

export default AdminOffersPage;
