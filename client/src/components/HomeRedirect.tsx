import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const HomeRedirect: React.FC = () => {
  const { user, loading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading) {
      if (user) {
        // User is authenticated, redirect to main app
        navigate('/dashboard', { replace: true });
      } else {
        // User is not authenticated, redirect to landing page
        navigate('/landing', { replace: true });
      }
    }
  }, [user, loading, navigate]);

  // Show loading spinner while determining redirect
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
    </div>
  );
};

export default HomeRedirect; 