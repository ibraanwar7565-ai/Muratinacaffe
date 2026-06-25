import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  LayoutDashboard, CalendarCheck, BedDouble, Users, TrendingUp, DollarSign,
  Star, ArrowUpRight, ArrowDownRight, Search, Bell, Menu, X, Home, Settings,
  Moon, Sun, MoreHorizontal,
} from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { adminKpis, revenueSeries, occupancySeries, recentBookings, roomInventory } from '../data/adminData';

const navItems = [
  { label: 'Overview', icon: LayoutDashboard, active: true },
  { label: 'Bookings', icon: CalendarCheck },
  { label: 'Rooms', icon: BedDouble },
  { label: 'Guests', icon: Users },
  { label: 'Analytics', icon: TrendingUp },
  { label: 'Settings', icon: Settings },
];

const kpiIcons = { revenue: DollarSign, bookings: CalendarCheck, occupancy: BedDouble, rating: Star };

export default function AdminDashboard() {
  const { theme, toggle } = useTheme();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-navy-950 text-navy-50 light:bg-navy-50 light:text-navy-800">
      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-64 transform border-r border-white/10 bg-navy-900 transition-transform duration-300 light:border-navy-900/10 light:bg-white lg:translate-x-0 ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex h-16 items-center justify-between px-6">
          <span className="font-serif text-xl font-semibold tracking-[0.15em] text-white light:text-navy-800">
            AUREL<span className="gold-text">IA</span>
          </span>
          <button onClick={() => setSidebarOpen(false)} className="text-white/60 lg:hidden">
            <X size={20} />
          </button>
        </div>

        <nav className="mt-4 space-y-1 px-4">
          {navItems.map((item) => (
            <button
              key={item.label}
              className={`flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition-colors ${
                item.active
                  ? 'bg-gold-400/15 text-gold-300'
                  : 'text-white/60 hover:bg-white/5 hover:text-white light:text-navy-500 light:hover:bg-navy-900/5 light:hover:text-navy-800'
              }`}
            >
              <item.icon size={18} /> {item.label}
            </button>
          ))}
        </nav>

        <div className="absolute inset-x-4 bottom-6">
          <Link
            to="/"
            className="flex items-center gap-3 rounded-xl border border-white/10 px-4 py-3 text-sm text-white/70 transition-colors hover:border-gold-400 hover:text-gold-300 light:border-navy-900/10 light:text-navy-600"
          >
            <Home size={18} /> Back to Website
          </Link>
        </div>
      </aside>

      {sidebarOpen && (
        <div className="fixed inset-0 z-40 bg-black/50 lg:hidden" onClick={() => setSidebarOpen(false)} />
      )}

      {/* Main */}
      <div className="lg:pl-64">
        {/* Topbar */}
        <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-white/10 bg-navy-950/80 px-5 backdrop-blur-xl light:border-navy-900/10 light:bg-white/80 sm:px-8">
          <div className="flex items-center gap-4">
            <button onClick={() => setSidebarOpen(true)} className="text-white/70 lg:hidden light:text-navy-600">
              <Menu size={22} />
            </button>
            <div>
              <h1 className="font-serif text-xl font-semibold text-white light:text-navy-800">Dashboard</h1>
              <p className="hidden text-xs text-white/45 light:text-navy-400 sm:block">
                Welcome back, here's your property at a glance
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="hidden items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 md:flex light:border-navy-900/10 light:bg-white">
              <Search size={16} className="text-white/40 light:text-navy-400" />
              <input
                placeholder="Search…"
                className="w-32 bg-transparent text-sm text-white outline-none placeholder-white/40 light:text-navy-800"
              />
            </div>
            <button onClick={toggle} className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 text-white/70 light:border-navy-900/10 light:text-navy-600">
              {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
            </button>
            <button className="relative flex h-10 w-10 items-center justify-center rounded-full border border-white/10 text-white/70 light:border-navy-900/10 light:text-navy-600">
              <Bell size={18} />
              <span className="absolute right-2.5 top-2.5 h-2 w-2 rounded-full bg-gold-400" />
            </button>
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-gold-400 to-gold-500 text-sm font-bold text-navy-950">
              AM
            </div>
          </div>
        </header>

        <main className="space-y-7 p-5 sm:p-8">
          {/* KPI cards */}
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4">
            {adminKpis.map((kpi, i) => {
              const Icon = kpiIcons[kpi.key];
              const up = kpi.change >= 0;
              return (
                <motion.div
                  key={kpi.key}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.08 }}
                  className="rounded-2xl border border-white/10 bg-navy-900/50 p-6 light:border-navy-900/10 light:bg-white"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gold-400/15 text-gold-400">
                      <Icon size={20} />
                    </div>
                    <span
                      className={`flex items-center gap-1 text-xs font-semibold ${
                        up ? 'text-green-400' : 'text-red-400'
                      }`}
                    >
                      {up ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}
                      {Math.abs(kpi.change)}%
                    </span>
                  </div>
                  <p className="mt-5 font-serif text-3xl font-semibold text-white light:text-navy-800">
                    {kpi.value}
                  </p>
                  <p className="mt-1 text-sm text-white/50 light:text-navy-500">{kpi.label}</p>
                </motion.div>
              );
            })}
          </div>

          {/* Charts row */}
          <div className="grid grid-cols-1 gap-7 lg:grid-cols-[1.6fr_1fr]">
            <RevenueChart />
            <OccupancyChart />
          </div>

          {/* Bookings + inventory */}
          <div className="grid grid-cols-1 gap-7 xl:grid-cols-[1.6fr_1fr]">
            <RecentBookings />
            <RoomInventory />
          </div>
        </main>
      </div>
    </div>
  );
}

