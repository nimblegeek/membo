import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Zap, Eye, EyeOff, Lock, Mail } from 'lucide-react';

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      await login(email, password);
      navigate('/dashboard');
    } catch (err) {
      setError('Invalid email or password. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-bee-gray flex items-center justify-center px-4">
      <div className="max-w-md w-full">
        {/* Logo and Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center space-x-3 mb-6">
            <div className="w-16 h-16 bg-bee-yellow rounded-2xl flex items-center justify-center shadow-2xl">
              <Zap className="w-8 h-8 text-bee-black" />
            </div>
            <span className="text-4xl font-bold text-bee-black">
              MemberFlow
            </span>
          </div>
          <h1 className="text-3xl font-bold text-bee-black mb-2">
            Welcome Back
          </h1>
          <p className="text-bee-grayMuted">
            Sign in to your martial arts club account
          </p>
        </div>

        {/* Login Form */}
        <div className="bg-bee-white/90 backdrop-blur-md rounded-2xl p-8 border border-bee-border shadow-2xl">
          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <div className="bg-red-500/20 border border-red-500/50 text-red-200 px-4 py-3 rounded-lg text-sm">
                {error}
              </div>
            )}

            {/* Email Field */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-bee-black mb-2">
                Email Address
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-bee-grayMuted" />
                </div>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="block w-full pl-10 pr-3 py-3 border border-bee-border rounded-lg bg-bee-grayLight text-bee-black placeholder-bee-grayMuted focus:outline-none focus:ring-2 focus:ring-bee-yellow focus:border-transparent transition-all duration-200"
                  placeholder="Enter your email"
                />
              </div>
            </div>

            {/* Password Field */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-bee-black mb-2">
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-bee-grayMuted" />
                </div>
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="block w-full pl-10 pr-12 py-3 border border-bee-border rounded-lg bg-bee-grayLight text-bee-black placeholder-bee-grayMuted focus:outline-none focus:ring-2 focus:ring-bee-yellow focus:border-transparent transition-all duration-200"
                  placeholder="Enter your password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-bee-grayMuted hover:text-bee-grayDeep transition-colors"
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5" />
                  ) : (
                    <Eye className="h-5 w-5" />
                  )}
                </button>
              </div>
            </div>

            {/* Remember Me & Forgot Password */}
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 text-bee-yellow focus:ring-bee-yellow border-bee-border rounded bg-bee-grayLight"
                />
                <label htmlFor="remember-me" className="ml-2 block text-sm text-bee-black">
                  Remember me
                </label>
              </div>
              <div className="text-sm">
                <a href="#" className="font-medium text-bee-yellow hover:text-bee-yellowDeep transition-colors">
                  Forgot password?
                </a>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-bee-white bg-gradient-to-r from-bee-yellow to-bee-yellowDeep hover:from-bee-yellowDeep hover:to-bee-yellow focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-bee-yellow disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 transform hover:scale-105"
            >
              {isLoading ? (
                <div className="flex items-center">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-bee-white mr-2"></div>
                  Signing in...
                </div>
              ) : (
                'Sign In'
              )}
            </button>
          </form>

          {/* Demo Credentials */}
          <div className="mt-6 p-4 bg-bee-gray rounded-lg border border-bee-border">
            <h3 className="text-sm font-medium text-bee-black mb-2">Demo Credentials</h3>
            <div className="text-xs text-bee-grayMuted space-y-1">
              <p><strong>Admin:</strong> admin@rolvibe.com / admin123</p>
              <p><strong>Member:</strong> member@rolvibe.com / member123</p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-8">
          <p className="text-bee-grayMuted text-sm">
            Don't have an account?{' '}
            <a href="#" className="font-medium text-bee-yellow hover:text-bee-yellowDeep transition-colors">
              Contact your club administrator
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login; 