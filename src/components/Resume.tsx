import React from 'react';
import { Download, FileText, Eye } from 'lucide-react';
import { getCVInfo } from '../store/portfolioStore';

const Resume = () => {
  const cv = getCVInfo();
  const cvPath = `/cv/${cv.filename}`;

  const handleDownload = () => {
    if (!cv.available) {
      alert('CV is currently unavailable. Please contact me directly.');
      return;
    }
    const link = document.createElement('a');
    link.href = cvPath;
    link.download = cv.filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handlePreview = () => {
    if (!cv.available) {
      alert('CV preview is currently unavailable. Please contact me directly.');
      return;
    }
    window.open(cvPath, '_blank', 'noopener,noreferrer');
  };

  return (
    <section id="resume" className="py-20 bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Resume & CV</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Download or preview my latest resume
          </p>
        </div>

        <div className="max-w-2xl mx-auto">
          <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-8">
            <div className="text-center">
              <div className="bg-blue-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                <FileText className="text-white" size={32} />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Professional Resume</h3>
              <p className="text-gray-600 mb-6">
                My latest resume with updated skills, projects, and experience.
              </p>

              <div className="bg-white rounded-lg p-4 mb-6 border border-blue-200">
                <div className="flex items-center justify-center space-x-3">
                  <FileText className="text-blue-600" size={20} />
                  <span className="text-gray-700 font-medium">{cv.filename}</span>
                </div>
                {cv.available && (
                  <p className="text-sm text-gray-500 mt-1">
                    Updated {new Date(cv.uploadedAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long' })}
                  </p>
                )}
              </div>

              <div className="space-y-3">
                <button
                  onClick={handleDownload}
                  disabled={!cv.available}
                  className="w-full bg-blue-600 hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed text-white py-3 px-6 rounded-lg font-semibold transition-all duration-300 hover:scale-105 flex items-center justify-center space-x-2"
                >
                  <Download size={20} />
                  <span>Download Resume</span>
                </button>

                <button
                  onClick={handlePreview}
                  disabled={!cv.available}
                  className="w-full bg-gray-100 hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed text-gray-700 py-3 px-6 rounded-lg font-semibold transition-all duration-300 flex items-center justify-center space-x-2"
                >
                  <Eye size={20} />
                  <span>Preview Resume</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Resume;
