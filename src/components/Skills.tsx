import React from 'react';
import { Code, Database, Palette, Wrench } from 'lucide-react';
import { getSkillCategories } from '../store/portfolioStore';

const iconMap: Record<string, React.ReactNode> = {
  backend: <Code className="text-blue-600" size={32} />,
  frontend: <Palette className="text-emerald-600" size={32} />,
  databases: <Database className="text-orange-600" size={32} />,
  tools: <Wrench className="text-purple-600" size={32} />,
};

const barColorMap: Record<string, string> = {
  blue: 'bg-blue-600',
  emerald: 'bg-emerald-600',
  orange: 'bg-orange-600',
  purple: 'bg-purple-600',
};

const Skills = () => {
  const categories = getSkillCategories();

  return (
    <section id="skills" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Technical Skills</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            An overview of my technical expertise across backend, frontend, databases, and tooling
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {categories.map((category) => (
            <div
              key={category.id}
              className="bg-white rounded-xl shadow-lg p-8 hover:shadow-xl transition-all duration-300"
            >
              <div className="flex items-center space-x-4 mb-8">
                {iconMap[category.id] ?? <Code className="text-gray-600" size={32} />}
                <h3 className="text-2xl font-bold text-gray-900">{category.title}</h3>
              </div>

              <div className="space-y-5">
                {category.skills.map((skill) => (
                  <div key={skill.name}>
                    <div className="flex justify-between items-center mb-1.5">
                      <span className="text-gray-700 font-medium">{skill.name}</span>
                      <span className="text-gray-400 text-sm">{skill.level}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className={`h-2 rounded-full ${barColorMap[category.color] ?? 'bg-blue-600'} transition-all duration-700`}
                        style={{ width: `${skill.level}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 bg-gradient-to-r from-gray-900 to-blue-900 rounded-2xl p-8 text-center text-white">
          <h3 className="text-2xl font-bold mb-4">Certifications & Learning</h3>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-white/10 rounded-lg p-4">
              <h4 className="font-semibold mb-2">Udacity Data Analysis</h4>
              <p className="text-sm text-gray-300">Data analysis and visualization techniques</p>
            </div>
            <div className="bg-white/10 rounded-lg p-4">
              <h4 className="font-semibold mb-2">CMU Git & GitHub</h4>
              <p className="text-sm text-gray-300">Version control and collaborative development</p>
            </div>
            <div className="bg-white/10 rounded-lg p-4">
              <h4 className="font-semibold mb-2">WordPress Development</h4>
              <p className="text-sm text-gray-300">Content management and custom theme development</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills;
