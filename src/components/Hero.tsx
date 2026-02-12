import React from 'react';
import { Download, ChevronDown, Github, Linkedin, Mail } from 'lucide-react';

const Hero = () => {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleDownloadCV = async () => {
    try {
      // Check if CV file exists
      const response = await fetch('/cv/Adolphe_Uwayo_CV_2025.pdf', { method: 'HEAD' });
      
      if (response.ok) {
        // File exists, proceed with download
        const cvUrl = '/cv/Adolphe_Uwayo_CV_2025.pdf';
        const link = document.createElement('a');
        link.href = cvUrl;
        link.download = 'Adolphe_Uwayo_CV_2025.pdf';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      } else {
        // File doesn't exist, show user-friendly message
        alert('CV file is currently being updated. Please check back soon or contact me directly for my latest resume.');
      }
    } catch (error) {
      // Network error or file doesn't exist
      alert('CV download is temporarily unavailable. Please contact me at adolpheuwayo12@gmail.com for my latest resume.');
    }
  };

  return (
    <section id="home" className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-gray-900 flex items-center justify-center relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width=%2260%22 height=%2260%22 viewBox=%220 0 60 60%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cg fill=%22none%22 fill-rule=%22evenodd%22%3E%3Cg fill=%22%234F46E5%22 fill-opacity=%220.05%22%3E%3Ccircle cx=%2230%22 cy=%2230%22 r=%222%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-20"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        <div className="grid lg:grid-cols-2 gap-12 items-center min-h-screen py-20">
          
          {/* Left Side - Welcome Text */}
          <div className="space-y-8 text-left lg:pr-8">
            <div className="space-y-6">
              <div className="space-y-2">
                <p className="text-blue-400 text-lg font-medium tracking-wide uppercase">
                  Welcome to my portfolio
                </p>
                <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-tight">
                  <span className="block">Hello, I'm</span>
                  <span className="block bg-gradient-to-r from-blue-400 to-emerald-400 bg-clip-text text-transparent">
                    Adolphe Uwayo
                  </span>
                </h1>
              </div>
              
              <div className="space-y-4">
                <p className="text-xl md:text-2xl text-gray-300 font-medium">
                  IT Student & Software Developer
                </p>
                <p className="text-lg text-gray-400 leading-relaxed max-w-xl">
                  Passionate about building practical digital solutions with expertise in web development, 
                  database management, and user experience design. Currently studying at AUCA and 
                  continuously expanding my technical skills.
                </p>
              </div>
            </div>
            
            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={() => scrollToSection('projects')}
                className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 hover:shadow-xl text-lg"
              >
                View My Work
              </button>
              <button 
                onClick={handleDownloadCV}
                className="bg-transparent border-2 border-white/30 hover:border-white hover:bg-white/10 text-white px-8 py-4 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 flex items-center justify-center gap-3 text-lg"
              >
                <Download size={22} />
                Download CV
              </button>
            </div>
            
            {/* Social Links */}
            <div className="flex items-center space-x-6 pt-4">
              <p className="text-gray-400 text-sm">Connect with me:</p>
              <div className="flex space-x-4">
                <a
                  href="mailto:adolpheuwayo12@gmail.com"
                  className="text-gray-400 hover:text-blue-400 transition-all duration-300 transform hover:scale-110 p-2 rounded-full hover:bg-white/10"
                  title="Email"
                >
                  <Mail size={24} />
                </a>
                <a
                  href="https://github.com/Adol1329"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-blue-400 transition-all duration-300 transform hover:scale-110 p-2 rounded-full hover:bg-white/10"
                  title="GitHub"
                >
                  <Github size={24} />
                </a>
                <a
                  href="https://x.com/AdolpheUwayo"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-blue-400 transition-all duration-300 transform hover:scale-110 p-2 rounded-full hover:bg-white/10"
                  title="X (Twitter)"
                >
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                  </svg>
                </a>
                <a
                  href="https://linkedin.com/in/adolphe-uwayo"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-blue-400 transition-all duration-300 transform hover:scale-110 p-2 rounded-full hover:bg-white/10"
                  title="LinkedIn"
                >
                  <Linkedin size={24} />
                </a>
              </div>
            </div>
          </div>
          
          {/* Right Side - Professional Photo */}
          <div className="flex justify-center lg:justify-end">
            <div className="relative">
              {/* Main Photo Container */}
              <div className="relative">
                <img
                  src="/3V9A1410==.jpg"
                  alt="Adolphe Uwayo - IT Professional"
                  className="w-80 h-80 md:w-96 md:h-96 lg:w-[450px] lg:h-[450px] rounded-2xl object-cover shadow-2xl"
                />
                
                {/* Gradient Overlay */}
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-tr from-blue-600/20 via-transparent to-emerald-400/20"></div>
                
                {/* Decorative Border */}
                <div className="absolute -inset-4 bg-gradient-to-r from-blue-400 to-emerald-400 rounded-3xl opacity-20 blur-lg"></div>
              </div>
              
              {/* Floating Elements */}
              <div className="absolute -top-6 -right-6 bg-blue-600 text-white p-4 rounded-xl shadow-lg">
                <div className="text-center">
                  <p className="text-2xl font-bold">3+</p>
                  <p className="text-xs">Years Experience</p>
                </div>
              </div>
              
              <div className="absolute -bottom-6 -left-6 bg-emerald-600 text-white p-4 rounded-xl shadow-lg">
                <div className="text-center">
                  <p className="text-2xl font-bold">10+</p>
                  <p className="text-xs">Projects Done</p>
                </div>
              </div>
              
              {/* Background Decoration */}
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-r from-blue-400/10 to-emerald-400/10 rounded-full blur-3xl -z-10"></div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Scroll Down Indicator */}
      <button
        onClick={() => scrollToSection('about')}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white animate-bounce hover:text-blue-400 transition-colors duration-300"
      >
        <ChevronDown size={32} />
      </button>
    </section>
  );
};

export default Hero;