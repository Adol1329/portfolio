import React from 'react';
import { Code, Database, Palette, PenTool as Tool } from 'lucide-react';

const Skills = () => {
  const skillCategories = [
    {
      title: "Programming Languages",
      icon: <Code className="text-blue-600" size={32} />,
      skills: [
        { name: "Java", level: 90 },
        { name: "PHP", level: 85 },
        { name: "JavaScript", level: 80 },
        { name: "C++", level: 75 },
        { name: "Python", level: 70 },
        { name: "HTML/CSS", level: 95 }
      ],
      color: "blue"
    },
    {
      title: "Database & Tools",
      icon: <Database className="text-emerald-600" size={32} />,
      skills: [
        { name: "MySQL", level: 90 },
        { name: "PL/SQL", level: 80 },
        { name: "MongoDB", level: 70 },
        { name: "Git & GitHub", level: 85 },
        { name: "XAMPP", level: 90 },
        { name: "Apache", level: 75 }
      ],
      color: "emerald"
    },
    {
      title: "Design & UX",
      icon: <Palette className="text-orange-600" size={32} />,
      skills: [
        { name: "Figma", level: 85 },
        { name: "Adobe XD", level: 75 },
        { name: "UI Design", level: 80 },
        { name: "UX Research", level: 85 },
        { name: "Prototyping", level: 80 },
        { name: "Wireframing", level: 85 }
      ],
      color: "orange"
    },
    {
      title: "Development Tools",
      icon: <Tool className="text-purple-600" size={32} />,
      skills: [
        { name: "VS Code", level: 95 },
        { name: "IntelliJ IDEA", level: 85 },
        { name: "Postman", level: 80 },
        { name: "Docker", level: 60 },
        { name: "Linux", level: 70 },
        { name: "WordPress", level: 85 }
      ],
      color: "purple"
    }
  ];

  const getColorClasses = (color: string) => {
    const colors = {
      blue: "bg-blue-600",
      emerald: "bg-emerald-600",
      orange: "bg-orange-600",
      purple: "bg-purple-600"
    };
    return colors[color as keyof typeof colors];
  };

  return (
    <section id="skills" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Technical Skills</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            A comprehensive overview of my technical expertise across various domains 
            of software development and design
          </p>
        </div>
        
        <div className="grid lg:grid-cols-2 gap-8">
          {skillCategories.map((category, index) => (
            <div
              key={index}
              className="bg-white rounded-xl shadow-lg p-8 hover:shadow-xl transition-all duration-300"
            >
              <div className="flex items-center space-x-4 mb-8">
                {category.icon}
                <h3 className="text-2xl font-bold text-gray-900">{category.title}</h3>
              </div>
              
              <div className="space-y-6">
                {category.skills.map((skill, skillIndex) => (
                  <div key={skillIndex}>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-gray-700 font-medium">{skill.name}</span>
                      <span className="text-gray-500 text-sm">{skill.level}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className={`h-2 rounded-full ${getColorClasses(category.color)} transition-all duration-1000 ease-out`}
                        style={{ width: `${skill.level}%` }}
                      ></div>
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
              <p className="text-sm text-gray-300">Advanced data analysis and visualization techniques</p>
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