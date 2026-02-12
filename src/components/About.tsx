import React from 'react';
import { GraduationCap, Award, Globe, Users } from 'lucide-react';

const About = () => {
  return (
    <section id="about" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">About Me</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Passionate IT student with hands-on experience in software development, 
            database management, and user experience design
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <p className="text-lg text-gray-700 leading-relaxed">
              I'm currently pursuing my studies in Information Technology at the Adventist University 
              of Central Africa (AUCA), where I'm developing comprehensive skills in software development, 
              database systems, and digital innovation.
            </p>
            <p className="text-lg text-gray-700 leading-relaxed">
              Through hands-on projects and continuous learning, I've gained expertise in various 
              programming languages and technologies, with a particular focus on creating practical 
              solutions that address real-world challenges.
            </p>
            
            <div className="grid sm:grid-cols-2 gap-4 mt-8">
              <div className="bg-white p-6 rounded-lg shadow-md">
                <GraduationCap className="text-blue-600 mb-3" size={32} />
                <h3 className="font-semibold text-gray-900 mb-2">Education</h3>
                <p className="text-gray-600">AUCA IT Student</p>
                <p className="text-gray-600">CMU Bridge Program</p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-md">
                <Globe className="text-emerald-600 mb-3" size={32} />
                <h3 className="font-semibold text-gray-900 mb-2">Languages</h3>
                <p className="text-gray-600">English (Fluent)</p>
                <p className="text-gray-600">Kinyarwanda (Native)</p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-md">
                <Users className="text-orange-600 mb-3" size={32} />
                <h3 className="font-semibold text-gray-900 mb-2">Leadership</h3>
                <p className="text-gray-600">Team Leadership</p>
                <p className="text-gray-600">UX Research</p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-md">
                <Award className="text-purple-600 mb-3" size={32} />
                <h3 className="font-semibold text-gray-900 mb-2">Certifications</h3>
                <p className="text-gray-600">Udacity Data Analysis</p>
                <p className="text-gray-600">WordPress & Git/GitHub</p>
              </div>
            </div>
          </div>
          
          <div className="relative">
            <div className="bg-gradient-to-br from-blue-600 to-emerald-600 rounded-2xl p-8 text-white">
              <h3 className="text-2xl font-bold mb-6">What Drives Me</h3>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-white rounded-full mt-2 flex-shrink-0"></div>
                  <p>Creating innovative solutions that solve real-world problems</p>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-white rounded-full mt-2 flex-shrink-0"></div>
                  <p>Continuous learning and staying current with technology trends</p>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-white rounded-full mt-2 flex-shrink-0"></div>
                  <p>Collaborating with teams to deliver exceptional user experiences</p>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-white rounded-full mt-2 flex-shrink-0"></div>
                  <p>Building efficient, scalable, and maintainable software systems</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;