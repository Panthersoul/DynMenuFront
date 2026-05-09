import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { LayoutDashboard, Package, Users, ClipboardList, Menu, X, User } from 'lucide-react';
import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import ArticleList from './components/Articles/ArticleList';
import ArticleForm from './components/Articles/ArticleForm';
import ClientList from './components/Clients/ClientList';
import ClientForm from './components/Clients/ClientForm';
import InventoryManager from './components/Inventory/InventoryManager';
import UserList from './components/Users/UserList';
import UserForm from './components/Users/UserForm';



ChartJS.register(CategoryScale, LinearScale, BarElement, PointElement, LineElement, ArcElement, Tooltip, Legend);

const queryClient = new QueryClient();

function App() {
  const [isSidebarOpen, setIsSidebarOpen] = React.useState(true);

// dentro del componente, antes del return:
const [isPersonalOpen, setIsPersonalOpen] = useState(false);
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <div className="min-h-screen bg-[#0f172a] text-slate-200 flex">
          {/* Sidebar */}
          <aside className={`${isSidebarOpen ? 'w-64' : 'w-20'} bg-[#1e293b] border-r border-slate-700 transition-all duration-300 flex flex-col`}>
            <div className="p-6 flex items-center justify-between">
              {isSidebarOpen && <h1 className="text-xl font-bold bg-gradient-to-r from-blue-400 to-emerald-400 bg-clip-text text-transparent">DynMenu</h1>}
              <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="p-2 hover:bg-slate-700 rounded-lg transition-colors">
                {isSidebarOpen ? <X size={20} /> : <Menu size={20} />}
              </button>
            </div>
            <nav className="flex-1 px-4 space-y-2">
              <SidebarLink to="/" icon={<LayoutDashboard size={20} />} label="Dashboard" isOpen={isSidebarOpen} />
              <SidebarLink to="/articles" icon={<Package size={20} />} label="Artículos" isOpen={isSidebarOpen} />
              <SidebarLink to="/inventory" icon={<ClipboardList size={20} />} label="Inventario" isOpen={isSidebarOpen} />
  
            {/* Grupo expandible Personal */}
            <div>
              <button
                onClick={() => setIsPersonalOpen(!isPersonalOpen)}
                className="w-full flex items-center justify-between px-3 py-2 rounded-lg text-slate-400 hover:bg-slate-800 hover:text-white transition-colors"
              >
                <div className="flex items-center gap-3">
                  <Users size={20} />
                  {isSidebarOpen && <span className="text-sm font-medium">Personal</span>}
                </div>
                {isSidebarOpen && (
                  <ChevronDown
                    size={16}
                    className={`transition-transform duration-200 ${isPersonalOpen ? 'rotate-180' : ''}`}
                  />
                )}
              </button>

              {isPersonalOpen && isSidebarOpen && (
                <div className="ml-4 mt-1 space-y-1 border-l border-slate-700 pl-3">
                  <SidebarLink to="/clients" icon={<Users size={20} />} label="Clientes" isOpen={isSidebarOpen} />
                  <SidebarLink to="/users" icon={<User size={20} />} label="Usuarios" isOpen={isSidebarOpen} />
                </div>
              )}
            </div>
          </nav>
          </aside>

          {/* Main Content */}
          <main className="flex-1 flex flex-col overflow-hidden">
            <header className="h-16 bg-[#1e293b]/50 backdrop-blur-md border-b border-slate-700 flex items-center px-8">
              <h2 className="text-lg font-medium text-slate-400">Gestión de Sistema</h2>
            </header>

            <div className="flex-1 overflow-y-auto p-8">
              <div className="max-w-6xl mx-auto">
                <Routes>
                  <Route path="/" element={<Dashboard />} />
                  <Route path="/articles" element={<ArticleList />} />
                  <Route path="/articles/new" element={<ArticleForm />} />
                  <Route path="/articles/edit/:id" element={<ArticleForm />} />
                  <Route path="/clients" element={<ClientList />} />
                  <Route path="/clients/new" element={<ClientForm />} />
                  <Route path="/clients/edit/:id" element={<ClientForm />} />
                  <Route path="/inventory" element={<InventoryManager />} />
                  <Route path="/users" element={<UserList />} />
                  <Route path="/users/new" element={<UserForm />} />
                  <Route path="/users/edit/:id" element={<UserForm />} />
                </Routes>
              </div>
            </div>
          </main>
        </div>
      </Router>
    </QueryClientProvider>
  );
}

