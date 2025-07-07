import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { 
  Menu, X, User, LogOut, Settings, 
  Bell, Search, ChevronDown, Zap, Home, Award, Shield
} from 'lucide-react';

const Navbar: React.FC = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/landing');
    setIsMenuOpen(false);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <nav className="bg-white/90 backdrop-blur-md border-b border-gray-200 sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-center items-center h-16 relative">
          {/* Logo */}
          <Link to={user ? "/dashboard" : "/landing"} className="flex items-center h-16 space-x-3 absolute left-0">
            <div className="w-10 h-10 bg-bee-yellow rounded-xl flex items-center justify-center shadow-lg">
              <Zap className="w-6 h-6 text-bee-black" />
            </div>
            <span className="text-2xl font-bold text-bee-black">
              MemberFlow
            </span>
          </Link>

          {/* Desktop Navigation - Centered */}
          <div className="desktop-nav items-center h-16 space-x-1">
            {user ? (
              <>
                <Link 
                  to="/dashboard" 
                  className="flex items-center h-16 px-4 text-gray-700 hover:text-blue-600 rounded-lg text-sm font-medium transition-colors"
                >
                  Dashboard
                </Link>
                <Link 
                  to="/admin" 
                  className="flex items-center h-16 px-4 text-gray-700 hover:text-blue-600 rounded-lg text-sm font-medium transition-colors"
                >
                  Admin
                </Link>
                <Link 
                  to="/awards" 
                  className="flex items-center h-16 px-4 text-gray-700 hover:text-blue-600 rounded-lg text-sm font-medium transition-colors"
                >
                  Awards
                </Link>
              </>
            ) : (
              <>
                <Link 
                  to="/landing" 
                  className="flex items-center h-16 px-4 text-gray-700 hover:text-blue-600 rounded-lg text-sm font-medium transition-colors"
                >
                  Home
                </Link>
                <Link 
                  to="/members-info" 
                  className="flex items-center h-16 px-4 text-gray-700 hover:text-blue-600 rounded-lg text-sm font-medium transition-colors"
                >
                  Members
                </Link>
                <Link 
                  to="/academies-info" 
                  className="flex items-center h-16 px-4 text-gray-700 hover:text-blue-600 rounded-lg text-sm font-medium transition-colors"
                >
                  Academies
                </Link>
                <Link 
                  to="/blog" 
                  className="flex items-center h-16 px-4 text-gray-700 hover:text-blue-600 rounded-lg text-sm font-medium transition-colors"
                >
                  Blog
                </Link>
              </>
            )}
          </div>

          {/* Right side - Search, Notifications, Profile */}
          <div className="desktop-nav items-center h-16 space-x-4 absolute right-0">
            {user ? (
              <>
                {/* Search */}
                <div className="relative flex items-center h-16">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <input
                    type="text"
                    placeholder="Search..."
                    className="pl-10 pr-4 h-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                    style={{ marginTop: '0', marginBottom: '0' }}
                  />
                </div>

                {/* Notifications */}
                <button className="relative flex items-center h-10 p-2 text-gray-600 hover:text-blue-600 transition-colors">
                  <Bell className="w-5 h-5" />
                  <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
                </button>

                {/* Profile Dropdown */}
                <div className="relative flex items-center h-16">
                  <button
                    onClick={() => setIsProfileOpen(!isProfileOpen)}
                    className="flex items-center h-10 space-x-2 text-gray-700 hover:text-blue-600 transition-colors"
                  >
                    <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full flex items-center justify-center">
                      <span className="text-white font-bold text-sm">
                        {user.name.charAt(0).toUpperCase()}
                      </span>
                    </div>
                    <span className="text-sm font-medium">{user.name}</span>
                    <ChevronDown className="w-4 h-4" />
                  </button>

                  {isProfileOpen && (
                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50">
                      <Link
                        to="/profile"
                        className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
                        onClick={() => setIsProfileOpen(false)}
                      >
                        <User className="w-4 h-4 mr-3" />
                        Profile
                      </Link>
                      <Link
                        to="/admin"
                        className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
                        onClick={() => setIsProfileOpen(false)}
                      >
                        <Settings className="w-4 h-4 mr-3" />
                        Settings
                      </Link>
                      <hr className="my-2" />
                      <button
                        onClick={handleLogout}
                        className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
                      >
                        <LogOut className="w-4 h-4 mr-3" />
                        Sign Out
                      </button>
                    </div>
                  )}
                </div>
              </>
            ) : (
              <>
                <Link 
                  to="/login" 
                  className="flex items-center h-16 px-6 text-gray-700 hover:text-blue-600 rounded-lg text-sm font-medium transition-colors"
                >
                  Login
                </Link>
                <Link 
                  to="/login" 
                  className="flex items-center h-10 px-4 bg-bee-yellow text-bee-black rounded-lg hover:bg-bee-yellowDeep transition-colors text-sm font-medium"
                >
                  Get Rollin'
                </Link>
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="mobile-menu absolute right-0">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="flex items-center justify-center w-10 h-10 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
              aria-label="Toggle menu"
            >
              <div className="relative w-6 h-6">
                <span className={`absolute top-1 left-0 w-6 h-1 bg-gray-700 transform transition-all duration-300 ${isMenuOpen ? 'rotate-45 translate-y-2' : ''}`}></span>
                <span className={`absolute top-3 left-0 w-6 h-1 bg-gray-700 transform transition-all duration-300 ${isMenuOpen ? 'opacity-0' : ''}`}></span>
                <span className={`absolute top-5 left-0 w-6 h-1 bg-gray-700 transform transition-all duration-300 ${isMenuOpen ? '-rotate-45 -translate-y-2' : ''}`}></span>
              </div>
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <div className={`mobile-menu transition-all duration-300 ease-in-out ${isMenuOpen ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0 overflow-hidden'}`}>
          <div className="px-4 py-6 space-y-6 bg-white border-t border-gray-200">
            {user ? (
              <>
                {/* User Profile Section */}
                <div className="flex items-center space-x-4 p-4 bg-gray-50 rounded-xl">
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full flex items-center justify-center">
                    <span className="text-white font-bold text-lg">
                      {user.name.charAt(0).toUpperCase()}
                    </span>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">{user.name}</h3>
                    <p className="text-sm text-gray-600">{user.email}</p>
                  </div>
                </div>

                {/* Search Bar */}
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="text"
                    placeholder="Search members, classes..."
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-bee-yellow focus:border-transparent text-base"
                  />
                </div>

                {/* Navigation Links */}
                <div className="space-y-2">
                  <Link
                    to="/dashboard"
                    className="flex items-center px-4 py-3 text-gray-700 hover:text-bee-black hover:bg-bee-yellow/10 rounded-xl text-base font-medium transition-all duration-200"
                    onClick={closeMenu}
                  >
                    <Home className="w-5 h-5 mr-3 text-bee-yellow" />
                    Dashboard
                  </Link>
                  <Link
                    to="/admin"
                    className="flex items-center px-4 py-3 text-gray-700 hover:text-bee-black hover:bg-bee-yellow/10 rounded-xl text-base font-medium transition-all duration-200"
                    onClick={closeMenu}
                  >
                    <Shield className="w-5 h-5 mr-3 text-bee-yellow" />
                    Admin Panel
                  </Link>
                  <Link
                    to="/awards"
                    className="flex items-center px-4 py-3 text-gray-700 hover:text-bee-black hover:bg-bee-yellow/10 rounded-xl text-base font-medium transition-all duration-200"
                    onClick={closeMenu}
                  >
                    <Award className="w-5 h-5 mr-3 text-bee-yellow" />
                    Awards & Achievements
                  </Link>
                  <Link
                    to="/profile"
                    className="flex items-center px-4 py-3 text-gray-700 hover:text-bee-black hover:bg-bee-yellow/10 rounded-xl text-base font-medium transition-all duration-200"
                    onClick={closeMenu}
                  >
                    <User className="w-5 h-5 mr-3 text-bee-yellow" />
                    My Profile
                  </Link>
                </div>

                {/* Quick Actions */}
                <div className="pt-4 border-t border-gray-200">
                  <h4 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3 px-4">Quick Actions</h4>
                  <div className="space-y-2">
                    <button className="flex items-center w-full px-4 py-3 text-gray-700 hover:text-bee-black hover:bg-bee-yellow/10 rounded-xl text-base font-medium transition-all duration-200">
                      <Bell className="w-5 h-5 mr-3 text-bee-yellow" />
                      Notifications
                    </button>
                    <button className="flex items-center w-full px-4 py-3 text-gray-700 hover:text-bee-black hover:bg-bee-yellow/10 rounded-xl text-base font-medium transition-all duration-200">
                      <Settings className="w-5 h-5 mr-3 text-bee-yellow" />
                      Settings
                    </button>
                  </div>
                </div>

                {/* Sign Out */}
                <div className="pt-4 border-t border-gray-200">
                  <button
                    onClick={handleLogout}
                    className="flex items-center w-full px-4 py-3 text-red-600 hover:text-red-700 hover:bg-red-50 rounded-xl text-base font-medium transition-all duration-200"
                  >
                    <LogOut className="w-5 h-5 mr-3" />
                    Sign Out
                  </button>
                </div>
              </>
            ) : (
              <>
                {/* Public Navigation Links */}
                <div className="space-y-2">
                  <Link
                    to="/landing"
                    className="flex items-center px-4 py-3 text-gray-700 hover:text-bee-black hover:bg-bee-yellow/10 rounded-xl text-base font-medium transition-all duration-200"
                    onClick={closeMenu}
                  >
                    <Home className="w-5 h-5 mr-3 text-bee-yellow" />
                    Home
                  </Link>
                  <Link
                    to="/members-info"
                    className="flex items-center px-4 py-3 text-gray-700 hover:text-bee-black hover:bg-bee-yellow/10 rounded-xl text-base font-medium transition-all duration-200"
                    onClick={closeMenu}
                  >
                    <Shield className="w-5 h-5 mr-3 text-bee-yellow" />
                    Members
                  </Link>
                  <Link
                    to="/academies-info"
                    className="flex items-center px-4 py-3 text-gray-700 hover:text-bee-black hover:bg-bee-yellow/10 rounded-xl text-base font-medium transition-all duration-200"
                    onClick={closeMenu}
                  >
                    <Award className="w-5 h-5 mr-3 text-bee-yellow" />
                    Academies
                  </Link>
                  <Link
                    to="/blog"
                    className="flex items-center px-4 py-3 text-gray-700 hover:text-bee-black hover:bg-bee-yellow/10 rounded-xl text-base font-medium transition-all duration-200"
                    onClick={closeMenu}
                  >
                    <User className="w-5 h-5 mr-3 text-bee-yellow" />
                    Blog
                  </Link>
                </div>

                {/* Login/Sign Up */}
                <div className="pt-4 border-t border-gray-200">
                  <Link
                    to="/login"
                    className="flex items-center w-full px-4 py-3 bg-bee-yellow text-bee-black hover:bg-bee-yellowDeep rounded-xl text-base font-medium transition-all duration-200 justify-center"
                    onClick={closeMenu}
                  >
                    Get Started
                  </Link>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar; 