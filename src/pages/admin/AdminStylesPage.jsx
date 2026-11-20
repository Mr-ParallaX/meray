import React, { useState, useEffect } from 'react';
import CrmLayout from '../../components/crm/CrmLayout';
import ConfirmModal from '../../components/crm/ConfirmModal';
import { getStyles, saveStyle, deleteStyle } from '../../services/crmApi';
import { useToast } from '../../components/crm/ToastContext';
import {
  Sparkles,
  Plus,
  Trash2,
  Upload,
  X,
  Eye,
  Check
} from 'lucide-react';

const AdminStylesPage = () => {
  const [styles, setStyles] = useState([]);
  const [activeAudience, setActiveAudience] = useState('men');
  const [confirmDeleteId, setConfirmDeleteId] = useState(null);
  const [addModalOpen, setAddModalOpen] = useState(false);

  // Form State
  const [name, setName] = useState('');
  const [category, setCategory] = useState('Fades');
  const [description, setDescription] = useState('');
  const [imagePreview, setImagePreview] = useState('');

  const { addToast } = useToast();

  const loadData = async () => {
    try {
      const data = await getStyles();
      setStyles(data);
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

  const handleCreateStyle = async (e) => {
    e.preventDefault();
    if (!name) return;

    try {
      await saveStyle({
        name,
        category,
        audience: activeAudience,
        description,
        image: imagePreview || 'https://images.unsplash.com/photo-1622286342621-4bd786c2447c?w=500&auto=format&fit=crop&q=80',
        active: true
      });
      addToast(`New style "${name}" added to lookbook!`, 'success');
      setAddModalOpen(false);
      setName('');
      setDescription('');
      setImagePreview('');
      loadData();
    } catch (e) {
      addToast('Error adding style', 'error');
    }
  };

  const handleToggleActive = async (sty) => {
    try {
      await saveStyle({ ...sty, active: !sty.active });
      addToast(`Updated ${sty.name} status`, 'info');
      loadData();
    } catch (e) {
      addToast('Error updating status', 'error');
    }
  };

  const handleDelete = async () => {
    if (!confirmDeleteId) return;
    try {
      await deleteStyle(confirmDeleteId);
      addToast('Style removed from lookbook', 'info');
      setConfirmDeleteId(null);
      loadData();
    } catch (e) {
      addToast('Error deleting style', 'error');
    }
  };

  const filteredStyles = styles.filter((s) => s.audience === activeAudience);

  return (
    <CrmLayout pageTitle="Lookbook & Styles">
      {/* Top Controls: Audience Selector & Add Button */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 mb-6">
        <div className="flex items-center gap-1.5 bg-[#121215] p-1.5 rounded-2xl border border-zinc-800 text-xs">
          {[
            { id: 'men', label: 'Men', color: '#F5A623' },
            { id: 'women', label: 'Women', color: '#E54C43' },
            { id: 'girl', label: 'Girl', color: '#9B59B6' },
            { id: 'boy', label: 'Boy', color: '#3FA8D6' }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveAudience(tab.id)}
              className={`px-4 py-2 rounded-xl font-bold uppercase transition-all flex items-center gap-2 ${
                activeAudience === tab.id
                  ? 'bg-[#FF7A1A] text-black shadow-lg shadow-[#FF7A1A]/20'
                  : 'text-zinc-400 hover:text-white'
              }`}
            >
              <span
                className="w-2 h-2 rounded-full"
                style={{ backgroundColor: activeAudience === tab.id ? '#000' : tab.color }}
              />
              <span>{tab.label}</span>
            </button>
          ))}
        </div>

        <button
          onClick={() => setAddModalOpen(true)}
          className="flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-[#FF7A1A] hover:bg-[#FF8A30] text-black font-bold text-xs uppercase tracking-wider transition-all shadow-lg"
        >
          <Plus className="w-4 h-4" />
          <span>Add Style</span>
        </button>
      </div>

      {/* Lookbook Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredStyles.map((sty) => (
          <div
            key={sty.id}
            className="bg-[#121215] border border-zinc-800/80 rounded-3xl overflow-hidden shadow-xl flex flex-col justify-between group hover:border-zinc-700 transition-all"
          >
            <div>
              <div className="relative aspect-[4/3] w-full overflow-hidden bg-zinc-900">
                <img
                  src={sty.image}
                  alt={sty.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <span className="absolute top-3 left-3 bg-black/75 backdrop-blur-md text-white text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full border border-white/10">
                  {sty.category}
                </span>
                <button
                  onClick={() => handleToggleActive(sty)}
                  className={`absolute top-3 right-3 text-[10px] font-bold uppercase px-2 py-0.5 rounded-full ${
                    sty.active
                      ? 'bg-emerald-500 text-black'
                      : 'bg-zinc-800 text-zinc-400'
                  }`}
                >
                  {sty.active ? 'Active' : 'Disabled'}
                </button>
              </div>

              <div className="p-5">
                <h3 className="text-xl font-thunder font-bold uppercase tracking-tight text-white mb-1">
                  {sty.name}
                </h3>
                <p className="text-xs text-zinc-400 line-clamp-2 leading-relaxed">
                  {sty.description}
                </p>
              </div>
            </div>

            <div className="p-5 pt-0 flex items-center justify-between border-t border-zinc-800/60 mt-2">
              <span className="text-[11px] text-zinc-500 capitalize">{sty.audience} Section</span>
              <button
                onClick={() => setConfirmDeleteId(sty.id)}
                className="p-2 text-zinc-500 hover:text-red-400 transition-colors"
                title="Delete"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Add Style Modal with FileReader */}
      {addModalOpen && (
        <div className="fixed inset-0 z-[9990] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in">
          <div className="bg-[#141417] border border-zinc-800 rounded-3xl max-w-md w-full p-6 shadow-2xl relative">
            <button
              onClick={() => setAddModalOpen(false)}
              className="absolute top-4 right-4 text-zinc-400 hover:text-white p-1"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="text-xl font-thunder font-bold uppercase tracking-tight text-white mb-1">
              Add Lookbook Style
            </h3>
            <p className="text-xs text-zinc-400 mb-4">Upload client result photo or inspirational cut</p>

            <form onSubmit={handleCreateStyle} className="flex flex-col gap-3 text-xs">
              <div>
                <label className="block text-zinc-300 font-bold uppercase text-[10px] mb-1">
                  Style Name *
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Modern French Textured Crop"
                  className="w-full bg-zinc-900 border border-zinc-700 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-[#FF7A1A]"
                />
              </div>

              <div>
                <label className="block text-zinc-300 font-bold uppercase text-[10px] mb-1">
                  Category
                </label>
                <input
                  type="text"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  placeholder="Fades, Curls, Color, Classic..."
                  className="w-full bg-zinc-900 border border-zinc-700 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-[#FF7A1A]"
                />
              </div>

              <div>
                <label className="block text-zinc-300 font-bold uppercase text-[10px] mb-1">
                  Description
                </label>
                <textarea
                  rows="2"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Client request, technique used, etc."
                  className="w-full bg-zinc-900 border border-zinc-700 rounded-xl p-3 text-white focus:outline-none focus:border-[#FF7A1A]"
                />
              </div>

              <div>
                <label className="block text-zinc-300 font-bold uppercase text-[10px] mb-1">
                  Style Photo Upload
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
                      alt="Preview"
                      className="w-full h-32 object-cover rounded-xl mx-auto"
                    />
                  ) : (
                    <div className="flex flex-col items-center gap-1.5 text-zinc-400">
                      <Upload className="w-6 h-6 text-[#FF7A1A]" />
                      <span className="font-semibold text-xs text-white">Click or drag image to upload</span>
                      <span className="text-[10px] text-zinc-500">Supports PNG, JPG, WebP</span>
                    </div>
                  )}
                </div>
              </div>

              <div className="flex items-center justify-end gap-2 mt-4 pt-3 border-t border-zinc-800">
                <button
                  type="button"
                  onClick={() => setAddModalOpen(false)}
                  className="px-4 py-2 text-zinc-400 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-[#FF7A1A] hover:bg-[#FF8A30] text-black font-bold uppercase px-5 py-2.5 rounded-xl shadow-lg"
                >
                  Save to Lookbook
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirm */}
      <ConfirmModal
        isOpen={!!confirmDeleteId}
        title="Remove Lookbook Style"
        message="Are you sure you want to delete this style from the lookbook? It will immediately disappear from the public website gallery."
        confirmText="Remove"
        onConfirm={handleDelete}
        onCancel={() => setConfirmDeleteId(null)}
        isDanger={true}
      />
    </CrmLayout>
  );
};

export default AdminStylesPage;
