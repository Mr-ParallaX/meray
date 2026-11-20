import React, { useState, useEffect } from 'react';
import CrmLayout from '../../components/crm/CrmLayout';
import ConfirmModal from '../../components/crm/ConfirmModal';
import { getServices, saveService, deleteService } from '../../services/crmApi';
import { useToast } from '../../components/crm/ToastContext';
import {
  Scissors,
  Plus,
  Edit2,
  Trash2,
  Check,
  X,
  Clock,
  DollarSign,
  MoveUp,
  MoveDown
} from 'lucide-react';

const AdminServicesPage = () => {
  const [services, setServices] = useState([]);
  const [activeAudience, setActiveAudience] = useState('men');
  const [editingId, setEditingId] = useState(null);
  const [editForm, setEditForm] = useState({});
  const [confirmDeleteId, setConfirmDeleteId] = useState(null);
  const [newServiceModalOpen, setNewServiceModalOpen] = useState(false);

  // New service form
  const [newName, setNewName] = useState('');
  const [newCategory, setNewCategory] = useState('Haircuts');
  const [newPrice, setNewPrice] = useState(35);
  const [newDuration, setNewDuration] = useState(30);

  const { addToast } = useToast();

  const loadData = async () => {
    try {
      const data = await getServices();
      setServices(data);
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const audienceServices = services.filter((s) => s.audience === activeAudience);

  const handleStartEdit = (service) => {
    setEditingId(service.id);
    setEditForm({
      name: service.name,
      category: service.category,
      price: service.price,
      duration: service.duration,
      active: service.active
    });
  };

  const handleSaveInline = async (id) => {
    try {
      await saveService({ id, ...editForm });
      addToast('Service updated successfully', 'success');
      setEditingId(null);
      loadData();
    } catch (e) {
      addToast('Failed to update service', 'error');
    }
  };

  const handleToggleActive = async (service) => {
    try {
      await saveService({ ...service, active: !service.active });
      addToast(`${service.name} status toggled`, 'info');
      loadData();
    } catch (e) {
      addToast('Error updating status', 'error');
    }
  };

  const handleDelete = async () => {
    if (!confirmDeleteId) return;
    try {
      await deleteService(confirmDeleteId);
      addToast('Service deleted', 'info');
      setConfirmDeleteId(null);
      loadData();
    } catch (e) {
      addToast('Error deleting service', 'error');
    }
  };

  const handleCreateNew = async (e) => {
    e.preventDefault();
    if (!newName) return;
    try {
      await saveService({
        name: newName,
        category: newCategory,
        price: Number(newPrice),
        duration: Number(newDuration),
        audience: activeAudience,
        icon: 'Scissors',
        active: true
      });
      addToast(`New ${activeAudience} service created!`, 'success');
      setNewServiceModalOpen(false);
      setNewName('');
      loadData();
    } catch (e) {
      addToast('Error creating service', 'error');
    }
  };

  return (
    <CrmLayout pageTitle="Services & Pricing">
      {/* Top Controls: Audience Tabs & Add Button */}
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
              onClick={() => {
                setActiveAudience(tab.id);
                setEditingId(null);
              }}
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
          onClick={() => setNewServiceModalOpen(true)}
          className="flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-[#FF7A1A] hover:bg-[#FF8A30] text-black font-bold text-xs uppercase tracking-wider transition-all shadow-lg"
        >
          <Plus className="w-4 h-4" />
          <span>Add Service</span>
        </button>
      </div>

      {/* Services Table */}
      <div className="bg-[#121215] border border-zinc-800/80 rounded-3xl overflow-hidden shadow-2xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#17171C] border-b border-zinc-800/80 text-zinc-400 font-bold uppercase tracking-wider text-[10px]">
              <tr>
                <th className="py-3.5 px-4">Service Name</th>
                <th className="py-3.5 px-4">Category</th>
                <th className="py-3.5 px-4">Price ($)</th>
                <th className="py-3.5 px-4">Duration</th>
                <th className="py-3.5 px-4">Active Status</th>
                <th className="py-3.5 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-800/50">
              {audienceServices.map((srv) => {
                const isEditing = editingId === srv.id;

                return (
                  <tr key={srv.id} className="hover:bg-zinc-900/40 transition-colors">
                    {/* Name */}
                    <td className="py-3.5 px-4">
                      {isEditing ? (
                        <input
                          type="text"
                          value={editForm.name}
                          onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                          className="bg-zinc-900 border border-zinc-700 rounded-lg px-2.5 py-1 text-white text-xs w-full focus:outline-none focus:border-[#FF7A1A]"
                        />
                      ) : (
                        <div className="flex items-center gap-2">
                          <Scissors className="w-4 h-4 text-[#FF7A1A] flex-shrink-0" />
                          <span className="font-bold text-white text-sm">{srv.name}</span>
                        </div>
                      )}
                    </td>

                    {/* Category */}
                    <td className="py-3.5 px-4">
                      {isEditing ? (
                        <input
                          type="text"
                          value={editForm.category}
                          onChange={(e) => setEditForm({ ...editForm, category: e.target.value })}
                          className="bg-zinc-900 border border-zinc-700 rounded-lg px-2 py-1 text-white text-xs focus:outline-none focus:border-[#FF7A1A]"
                        />
                      ) : (
                        <span className="bg-zinc-800 text-zinc-300 px-2.5 py-1 rounded-md text-[11px] font-medium">
                          {srv.category}
                        </span>
                      )}
                    </td>

                    {/* Price */}
                    <td className="py-3.5 px-4 font-thunder font-bold text-base text-white">
                      {isEditing ? (
                        <div className="flex items-center gap-1">
                          <span className="text-zinc-500">$</span>
                          <input
                            type="number"
                            value={editForm.price}
                            onChange={(e) => setEditForm({ ...editForm, price: Number(e.target.value) })}
                            className="bg-zinc-900 border border-zinc-700 rounded-lg px-2 py-1 text-white text-xs w-16 focus:outline-none focus:border-[#FF7A1A]"
                          />
                        </div>
                      ) : (
                        <span>${srv.price}</span>
                      )}
                    </td>

                    {/* Duration */}
                    <td className="py-3.5 px-4 text-zinc-300">
                      {isEditing ? (
                        <div className="flex items-center gap-1">
                          <input
                            type="number"
                            value={editForm.duration}
                            onChange={(e) => setEditForm({ ...editForm, duration: Number(e.target.value) })}
                            className="bg-zinc-900 border border-zinc-700 rounded-lg px-2 py-1 text-white text-xs w-16 focus:outline-none focus:border-[#FF7A1A]"
                          />
                          <span className="text-zinc-500 text-[10px]">min</span>
                        </div>
                      ) : (
                        <span className="flex items-center gap-1 text-[11px]">
                          <Clock className="w-3 h-3 text-zinc-500" />
                          <span>{srv.duration} min</span>
                        </span>
                      )}
                    </td>

                    {/* Active Toggle */}
                    <td className="py-3.5 px-4">
                      <button
                        onClick={() => handleToggleActive(srv)}
                        className={`text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full transition-colors ${
                          srv.active
                            ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30'
                            : 'bg-zinc-800 text-zinc-500 border border-zinc-700'
                        }`}
                      >
                        {srv.active ? 'Active' : 'Disabled'}
                      </button>
                    </td>

                    {/* Actions */}
                    <td className="py-3.5 px-4 text-right">
                      {isEditing ? (
                        <div className="flex items-center justify-end gap-1.5">
                          <button
                            onClick={() => handleSaveInline(srv.id)}
                            className="p-1.5 rounded-lg bg-emerald-500 text-black hover:bg-emerald-400 font-bold"
                            title="Save"
                          >
                            <Check className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => setEditingId(null)}
                            className="p-1.5 rounded-lg bg-zinc-800 text-zinc-400 hover:text-white"
                            title="Cancel"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        </div>
                      ) : (
                        <div className="flex items-center justify-end gap-1.5">
                          <button
                            onClick={() => handleStartEdit(srv)}
                            className="p-1.5 rounded-lg bg-zinc-800 text-zinc-400 hover:text-white hover:bg-zinc-700 transition-colors"
                            title="Edit"
                          >
                            <Edit2 className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => setConfirmDeleteId(srv.id)}
                            className="p-1.5 rounded-lg bg-red-500/10 text-red-400 hover:bg-red-500 hover:text-white transition-colors"
                            title="Delete"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add New Service Modal */}
      {newServiceModalOpen && (
        <div className="fixed inset-0 z-[9990] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in">
          <div className="bg-[#141417] border border-zinc-800 rounded-3xl max-w-sm w-full p-6 shadow-2xl relative">
            <button
              onClick={() => setNewServiceModalOpen(false)}
              className="absolute top-4 right-4 text-zinc-400 hover:text-white p-1"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="text-xl font-thunder font-bold uppercase tracking-tight text-white mb-1">
              Add {activeAudience} Service
            </h3>
            <p className="text-xs text-zinc-400 mb-4">Create a new menu option with price and duration</p>

            <form onSubmit={handleCreateNew} className="flex flex-col gap-3 text-xs">
              <div>
                <label className="block text-zinc-300 font-bold uppercase text-[10px] mb-1">
                  Service Name *
                </label>
                <input
                  type="text"
                  required
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                  placeholder="e.g. Scissor Crop & Beard Finish"
                  className="w-full bg-zinc-900 border border-zinc-700 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-[#FF7A1A]"
                />
              </div>

              <div>
                <label className="block text-zinc-300 font-bold uppercase text-[10px] mb-1">
                  Category
                </label>
                <input
                  type="text"
                  value={newCategory}
                  onChange={(e) => setNewCategory(e.target.value)}
                  placeholder="Haircuts, Shaves, Color..."
                  className="w-full bg-zinc-900 border border-zinc-700 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-[#FF7A1A]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-zinc-300 font-bold uppercase text-[10px] mb-1">
                    Price ($)
                  </label>
                  <input
                    type="number"
                    value={newPrice}
                    onChange={(e) => setNewPrice(e.target.value)}
                    className="w-full bg-zinc-900 border border-zinc-700 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-[#FF7A1A]"
                  />
                </div>
                <div>
                  <label className="block text-zinc-300 font-bold uppercase text-[10px] mb-1">
                    Duration (Minutes)
                  </label>
                  <input
                    type="number"
                    value={newDuration}
                    onChange={(e) => setNewDuration(e.target.value)}
                    className="w-full bg-zinc-900 border border-zinc-700 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-[#FF7A1A]"
                  />
                </div>
              </div>

              <div className="flex items-center justify-end gap-2 mt-4 pt-3 border-t border-zinc-800">
                <button
                  type="button"
                  onClick={() => setNewServiceModalOpen(false)}
                  className="px-4 py-2 text-zinc-400 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-[#FF7A1A] hover:bg-[#FF8A30] text-black font-bold uppercase px-5 py-2.5 rounded-xl shadow-lg"
                >
                  Save Service
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirm */}
      <ConfirmModal
        isOpen={!!confirmDeleteId}
        title="Delete Service"
        message="Are you sure you want to remove this service from the salon menu? Active bookings will preserve their details."
        confirmText="Delete"
        onConfirm={handleDelete}
        onCancel={() => setConfirmDeleteId(null)}
        isDanger={true}
      />
    </CrmLayout>
  );
};

export default AdminServicesPage;
