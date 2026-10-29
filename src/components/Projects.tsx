import React, { useState } from 'react';
import { ExternalLink, Github, Users, User } from 'lucide-react';
import { getPublishedProjects } from '../store/portfolioStore';

const Projects = () => {
  const allPublished = getPublishedProjects();
  const featured = allPublished.filter((p) => p.featured);
  const [showAll, setShowAll] = useState(false);

  const displayed = showAll ? allPublished : featured;

  const openUrl = (url: string) => {
    if (url && url !== '#') window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <section id="projects" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            {showAll ? 'All Projects' : 'Featured Projects'}
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            A selection of projects across backend systems, full-stack web apps, and desktop software
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 mb-12">
          {displayed.map((project) => (
            <div
              key={project.id}
              className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 overflow-hidden border border-gray-100 flex flex-col"
            >
              {/* Colour accent bar */}
              <div className="h-1.5 bg-gradient-to-r from-blue-500 to-emerald-500" />

              <div className="p-8 flex flex-col flex-1">
                {/* Header row */}
                <div className="flex items-start justify-between mb-3 gap-4">
                  <div>
                    <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
                      {project.category}
                    </span>
                    <h3 className="text-xl font-bold text-gray-900 mt-1">
                      {project.title}
                    </h3>
                  </div>
                  {project.featured && (
                    <span className="shrink-0 px-2 py-0.5 bg-blue-100 text-blue-700 text-xs font-semibold rounded-full">
                      Featured
                    </span>
                  )}
                </div>

                {/* Role + collaboration badge */}
                <div className="flex items-center gap-2 mb-4">
                  {project.isCollaborative ? (
                    <span className="inline-flex items-center gap-1 text-xs text-orange-600 bg-orange-50 border border-orange-200 px-2 py-0.5 rounded-full font-medium">
                      <Users size={12} /> Team Capstone
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1 text-xs text-gray-500 bg-gray-100 px-2 py-0.5 rounded-full font-medium">
                      <User size={12} /> Individual
                    </span>
                  )}
                  <span className="text-xs text-gray-500">{project.role}</span>
                </div>

                <p className="text-gray-600 mb-5 leading-relaxed flex-1">
                  {project.description}
                </p>

                {/* Tech tags */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {project.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm font-medium"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                {/* Action buttons */}
                <div className="flex gap-3 mt-auto">
                  {project.githubUrl && (
                    <button
                      onClick={() => openUrl(project.githubUrl)}
                      className="flex items-center gap-2 text-blue-600 hover:text-blue-800 font-medium transition-colors duration-200 hover:bg-blue-50 px-3 py-2 rounded-lg text-sm"
                    >
                      <Github size={16} />
                      View Code
                    </button>
                  )}
                  {project.liveUrl && (
                    <button
                      onClick={() => openUrl(project.liveUrl)}
                      className="flex items-center gap-2 text-emerald-600 hover:text-emerald-800 font-medium transition-colors duration-200 hover:bg-emerald-50 px-3 py-2 rounded-lg text-sm"
                    >
                      <ExternalLink size={16} />
                      Live Demo
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {allPublished.length > featured.length && (
          <div className="text-center">
            <button
              onClick={() => setShowAll(!showAll)}
              className="bg-gray-900 hover:bg-gray-800 text-white px-8 py-3 rounded-lg font-semibold transition-all duration-300 hover:scale-105"
            >
              {showAll ? 'Show Featured Only' : `View All Projects (${allPublished.length})`}
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default Projects;
