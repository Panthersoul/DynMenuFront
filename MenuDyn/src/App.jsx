import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { LayoutDashboard, Package, Users, ClipboardList, Menu, X, User } from 'lucide-react';
import ArticleList from './components/Articles/ArticleList';
import ArticleForm from './components/Articles/ArticleForm';
import ClientList from './components/Clients/ClientList';
import ClientForm from './components/Clients/ClientForm';
import InventoryManager from './components/Inventory/InventoryManager';
import UserList from './components/Users/UserList';
import UserForm from './components/Users/UserForm';

const queryClient = new QueryClient();

function App() {
  const [isSidebarOpen, setIsSidebarOpen] = React.useState(true);

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
              <SidebarLink to="/clients" icon={<Users size={20} />} label="Clientes" isOpen={isSidebarOpen} />
              <SidebarLink to="/inventory" icon={<ClipboardList size={20} />} label="Inventario" isOpen={isSidebarOpen} />
              <SidebarLink to="/users" icon={<User size={20} />} label="Usuarios" isOpen={isSidebarOpen} />
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

function Dashboard() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Bienvenido a DynMenu</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard title="Total Artículos" value="124" change="+12%" />
        <StatCard title="Clientes Activos" value="45" change="+5%" />
        <StatCard title="Alertas Stock" value="3" color="text-red-400" />
      </div>
    </div>
  );
}

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
}

export default App;