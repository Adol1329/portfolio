import React, { useState } from 'react';
import { Save, Plus, X, CheckCircle } from 'lucide-react';
import AdminLayout from '../components/AdminLayout';
import { getProfile, saveProfile } from '../../store/portfolioStore';
import type { Profile } from '../../store/types';

const AdminProfile = () => {
  const [form, setForm] = useState<Profile>(getProfile());
  const [saved, setSaved] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [learningInput, setLearningInput] = useState('');
  const [langInput, setLangInput] = useState('');

  const set = (field: keyof Profile, value: unknown) =>
    setForm((prev) => ({ ...prev, [field]: value }));

  const setSocial = (field: keyof Profile['social'], value: string) =>
    setForm((prev) => ({ ...prev, social: { ...prev.social, [field]: value } }));

  const addListItem = (field: 'currentlyLearning' | 'languages', input: string, setInput: (v: string) => void) => {
    const val = input.trim();
    if (!val) return;
    set(field, [...form[field], val]);
    setInput('');
  };

  const removeListItem = (field: 'currentlyLearning' | 'languages', idx: number) => {
    set(field, (form[field] as string[]).filter((_, i) => i !== idx));
  };

  const validate = () => {
    const e: Record<string, string> = {};
    if (!form.name.trim()) e.name = 'Name is required';
    if (!form.headline.trim()) e.headline = 'Headline is required';
    if (!form.social.email.trim()) e.email = 'Email is required';
    const urlFields: (keyof Profile['social'])[] = ['github', 'linkedin', 'twitter'];
    urlFields.forEach((f) => {
      if (form.social[f] && !/^https?:\/\//.test(form.social[f])) {
        e[f] = 'Must be a valid URL';
      }
    });
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSave = () => {
    if (!validate()) return;
    saveProfile(form);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  const inputCls = (field: string) =>
    `w-full px-3 py-2.5 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${
      errors[field] ? 'border-red-400' : 'border-gray-300'
    }`;

  return (
    <AdminLayout title="Profile">
      <div className="max-w-3xl space-y-8">
        {saved && (
          <div className="flex items-center gap-2 bg-green-50 border border-green-200 text-green-700 rounded-lg px-4 py-3 text-sm">
            <CheckCircle size={16} />
            Profile saved successfully. Refresh the public portfolio to see changes.
          </div>
        )}

        {/* Basic info */}
        <div className="bg-white rounded-xl shadow-sm p-6 space-y-5">
          <h3 className="text-lg font-semibold text-gray-800 border-b pb-3">Basic Information</h3>

          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Full Name *</label>
              <input className={inputCls('name')} value={form.name} onChange={(e) => set('name', e.target.value)} />
              {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
              <input className={inputCls('location')} value={form.location} onChange={(e) => set('location', e.target.value)} />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Professional Headline *</label>
            <input className={inputCls('headline')} value={form.headline} onChange={(e) => set('headline', e.target.value)} placeholder="e.g. Backend Developer & Software Developer" />
            {errors.headline && <p className="text-red-500 text-xs mt-1">{errors.headline}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Bio</label>
            <textarea className={inputCls('bio')} rows={5} value={form.bio} onChange={(e) => set('bio', e.target.value)} />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
            <input className={inputCls('phone')} value={form.phone} onChange={(e) => set('phone', e.target.value)} />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Availability Status</label>
            <select
              className={inputCls('availabilityStatus')}
              value={form.availabilityStatus}
              onChange={(e) => set('availabilityStatus', e.target.value as Profile['availabilityStatus'])}
            >
              <option value="open">Open to Opportunities</option>
              <option value="freelance">Available for Freelance</option>
              <option value="closed">Not Available</option>
            </select>
          </div>
        </div>

        {/* Social links */}
        <div className="bg-white rounded-xl shadow-sm p-6 space-y-4">
          <h3 className="text-lg font-semibold text-gray-800 border-b pb-3">Social Links</h3>

          {(['github', 'linkedin', 'twitter'] as const).map((field) => (
            <div key={field}>
              <label className="block text-sm font-medium text-gray-700 mb-1 capitalize">{field === 'twitter' ? 'X (Twitter)' : field} URL</label>
              <input className={inputCls(field)} value={form.social[field]} onChange={(e) => setSocial(field, e.target.value)} placeholder="https://..." />
              {errors[field] && <p className="text-red-500 text-xs mt-1">{errors[field]}</p>}
            </div>
          ))}

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email *</label>
            <input type="email" className={inputCls('email')} value={form.social.email} onChange={(e) => setSocial('email', e.target.value)} />
            {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
          </div>
        </div>

        {/* Currently learning */}
        <div className="bg-white rounded-xl shadow-sm p-6 space-y-4">
          <h3 className="text-lg font-semibold text-gray-800 border-b pb-3">Currently Learning</h3>
          <div className="flex gap-2">
            <input
              className="flex-1 px-3 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={learningInput}
              onChange={(e) => setLearningInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), addListItem('currentlyLearning', learningInput, setLearningInput))}
              placeholder="e.g. Docker"
            />
            <button onClick={() => addListItem('currentlyLearning', learningInput, setLearningInput)} className="px-3 py-2 bg-blue-600 text-white rounded-lg text-sm hover:bg-blue-700">
              <Plus size={16} />
            </button>
          </div>
          <div className="flex flex-wrap gap-2">
            {form.currentlyLearning.map((item, i) => (
              <span key={i} className="flex items-center gap-1 px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm">
                {item}
                <button onClick={() => removeListItem('currentlyLearning', i)} className="hover:text-red-500"><X size={12} /></button>
              </span>
            ))}
          </div>
        </div>

        {/* Languages */}
        <div className="bg-white rounded-xl shadow-sm p-6 space-y-4">
          <h3 className="text-lg font-semibold text-gray-800 border-b pb-3">Languages</h3>
          <div className="flex gap-2">
            <input
              className="flex-1 px-3 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={langInput}
              onChange={(e) => setLangInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), addListItem('languages', langInput, setLangInput))}
              placeholder="e.g. French (Basic)"
            />
            <button onClick={() => addListItem('languages', langInput, setLangInput)} className="px-3 py-2 bg-gray-600 text-white rounded-lg text-sm hover:bg-gray-700">
              <Plus size={16} />
            </button>
          </div>
          <div className="flex flex-wrap gap-2">
            {form.languages.map((lang, i) => (
              <span key={i} className="flex items-center gap-1 px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm">
                {lang}
                <button onClick={() => removeListItem('languages', i)} className="hover:text-red-500"><X size={12} /></button>
              </span>
            ))}
          </div>
        </div>

        <button
          onClick={handleSave}
          className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
        >
          <Save size={18} />
          Save Profile
        </button>
      </div>
    </AdminLayout>
  );
};

export default AdminProfile;
