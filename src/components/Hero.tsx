import React from 'react';
import { Download, ChevronDown, Github, Linkedin, Mail } from 'lucide-react';
import { getProfile, getCVInfo } from '../store/portfolioStore';

const Hero = () => {
  const profile = getProfile();
  const cv = getCVInfo();

  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleDownloadCV = () => {
    if (!cv.available) {
      alert('CV is currently unavailable. Please contact me directly.');
      return;
    }
    const link = document.createElement('a');
    link.href = `/cv/${cv.filename}`;
    link.download = cv.filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <section
      id="home"
      className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-gray-900 flex items-center justify-center relative overflow-hidden"
    >
      {/* Background dot pattern */}
      <div className="absolute inset-0 opacity-20 bg-[url('data:image/svg+xml,%3Csvg width=%2260%22 height=%2260%22 viewBox=%220 0 60 60%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cg fill=%22none%22 fill-rule=%22evenodd%22%3E%3Cg fill=%22%234F46E5%22 fill-opacity=%220.05%22%3E%3Ccircle cx=%2230%22 cy=%2230%22 r=%222%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')]" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        <div className="grid lg:grid-cols-2 gap-12 items-center min-h-screen py-20">

          {/* Left — text */}
          <div className="space-y-8 text-left lg:pr-8">
            <div className="space-y-6">
              <div className="space-y-2">
                <p className="text-blue-400 text-lg font-medium tracking-wide uppercase">
                  Welcome to my portfolio
                </p>
                <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-tight">
                  <span className="block">Hello, I'm</span>
                  <span className="block bg-gradient-to-r from-blue-400 to-emerald-400 bg-clip-text text-transparent">
                    {profile.name}
                  </span>
                </h1>
              </div>

              <div className="space-y-4">
                <p className="text-xl md:text-2xl text-gray-300 font-medium">
                  {profile.headline}
                </p>
                <p className="text-lg text-gray-400 leading-relaxed max-w-xl">
                  {profile.bio.split('.')[0]}.
                </p>

                {/* Open to opportunities badge */}
                {profile.availabilityStatus === 'open' && (
                  <span className="inline-flex items-center gap-2 bg-emerald-900/50 border border-emerald-500/40 text-emerald-400 text-sm font-medium px-4 py-1.5 rounded-full">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                    Open to Opportunities
                  </span>
                )}
              </div>
            </div>

            {/* CTA buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={() => scrollToSection('projects')}
                className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-lg font-semibold transition-all duration-300 hover:scale-105 hover:shadow-xl text-lg"
              >
                View My Work
              </button>
              <button
                onClick={handleDownloadCV}
                className="bg-transparent border-2 border-white/30 hover:border-white hover:bg-white/10 text-white px-8 py-4 rounded-lg font-semibold transition-all duration-300 hover:scale-105 flex items-center justify-center gap-3 text-lg"
              >
                <Download size={22} />
                Download CV
              </button>
            </div>

            {/* Social links */}
            <div className="flex items-center space-x-6 pt-4">
              <p className="text-gray-400 text-sm">Connect with me:</p>
              <div className="flex space-x-4">
                <a href={`mailto:${profile.social.email}`} className="text-gray-400 hover:text-blue-400 transition-all duration-300 hover:scale-110 p-2 rounded-full hover:bg-white/10" title="Email">
                  <Mail size={24} />
                </a>
                <a href={profile.social.github} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-blue-400 transition-all duration-300 hover:scale-110 p-2 rounded-full hover:bg-white/10" title="GitHub">
                  <Github size={24} />
                </a>
                <a href={profile.social.twitter} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-blue-400 transition-all duration-300 hover:scale-110 p-2 rounded-full hover:bg-white/10" title="X (Twitter)">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                  </svg>
                </a>
                <a href={profile.social.linkedin} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-blue-400 transition-all duration-300 hover:scale-110 p-2 rounded-full hover:bg-white/10" title="LinkedIn">
                  <Linkedin size={24} />
                </a>
              </div>
            </div>
          </div>

          {/* Right — photo */}
          <div className="flex justify-center lg:justify-end">
            <div className="relative">
              <div className="relative">
                <img
                  src="/3V9A1410==.jpg"
                  alt={`${profile.name} – ${profile.headline}`}
                  className="w-80 h-80 md:w-96 md:h-96 lg:w-[420px] lg:h-[420px] rounded-2xl object-cover shadow-2xl"
                />
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-tr from-blue-600/20 via-transparent to-emerald-400/20" />
                <div className="absolute -inset-4 bg-gradient-to-r from-blue-400 to-emerald-400 rounded-3xl opacity-20 blur-lg" />
              </div>
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-gradient-to-r from-blue-400/10 to-emerald-400/10 rounded-full blur-3xl -z-10" />
            </div>
          </div>
        </div>
      </div>

      <button
        onClick={() => scrollToSection('about')}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white animate-bounce hover:text-blue-400 transition-colors duration-300"
        aria-label="Scroll to About"
      >
        <ChevronDown size={32} />
      </button>
    </section>
  );
};

export default Hero;
