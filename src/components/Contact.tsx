import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, Github, Linkedin } from 'lucide-react';
import { getProfile } from '../store/portfolioStore';

const Contact = () => {
  const profile = getProfile();
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const subject = encodeURIComponent(`Portfolio Contact from ${formData.name}`);
    const body = encodeURIComponent(
      `Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`
    );
    window.location.href = `mailto:${profile.social.email}?subject=${subject}&body=${body}`;
  };

  return (
    <section id="contact" className="py-20 bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-white mb-4">Get In Touch</h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Ready to collaborate? Let's discuss how we can work together.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact info */}
          <div className="space-y-8">
            <div>
              <h3 className="text-2xl font-bold text-white mb-6">Contact Information</h3>
              <div className="space-y-4">
                <div className="flex items-center space-x-4">
                  <div className="bg-blue-600 p-3 rounded-lg shrink-0">
                    <Mail className="text-white" size={20} />
                  </div>
                  <div>
                    <p className="text-gray-400 text-sm">Email</p>
                    <a href={`mailto:${profile.social.email}`} className="text-white font-medium hover:text-blue-400 transition-colors">
                      {profile.social.email}
                    </a>
                  </div>
                </div>

                {profile.phone && (
                  <div className="flex items-center space-x-4">
                    <div className="bg-emerald-600 p-3 rounded-lg shrink-0">
                      <Phone className="text-white" size={20} />
                    </div>
                    <div>
                      <p className="text-gray-400 text-sm">Phone</p>
                      <a href={`tel:${profile.phone.replace(/\s/g, '')}`} className="text-white font-medium hover:text-emerald-400 transition-colors">
                        {profile.phone}
                      </a>
                    </div>
                  </div>
                )}

                <div className="flex items-center space-x-4">
                  <div className="bg-orange-600 p-3 rounded-lg shrink-0">
                    <MapPin className="text-white" size={20} />
                  </div>
                  <div>
                    <p className="text-gray-400 text-sm">Location</p>
                    <p className="text-white font-medium">{profile.location}</p>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-xl font-bold text-white mb-4">Follow Me</h3>
              <div className="flex space-x-4">
                <a href={profile.social.github} target="_blank" rel="noopener noreferrer" className="bg-gray-800 hover:bg-gray-700 p-3 rounded-lg transition-colors group" title="GitHub">
                  <Github className="text-white group-hover:text-blue-400" size={20} />
                </a>
                <a href={profile.social.linkedin} target="_blank" rel="noopener noreferrer" className="bg-gray-800 hover:bg-gray-700 p-3 rounded-lg transition-colors group" title="LinkedIn">
                  <Linkedin className="text-white group-hover:text-blue-400" size={20} />
                </a>
                <a href={profile.social.twitter} target="_blank" rel="noopener noreferrer" className="bg-gray-800 hover:bg-gray-700 p-3 rounded-lg transition-colors group" title="X (Twitter)">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" className="text-white group-hover:text-blue-400">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                  </svg>
                </a>
                <a href={`mailto:${profile.social.email}`} className="bg-gray-800 hover:bg-gray-700 p-3 rounded-lg transition-colors group" title="Email">
                  <Mail className="text-white group-hover:text-blue-400" size={20} />
                </a>
              </div>
            </div>
          </div>

          {/* Contact form */}
          <div className="bg-gray-800 rounded-xl p-8">
            <h3 className="text-2xl font-bold text-white mb-6">Send Message</h3>
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label htmlFor="name" className="block text-gray-300 mb-2 text-sm">Full Name</label>
                <input
                  type="text" id="name" name="name" value={formData.name}
                  onChange={handleChange} required
                  className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-blue-500 transition-colors"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-gray-300 mb-2 text-sm">Email Address</label>
                <input
                  type="email" id="email" name="email" value={formData.email}
                  onChange={handleChange} required
                  className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-blue-500 transition-colors"
                />
              </div>
              <div>
                <label htmlFor="message" className="block text-gray-300 mb-2 text-sm">Message</label>
                <textarea
                  id="message" name="message" value={formData.message}
                  onChange={handleChange} rows={5} required
                  className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-blue-500 transition-colors resize-none"
                />
              </div>
              <button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 px-6 rounded-lg font-semibold transition-all duration-300 hover:scale-105 flex items-center justify-center space-x-2"
              >
                <Send size={20} />
                <span>Send Message</span>
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
