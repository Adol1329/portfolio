import React from 'react';
import { Heart, Github, Linkedin, Mail } from 'lucide-react';
import { getProfile } from '../store/portfolioStore';

const Footer = () => {
  const profile = getProfile();

  return (
    <footer className="bg-gray-900 border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-400 flex items-center gap-1">
            © {new Date().getFullYear()} {profile.name}. Made with
            <Heart className="text-red-500 mx-1" size={16} />
            in Kigali
          </p>

          <div className="flex items-center gap-4">
            <a href={profile.social.github} target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-white transition-colors" title="GitHub">
              <Github size={18} />
            </a>
            <a href={profile.social.linkedin} target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-white transition-colors" title="LinkedIn">
              <Linkedin size={18} />
            </a>
            <a href={`mailto:${profile.social.email}`} className="text-gray-500 hover:text-white transition-colors" title="Email">
              <Mail size={18} />
            </a>
          </div>

          <p className="text-gray-500 text-sm">Building the future, one line at a time</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
