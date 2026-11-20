import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Lock, Mail, ArrowLeft, ShieldAlert } from 'lucide-react';
import { loginDemo, DEMO_CREDENTIALS } from '../../config/demoAuth';
import { useToast } from '../../components/crm/ToastContext';

const AdminLoginPage = () => {
  const [email, setEmail] = useState(DEMO_CREDENTIALS.email);
  const [password, setPassword] = useState(DEMO_CREDENTIALS.password);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();
  const { addToast } = useToast();

  const from = location.state?.from?.pathname || '/admin';

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    setTimeout(() => {
      const res = loginDemo(email, password);
      setLoading(false);
      if (res.success) {
        addToast(`Welcome back, ${res.session.user.name}!`, 'success');
        navigate(from, { replace: true });
      } else {
        setError(res.error || 'Authentication failed');
      }
    }, 300);
  };

  return (
    <div className="min-h-screen bg-black text-white flex flex-col justify-between p-6 sm:p-12 relative overflow-hidden font-sans">
      {/* Background Glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[#FF7A1A]/10 rounded-full blur-[140px] pointer-events-none" />

      {/* Top Bar with Back Link */}
      <div className="relative z-10 flex items-center justify-between">
        <Link
          to="/"
          className="flex items-center gap-2 text-zinc-400 hover:text-white transition-colors text-xs font-bold uppercase tracking-wider group"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          <span>Back to Salon Website</span>
        </Link>

        <span className="font-thunder text-3xl font-bold tracking-tight italic text-white">
          MERAY
        </span>
      </div>

      {/* Main Login Card */}
      <div className="relative z-10 max-w-md w-full mx-auto my-12 bg-[#121215] border border-zinc-800/80 rounded-3xl p-8 sm:p-10 shadow-2xl">
        <div className="text-center mb-8">
          <div className="w-12 h-12 rounded-2xl bg-[#FF7A1A]/15 border border-[#FF7A1A]/30 flex items-center justify-center mx-auto mb-4 text-[#FF7A1A]">
            <Lock className="w-6 h-6" />
          </div>
          <h1 className="text-3xl font-thunder font-bold uppercase tracking-tight text-white mb-2">
            STAFF LOGIN
          </h1>
          <p className="text-xs text-zinc-400">
            Meray Hair Salon Owner & Stylist Management Portal
          </p>
        </div>

        {error && (
          <div className="mb-6 p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-xs flex items-center gap-2">
            <ShieldAlert className="w-4 h-4 flex-shrink-0" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div>
            <label className="block text-[11px] font-bold uppercase tracking-wider text-zinc-300 mb-1.5">
              Staff Email
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 text-zinc-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full bg-zinc-900/80 border border-zinc-700/80 rounded-xl pl-10 pr-4 py-3 text-sm text-white focus:outline-none focus:border-[#FF7A1A] transition-colors"
                placeholder="admin@meray.com"
              />
            </div>
          </div>

          <div>
            <label className="block text-[11px] font-bold uppercase tracking-wider text-zinc-300 mb-1.5">
              Password
            </label>
            <div className="relative">
              <Lock className="w-4 h-4 text-zinc-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full bg-zinc-900/80 border border-zinc-700/80 rounded-xl pl-10 pr-4 py-3 text-sm text-white focus:outline-none focus:border-[#FF7A1A] transition-colors"
                placeholder="••••••••"
              />
            </div>
          </div>

          <div className="p-3 bg-zinc-900/60 border border-zinc-800 rounded-xl text-[11px] text-zinc-400 leading-relaxed">
            <strong className="text-zinc-200">Demo Credentials:</strong><br />
            Email: <code className="text-[#FF7A1A]">admin@meray.com</code><br />
            Password: <code className="text-[#FF7A1A]">meray123</code>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full mt-2 bg-[#FF7A1A] hover:bg-[#FF8A30] text-black font-thunder font-bold text-lg uppercase tracking-wider py-3.5 rounded-xl transition-all shadow-lg shadow-[#FF7A1A]/20 disabled:opacity-50"
          >
            {loading ? 'Authenticating...' : 'Sign In'}
          </button>
        </form>
      </div>

      {/* Footer Disclaimer */}
      <div className="relative z-10 text-center text-zinc-500 text-[11px]">
        {/* TODO: replace with Supabase Auth — this is NOT secure */}
        <span>Meray Hair Salon • 1582 Busse Rd, Mt Prospect, IL 60056</span>
      </div>
    </div>
  );
};

export default AdminLoginPage;
