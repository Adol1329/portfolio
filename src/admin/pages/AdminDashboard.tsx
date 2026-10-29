import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FolderKanban, Eye, EyeOff, FileText, Plus, Upload, Clock } from 'lucide-react';
import AdminLayout from '../components/AdminLayout';
import { getAllProjects, getCVInfo, getStore } from '../../store/portfolioStore';

const AdminDashboard = () => {
  const navigate = useNavigate();
  const projects = getAllProjects();
  const cv = getCVInfo();
  const store = getStore();

  const published = projects.filter((p) => p.published).length;
  const drafts = projects.filter((p) => !p.published).length;
  const featured = projects.filter((p) => p.featured && p.published).length;

  const stats = [
    { label: 'Published Projects', value: published, icon: <Eye size={22} />, color: 'bg-blue-600' },
    { label: 'Draft / Unpublished', value: drafts, icon: <EyeOff size={22} />, color: 'bg-gray-500' },
    { label: 'Featured Projects', value: featured, icon: <FolderKanban size={22} />, color: 'bg-emerald-600' },
    { label: 'CV Status', value: cv.available ? 'Available' : 'Unavailable', icon: <FileText size={22} />, color: cv.available ? 'bg-green-600' : 'bg-red-500' },
  ];

  return (
    <AdminLayout title="Dashboard">
      <div className="space-y-8">
        {/* Stats grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat) => (
            <div key={stat.label} className="bg-white rounded-xl shadow-sm p-6 flex items-center gap-4">
              <div className={`${stat.color} text-white p-3 rounded-lg shrink-0`}>
                {stat.icon}
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                <p className="text-sm text-gray-500">{stat.label}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Quick actions */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Quick Actions</h3>
          <div className="flex flex-wrap gap-3">
            <button
              onClick={() => navigate('/admin/projects')}
              className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2.5 rounded-lg text-sm font-medium transition-colors"
            >
              <Plus size={16} />
              Add Project
            </button>
            <button
              onClick={() => navigate('/admin/resume')}
              className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2.5 rounded-lg text-sm font-medium transition-colors"
            >
              <Upload size={16} />
              Update CV
            </button>
            <button
              onClick={() => navigate('/admin/profile')}
              className="flex items-center gap-2 bg-gray-700 hover:bg-gray-800 text-white px-4 py-2.5 rounded-lg text-sm font-medium transition-colors"
            >
              Edit Profile
            </button>
          </div>
        </div>

        {/* Recent projects */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Projects Overview</h3>
          <div className="space-y-3">
            {projects.slice(0, 5).map((p) => (
              <div key={p.id} className="flex items-center justify-between py-2 border-b border-gray-100 last:border-0">
                <div>
                  <p className="font-medium text-gray-800 text-sm">{p.title}</p>
                  <p className="text-xs text-gray-400">{p.category}</p>
                </div>
                <div className="flex items-center gap-2">
                  {p.featured && (
                    <span className="px-2 py-0.5 bg-blue-100 text-blue-700 text-xs rounded-full font-medium">Featured</span>
                  )}
                  <span className={`px-2 py-0.5 text-xs rounded-full font-medium ${p.published ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'}`}>
                    {p.published ? 'Published' : 'Draft'}
                  </span>
                </div>
              </div>
            ))}
          </div>
          <button
            onClick={() => navigate('/admin/projects')}
            className="mt-4 text-sm text-blue-600 hover:text-blue-800 font-medium transition-colors"
          >
            Manage all projects →
          </button>
        </div>

        {/* Last updated */}
        <p className="text-xs text-gray-400 flex items-center gap-1">
          <Clock size={12} />
          Last updated: {new Date(store.lastUpdated).toLocaleString()}
        </p>
      </div>
    </AdminLayout>
  );
};

export default AdminDashboard;
