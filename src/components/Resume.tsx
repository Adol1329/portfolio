import React from 'react';
import { Download, FileText, Eye, AlertCircle } from 'lucide-react';

const Resume = () => {
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
        alert('CV file is currently being updated. Please check back soon or contact me directly at adolpheuwayo12@gmail.com for my latest resume.');
      }
    } catch (error) {
      // Network error or file doesn't exist
      alert('CV download is temporarily unavailable. Please contact me at adolpheuwayo12@gmail.com for my latest resume.');
    }
  };

  const handlePreviewCV = async () => {
    try {
      // Check if CV file exists
      const response = await fetch('/cv/Adolphe_Uwayo_CV_2025.pdf', { method: 'HEAD' });
      
      if (response.ok) {
        // File exists, open in new tab
        window.open('/cv/Adolphe_Uwayo_CV_2025.pdf', '_blank');
      } else {
        // File doesn't exist, show user-friendly message
        alert('CV preview is currently unavailable. The file is being updated. Please contact me at adolpheuwayo12@gmail.com for my latest resume.');
      }
    } catch (error) {
      // Network error or file doesn't exist
      alert('CV preview is temporarily unavailable. Please contact me at adolpheuwayo12@gmail.com for my latest resume.');
    }
  };

  return (
    <section id="resume" className="py-20 bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Resume & CV</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Download my latest resume with updated skills, projects, and professional experience
          </p>
        </div>

        <div className="max-w-2xl mx-auto">
          {/* Download Section */}
          <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-8">
            <div className="text-center">
              <div className="bg-blue-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                <FileText className="text-white" size={32} />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Professional Resume</h3>
              <p className="text-gray-600 mb-6">
                Download my latest professional resume with updated skills, projects, and experience.
              </p>
              
              <div className="bg-white rounded-lg p-4 mb-6 border border-blue-200">
                <div className="flex items-center justify-center space-x-3">
                  <FileText className="text-blue-600" size={20} />
                  <span className="text-gray-700 font-medium">Adolphe_Uwayo_CV_2025.pdf</span>
                </div>
                <p className="text-sm text-gray-500 mt-1">Updated for 2025</p>
              </div>
              
              {/* Notice about CV availability */}
              <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mb-6">
                <div className="flex items-center justify-center space-x-2 text-amber-700">
                  <AlertCircle size={20} />
                  <span className="text-sm font-medium">CV file is being updated</span>
                </div>
                <p className="text-sm text-amber-600 mt-1">
                  For immediate access to my resume, please contact me at{' '}
                  <a href="mailto:adolpheuwayo12@gmail.com" className="underline hover:text-amber-800">
                    adolpheuwayo12@gmail.com
                  </a>
                </p>
              </div>
              
              <div className="space-y-4">
                <button
                  onClick={handleDownloadCV}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 px-6 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 flex items-center justify-center space-x-2"
                >
                  <Download size={20} />
                  <span>Download Resume</span>
                </button>
                
                <button
                  onClick={handlePreviewCV}
                  className="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 py-3 px-6 rounded-lg font-semibold transition-all duration-300 flex items-center justify-center space-x-2"
                >
                  <Eye size={20} />
                  <span>Preview Resume</span>
                </button>
                
                {/* Alternative contact button */}
                <a
                  href="mailto:adolpheuwayo12@gmail.com?subject=Request for Resume - Adolphe Uwayo&body=Hello Adolphe,%0D%0A%0D%0AI would like to request your latest resume.%0D%0A%0D%0AThank you!"
                  className="w-full bg-emerald-600 hover:bg-emerald-700 text-white py-3 px-6 rounded-lg font-semibold transition-all duration-300 flex items-center justify-center space-x-2"
                >
                  <FileText size={20} />
                  <span>Request Resume via Email</span>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Resume Highlights */}
        <div className="mt-16 bg-gray-50 rounded-xl p-8">
          <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">Resume Highlights</h3>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="bg-blue-600 text-white rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4">
                <span className="font-bold">3+</span>
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">Years Experience</h4>
              <p className="text-gray-600 text-sm">In software development and IT</p>
            </div>
            
            <div className="text-center">
              <div className="bg-emerald-600 text-white rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4">
                <span className="font-bold">10+</span>
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">Projects Completed</h4>
              <p className="text-gray-600 text-sm">Web apps, desktop software, and databases</p>
            </div>
            
            <div className="text-center">
              <div className="bg-orange-600 text-white rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4">
                <span className="font-bold">5+</span>
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">Technologies</h4>
              <p className="text-gray-600 text-sm">Programming languages and frameworks</p>
            </div>
          </div>
        </div>

        {/* Instructions for uploading CV */}
        <div className="mt-8 bg-gray-100 rounded-xl p-6">
          <h4 className="text-lg font-semibold text-gray-900 mb-3">📝 Note for Portfolio Owner</h4>
          <p className="text-gray-700 text-sm leading-relaxed">
            To enable CV download and preview functionality, please upload your CV file to the <code className="bg-gray-200 px-2 py-1 rounded text-xs">public/cv/</code> directory 
            with the filename <code className="bg-gray-200 px-2 py-1 rounded text-xs">Adolphe_Uwayo_CV_2025.pdf</code>. 
            The system will automatically detect the file and enable the download/preview features.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Resume;