import React, { useState, useEffect } from 'react';
import CrmLayout from '../../components/crm/CrmLayout';
import ConfirmModal from '../../components/crm/ConfirmModal';
import { getReviews, updateReviewStatus, deleteReview } from '../../services/crmApi';
import { useToast } from '../../components/crm/ToastContext';
import {
  Star,
  CheckCircle2,
  EyeOff,
  Trash2,
  Clock,
  User,
  MessageSquare
} from 'lucide-react';

const AdminReviewsPage = () => {
  const [reviews, setReviews] = useState([]);
  const [activeTab, setActiveTab] = useState('pending'); // 'pending' | 'approved'
  const [confirmDeleteId, setConfirmDeleteId] = useState(null);
  const { addToast } = useToast();

  const loadData = async () => {
    try {
      const data = await getReviews();
      setReviews(data);
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleApprove = async (id) => {
    try {
      await updateReviewStatus(id, 'approved');
      addToast('Review approved and published to website', 'success');
      loadData();
    } catch (e) {
      addToast('Failed to approve review', 'error');
    }
  };

  const handleHide = async (id) => {
    try {
      await updateReviewStatus(id, 'hidden');
      addToast('Review hidden from website', 'info');
      loadData();
    } catch (e) {
      addToast('Failed to hide review', 'error');
    }
  };

  const handleDelete = async () => {
    if (!confirmDeleteId) return;
    try {
      await deleteReview(confirmDeleteId);
      addToast('Review deleted', 'info');
      setConfirmDeleteId(null);
      loadData();
    } catch (e) {
      addToast('Failed to delete review', 'error');
    }
  };

  const pendingList = reviews.filter((r) => r.status === 'pending');
  const approvedList = reviews.filter((r) => r.status === 'approved');
  const displayedReviews = activeTab === 'pending' ? pendingList : approvedList;

  return (
    <CrmLayout pageTitle="Client Reviews & Testimonials">
      {/* Top Filter Tabs */}
      <div className="flex items-center justify-between gap-4 mb-6">
        <div className="flex items-center gap-1.5 bg-[#121215] p-1.5 rounded-2xl border border-zinc-800 text-xs">
          <button
            onClick={() => setActiveTab('pending')}
            className={`px-5 py-2 rounded-xl font-bold uppercase transition-all flex items-center gap-2 ${
              activeTab === 'pending'
                ? 'bg-[#FF7A1A] text-black shadow-lg shadow-[#FF7A1A]/20'
                : 'text-zinc-400 hover:text-white'
            }`}
          >
            <Clock className="w-4 h-4" />
            <span>Pending Approvals ({pendingList.length})</span>
          </button>
          <button
            onClick={() => setActiveTab('approved')}
            className={`px-5 py-2 rounded-xl font-bold uppercase transition-all flex items-center gap-2 ${
              activeTab === 'approved'
                ? 'bg-[#FF7A1A] text-black shadow-lg shadow-[#FF7A1A]/20'
                : 'text-zinc-400 hover:text-white'
            }`}
          >
            <CheckCircle2 className="w-4 h-4" />
            <span>Approved & Live ({approvedList.length})</span>
          </button>
        </div>
      </div>

      {/* Reviews List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {displayedReviews.length === 0 ? (
          <div className="col-span-2 py-16 text-center text-zinc-500 text-sm bg-[#121215] border border-zinc-800 rounded-3xl">
            No {activeTab} reviews found.
          </div>
        ) : (
          displayedReviews.map((rev) => (
            <div
              key={rev.id}
              className="bg-[#121215] border border-zinc-800/80 rounded-3xl p-6 shadow-xl flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2.5">
                    <div className="w-9 h-9 rounded-full bg-zinc-800 flex items-center justify-center font-bold text-white text-xs">
                      {rev.author.charAt(0)}
                    </div>
                    <div>
                      <div className="text-white font-bold text-sm">{rev.author}</div>
                      <div className="text-[10px] text-zinc-500">{rev.date} • {rev.audience}</div>
                    </div>
                  </div>

                  {/* Stars */}
                  <div className="flex items-center gap-0.5 text-[#FF7A1A]">
                    {Array.from({ length: rev.rating }).map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-[#FF7A1A]" />
                    ))}
                  </div>
                </div>

                <p className="text-xs text-zinc-300 leading-relaxed italic bg-zinc-900/60 p-4 rounded-2xl border border-zinc-800/60 mb-4">
                  "{rev.comment}"
                </p>
              </div>

              {/* Actions Footer */}
              <div className="flex items-center justify-between pt-3 border-t border-zinc-800/60 text-xs">
                <span className="text-[10px] uppercase font-bold text-zinc-500">
                  Status: <strong className="text-white capitalize">{rev.status}</strong>
                </span>

                <div className="flex items-center gap-2">
                  {rev.status === 'pending' && (
                    <button
                      onClick={() => handleApprove(rev.id)}
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-500/20 text-emerald-400 hover:bg-emerald-500 hover:text-black font-bold text-xs transition-colors"
                    >
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>Approve</span>
                    </button>
                  )}
                  {rev.status === 'approved' && (
                    <button
                      onClick={() => handleHide(rev.id)}
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-zinc-800 text-zinc-400 hover:text-white text-xs font-semibold"
                    >
                      <EyeOff className="w-3.5 h-3.5" />
                      <span>Hide</span>
                    </button>
                  )}
                  <button
                    onClick={() => setConfirmDeleteId(rev.id)}
                    className="p-1.5 rounded-lg text-zinc-500 hover:text-red-400 transition-colors"
                    title="Delete"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Delete Confirmation */}
      <ConfirmModal
        isOpen={!!confirmDeleteId}
        title="Delete Review"
        message="Are you sure you want to permanently delete this testimonial?"
        confirmText="Delete"
        onConfirm={handleDelete}
        onCancel={() => setConfirmDeleteId(null)}
        isDanger={true}
      />
    </CrmLayout>
  );
};

export default AdminReviewsPage;
