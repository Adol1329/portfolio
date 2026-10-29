import React, { useState, useRef } from 'react';
import { Upload, Eye, Trash2, FileText, CheckCircle, AlertCircle } from 'lucide-react';
import AdminLayout from '../components/AdminLayout';
import { getCVInfo, saveCVInfo } from '../../store/portfolioStore';

const MAX_SIZE_MB = 5;
const ALLOWED_TYPE = 'application/pdf';

const AdminResume = () => {
  const [cv, setCv] = useState(getCVInfo());
  const [status, setStatus] = useState<{ type: 'success' | 'error'; message: string } | null>(null);
  const [uploading, setUploading] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  const showStatus = (type: 'success' | 'error', message: string) => {
    setStatus({ type, message });
    setTimeout(() => setStatus(null), 5000);
  };

  // NOTE: This is a static Vite/Vercel deployment — there is no server to receive file uploads.
  // The admin panel manages the CV *metadata* (filename, availability, upload date).
  // To replace the actual PDF, place the new file in public/cv/ and update the filename here.
  // For true file upload support, a backend (e.g. Supabase Storage, Cloudinary) is required.
  // See DEPLOYMENT.md for instructions.

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Client-side validation
    if (file.type !== ALLOWED_TYPE) {
      showStatus('error', 'Only PDF files are accepted.');
      return;
    }
    if (file.size > MAX_SIZE_MB * 1024 * 1024) {
      showStatus('error', `File must be smaller than ${MAX_SIZE_MB}MB.`);
      return;
    }

    setUploading(true);

    // Simulate processing — in a real backend integration, upload here
    setTimeout(() => {
      const updated = {
        filename: file.name,
        uploadedAt: new Date().toISOString(),
        available: true,
      };
      saveCVInfo(updated);
      setCv(updated);
      setUploading(false);
      showStatus(
        'success',
        `CV metadata updated to "${file.name}". Place the PDF file in public/cv/ with this exact filename for the download to work.`
      );
      if (fileRef.current) fileRef.current.value = '';
    }, 800);
  };

  const handleMarkUnavailable = () => {
    const updated = { ...cv, available: false };
    saveCVInfo(updated);
    setCv(updated);
    showStatus('success', 'CV marked as unavailable. Public download buttons are now disabled.');
  };

  const handleMarkAvailable = () => {
    const updated = { ...cv, available: true };
    saveCVInfo(updated);
    setCv(updated);
    showStatus('success', 'CV marked as available.');
  };

  return (
    <AdminLayout title="Resume / CV">
      <div className="max-w-2xl space-y-6">
        {status && (
          <div className={`flex items-start gap-2 rounded-lg px-4 py-3 text-sm border ${
            status.type === 'success'
              ? 'bg-green-50 border-green-200 text-green-700'
              : 'bg-red-50 border-red-200 text-red-700'
          }`}>
            {status.type === 'success' ? <CheckCircle size={16} className="shrink-0 mt-0.5" /> : <AlertCircle size={16} className="shrink-0 mt-0.5" />}
            {status.message}
          </div>
        )}

        {/* Current CV status */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Current CV</h3>

          <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg border border-gray-200 mb-4">
            <FileText className="text-blue-600 shrink-0" size={32} />
            <div className="flex-1 min-w-0">
              <p className="font-medium text-gray-900 truncate">{cv.filename}</p>
              <p className="text-sm text-gray-500">
                Updated: {new Date(cv.uploadedAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
              </p>
            </div>
            <span className={`px-3 py-1 rounded-full text-xs font-semibold shrink-0 ${
              cv.available ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-600'
            }`}>
              {cv.available ? 'Available' : 'Unavailable'}
            </span>
          </div>

          <div className="flex flex-wrap gap-3">
            {cv.available && (
              <a
                href={`/cv/${cv.filename}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-medium transition-colors"
              >
                <Eye size={16} />
                Preview CV
              </a>
            )}
            {cv.available ? (
              <button
                onClick={handleMarkUnavailable}
                className="flex items-center gap-2 px-4 py-2.5 border border-red-300 text-red-600 hover:bg-red-50 rounded-lg text-sm font-medium transition-colors"
              >
                <Trash2 size={16} />
                Mark Unavailable
              </button>
            ) : (
              <button
                onClick={handleMarkAvailable}
                className="flex items-center gap-2 px-4 py-2.5 border border-green-300 text-green-600 hover:bg-green-50 rounded-lg text-sm font-medium transition-colors"
              >
                <CheckCircle size={16} />
                Mark Available
              </button>
            )}
          </div>
        </div>

        {/* Upload new CV */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-2">Update CV Filename</h3>
          <p className="text-sm text-gray-500 mb-4">
            Select your new PDF to update the filename and upload date. Then place the actual file in{' '}
            <code className="bg-gray-100 px-1.5 py-0.5 rounded text-xs">public/cv/</code> with the same name.
          </p>

          <label className="flex flex-col items-center justify-center w-full h-36 border-2 border-dashed border-gray-300 hover:border-blue-400 rounded-xl cursor-pointer transition-colors bg-gray-50 hover:bg-blue-50">
            <Upload className="text-gray-400 mb-2" size={28} />
            <p className="text-sm text-gray-500">Click to select PDF</p>
            <p className="text-xs text-gray-400 mt-1">PDF only · Max {MAX_SIZE_MB}MB</p>
            <input
              ref={fileRef}
              type="file"
              accept="application/pdf"
              onChange={handleFileSelect}
              className="hidden"
            />
          </label>

          {uploading && (
            <div className="mt-4 flex items-center gap-2 text-sm text-blue-600">
              <div className="w-4 h-4 border-2 border-blue-600 border-t-transparent rounded-full animate-spin" />
              Processing…
            </div>
          )}
        </div>

        {/* Architecture note */}
        <div className="bg-amber-50 border border-amber-200 rounded-xl p-5">
          <h4 className="text-sm font-semibold text-amber-800 mb-2">ℹ️ Static Deployment Note</h4>
          <p className="text-sm text-amber-700 leading-relaxed">
            This portfolio runs as a static site on Vercel. File uploads require a backend storage service.
            To replace the CV: place the new PDF in <code className="bg-amber-100 px-1 rounded">public/cv/</code>,
            update the filename above, then redeploy. For automatic uploads without redeployment,
            integrate Supabase Storage or Cloudinary — see <code className="bg-amber-100 px-1 rounded">DEPLOYMENT.md</code>.
          </p>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminResume;