function Card({ title, action, children, className = '' }) {
  return (
    <div className={`rounded-2xl border border-white/10 bg-navy-900/50 p-6 light:border-navy-900/10 light:bg-white ${className}`}>
      <div className="mb-6 flex items-center justify-between">
        <h3 className="font-serif text-lg font-semibold text-white light:text-navy-800">{title}</h3>
        {action || (
          <button className="text-white/40 hover:text-gold-300 light:text-navy-400">
            <MoreHorizontal size={18} />
          </button>
        )}
      </div>
      {children}
    </div>
  );
}

function RevenueChart() {
  const max = Math.max(...revenueSeries.map((d) => d.value));
  const W = 600;
  const H = 220;
  const step = W / (revenueSeries.length - 1);
  const points = revenueSeries.map((d, i) => [i * step, H - (d.value / max) * (H - 30)]);
  const line = points.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p[0]},${p[1]}`).join(' ');
  const area = `${line} L ${W},${H} L 0,${H} Z`;

  return (
    <Card
      title="Revenue Overview"
      action={<span className="text-xs text-white/40 light:text-navy-400">Last 12 months</span>}
    >
      <div className="overflow-hidden">
        <svg viewBox={`0 0 ${W} ${H + 24}`} className="w-full" preserveAspectRatio="none">
          <defs>
            <linearGradient id="rev" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#e2b53a" stopOpacity="0.35" />
              <stop offset="100%" stopColor="#e2b53a" stopOpacity="0" />
            </linearGradient>
          </defs>
          <path d={area} fill="url(#rev)" />
          <motion.path
            d={line}
            fill="none"
            stroke="#e2b53a"
            strokeWidth="2.5"
            strokeLinecap="round"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 1.6, ease: 'easeInOut' }}
          />
          {points.map((p, i) => (
            <circle key={i} cx={p[0]} cy={p[1]} r="3.5" fill="#0a1228" stroke="#e2b53a" strokeWidth="2" />
          ))}
          {revenueSeries.map((d, i) => (
            <text key={i} x={i * step} y={H + 18} fill="currentColor" fontSize="11" textAnchor="middle" className="text-white/40 light:text-navy-400">
              {d.label}
            </text>
          ))}
        </svg>
      </div>
    </Card>
  );
}

function OccupancyChart() {
  return (
    <Card title="Occupancy Rate">
      <div className="space-y-5">
        {occupancySeries.map((d, i) => (
          <div key={d.label}>
            <div className="mb-2 flex items-center justify-between text-sm">
              <span className="text-white/65 light:text-navy-600">{d.label}</span>
              <span className="font-semibold text-white light:text-navy-800">{d.value}%</span>
            </div>
            <div className="h-2.5 overflow-hidden rounded-full bg-white/10 light:bg-navy-900/10">
              <motion.div
                initial={{ width: 0 }}
                whileInView={{ width: `${d.value}%` }}
                viewport={{ once: true }}
                transition={{ duration: 1, delay: i * 0.1 }}
                className="h-full rounded-full bg-gradient-to-r from-gold-500 to-gold-300"
              />
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}

function statusStyle(status) {
  switch (status) {
    case 'Confirmed':
      return 'bg-green-400/15 text-green-300';
    case 'Pending':
      return 'bg-gold-400/15 text-gold-300';
    case 'Cancelled':
      return 'bg-red-400/15 text-red-300';
    default:
      return 'bg-white/10 text-white/60';
  }
}

function RecentBookings() {
  return (
    <Card title="Recent Bookings">
      <div className="-mx-2 overflow-x-auto">
        <table className="w-full min-w-[520px] text-left text-sm">
          <thead>
            <tr className="text-xs uppercase tracking-widest text-white/40 light:text-navy-400">
              <th className="px-2 pb-4 font-medium">Guest</th>
              <th className="px-2 pb-4 font-medium">Room</th>
              <th className="px-2 pb-4 font-medium">Nights</th>
              <th className="px-2 pb-4 font-medium">Amount</th>
              <th className="px-2 pb-4 font-medium">Status</th>
            </tr>
          </thead>
          <tbody>
            {recentBookings.map((b) => (
              <tr key={b.id} className="border-t border-white/5 light:border-navy-900/5">
                <td className="px-2 py-4">
                  <div className="flex items-center gap-3">
                    <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gold-400/15 text-xs font-bold text-gold-300">
                      {b.guest.split(' ').map((n) => n[0]).join('')}
                    </div>
                    <span className="font-medium text-white light:text-navy-800">{b.guest}</span>
                  </div>
                </td>
                <td className="px-2 py-4 text-white/65 light:text-navy-600">{b.room}</td>
                <td className="px-2 py-4 text-white/65 light:text-navy-600">{b.nights}</td>
                <td className="px-2 py-4 font-medium text-white light:text-navy-800">${b.amount.toLocaleString()}</td>
                <td className="px-2 py-4">
                  <span className={`rounded-full px-3 py-1 text-xs font-semibold ${statusStyle(b.status)}`}>
                    {b.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  );
}

function RoomInventory() {
  return (
    <Card title="Room Inventory">
      <div className="space-y-4">
        {roomInventory.map((r) => {
          const pct = Math.round((r.booked / r.total) * 100);
          return (
            <div key={r.type} className="rounded-xl border border-white/5 p-4 light:border-navy-900/5">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-white light:text-navy-800">{r.type}</span>
                <span className="text-xs text-white/50 light:text-navy-500">
                  {r.booked}/{r.total} booked
                </span>
              </div>
              <div className="mt-3 h-2 overflow-hidden rounded-full bg-white/10 light:bg-navy-900/10">
                <div
                  className={`h-full rounded-full ${pct > 85 ? 'bg-red-400' : 'bg-gradient-to-r from-gold-500 to-gold-300'}`}
                  style={{ width: `${pct}%` }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </Card>
  );
}
