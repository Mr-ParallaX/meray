import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard,
  CalendarCheck,
  Calendar,
  Users,
  Scissors,
  Sparkles,
  Image as ImageIcon,
  Tag,
  Star,
  UserCheck,
  Settings,
  Bell,
  LogOut,
  ExternalLink,
  PlusCircle,
  Menu,
  X,
  ChevronRight,
  Zap
} from 'lucide-react';
import { logoutDemo, getDemoSession } from '../../config/demoAuth';
import { getBookings, simulateNewBooking } from '../../services/crmApi';
import { useToast } from './ToastContext';

const NAV_ITEMS = [
  { path: '/admin', label: 'Dashboard', icon: LayoutDashboard },
  { path: '/admin/bookings', label: 'Bookings', icon: CalendarCheck },
  { path: '/admin/calendar', label: 'Calendar', icon: Calendar },
  { path: '/admin/customers', label: 'Customers', icon: Users },
  { path: '/admin/services', label: 'Services & Prices', icon: Scissors },
  { path: '/admin/styles', label: 'Lookbook / Styles', icon: Sparkles },
  { path: '/admin/gallery', label: 'Gallery & B/A', icon: ImageIcon },
  { path: '/admin/offers', label: 'Offers & Promos', icon: Tag },
  { path: '/admin/reviews', label: 'Reviews', icon: Star },
  { path: '/admin/stylists', label: 'Stylists & Team', icon: UserCheck },
  { path: '/admin/settings', label: 'Settings', icon: Settings },
];

