import React from 'react';
import { GraduationCap, Award, Globe, Users } from 'lucide-react';
import { getProfile } from '../store/portfolioStore';

const About = () => {
  const profile = getProfile();

  return (
    <section id="about" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">About Me</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Backend developer and software developer based in {profile.location}
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-start">
          <div className="space-y-6">
            <p className="text-lg text-gray-700 leading-relaxed">{profile.bio}</p>

            {profile.currentlyLearning.length > 0 && (
              <div className="flex flex-wrap gap-2 pt-2">
                <span className="text-sm text-gray-500 font-medium mr-1 self-center">Currently learning:</span>
                {profile.currentlyLearning.map((item) => (
                  <span key={item} className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium">
                    {item}
                  </span>
                ))}
              </div>
            )}

            <div className="grid sm:grid-cols-2 gap-4 mt-8">
              <div className="bg-white p-6 rounded-lg shadow-md">
                <GraduationCap className="text-blue-600 mb-3" size={32} />
                <h3 className="font-semibold text-gray-900 mb-2">Education</h3>
                <p className="text-gray-600">AUCA – Information Technology</p>
                <p className="text-gray-600">CMU Bridge Program</p>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-md">
                <Globe className="text-emerald-600 mb-3" size={32} />
                <h3 className="font-semibold text-gray-900 mb-2">Languages</h3>
                {profile.languages.map((lang) => (
                  <p key={lang} className="text-gray-600">{lang}</p>
                ))}
              </div>

              <div className="bg-white p-6 rounded-lg shadow-md">
                <Users className="text-orange-600 mb-3" size={32} />
                <h3 className="font-semibold text-gray-900 mb-2">Focus Areas</h3>
                <p className="text-gray-600">Backend Development</p>
                <p className="text-gray-600">Full-Stack Applications</p>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-md">
                <Award className="text-purple-600 mb-3" size={32} />
                <h3 className="font-semibold text-gray-900 mb-2">Certifications</h3>
                <p className="text-gray-600">Udacity Data Analysis</p>
                <p className="text-gray-600">CMU Git & GitHub</p>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="bg-gradient-to-br from-blue-600 to-emerald-600 rounded-2xl p-8 text-white">
              <h3 className="text-2xl font-bold mb-6">What Drives Me</h3>
              <div className="space-y-4">
                {[
                  'Building practical backend systems that solve real problems',
                  'Designing clean REST APIs and efficient database schemas',
                  'Continuous learning and staying current with technology',
                  'Collaborating on full-stack projects from concept to deployment',
                ].map((item) => (
                  <div key={item} className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-white rounded-full mt-2 flex-shrink-0" />
                    <p>{item}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
