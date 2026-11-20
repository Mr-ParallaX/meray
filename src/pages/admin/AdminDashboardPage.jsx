import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import CrmLayout from '../../components/crm/CrmLayout';
import { getBookings, getCustomers, updateBookingStatus } from '../../services/crmApi';
import { useToast } from '../../components/crm/ToastContext';
import {
  CalendarCheck,
  Clock,
  DollarSign,
  TrendingUp,
  UserPlus,
  ArrowRight,
  CheckCircle2,
  AlertCircle,
  Phone,
  Scissors
} from 'lucide-react';

const AUDIENCE_COLORS = {
  men: '#F5A623',
  women: '#E54C43',
  girl: '#9B59B6',
  boy: '#3FA8D6'
};

const AdminDashboardPage = () => {
  const [bookings, setBookings] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const { addToast } = useToast();

  const loadData = async () => {
    try {
      setLoading(true);
      const [bList, cList] = await Promise.all([getBookings(), getCustomers()]);
      setBookings(bList);
      setCustomers(cList);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();

    const handleNew = () => loadData();
    window.addEventListener('meray_new_booking', handleNew);
    return () => window.removeEventListener('meray_new_booking', handleNew);
  }, []);

  const todayStr = new Date().toISOString().split('T')[0];
  const todayBookings = bookings.filter((b) => b.date === todayStr);
  const pendingBookings = bookings.filter((b) => b.status === 'pending');

  // Next 7 days count
  const next7DaysCount = bookings.filter((b) => {
    const bDate = new Date(b.date);
    const now = new Date();
    const diff = (bDate - now) / (1000 * 60 * 60 * 24);
    return diff >= 0 && diff <= 7;
  }).length;

  // Completed revenue this month
  const currentMonth = new Date().getMonth();
  const revenueThisMonth = bookings
    .filter((b) => b.status === 'completed' && new Date(b.date).getMonth() === currentMonth)
    .reduce((sum, b) => sum + (b.price || 0), 0);

  // New customers count
  const newCustomersThisMonth = customers.length;

  // "Up next" booking calculation
  const upNextBooking = todayBookings.find((b) => b.status === 'confirmed' || b.status === 'pending');

  // 14 days chart data
  const last14Days = Array.from({ length: 14 }).map((_, i) => {
    const d = new Date();
    d.setDate(d.getDate() - (13 - i));
    const iso = d.toISOString().split('T')[0];
    const count = bookings.filter((b) => b.date === iso).length;
    const label = d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    return { iso, label, count };
  });

  const maxDailyCount = Math.max(...last14Days.map((d) => d.count), 4);

  // Audience Donut distribution
  const audienceCounts = {
    men: bookings.filter((b) => b.audience === 'men').length,
    women: bookings.filter((b) => b.audience === 'women').length,
    girl: bookings.filter((b) => b.audience === 'girl').length,
    boy: bookings.filter((b) => b.audience === 'boy').length
  };
  const totalAudience = Object.values(audienceCounts).reduce((a, b) => a + b, 0) || 1;

  const handleQuickStatus = async (id, status) => {
    try {
      await updateBookingStatus(id, status);
      addToast(`Booking updated to ${status}`, 'success');
      loadData();
    } catch (e) {
      addToast('Failed to update booking', 'error');
    }
  };

  return (
    <CrmLayout pageTitle="Executive Dashboard">
      {/* =====================================================================
          KPI METRIC CARDS
         ===================================================================== */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3.5 sm:gap-4 mb-8">
        {/* Today's Bookings */}
        <div className="bg-[#121215] border border-zinc-800/80 rounded-2xl p-4 sm:p-5 flex flex-col justify-between">
          <div className="flex items-center justify-between text-zinc-400 mb-2">
            <span className="text-[11px] font-bold uppercase tracking-wider">Today's Bookings</span>
            <CalendarCheck className="w-4 h-4 text-[#FF7A1A]" />
          </div>
          <div className="text-2xl sm:text-3xl font-thunder font-bold text-white">
            {todayBookings.length}
          </div>
          <div className="text-[10px] text-zinc-500 mt-1">
            {todayBookings.filter((b) => b.status === 'completed').length} completed
          </div>
        </div>

        {/* Pending Approvals */}
        <div className="bg-[#121215] border border-zinc-800/80 rounded-2xl p-4 sm:p-5 flex flex-col justify-between">
          <div className="flex items-center justify-between text-zinc-400 mb-2">
            <span className="text-[11px] font-bold uppercase tracking-wider">Pending Action</span>
            <Clock className="w-4 h-4 text-amber-400" />
          </div>
          <div className="text-2xl sm:text-3xl font-thunder font-bold text-amber-400">
            {pendingBookings.length}
          </div>
          <div className="text-[10px] text-zinc-500 mt-1">Requires confirmation</div>
        </div>

        {/* Next 7 Days */}
        <div className="bg-[#121215] border border-zinc-800/80 rounded-2xl p-4 sm:p-5 flex flex-col justify-between">
          <div className="flex items-center justify-between text-zinc-400 mb-2">
            <span className="text-[11px] font-bold uppercase tracking-wider">Next 7 Days</span>
            <TrendingUp className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="text-2xl sm:text-3xl font-thunder font-bold text-white">
            {next7DaysCount}
          </div>
          <div className="text-[10px] text-zinc-500 mt-1">Scheduled appointments</div>
        </div>

        {/* Month Revenue */}
        <div className="bg-[#121215] border border-zinc-800/80 rounded-2xl p-4 sm:p-5 flex flex-col justify-between">
          <div className="flex items-center justify-between text-zinc-400 mb-2">
            <span className="text-[11px] font-bold uppercase tracking-wider">Revenue (Month)</span>
            <DollarSign className="w-4 h-4 text-[#FF7A1A]" />
          </div>
          <div className="text-2xl sm:text-3xl font-thunder font-bold text-white">
            ${revenueThisMonth}
          </div>
          <div className="text-[10px] text-zinc-500 mt-1">Completed bookings only</div>
        </div>

        {/* Customers */}
        <div className="col-span-2 sm:col-span-1 bg-[#121215] border border-zinc-800/80 rounded-2xl p-4 sm:p-5 flex flex-col justify-between">
          <div className="flex items-center justify-between text-zinc-400 mb-2">
            <span className="text-[11px] font-bold uppercase tracking-wider">Client Base</span>
            <UserPlus className="w-4 h-4 text-blue-400" />
          </div>
          <div className="text-2xl sm:text-3xl font-thunder font-bold text-white">
            {newCustomersThisMonth}
          </div>
          <div className="text-[10px] text-zinc-500 mt-1">Registered clients</div>
        </div>
      </div>

      {/* =====================================================================
          UP NEXT CARD & TIMELINE ROW
         ===================================================================== */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        {/* Up Next Card */}
        <div className="bg-gradient-to-br from-[#1A1A20] to-[#121215] border border-zinc-800/80 rounded-3xl p-6 relative overflow-hidden flex flex-col justify-between shadow-xl">
          <div className="absolute top-0 right-0 w-32 h-32 bg-[#FF7A1A]/10 rounded-full blur-2xl pointer-events-none" />
          <div>
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-bold uppercase tracking-widest text-[#FF7A1A] flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-[#FF7A1A] animate-ping" />
                UP NEXT IN SALON
              </span>
              <span className="text-[10px] bg-zinc-800 text-zinc-400 px-2 py-0.5 rounded-full font-mono">
                TODAY
              </span>
            </div>

            {upNextBooking ? (
              <div>
                <h3 className="text-2xl font-thunder font-bold text-white tracking-tight">
                  {upNextBooking.clientName}
                </h3>
                <div className="flex items-center gap-2 text-zinc-400 text-xs mt-1">
                  <Scissors className="w-3.5 h-3.5 text-[#FF7A1A]" />
                  <span>{upNextBooking.service}</span>
                </div>
                <div className="flex items-center gap-2 text-zinc-400 text-xs mt-1">
                  <Clock className="w-3.5 h-3.5 text-zinc-500" />
                  <span className="text-white font-semibold">{upNextBooking.time}</span>
                  <span>• with {upNextBooking.stylistName}</span>
                </div>

                <div className="mt-4 p-3 bg-zinc-900/80 border border-zinc-800 rounded-xl text-xs text-zinc-300">
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-[10px] text-zinc-500 uppercase font-bold">Client Notes</span>
                    <span className="text-[10px] font-bold text-[#FF7A1A]">${upNextBooking.price}</span>
                  </div>
                  <p className="italic text-zinc-400">{upNextBooking.notes || 'No special requests'}</p>
                </div>
              </div>
            ) : (
              <div className="py-8 text-center text-zinc-500 text-xs">
                No upcoming appointments pending today. All caught up!
              </div>
            )}
          </div>

          {upNextBooking && (
            <div className="flex items-center gap-2 mt-6 pt-4 border-t border-zinc-800/60">
              <button
                onClick={() => handleQuickStatus(upNextBooking.id, 'completed')}
                className="flex-1 bg-[#FF7A1A] hover:bg-[#FF8A30] text-black font-bold text-xs uppercase tracking-wider py-2.5 rounded-xl transition-all shadow-md"
              >
                Mark Completed
              </button>
              <a
                href={`tel:${upNextBooking.phone}`}
                className="p-2.5 rounded-xl bg-zinc-800 text-zinc-300 hover:text-white transition-colors"
                title="Call client"
              >
                <Phone className="w-4 h-4" />
              </a>
            </div>
          )}
        </div>

        {/* Today's Schedule Timeline (2 Cols) */}
        <div className="lg:col-span-2 bg-[#121215] border border-zinc-800/80 rounded-3xl p-6 shadow-xl flex flex-col justify-between">
          <div className="flex items-center justify-between pb-4 border-b border-zinc-800/60 mb-4">
            <div>
              <h2 className="text-xl font-thunder font-bold uppercase tracking-tight text-white">
                TODAY'S TIMELINE ({todayBookings.length})
              </h2>
              <span className="text-xs text-zinc-400">
                Live appointments for {new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric' })}
              </span>
            </div>
            <Link
              to="/admin/bookings"
              className="text-xs font-bold text-[#FF7A1A] hover:underline flex items-center gap-1"
            >
              <span>All Bookings</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="flex flex-col gap-3 overflow-y-auto max-h-[320px] pr-1">
            {todayBookings.length === 0 ? (
              <div className="py-12 text-center text-zinc-500 text-xs">
                No appointments booked for today.
              </div>
            ) : (
              todayBookings.map((b) => {
                const audColor = AUDIENCE_COLORS[b.audience] || '#FF7A1A';
                return (
                  <div
                    key={b.id}
                    className="p-3.5 rounded-2xl bg-[#17171C] border border-zinc-800/70 hover:border-zinc-700 transition-all flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3"
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className="w-2.5 h-10 rounded-full flex-shrink-0"
                        style={{ backgroundColor: audColor }}
                      />
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-mono text-xs font-bold text-white">{b.time}</span>
                          <span className="text-xs font-bold text-zinc-200">{b.clientName}</span>
                        </div>
                        <div className="text-[11px] text-zinc-400 mt-0.5">
                          {b.service} • Stylist: <span className="text-zinc-300">{b.stylistName}</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2.5 w-full sm:w-auto justify-between sm:justify-end">
                      <span className="font-thunder text-base font-bold text-white">${b.price}</span>
                      <span
                        className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md ${
                          b.status === 'completed'
                            ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                            : b.status === 'confirmed'
                            ? 'bg-blue-500/10 text-blue-400 border border-blue-500/20'
                            : b.status === 'cancelled'
                            ? 'bg-red-500/10 text-red-400 border border-red-500/20'
                            : 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                        }`}
                      >
                        {b.status}
                      </span>
                      {b.status === 'pending' && (
                        <button
                          onClick={() => handleQuickStatus(b.id, 'confirmed')}
                          className="text-[11px] font-bold bg-[#FF7A1A]/20 text-[#FF7A1A] hover:bg-[#FF7A1A] hover:text-black px-2.5 py-1 rounded-lg transition-colors"
                        >
                          Confirm
                        </button>
                      )}
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>
      </div>

      {/* =====================================================================
          CHARTS ROW: 14-DAY ACTIVITY (BAR) & AUDIENCE SPLIT (DONUT)
         ===================================================================== */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* 14-Day Booking Activity Chart (2 Cols) */}
        <div className="lg:col-span-2 bg-[#121215] border border-zinc-800/80 rounded-3xl p-6 shadow-xl">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-xl font-thunder font-bold uppercase tracking-tight text-white">
                14-Day Booking Trends
              </h3>
              <p className="text-xs text-zinc-400">Total volume of daily appointments</p>
            </div>
            <span className="text-xs font-mono text-zinc-500">Last 14 Days</span>
          </div>

          {/* SVG Bar Chart */}
          <div className="w-full h-48 flex items-end justify-between gap-1 sm:gap-2 pt-4 px-2 border-b border-zinc-800">
            {last14Days.map((item, idx) => {
              const heightPct = Math.max((item.count / maxDailyCount) * 100, 6);
              const isToday = item.iso === todayStr;
              return (
                <div key={idx} className="flex-1 flex flex-col items-center gap-2 group h-full justify-end">
                  <span className="text-[10px] font-mono text-zinc-400 opacity-0 group-hover:opacity-100 transition-opacity">
                    {item.count}
                  </span>
                  <div
                    className={`w-full rounded-t-md transition-all duration-300 ${
                      isToday
                        ? 'bg-[#FF7A1A] shadow-lg shadow-[#FF7A1A]/30'
                        : 'bg-zinc-700/60 hover:bg-zinc-600'
                    }`}
                    style={{ height: `${heightPct}%` }}
                  />
                  <span className="text-[9px] font-mono text-zinc-500 truncate w-full text-center">
                    {item.label.split(' ')[1]}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Audience Split Donut Chart (1 Col) */}
        <div className="bg-[#121215] border border-zinc-800/80 rounded-3xl p-6 shadow-xl flex flex-col justify-between">
          <div>
            <h3 className="text-xl font-thunder font-bold uppercase tracking-tight text-white mb-1">
              Audience Breakdown
            </h3>
            <p className="text-xs text-zinc-400 mb-4">Bookings split by salon category</p>

            {/* Donut representation */}
            <div className="relative w-36 h-36 mx-auto my-3 flex items-center justify-center">
              <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
                {(() => {
                  let accumulatedPercent = 0;
                  return Object.entries(audienceCounts).map(([key, count]) => {
                    const pct = (count / totalAudience) * 100;
                    const strokeDasharray = `${pct * 2.512} ${251.2}`;
                    const strokeDashoffset = -accumulatedPercent * 2.512;
                    accumulatedPercent += pct;
                    return (
                      <circle
                        key={key}
                        cx="50"
                        cy="50"
                        r="40"
                        fill="transparent"
                        stroke={AUDIENCE_COLORS[key]}
                        strokeWidth="14"
                        strokeDasharray={strokeDasharray}
                        strokeDashoffset={strokeDashoffset}
                      />
                    );
                  });
                })()}
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                <span className="text-2xl font-thunder font-bold text-white">{totalAudience}</span>
                <span className="text-[9px] text-zinc-400 uppercase font-bold">Total</span>
              </div>
            </div>
          </div>

          {/* Legend */}
          <div className="grid grid-cols-2 gap-2 mt-4 pt-4 border-t border-zinc-800/60">
            {Object.entries(audienceCounts).map(([key, count]) => {
              const pct = Math.round((count / totalAudience) * 100);
              return (
                <div key={key} className="flex items-center gap-2">
                  <span
                    className="w-2.5 h-2.5 rounded-full flex-shrink-0"
                    style={{ backgroundColor: AUDIENCE_COLORS[key] }}
                  />
                  <div className="flex justify-between w-full text-xs">
                    <span className="text-zinc-400 capitalize">{key}</span>
                    <span className="text-white font-bold">{pct}%</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </CrmLayout>
  );
};

export default AdminDashboardPage;
