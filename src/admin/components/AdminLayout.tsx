import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard, FolderKanban, User, Wrench,
  FileText, LogOut, Menu, ExternalLink,
} from 'lucide-react';
import { adminLogout } from '../../store/authStore';

const navItems = [
  { to: '/admin/dashboard', icon: <LayoutDashboard size={18} />, label: 'Dashboard' },
  { to: '/admin/projects', icon: <FolderKanban size={18} />, label: 'Projects' },
  { to: '/admin/profile', icon: <User size={18} />, label: 'Profile' },
  { to: '/admin/skills', icon: <Wrench size={18} />, label: 'Skills' },
  { to: '/admin/resume', icon: <FileText size={18} />, label: 'Resume / CV' },
];

interface Props {
  children: React.ReactNode;
  title: string;
}

const AdminLayout = ({ children, title }: Props) => {
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleLogout = () => {
    adminLogout();
    navigate('/admin/login');
  };

  const Sidebar = () => (
    <aside className="flex flex-col h-full bg-gray-900 text-white w-64">
      <div className="p-6 border-b border-gray-700">
        <p className="text-xs text-gray-400 uppercase tracking-widest mb-1">Admin Panel</p>
        <h1 className="text-lg font-bold">Adolphe Uwayo</h1>
      </div>

      <nav className="flex-1 p-4 space-y-1">
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            onClick={() => setSidebarOpen(false)}
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                isActive
                  ? 'bg-blue-600 text-white'
                  : 'text-gray-300 hover:bg-gray-800 hover:text-white'
              }`
            }
          >
            {item.icon}
            {item.label}
          </NavLink>
        ))}
      </nav>

      <div className="p-4 border-t border-gray-700 space-y-2">
        <a
          href="/"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm text-gray-400 hover:text-white hover:bg-gray-800 transition-colors"
        >
          <ExternalLink size={18} />
          View Portfolio
        </a>
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm text-gray-400 hover:text-red-400 hover:bg-gray-800 transition-colors"
        >
          <LogOut size={18} />
          Logout
        </button>
      </div>
    </aside>
  );

  return (
    <div className="flex h-screen bg-gray-100 overflow-hidden">
      {/* Desktop sidebar */}
      <div className="hidden md:flex flex-shrink-0">
        <Sidebar />
      </div>

      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-40 md:hidden">
          <div className="absolute inset-0 bg-black/50" onClick={() => setSidebarOpen(false)} />
          <div className="relative z-50 h-full">
            <Sidebar />
          </div>
        </div>
      )}

      {/* Main content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top bar */}
        <header className="bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              className="md:hidden text-gray-500 hover:text-gray-700"
              onClick={() => setSidebarOpen(true)}
              aria-label="Open menu"
            >
              <Menu size={22} />
            </button>
            <h2 className="text-xl font-semibold text-gray-800">{title}</h2>
          </div>
          <button
            onClick={handleLogout}
            className="hidden md:flex items-center gap-2 text-sm text-gray-500 hover:text-red-500 transition-colors"
          >
            <LogOut size={16} />
            Logout
          </button>
        </header>

        {/* Page content */}
        <main className="flex-1 overflow-y-auto p-6">
          {children}
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