const CrmLayout = ({ children, pageTitle = 'Dashboard' }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { addToast } = useToast();
  const session = getDemoSession();

  const [pendingCount, setPendingCount] = useState(0);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [pendingList, setPendingList] = useState([]);
  const [moreDrawerOpen, setMoreDrawerOpen] = useState(false);

  // Load pending bookings for notification bell
  const refreshPending = async () => {
    try {
      const all = await getBookings();
      const p = all.filter((b) => b.status === 'pending');
      setPendingCount(p.length);
      setPendingList(p.slice(0, 5));
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    refreshPending();

    const handleNewBooking = (e) => {
      refreshPending();
      if (e.detail) {
        addToast(`New Booking Alert! ${e.detail.clientName} booked ${e.detail.service} ($${e.detail.price})`, 'success');
      }
    };

    window.addEventListener('meray_new_booking', handleNewBooking);
    return () => window.removeEventListener('meray_new_booking', handleNewBooking);
  }, [addToast]);

  const handleLogout = () => {
    logoutDemo();
    addToast('Signed out of admin dashboard', 'info');
    navigate('/admin/login');
  };

  const handleSimulateBooking = async () => {
    try {
      const simulated = await simulateNewBooking();
      // Toast and audio handled by listener
    } catch (e) {
      addToast('Error simulating booking', 'error');
    }
  };

  // Close drawers on route change
  useEffect(() => {
    setMoreDrawerOpen(false);
    setNotificationsOpen(false);
  }, [location.pathname]);

  return (
    <div className="min-h-screen bg-[#0A0A0C] text-zinc-100 flex font-sans select-none antialiased">
      {/* =====================================================================
          DESKTOP LEFT SIDEBAR (>= 1024px)
         ===================================================================== */}
      <aside className="hidden lg:flex w-64 flex-col justify-between bg-[#111114] border-r border-zinc-800/80 p-4 fixed inset-y-0 left-0 z-40">
        <div>
          {/* Logo & CRM Badge */}
          <div className="flex items-center justify-between pb-6 pt-2 px-2 border-b border-zinc-800/60">
            <Link to="/admin" className="flex items-center gap-2">
              <span className="font-thunder text-3xl font-bold tracking-tight italic text-white">
                MERAY
              </span>
              <span className="bg-[#FF7A1A]/15 text-[#FF7A1A] border border-[#FF7A1A]/30 text-[10px] font-bold px-2 py-0.5 rounded-md uppercase tracking-wider">
                CRM
              </span>
            </Link>
          </div>

          {/* Navigation Links */}
          <nav className="mt-6 flex flex-col gap-1">
            {NAV_ITEMS.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-semibold tracking-wide transition-all ${
                    isActive
                      ? 'bg-[#FF7A1A] text-black shadow-lg shadow-[#FF7A1A]/20'
                      : 'text-zinc-400 hover:text-white hover:bg-zinc-800/60'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-black' : 'text-zinc-400'}`} />
                  <span className="font-sans">{item.label}</span>
                  {item.path === '/admin/bookings' && pendingCount > 0 && (
                    <span
                      className={`ml-auto text-[10px] font-bold px-1.5 py-0.2 rounded-full ${
                        isActive ? 'bg-black text-[#FF7A1A]' : 'bg-[#FF7A1A] text-black'
                      }`}
                    >
                      {pendingCount}
                    </span>
                  )}
                </Link>
              );
            })}
          </nav>
        </div>

        {/* User Card & Logout */}
        <div className="pt-4 border-t border-zinc-800/60">
          <div className="flex items-center gap-3 px-2 py-2 mb-2">
            <div className="w-9 h-9 rounded-full bg-[#FF7A1A]/20 border border-[#FF7A1A]/40 flex items-center justify-center font-thunder text-base font-bold text-[#FF7A1A]">
              MV
            </div>
            <div className="overflow-hidden">
              <div className="text-xs font-bold text-white truncate">
                {session?.user?.name || 'Marcus Vance'}
              </div>
              <div className="text-[10px] text-zinc-400 truncate">
                {session?.user?.role || 'Salon Owner'}
              </div>
            </div>
          </div>

          <button
            onClick={handleLogout}
            className="w-full flex items-center justify-center gap-2 px-3 py-2 rounded-xl text-xs font-semibold text-zinc-400 hover:text-red-400 hover:bg-red-500/10 transition-colors"
          >
            <LogOut className="w-4 h-4" />
            <span>Sign Out</span>
          </button>
        </div>
      </aside>

      {/* =====================================================================
          MAIN CONTENT AREA & TOP BAR
         ===================================================================== */}
      <div className="flex-1 lg:pl-64 flex flex-col min-h-screen">
        {/* Top Header Bar */}
        <header className="sticky top-0 z-30 bg-[#0A0A0C]/90 backdrop-blur-md border-b border-zinc-800/80 px-4 sm:px-8 py-3.5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <h1 className="text-xl sm:text-2xl font-thunder font-bold uppercase tracking-tight text-white flex items-center gap-2">
              {pageTitle}
            </h1>
            <span className="hidden sm:inline-block bg-zinc-800 text-zinc-400 border border-zinc-700/60 text-[10px] font-medium px-2 py-0.5 rounded-full">
              Demo Mode
            </span>
          </div>

          <div className="flex items-center gap-2.5 sm:gap-4">
            {/* Simulate Booking Alert Button */}
            <button
              onClick={handleSimulateBooking}
              className="flex items-center gap-1.5 bg-[#FF7A1A]/10 border border-[#FF7A1A]/30 text-[#FF7A1A] hover:bg-[#FF7A1A] hover:text-black px-2.5 sm:px-3 py-1.5 rounded-xl text-xs font-bold transition-all shadow-sm"
              title="Simulate a new incoming client booking"
            >
              <Zap className="w-3.5 h-3.5" />
              <span className="hidden md:inline">Simulate Booking</span>
            </button>

            {/* Notification Bell with Dropdown */}
            <div className="relative">
              <button
                onClick={() => setNotificationsOpen(!notificationsOpen)}
                className="relative p-2 rounded-xl text-zinc-300 hover:text-white hover:bg-zinc-800 transition-colors"
                aria-label="View notifications"
              >
                <Bell className="w-5 h-5" />
                {pendingCount > 0 && (
                  <span className="absolute top-1 right-1 w-4 h-4 rounded-full bg-[#FF7A1A] text-black text-[10px] font-black flex items-center justify-center animate-pulse">
                    {pendingCount}
                  </span>
                )}
              </button>

              {notificationsOpen && (
                <div className="absolute right-0 mt-2 w-80 bg-[#141417] border border-zinc-800 rounded-2xl shadow-2xl p-4 z-50 animate-hero-fade-up">
                  <div className="flex items-center justify-between pb-3 border-b border-zinc-800">
                    <span className="text-xs font-bold uppercase tracking-wider text-white">
                      Pending Approvals ({pendingCount})
                    </span>
                    <Link
                      to="/admin/bookings"
                      onClick={() => setNotificationsOpen(false)}
                      className="text-[11px] text-[#FF7A1A] hover:underline font-semibold"
                    >
                      View All
                    </Link>
                  </div>
                  <div className="mt-3 flex flex-col gap-2 max-h-60 overflow-y-auto">
                    {pendingList.length === 0 ? (
                      <p className="text-xs text-zinc-500 py-3 text-center">No pending bookings</p>
                    ) : (
                      pendingList.map((item) => (
                        <Link
                          key={item.id}
                          to="/admin/bookings"
                          onClick={() => setNotificationsOpen(false)}
                          className="p-2.5 rounded-xl bg-zinc-900/60 hover:bg-zinc-800/80 transition-colors border border-zinc-800/40 text-left block"
                        >
                          <div className="flex justify-between items-start">
                            <span className="text-xs font-bold text-white">{item.clientName}</span>
                            <span className="text-[10px] font-bold text-[#FF7A1A]">${item.price}</span>
                          </div>
                          <div className="text-[11px] text-zinc-400 mt-0.5">
                            {item.service} • {item.time} ({item.date})
                          </div>
                        </Link>
                      ))
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* View Website ↗ */}
            <Link
              to="/"
              className="flex items-center gap-1.5 text-xs font-semibold text-zinc-400 hover:text-white px-2.5 py-1.5 rounded-xl hover:bg-zinc-800/60 transition-colors border border-zinc-800/60"
            >
              <span className="hidden sm:inline">Website</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </Link>
          </div>
        </header>

        {/* Content Body */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto pb-24 lg:pb-8">
          {children}
        </main>
      </div>

      {/* =====================================================================
          PHONE BOTTOM TAB BAR (< 1024px)
          Big tap targets: Dashboard, Bookings, Calendar, Gallery, More
         ===================================================================== */}
      <div className="lg:hidden fixed bottom-0 inset-x-0 bg-[#111114]/95 backdrop-blur-xl border-t border-zinc-800 z-50 px-2 py-2 flex items-center justify-around shadow-2xl">
        <Link
          to="/admin"
          className={`flex flex-col items-center justify-center p-2 rounded-xl min-w-[56px] transition-colors ${
            location.pathname === '/admin' ? 'text-[#FF7A1A]' : 'text-zinc-400 hover:text-white'
          }`}
        >
          <LayoutDashboard className="w-5 h-5 mb-1" />
          <span className="text-[10px] font-bold uppercase tracking-tight">Dashboard</span>
        </Link>

        <Link
          to="/admin/bookings"
          className={`flex flex-col items-center justify-center p-2 rounded-xl min-w-[56px] transition-colors relative ${
            location.pathname === '/admin/bookings' ? 'text-[#FF7A1A]' : 'text-zinc-400 hover:text-white'
          }`}
        >
          <CalendarCheck className="w-5 h-5 mb-1" />
          <span className="text-[10px] font-bold uppercase tracking-tight">Bookings</span>
          {pendingCount > 0 && (
            <span className="absolute top-1 right-3 w-3.5 h-3.5 rounded-full bg-[#FF7A1A] text-black text-[9px] font-black flex items-center justify-center">
              {pendingCount}
            </span>
          )}
        </Link>

        <Link
          to="/admin/calendar"
          className={`flex flex-col items-center justify-center p-2 rounded-xl min-w-[56px] transition-colors ${
            location.pathname === '/admin/calendar' ? 'text-[#FF7A1A]' : 'text-zinc-400 hover:text-white'
          }`}
        >
          <Calendar className="w-5 h-5 mb-1" />
          <span className="text-[10px] font-bold uppercase tracking-tight">Calendar</span>
        </Link>

        <Link
          to="/admin/gallery"
          className={`flex flex-col items-center justify-center p-2 rounded-xl min-w-[56px] transition-colors ${
            location.pathname === '/admin/gallery' ? 'text-[#FF7A1A]' : 'text-zinc-400 hover:text-white'
          }`}
        >
          <ImageIcon className="w-5 h-5 mb-1" />
          <span className="text-[10px] font-bold uppercase tracking-tight">Gallery</span>
        </Link>

        <button
          onClick={() => setMoreDrawerOpen(true)}
          className={`flex flex-col items-center justify-center p-2 rounded-xl min-w-[56px] transition-colors ${
            moreDrawerOpen ? 'text-[#FF7A1A]' : 'text-zinc-400 hover:text-white'
          }`}
        >
          <Menu className="w-5 h-5 mb-1" />
          <span className="text-[10px] font-bold uppercase tracking-tight">More</span>
        </button>
      </div>

      {/* =====================================================================
          PHONE "MORE" SLIDE-UP SHEET (< 1024px)
         ===================================================================== */}
      {moreDrawerOpen && (
        <div className="lg:hidden fixed inset-0 z-[999] flex flex-col justify-end bg-black/80 backdrop-blur-md animate-fade-in">
          <div className="bg-[#141417] border-t border-zinc-800 rounded-t-3xl p-6 max-h-[85vh] overflow-y-auto shadow-2xl">
            <div className="flex items-center justify-between pb-4 border-b border-zinc-800 mb-4">
              <span className="font-thunder text-2xl font-bold uppercase tracking-tight text-white">
                All Salon Management
              </span>
              <button
                onClick={() => setMoreDrawerOpen(false)}
                className="p-2 text-zinc-400 hover:text-white rounded-full bg-zinc-800/60"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="grid grid-cols-2 gap-2.5">
              {NAV_ITEMS.map((item) => {
                const Icon = item.icon;
                const isActive = location.pathname === item.path;
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    onClick={() => setMoreDrawerOpen(false)}
                    className={`flex items-center gap-3 p-3 rounded-2xl border transition-all ${
                      isActive
                        ? 'bg-[#FF7A1A] border-[#FF7A1A] text-black font-bold'
                        : 'bg-zinc-900/60 border-zinc-800/80 text-zinc-300 hover:text-white hover:border-zinc-700'
                    }`}
                  >
                    <Icon className={`w-4 h-4 ${isActive ? 'text-black' : 'text-[#FF7A1A]'}`} />
                    <span className="text-xs font-semibold">{item.label}</span>
                  </Link>
                );
              })}
            </div>

            <div className="mt-6 pt-4 border-t border-zinc-800 flex items-center justify-between">
              <div className="text-xs text-zinc-400">
                Logged in as <strong className="text-white">{session?.user?.name || 'Marcus'}</strong>
              </div>
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold bg-red-500/10 text-red-400 hover:bg-red-500 hover:text-white transition-colors"
              >
                <LogOut className="w-4 h-4" />
                <span>Log Out</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CrmLayout;
