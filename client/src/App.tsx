import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import Navbar from './components/Navbar';
import LandingPage from './components/LandingPage';
import HomeRedirect from './components/HomeRedirect';
import ClassList from './components/ClassList';
import Profile from './components/Profile';
import Awards from './components/Awards';
import AdminDashboard from './components/AdminDashboard';
import Login from './components/Login';

// Protected Route component
const ProtectedRoute: React.FC<{ children: React.ReactNode; adminOnly?: boolean }> = ({ 
  children, 
  adminOnly = false 
}) => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (adminOnly && user.role !== 'admin') {
    return <Navigate to="/dashboard" replace />;
  }

  return <>{children}</>;
};

// Main App Layout
const AppLayout: React.FC = () => {
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <main className="container mx-auto px-4 py-8">
        <Routes>
          <Route path="/dashboard" element={
            <ProtectedRoute>
              <ClassList />
            </ProtectedRoute>
          } />
          <Route path="/profile" element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          } />
          <Route path="/awards" element={
            <ProtectedRoute>
              <Awards />
            </ProtectedRoute>
          } />
          <Route path="/admin" element={
            <ProtectedRoute adminOnly>
              <AdminDashboard />
            </ProtectedRoute>
          } />
          <Route path="/login" element={<Login />} />
        </Routes>
      </main>
    </div>
  );
};

// Main App component
const App: React.FC = () => {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Root redirect */}
          <Route path="/" element={<HomeRedirect />} />
          
          {/* Landing page route - no authentication required */}
          <Route path="/landing" element={<LandingPage />} />
          
          {/* App routes - with authentication */}
          <Route path="/*" element={<AppLayout />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App; 