import React, { useState } from 'react';
import { Save, Plus, Trash2, CheckCircle, GripVertical } from 'lucide-react';
import AdminLayout from '../components/AdminLayout';
import { getSkillCategories, saveSkillCategories } from '../../store/portfolioStore';
import type { SkillCategory, Skill } from '../../store/types';

const COLORS = ['blue', 'emerald', 'orange', 'purple', 'red', 'indigo'];

const AdminSkills = () => {
  const [categories, setCategories] = useState<SkillCategory[]>(getSkillCategories());
  const [saved, setSaved] = useState(false);

  const updateCategory = (idx: number, field: keyof SkillCategory, value: unknown) => {
    setCategories((prev) => prev.map((c, i) => i === idx ? { ...c, [field]: value } : c));
  };

  const updateSkill = (catIdx: number, skillIdx: number, field: keyof Skill, value: unknown) => {
    setCategories((prev) =>
      prev.map((c, i) =>
        i === catIdx
          ? { ...c, skills: c.skills.map((s, j) => j === skillIdx ? { ...s, [field]: value } : s) }
          : c
      )
    );
  };

  const addSkill = (catIdx: number) => {
    setCategories((prev) =>
      prev.map((c, i) =>
        i === catIdx ? { ...c, skills: [...c.skills, { name: '', level: 75 }] } : c
      )
    );
  };

  const removeSkill = (catIdx: number, skillIdx: number) => {
    setCategories((prev) =>
      prev.map((c, i) =>
        i === catIdx ? { ...c, skills: c.skills.filter((_, j) => j !== skillIdx) } : c
      )
    );
  };

  const addCategory = () => {
    setCategories((prev) => [
      ...prev,
      { id: `cat-${Date.now()}`, title: 'New Category', color: 'blue', skills: [] },
    ]);
  };

  const removeCategory = (idx: number) => {
    setCategories((prev) => prev.filter((_, i) => i !== idx));
  };

  const handleSave = () => {
    saveSkillCategories(categories);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <AdminLayout title="Skills">
      <div className="max-w-4xl space-y-6">
        {saved && (
          <div className="flex items-center gap-2 bg-green-50 border border-green-200 text-green-700 rounded-lg px-4 py-3 text-sm">
            <CheckCircle size={16} />
            Skills saved. Refresh the public portfolio to see changes.
          </div>
        )}

        {categories.map((cat, catIdx) => (
          <div key={cat.id} className="bg-white rounded-xl shadow-sm p-6">
            {/* Category header */}
            <div className="flex items-center gap-4 mb-5 flex-wrap">
              <input
                className="flex-1 min-w-[160px] px-3 py-2 border border-gray-300 rounded-lg text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={cat.title}
                onChange={(e) => updateCategory(catIdx, 'title', e.target.value)}
                placeholder="Category title"
              />
              <select
                className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={cat.color}
                onChange={(e) => updateCategory(catIdx, 'color', e.target.value)}
              >
                {COLORS.map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
              <button
                onClick={() => removeCategory(catIdx)}
                className="p-2 text-gray-400 hover:text-red-500 transition-colors"
                title="Remove category"
              >
                <Trash2 size={16} />
              </button>
            </div>

            {/* Skills */}
            <div className="space-y-3">
              {cat.skills.map((skill, skillIdx) => (
                <div key={skillIdx} className="flex items-center gap-3">
                  <GripVertical size={16} className="text-gray-300 shrink-0" />
                  <input
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={skill.name}
                    onChange={(e) => updateSkill(catIdx, skillIdx, 'name', e.target.value)}
                    placeholder="Skill name"
                  />
                  <div className="flex items-center gap-2 shrink-0">
                    <input
                      type="range"
                      min={10}
                      max={100}
                      step={5}
                      value={skill.level}
                      onChange={(e) => updateSkill(catIdx, skillIdx, 'level', Number(e.target.value))}
                      className="w-28 accent-blue-600"
                    />
                    <span className="text-sm text-gray-500 w-10 text-right">{skill.level}%</span>
                  </div>
                  <button
                    onClick={() => removeSkill(catIdx, skillIdx)}
                    className="p-1.5 text-gray-400 hover:text-red-500 transition-colors"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              ))}
            </div>

            <button
              onClick={() => addSkill(catIdx)}
              className="mt-4 flex items-center gap-2 text-sm text-blue-600 hover:text-blue-800 font-medium transition-colors"
            >
              <Plus size={14} />
              Add Skill
            </button>
          </div>
        ))}

        <div className="flex flex-wrap gap-3">
          <button
            onClick={addCategory}
            className="flex items-center gap-2 border-2 border-dashed border-gray-300 hover:border-blue-400 text-gray-500 hover:text-blue-600 px-5 py-3 rounded-xl text-sm font-medium transition-colors"
          >
            <Plus size={16} />
            Add Category
          </button>

          <button
            onClick={handleSave}
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
          >
            <Save size={18} />
            Save Skills
          </button>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminSkills;