function SidebarLink({ to, icon, label, isOpen }) {
  return (
    <Link to={to} className="flex items-center gap-4 p-3 hover:bg-blue-600/20 hover:text-blue-400 rounded-xl transition-all group">
      <span className="text-slate-400 group-hover:text-blue-400">{icon}</span>
      {isOpen && <span className="font-medium">{label}</span>}
    </Link>
  );
}

/*

function StatCard({ title, value, change, color = "text-blue-400" }) {
  return (
    <div className="bg-[#1e293b] p-6 rounded-2xl border border-slate-700 shadow-lg">
      <p className="text-slate-400 text-sm font-medium mb-1">{title}</p>
      <div className="flex items-end gap-3">
        <span className={`text-3xl font-bold ${color}`}>{value}</span>
        {change && <span className="text-emerald-400 text-sm mb-1">{change}</span>}
      </div>
    </div>
  );
}*/
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Filler,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line, Doughnut } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale, LinearScale, PointElement,
  LineElement, BarElement, ArcElement,
  Filler, Tooltip, Legend
);

// ─── Mock data ────────────────────────────────────────────────────────────────
// Reemplazá esto con useQuery cuando tengas el endpoint:
//
//   const { data, isLoading } = useQuery({
//     queryKey: ['hourly-sales', date],
//     queryFn: () => getHourlySales(date),
//   });
//
const MOCK_HOURLY = [
  { hour: '11 PM', thisNight: 980,  lastNight: 850  },
  { hour: '12 AM', thisNight: 1450, lastNight: 1100 },
  { hour: '01 AM', thisNight: 2100, lastNight: 1600 },
  { hour: '02 AM', thisNight: 3200, lastNight: 2400 },
  { hour: '03 AM', thisNight: 2800, lastNight: 2200 },
  { hour: '04 AM', thisNight: 2400, lastNight: 1800 },
  { hour: '05 AM', thisNight: 1900, lastNight: 1600 },
  { hour: '06 AM', thisNight: 1320, lastNight: 1100 },
  { hour: '07 AM', thisNight: 820,  lastNight: 700  },
];

const MOCK_TOP_ITEMS = [
  { name: 'Fernet Branca', qty: 84 },
  { name: 'Absolut Vodka',  qty: 71 },
  { name: 'Gatorade',       qty: 65 },
  { name: 'Corona',         qty: 58 },
  { name: 'Jack Daniels',   qty: 44 },
];

const MOCK_CATEGORIES = [
  { label: 'Bebidas',    value: 42, color: '#378ADD' },
  { label: 'Destilados', value: 31, color: '#1D9E75' },
  { label: 'Cervezas',   value: 18, color: '#D85A30' },
  { label: 'Otros',      value:  9, color: '#888780' },
];
// ─────────────────────────────────────────────────────────────────────────────

function StatCard({ title, value, change, positive = true }) {
  return (
    <div className="bg-slate-800/50 rounded-xl border border-slate-700 p-4">
      <p className="text-xs text-slate-400 mb-1">{title}</p>
      <p className="text-2xl font-medium text-slate-100">{value}</p>
      {change && (
        <p className={`text-xs mt-1 ${positive ? 'text-emerald-400' : 'text-red-400'}`}>
          {positive ? '↑' : '↓'} {change}
        </p>
      )}
    </div>
  );
}

function TopItemBar({ name, qty, max }) {
  const pct = Math.round((qty / max) * 100);
  return (
    <div>
      <div className="flex justify-between text-sm mb-1">
        <span className="text-slate-200">{name}</span>
        <span className="text-slate-400">{qty} uds</span>
      </div>
      <div className="bg-slate-700 rounded-full h-1.5 overflow-hidden">
        <div
          className="h-full bg-blue-500 rounded-full transition-all duration-500"
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  );
}

