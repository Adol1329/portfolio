import React from 'react';
import { Routes, Route } from 'react-router-dom';
import PublicLayout from './components/PublicLayout';
import AdminLogin from './admin/pages/AdminLogin';
import AdminDashboard from './admin/pages/AdminDashboard';
import AdminProjects from './admin/pages/AdminProjects';
import AdminProfile from './admin/pages/AdminProfile';
import AdminSkills from './admin/pages/AdminSkills';
import AdminResume from './admin/pages/AdminResume';
import ProtectedRoute from './admin/components/ProtectedRoute';

function App() {
  return (
    <Routes>
      {/* Public portfolio */}
      <Route path="/" element={<PublicLayout />} />

      {/* Admin auth */}
      <Route path="/admin/login" element={<AdminLogin />} />

      {/* Protected admin routes */}
      <Route
        path="/admin/dashboard"
        element={
          <ProtectedRoute>
            <AdminDashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/projects"
        element={
          <ProtectedRoute>
            <AdminProjects />
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/profile"
        element={
          <ProtectedRoute>
            <AdminProfile />
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/skills"
        element={
          <ProtectedRoute>
            <AdminSkills />
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/resume"
        element={
          <ProtectedRoute>
            <AdminResume />
          </ProtectedRoute>
        }
      />

      {/* Redirect /admin to login */}
      <Route path="/admin" element={<AdminLogin />} />
    </Routes>
  );
}

export default App;
