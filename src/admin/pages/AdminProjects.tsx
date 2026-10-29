import React, { useState } from 'react';
import {
  Plus, Pencil, Trash2, Eye, EyeOff, Star, StarOff,
  Search, ExternalLink, Github, X, Save, AlertTriangle,
} from 'lucide-react';
import AdminLayout from '../components/AdminLayout';
import { getAllProjects, saveProject, deleteProject } from '../../store/portfolioStore';
import type { Project } from '../../store/types';

const emptyProject = (): Project => ({
  id: '',
  title: '',
  description: '',
  technologies: [],
  features: [],
  category: '',
  role: '',
  isCollaborative: false,
  githubUrl: '',
  liveUrl: '',
  thumbnailUrl: '',
  featured: false,
  published: true,
  order: 99,
  createdAt: '',
  updatedAt: '',
});

// ── Project Form ──────────────────────────────────────────────────────────────

interface FormProps {
  initial: Project;
  onSave: (p: Project) => void;
  onCancel: () => void;
}

const ProjectForm = ({ initial, onSave, onCancel }: FormProps) => {
  const [form, setForm] = useState<Project>({ ...initial });
  const [techInput, setTechInput] = useState('');
  const [featureInput, setFeatureInput] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});

  const set = (field: keyof Project, value: unknown) =>
    setForm((prev) => ({ ...prev, [field]: value }));

  const addTag = (field: 'technologies' | 'features', input: string, setInput: (v: string) => void) => {
    const val = input.trim();
    if (!val) return;
    set(field, [...(form[field] as string[]), val]);
    setInput('');
  };

  const removeTag = (field: 'technologies' | 'features', idx: number) => {
    set(field, (form[field] as string[]).filter((_, i) => i !== idx));
  };

  const validate = () => {
    const e: Record<string, string> = {};
    if (!form.title.trim()) e.title = 'Title is required';
    if (!form.description.trim()) e.description = 'Description is required';
    if (!form.category.trim()) e.category = 'Category is required';
    if (form.githubUrl && !/^https?:\/\//.test(form.githubUrl)) e.githubUrl = 'Must be a valid URL';
    if (form.liveUrl && !/^https?:\/\//.test(form.liveUrl)) e.liveUrl = 'Must be a valid URL';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSave = () => {
    if (!validate()) return;
    const id = form.id || form.title.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
    onSave({ ...form, id });
  };

  const inputCls = (field: string) =>
    `w-full px-3 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${
      errors[field] ? 'border-red-400' : 'border-gray-300'
    }`;

  return (
    <div className="fixed inset-0 z-50 bg-black/50 flex items-start justify-center overflow-y-auto py-8 px-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl">
        <div className="flex items-center justify-between p-6 border-b">
          <h2 className="text-xl font-bold text-gray-900">
            {initial.id ? 'Edit Project' : 'Add Project'}
          </h2>
          <button onClick={onCancel} className="text-gray-400 hover:text-gray-600">
            <X size={22} />
          </button>
        </div>

        <div className="p-6 space-y-5">
          {/* Title */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Title *</label>
            <input className={inputCls('title')} value={form.title} onChange={(e) => set('title', e.target.value)} />
            {errors.title && <p className="text-red-500 text-xs mt-1">{errors.title}</p>}
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Description *</label>
            <textarea className={inputCls('description')} rows={4} value={form.description} onChange={(e) => set('description', e.target.value)} />
            {errors.description && <p className="text-red-500 text-xs mt-1">{errors.description}</p>}
          </div>

          {/* Category + Role */}
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Category *</label>
              <input className={inputCls('category')} value={form.category} onChange={(e) => set('category', e.target.value)} placeholder="e.g. Web Application" />
              {errors.category && <p className="text-red-500 text-xs mt-1">{errors.category}</p>}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Your Role</label>
              <input className={inputCls('role')} value={form.role} onChange={(e) => set('role', e.target.value)} placeholder="e.g. Backend Developer" />
            </div>
          </div>

          {/* Technologies */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Technologies</label>
            <div className="flex gap-2 mb-2">
              <input
                className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={techInput}
                onChange={(e) => setTechInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), addTag('technologies', techInput, setTechInput))}
                placeholder="Type and press Enter"
              />
              <button onClick={() => addTag('technologies', techInput, setTechInput)} className="px-3 py-2 bg-blue-600 text-white rounded-lg text-sm hover:bg-blue-700">Add</button>
            </div>
            <div className="flex flex-wrap gap-2">
              {form.technologies.map((t, i) => (
                <span key={i} className="flex items-center gap-1 px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm">
                  {t}
                  <button onClick={() => removeTag('technologies', i)} className="hover:text-red-500"><X size={12} /></button>
                </span>
              ))}
            </div>
          </div>

          {/* Features */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Key Features</label>
            <div className="flex gap-2 mb-2">
              <input
                className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={featureInput}
                onChange={(e) => setFeatureInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), addTag('features', featureInput, setFeatureInput))}
                placeholder="Type and press Enter"
              />
              <button onClick={() => addTag('features', featureInput, setFeatureInput)} className="px-3 py-2 bg-gray-600 text-white rounded-lg text-sm hover:bg-gray-700">Add</button>
            </div>
            <div className="flex flex-wrap gap-2">
              {form.features.map((f, i) => (
                <span key={i} className="flex items-center gap-1 px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm">
                  {f}
                  <button onClick={() => removeTag('features', i)} className="hover:text-red-500"><X size={12} /></button>
                </span>
              ))}
            </div>
          </div>

          {/* URLs */}
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">GitHub URL</label>
              <input className={inputCls('githubUrl')} value={form.githubUrl} onChange={(e) => set('githubUrl', e.target.value)} placeholder="https://github.com/..." />
              {errors.githubUrl && <p className="text-red-500 text-xs mt-1">{errors.githubUrl}</p>}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Live Demo URL</label>
              <input className={inputCls('liveUrl')} value={form.liveUrl} onChange={(e) => set('liveUrl', e.target.value)} placeholder="https://..." />
              {errors.liveUrl && <p className="text-red-500 text-xs mt-1">{errors.liveUrl}</p>}
            </div>
          </div>

          {/* Order */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Display Order</label>
            <input type="number" className={inputCls('order')} value={form.order} onChange={(e) => set('order', Number(e.target.value))} min={1} />
          </div>

          {/* Toggles */}
          <div className="flex flex-wrap gap-6">
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" checked={form.isCollaborative} onChange={(e) => set('isCollaborative', e.target.checked)} className="w-4 h-4 accent-blue-600" />
              <span className="text-sm text-gray-700">Team / Collaborative project</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" checked={form.featured} onChange={(e) => set('featured', e.target.checked)} className="w-4 h-4 accent-blue-600" />
              <span className="text-sm text-gray-700">Featured</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" checked={form.published} onChange={(e) => set('published', e.target.checked)} className="w-4 h-4 accent-blue-600" />
              <span className="text-sm text-gray-700">Published</span>
            </label>
          </div>
        </div>

        <div className="flex justify-end gap-3 p-6 border-t bg-gray-50 rounded-b-2xl">
          <button onClick={onCancel} className="px-5 py-2.5 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-100 transition-colors">
            Cancel
          </button>
          <button onClick={handleSave} className="flex items-center gap-2 px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-medium transition-colors">
            <Save size={16} />
            Save Project
          </button>
        </div>
      </div>
    </div>
  );
};

// ── Main Page ─────────────────────────────────────────────────────────────────

const AdminProjects = () => {
  const [projects, setProjects] = useState(getAllProjects());
  const [search, setSearch] = useState('');
  const [editing, setEditing] = useState<Project | null>(null);
  const [confirmDelete, setConfirmDelete] = useState<string | null>(null);
  const [toast, setToast] = useState('');

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(''), 3000);
  };

  const refresh = () => setProjects(getAllProjects());

  const handleSave = (p: Project) => {
    saveProject(p);
    refresh();
    setEditing(null);
    showToast('Project saved successfully.');
  };

  const handleDelete = (id: string) => {
    deleteProject(id);
    refresh();
    setConfirmDelete(null);
    showToast('Project deleted.');
  };

  const togglePublish = (p: Project) => {
    saveProject({ ...p, published: !p.published });
    refresh();
    showToast(`Project ${p.published ? 'unpublished' : 'published'}.`);
  };

  const toggleFeatured = (p: Project) => {
    saveProject({ ...p, featured: !p.featured });
    refresh();
    showToast(`Project ${p.featured ? 'removed from' : 'added to'} featured.`);
  };

  const filtered = projects.filter(
    (p) =>
      p.title.toLowerCase().includes(search.toLowerCase()) ||
      p.category.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <AdminLayout title="Projects">
      {/* Toast */}
      {toast && (
        <div className="fixed top-6 right-6 z-50 bg-gray-900 text-white px-5 py-3 rounded-lg shadow-lg text-sm">
          {toast}
        </div>
      )}

      {/* Delete confirmation */}
      {confirmDelete && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center px-4">
          <div className="bg-white rounded-xl shadow-2xl p-6 max-w-sm w-full">
            <div className="flex items-center gap-3 mb-4">
              <AlertTriangle className="text-red-500" size={24} />
              <h3 className="text-lg font-bold text-gray-900">Delete Project?</h3>
            </div>
            <p className="text-gray-600 text-sm mb-6">This action cannot be undone.</p>
            <div className="flex gap-3 justify-end">
              <button onClick={() => setConfirmDelete(null)} className="px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium hover:bg-gray-50">Cancel</button>
              <button onClick={() => handleDelete(confirmDelete)} className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg text-sm font-medium">Delete</button>
            </div>
          </div>
        </div>
      )}

      {/* Form modal */}
      {editing && (
        <ProjectForm
          initial={editing}
          onSave={handleSave}
          onCancel={() => setEditing(null)}
        />
      )}

      <div className="space-y-6">
        {/* Toolbar */}
        <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
          <div className="relative flex-1 max-w-sm">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search projects…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-9 pr-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <button
            onClick={() => setEditing(emptyProject())}
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2.5 rounded-lg text-sm font-medium transition-colors shrink-0"
          >
            <Plus size={16} />
            Add Project
          </button>
        </div>

        {/* Project list */}
        <div className="space-y-3">
          {filtered.length === 0 && (
            <div className="bg-white rounded-xl p-12 text-center text-gray-400">
              No projects found.
            </div>
          )}
          {filtered.map((p) => (
            <div key={p.id} className="bg-white rounded-xl shadow-sm p-5 flex flex-col sm:flex-row sm:items-center gap-4">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap mb-1">
                  <h3 className="font-semibold text-gray-900 text-sm">{p.title}</h3>
                  {p.featured && <span className="px-2 py-0.5 bg-blue-100 text-blue-700 text-xs rounded-full font-medium">Featured</span>}
                  <span className={`px-2 py-0.5 text-xs rounded-full font-medium ${p.published ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'}`}>
                    {p.published ? 'Published' : 'Draft'}
                  </span>
                </div>
                <p className="text-xs text-gray-400">{p.category} · Order: {p.order}</p>
                <div className="flex flex-wrap gap-1 mt-2">
                  {p.technologies.slice(0, 4).map((t) => (
                    <span key={t} className="px-2 py-0.5 bg-gray-100 text-gray-600 text-xs rounded-full">{t}</span>
                  ))}
                  {p.technologies.length > 4 && <span className="text-xs text-gray-400">+{p.technologies.length - 4}</span>}
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center gap-2 shrink-0 flex-wrap">
                {p.liveUrl && (
                  <a href={p.liveUrl} target="_blank" rel="noopener noreferrer" className="p-2 text-gray-400 hover:text-emerald-600 transition-colors" title="Live demo">
                    <ExternalLink size={16} />
                  </a>
                )}
                {p.githubUrl && (
                  <a href={p.githubUrl} target="_blank" rel="noopener noreferrer" className="p-2 text-gray-400 hover:text-gray-700 transition-colors" title="GitHub">
                    <Github size={16} />
                  </a>
                )}
                <button onClick={() => toggleFeatured(p)} className={`p-2 transition-colors ${p.featured ? 'text-yellow-500 hover:text-yellow-600' : 'text-gray-400 hover:text-yellow-500'}`} title={p.featured ? 'Remove from featured' : 'Mark as featured'}>
                  {p.featured ? <Star size={16} /> : <StarOff size={16} />}
                </button>
                <button onClick={() => togglePublish(p)} className={`p-2 transition-colors ${p.published ? 'text-green-500 hover:text-red-500' : 'text-gray-400 hover:text-green-500'}`} title={p.published ? 'Unpublish' : 'Publish'}>
                  {p.published ? <Eye size={16} /> : <EyeOff size={16} />}
                </button>
                <button onClick={() => setEditing(p)} className="p-2 text-gray-400 hover:text-blue-600 transition-colors" title="Edit">
                  <Pencil size={16} />
                </button>
                <button onClick={() => setConfirmDelete(p.id)} className="p-2 text-gray-400 hover:text-red-600 transition-colors" title="Delete">
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminProjects;
