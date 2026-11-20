import React, { useState, useEffect } from 'react';
import CrmLayout from '../../components/crm/CrmLayout';
import ConfirmModal from '../../components/crm/ConfirmModal';
import {
  getGallery,
  saveGalleryItem,
  deleteGalleryItem,
  getBeforeAfter,
  saveBeforeAfter
} from '../../services/crmApi';
import { useToast } from '../../components/crm/ToastContext';
import {
  Image as ImageIcon,
  Upload,
  Plus,
  Trash2,
  Sliders,
  X
} from 'lucide-react';

const AdminGalleryPage = () => {
  const [activeTab, setActiveTab] = useState('gallery'); // 'gallery' | 'beforeAfter'
  const [gallery, setGallery] = useState([]);
  const [beforeAfterList, setBeforeAfterList] = useState([]);
  const [confirmDeleteId, setConfirmDeleteId] = useState(null);

  // Gallery Upload Modal
  const [uploadModalOpen, setUploadModalOpen] = useState(false);
  const [newAudience, setNewAudience] = useState('men');
  const [newCategory, setNewCategory] = useState('Fade');
  const [newCaption, setNewCaption] = useState('');
  const [imagePreview, setImagePreview] = useState('');

  // Before/After interactive slider preview state
  const [sliderPos, setSliderPos] = useState(50);
  const [selectedBa, setSelectedBa] = useState(null);

  const { addToast } = useToast();

  const loadData = async () => {
    try {
      const [g, ba] = await Promise.all([getGallery(), getBeforeAfter()]);
      setGallery(g);
      setBeforeAfterList(ba);
      if (ba.length > 0 && !selectedBa) {
        setSelectedBa(ba[0]);
      }
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleImageFile = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const handleCreateGalleryItem = async (e) => {
    e.preventDefault();
    if (!imagePreview) {
      addToast('Please select an image file to upload', 'error');
      return;
    }

    try {
      await saveGalleryItem({
        image: imagePreview,
        audience: newAudience,
        category: newCategory,
        caption: newCaption || `${newCategory} Transformation`
      });
      addToast('Photo uploaded to salon gallery!', 'success');
      setUploadModalOpen(false);
      setImagePreview('');
      setNewCaption('');
      loadData();
    } catch (e) {
      addToast('Upload failed', 'error');
    }
  };

  const handleDelete = async () => {
    if (!confirmDeleteId) return;
    try {
      await deleteGalleryItem(confirmDeleteId);
      addToast('Photo deleted from gallery', 'info');
      setConfirmDeleteId(null);
      loadData();
    } catch (e) {
      addToast('Failed to delete photo', 'error');
    }
  };

  return (
    <CrmLayout pageTitle="Salon Gallery & Transformations">
      {/* Top Tabs & Upload Button */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 mb-6">
        <div className="flex items-center gap-1.5 bg-[#121215] p-1.5 rounded-2xl border border-zinc-800 text-xs">
          <button
            onClick={() => setActiveTab('gallery')}
            className={`px-5 py-2 rounded-xl font-bold uppercase transition-all flex items-center gap-2 ${
              activeTab === 'gallery'
                ? 'bg-[#FF7A1A] text-black shadow-lg shadow-[#FF7A1A]/20'
                : 'text-zinc-400 hover:text-white'
            }`}
          >
            <ImageIcon className="w-4 h-4" />
            <span>Full Gallery ({gallery.length})</span>
          </button>
          <button
            onClick={() => setActiveTab('beforeAfter')}
            className={`px-5 py-2 rounded-xl font-bold uppercase transition-all flex items-center gap-2 ${
              activeTab === 'beforeAfter'
                ? 'bg-[#FF7A1A] text-black shadow-lg shadow-[#FF7A1A]/20'
                : 'text-zinc-400 hover:text-white'
            }`}
          >
            <Sliders className="w-4 h-4" />
            <span>Before & After Slider</span>
          </button>
        </div>

        {activeTab === 'gallery' && (
          <button
            onClick={() => setUploadModalOpen(true)}
            className="flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-[#FF7A1A] hover:bg-[#FF8A30] text-black font-bold text-xs uppercase tracking-wider transition-all shadow-lg"
          >
            <Upload className="w-4 h-4" />
            <span>Upload Photo</span>
          </button>
        )}
      </div>

      {/* =====================================================================
          TAB 1: FULL GALLERY GRID
         ===================================================================== */}
      {activeTab === 'gallery' && (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {gallery.map((item) => (
            <div
              key={item.id}
              className="bg-[#121215] border border-zinc-800/80 rounded-3xl overflow-hidden shadow-xl group relative hover:border-zinc-700 transition-all"
            >
              <div className="aspect-square w-full overflow-hidden bg-zinc-900">
                <img
                  src={item.image}
                  alt={item.caption}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>

              {/* Overlay on hover */}
              <div className="p-3 bg-gradient-to-t from-black via-black/80 to-transparent">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#FF7A1A]">
                    {item.audience} • {item.category}
                  </span>
                  <button
                    onClick={() => setConfirmDeleteId(item.id)}
                    className="p-1.5 rounded-lg text-zinc-400 hover:text-red-400 hover:bg-zinc-800 transition-colors"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
                <p className="text-xs text-white line-clamp-1 font-medium">{item.caption}</p>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* =====================================================================
          TAB 2: BEFORE / AFTER INTERACTIVE COMPARISON SLIDER
         ===================================================================== */}
      {activeTab === 'beforeAfter' && (
        <div className="bg-[#121215] border border-zinc-800/80 rounded-3xl p-6 sm:p-8 shadow-2xl">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-zinc-800/60 mb-6">
            <div>
              <h2 className="text-2xl font-thunder font-bold uppercase tracking-tight text-white mb-1">
                Before & After Interactive Comparison
              </h2>
              <p className="text-xs text-zinc-400">
                Drag the slider handle to inspect client transformation quality live
              </p>
            </div>

            {/* Select Pair */}
            <div className="flex items-center gap-2">
              {beforeAfterList.map((ba) => (
                <button
                  key={ba.id}
                  onClick={() => setSelectedBa(ba)}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                    selectedBa?.id === ba.id
                      ? 'bg-[#FF7A1A] text-black shadow-md'
                      : 'bg-zinc-900 text-zinc-400 hover:text-white'
                  }`}
                >
                  {ba.title}
                </button>
              ))}
            </div>
          </div>

          {selectedBa && (
            <div className="max-w-3xl mx-auto">
              <div className="relative aspect-[16/10] w-full rounded-2xl overflow-hidden select-none shadow-2xl border border-zinc-800">
                {/* AFTER image (base layer) */}
                <img
                  src={selectedBa.afterImage}
                  alt="After"
                  className="absolute inset-0 w-full h-full object-cover"
                />
                <span className="absolute bottom-4 right-4 bg-black/80 backdrop-blur-md text-white text-xs font-bold uppercase px-3 py-1 rounded-full border border-white/20">
                  AFTER
                </span>

                {/* BEFORE image (clipped layer) */}
                <div
                  className="absolute inset-0 overflow-hidden"
                  style={{ width: `${sliderPos}%` }}
                >
                  <img
                    src={selectedBa.beforeImage}
                    alt="Before"
                    className="absolute inset-0 w-full h-full object-cover max-w-none"
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                  <span className="absolute bottom-4 left-4 bg-black/80 backdrop-blur-md text-white text-xs font-bold uppercase px-3 py-1 rounded-full border border-white/20">
                    BEFORE
                  </span>
                </div>

                {/* Divider Line & Handle */}
                <div
                  className="absolute top-0 bottom-0 w-1 bg-white cursor-ew-resize z-20 shadow-2xl flex items-center justify-center"
                  style={{ left: `${sliderPos}%` }}
                >
                  <div className="w-8 h-8 rounded-full bg-white text-black shadow-xl flex items-center justify-center font-bold text-xs">
                    ↔
                  </div>
                </div>

                {/* Interactive Drag input */}
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={sliderPos}
                  onChange={(e) => setSliderPos(Number(e.target.value))}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-ew-resize z-30"
                />
              </div>

              <div className="mt-4 p-4 rounded-2xl bg-zinc-900/60 border border-zinc-800 text-center">
                <span className="text-xs font-bold uppercase text-[#FF7A1A] block mb-1">
                  {selectedBa.title} ({selectedBa.audience})
                </span>
                <p className="text-xs text-zinc-300 italic">{selectedBa.description}</p>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Upload Photo Modal */}
      {uploadModalOpen && (
        <div className="fixed inset-0 z-[9990] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in">
          <div className="bg-[#141417] border border-zinc-800 rounded-3xl max-w-md w-full p-6 shadow-2xl relative">
            <button
              onClick={() => setUploadModalOpen(false)}
              className="absolute top-4 right-4 text-zinc-400 hover:text-white p-1"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="text-xl font-thunder font-bold uppercase tracking-tight text-white mb-1">
              Upload Salon Photo
            </h3>
            <p className="text-xs text-zinc-400 mb-4">Add to portfolio shown on the public website</p>

            <form onSubmit={handleCreateGalleryItem} className="flex flex-col gap-3 text-xs">
              <div className="grid grid-cols-2 gap-3">
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
                    Category Tag
                  </label>
                  <input
                    type="text"
                    value={newCategory}
                    onChange={(e) => setNewCategory(e.target.value)}
                    placeholder="Fade, Balayage, Braids..."
                    className="w-full bg-zinc-900 border border-zinc-700 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-[#FF7A1A]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-zinc-300 font-bold uppercase text-[10px] mb-1">
                  Caption / Description
                </label>
                <input
                  type="text"
                  value={newCaption}
                  onChange={(e) => setNewCaption(e.target.value)}
                  placeholder="e.g. Clean low taper with textured top"
                  className="w-full bg-zinc-900 border border-zinc-700 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-[#FF7A1A]"
                />
              </div>

              <div>
                <label className="block text-zinc-300 font-bold uppercase text-[10px] mb-1">
                  Photo File
                </label>
                <div className="border border-dashed border-zinc-700 hover:border-[#FF7A1A] rounded-2xl p-4 text-center cursor-pointer relative bg-zinc-900/50">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageFile}
                    className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
                  />
                  {imagePreview ? (
                    <img
                      src={imagePreview}
                      alt="Upload Preview"
                      className="w-full h-32 object-cover rounded-xl mx-auto"
                    />
                  ) : (
                    <div className="flex flex-col items-center gap-1.5 text-zinc-400">
                      <Upload className="w-6 h-6 text-[#FF7A1A]" />
                      <span className="font-semibold text-xs text-white">Click or drag photo</span>
                      <span className="text-[10px] text-zinc-500">Supports PNG, JPG, WebP</span>
                    </div>
                  )}
                </div>
              </div>

              <div className="flex items-center justify-end gap-2 mt-4 pt-3 border-t border-zinc-800">
                <button
                  type="button"
                  onClick={() => setUploadModalOpen(false)}
                  className="px-4 py-2 text-zinc-400 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-[#FF7A1A] hover:bg-[#FF8A30] text-black font-bold uppercase px-5 py-2.5 rounded-xl shadow-lg"
                >
                  Upload Photo
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation */}
      <ConfirmModal
        isOpen={!!confirmDeleteId}
        title="Delete Photo"
        message="Are you sure you want to permanently delete this photo from the gallery?"
        confirmText="Delete"
        onConfirm={handleDelete}
        onCancel={() => setConfirmDeleteId(null)}
        isDanger={true}
      />
    </CrmLayout>
  );
};

export default AdminGalleryPage;