function Dashboard() {
  const hours     = MOCK_HOURLY.map(h => h.hour);
  const thisNight = MOCK_HOURLY.map(h => h.thisNight);
  const lastNight = MOCK_HOURLY.map(h => h.lastNight);

  const totalNight  = thisNight.reduce((a, b) => a + b, 0);
  const peakIndex   = thisNight.indexOf(Math.max(...thisNight));
  const peakHour    = hours[peakIndex];
  const peakValue   = thisNight[peakIndex];
  const totalItems  = MOCK_TOP_ITEMS.reduce((a, b) => a + b.qty, 0);
  const maxQty      = MOCK_TOP_ITEMS[0].qty;

  const lineData = {
    labels: hours,
    datasets: [
      {
        label: 'Esta noche',
        data: thisNight,
        borderColor: '#378ADD',
        backgroundColor: 'rgba(55,138,221,0.12)',
        fill: true,
        tension: 0.45,
        borderWidth: 2.5,
        pointRadius: 4,
        pointBackgroundColor: '#378ADD',
        pointBorderColor: '#1e293b',
        pointBorderWidth: 2,
      },
      {
        label: 'Anoche',
        data: lastNight,
        borderColor: '#888780',
        borderDash: [5, 4],
        borderWidth: 1.5,
        fill: false,
        tension: 0.45,
        pointRadius: 2,
        pointBackgroundColor: '#888780',
      },
    ],
  };

  const lineOptions = {
    responsive: true,
    maintainAspectRatio: false,
    interaction: { mode: 'index', intersect: false },
    plugins: {
      legend: { display: false },
      tooltip: {
        callbacks: {
          label: ctx => ` $${ctx.parsed.y.toLocaleString()}`,
        },
      },
    },
    scales: {
      x: {
        grid: { display: false },
        ticks: { color: '#64748b', font: { size: 11 }, autoSkip: false },
      },
      y: {
        grid: { color: 'rgba(100,116,139,0.15)' },
        ticks: {
          color: '#64748b',
          font: { size: 11 },
          callback: v => '$' + (v / 1000).toFixed(1) + 'k',
        },
      },
    },
  };

  const donutData = {
    labels: MOCK_CATEGORIES.map(c => c.label),
    datasets: [{
      data: MOCK_CATEGORIES.map(c => c.value),
      backgroundColor: MOCK_CATEGORIES.map(c => c.color),
      borderWidth: 0,
      hoverOffset: 6,
    }],
  };

  const donutOptions = {
    responsive: true,
    maintainAspectRatio: false,
    cutout: '68%',
    plugins: { legend: { display: false } },
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-slate-100">Dashboard — Turno Noche</h1>
        <span className="text-sm text-slate-400 bg-slate-800 px-3 py-1 rounded-lg border border-slate-700">
          11 PM → 7 AM
        </span>
      </div>

      {/* Stat cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <StatCard
          title="Total noche"
          value={`$${totalNight.toLocaleString()}`}
          change="+15% vs anoche"
        />
        <StatCard
          title="Hora pico"
          value={peakHour}
          change={`$${peakValue.toLocaleString()} en esa hora`}
        />
        <StatCard
          title="Artículos despachados"
          value={totalItems.toLocaleString()}
          change="+9% vs anoche"
        />
        <StatCard
          title="Ticket promedio"
          value="$36.00"
          change="+2% vs anoche"
        />
      </div>

      {/* Charts row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* Line chart */}
        <div className="lg:col-span-2 bg-[#1e293b] rounded-2xl border border-slate-700 p-6">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm font-medium text-slate-200">Ventas por hora</p>
          </div>
          <div className="flex gap-4 mb-4 text-xs text-slate-400">
            <span className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-sm bg-blue-500 inline-block" />
              Esta noche
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-3 h-1 bg-slate-500 inline-block rounded-sm" style={{ borderTop: '2px dashed #888780' }} />
              Anoche
            </span>
          </div>
          <div className="relative h-56">
            <Line data={lineData} options={lineOptions} />
          </div>
        </div>

        {/* Right column */}
        <div className="flex flex-col gap-6">

          {/* Donut */}
          <div className="bg-[#1e293b] rounded-2xl border border-slate-700 p-6 flex-1">
            <p className="text-sm font-medium text-slate-200 mb-3">Categorías</p>
            <div className="relative h-32">
              <Doughnut data={donutData} options={donutOptions} />
            </div>
            <div className="flex flex-wrap gap-x-4 gap-y-1 mt-3">
              {MOCK_CATEGORIES.map(c => (
                <span key={c.label} className="flex items-center gap-1 text-xs text-slate-400">
                  <span className="w-2.5 h-2.5 rounded-sm inline-block" style={{ background: c.color }} />
                  {c.label} {c.value}%
                </span>
              ))}
            </div>
          </div>

          {/* Top items */}
          <div className="bg-[#1e293b] rounded-2xl border border-slate-700 p-6 flex-1">
            <p className="text-sm font-medium text-slate-200 mb-4">Top artículos</p>
            <div className="space-y-3">
              {MOCK_TOP_ITEMS.map(item => (
                <TopItemBar key={item.name} name={item.name} qty={item.qty} max={maxQty} />
              ))}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}


export default App;