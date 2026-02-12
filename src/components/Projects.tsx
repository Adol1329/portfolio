import React, { useState } from 'react';
import { ExternalLink, Github, Database, Code, Figma, ChevronLeft, ChevronRight } from 'lucide-react';

const Projects = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const [showAllProjects, setShowAllProjects] = useState(false);

  const allProjects = [
    {
      title: "VehicleTransfer Project",
      description: "A comprehensive vehicle transfer management system built with PHP and MySQL, featuring user authentication, transaction tracking, and administrative controls.",
      technologies: ["PHP", "MySQL", "HTML", "CSS", "JavaScript"],
      category: "Web Application",
      icon: <Code className="text-blue-600" size={24} />,
      color: "from-blue-500 to-blue-600",
      githubUrl: "https://github.com/Adol1329/-VehicleTransfer.git",
      // liveUrl: "https://vehicletransfer-demo.netlify.app",
      featured: true
    },
    {
      title: "HRMS - Human Resource Management System",
      description: "A comprehensive HR management platform for employee records, payroll processing, attendance tracking, and performance management with advanced reporting capabilities.",
      technologies: ["Java", "MySQL", "Spring Boot", "React"],
      category: "Enterprise Application",
      icon: <Database className="text-emerald-600" size={24} />,
      color: "from-emerald-500 to-emerald-600",
      githubUrl: "https://github.com/Adol1329/Hrms.git",
      liveUrl: "#",
      featured: true
    },
    {
      title: "Academic Calendar System",
      description: "An intelligent academic calendar management system for educational institutions, featuring semester planning, event scheduling, and automated notifications.",
      technologies: ["Java", "MySQL", "JavaFX", "Calendar API"],
      category: "Educational Software",
      icon: <Database className="text-orange-600" size={24} />,
      color: "from-orange-500 to-orange-600",
      githubUrl: "https://github.com/Adol1329/Academic-Calendar-system-.git",
      liveUrl: "#",
      featured: true
    },
    {
      title: "Simple User Demo",
      description: "A clean and intuitive user management demonstration application showcasing CRUD operations, user authentication, and responsive design principles.",
      technologies: ["JavaScript", "HTML", "CSS", "Local Storage"],
      category: "Demo Application",
      icon: <Code className="text-purple-600" size={24} />,
      color: "from-purple-500 to-purple-600",
      githubUrl: "https://github.com/Adol1329/Simple_User_Demo.git",
      liveUrl: "https://simple-user-demo.netlify.app",
      featured: true
    },
    {
      title: "E-Commerce Web Platform",
      description: "A full-stack e-commerce solution with shopping cart, payment integration, and admin dashboard built with modern web technologies.",
      technologies: ["React", "Node.js", "MongoDB", "Stripe API"],
      category: "Web Application",
      icon: <Code className="text-indigo-600" size={24} />,
      color: "from-indigo-500 to-indigo-600",
      githubUrl: "https://github.com/Adol1329/ECommerce-Platform",
      liveUrl: "https://ecommerce-demo.netlify.app",
      featured: false
    },
    {
      title: "Task Management System",
      description: "A collaborative task management application with real-time updates, team collaboration features, and progress tracking.",
      technologies: ["Vue.js", "Firebase", "Tailwind CSS", "PWA"],
      category: "Web Application",
      icon: <Code className="text-green-600" size={24} />,
      color: "from-green-500 to-green-600",
      githubUrl: "https://github.com/Adol1329/TaskManager",
      liveUrl: "https://taskmanager-demo.netlify.app",
      featured: false
    },
    {
      title: "Data Analytics Dashboard",
      description: "Interactive dashboard for data visualization and analytics with real-time charts, filters, and export capabilities.",
      technologies: ["Python", "Django", "Chart.js", "PostgreSQL"],
      category: "Data Analytics",
      icon: <Database className="text-red-600" size={24} />,
      color: "from-red-500 to-red-600",
      githubUrl: "https://github.com/Adol1329/Analytics-Dashboard",
      liveUrl: "#",
      featured: false
    },
    // {
    //   title: "Mobile Banking App UI",
    //   description: "Modern mobile banking application interface design with focus on security, usability, and accessibility standards.",
    //   technologies: ["Figma", "Sketch", "InVision", "Principle"],
    //   category: "Mobile Design",
    //   icon: <Figma className="text-pink-600" size={24} />,
    //   color: "from-pink-500 to-pink-600",
    //   githubUrl: "https://github.com/Adol1329/Banking-App-UI",
    //   liveUrl: "https://figma.com/banking-app-design",
    //   featured: false
    // }
  ];

  const featuredProjects = allProjects.filter(project => project.featured);
  const displayProjects = showAllProjects ? allProjects : featuredProjects;
  const projectsPerPage = 4;
  const totalPages = Math.ceil(displayProjects.length / projectsPerPage);
  const currentProjects = displayProjects.slice(
    currentPage * projectsPerPage,
    (currentPage + 1) * projectsPerPage
  );

  const handleViewCode = (githubUrl: string) => {
    if (githubUrl && githubUrl !== "#") {
      window.open(githubUrl, '_blank');
    } else {
      alert('Source code will be available soon!');
    }
  };

  const handleLiveDemo = (liveUrl: string) => {
    if (liveUrl && liveUrl !== "#") {
      window.open(liveUrl, '_blank');
    } else {
      alert('Live demo will be available soon!');
    }
  };

  const nextPage = () => {
    setCurrentPage((prev) => (prev + 1) % totalPages);
  };

  const prevPage = () => {
    setCurrentPage((prev) => (prev - 1 + totalPages) % totalPages);
  };

  const toggleShowAll = () => {
    setShowAllProjects(!showAllProjects);
    setCurrentPage(0);
  };

  return (
    <section id="projects" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            {showAllProjects ? 'All Projects' : 'Featured Projects'}
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            A showcase of my technical expertise through diverse projects in web development, 
            desktop applications, and user experience design
          </p>
        </div>
        
        <div className="grid lg:grid-cols-2 gap-8 mb-12">
          {currentProjects.map((project, index) => (
            <div
              key={index}
              className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 overflow-hidden border border-gray-100"
            >
              <div className={`h-2 bg-gradient-to-r ${project.color}`}></div>
              
              <div className="p-8">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    {project.icon}
                    <span className="text-sm font-medium text-gray-500 uppercase tracking-wide">
                      {project.category}
                    </span>
                  </div>
                </div>
                
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  {project.title}
                </h3>
                
                <p className="text-gray-600 mb-6 leading-relaxed">
                  {project.description}
                </p>
                
                <div className="flex flex-wrap gap-2 mb-6">
                  {project.technologies.map((tech, techIndex) => (
                    <span
                      key={techIndex}
                      className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm font-medium"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
                
                <div className="flex space-x-4">
                  <button 
                    onClick={() => handleViewCode(project.githubUrl)}
                    className="flex items-center space-x-2 text-blue-600 hover:text-blue-800 font-medium transition-colors duration-200 hover:bg-blue-50 px-3 py-2 rounded-lg"
                  >
                    <Github size={18} />
                    <span>View Code</span>
                  </button>
                  <button 
                    onClick={() => handleLiveDemo(project.liveUrl)}
                    className="flex items-center space-x-2 text-emerald-600 hover:text-emerald-800 font-medium transition-colors duration-200 hover:bg-emerald-50 px-3 py-2 rounded-lg"
                  >
                    <ExternalLink size={18} />
                    <span>Live Demo</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination Controls */}
        {totalPages > 1 && (
          <div className="flex items-center justify-center space-x-4 mb-8">
            <button
              onClick={prevPage}
              disabled={currentPage === 0}
              className="flex items-center space-x-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed rounded-lg transition-colors duration-200"
            >
              <ChevronLeft size={20} />
              <span>Previous</span>
            </button>
            
            <div className="flex space-x-2">
              {Array.from({ length: totalPages }, (_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentPage(i)}
                  className={`w-10 h-10 rounded-full transition-colors duration-200 ${
                    currentPage === i
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                  }`}
                >
                  {i + 1}
                </button>
              ))}
            </div>
            
            <button
              onClick={nextPage}
              disabled={currentPage === totalPages - 1}
              className="flex items-center space-x-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed rounded-lg transition-colors duration-200"
            >
              <span>Next</span>
              <ChevronRight size={20} />
            </button>
          </div>
        )}
        
        <div className="text-center">
          <button 
            onClick={toggleShowAll}
            className="bg-gray-900 hover:bg-gray-800 text-white px-8 py-3 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105"
          >
            {showAllProjects ? 'Show Featured Only' : 'View All Projects'}
          </button>
        </div>
      </div>
    </section>
  );
};

export default Projects;