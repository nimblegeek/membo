import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Zap, Calendar, TrendingUp, Award, Shield, 
  Star, CheckCircle, ArrowRight, Play,
  Facebook, Twitter, Instagram, Youtube, Menu, X
} from 'lucide-react';

const LandingPage: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <div className="min-h-screen bg-bee-gray">
      {/* Navigation */}
      <nav className="relative z-10 px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-bee-yellow rounded-xl flex items-center justify-center">
              <Zap className="w-6 h-6 text-bee-black" />
            </div>
            <span className="text-2xl font-bold text-bee-black">
              MemberFlow
            </span>
          </div>

          {/* Desktop Navigation - Centered */}
          <div className="hidden lg:flex items-center justify-center space-x-4 absolute left-1/2 transform -translate-x-1/2">
            <a href="#features" className="flex items-center h-12 px-4 text-bee-black hover:text-bee-yellow rounded-lg font-medium transition-colors">Features</a>
            <a href="#pricing" className="flex items-center h-12 px-4 text-bee-black hover:text-bee-yellow rounded-lg font-medium transition-colors">Pricing</a>
            <Link to="/members-info" className="flex items-center h-12 px-4 text-bee-black hover:text-bee-yellow rounded-lg font-medium transition-colors">Members</Link>
            <Link to="/academies-info" className="flex items-center h-12 px-4 text-bee-black hover:text-bee-yellow rounded-lg font-medium transition-colors">Academies</Link>
            <Link to="/blog" className="flex items-center h-12 px-4 text-bee-black hover:text-bee-yellow rounded-lg font-medium transition-colors">Blog</Link>
          </div>

          {/* Right side - Get Started button and burger menu */}
          <div className="flex items-center space-x-4">
            <Link 
              to="/login" 
              className="hidden lg:flex items-center h-12 px-6 bg-bee-yellow text-bee-black rounded-lg font-medium hover:bg-bee-yellowDeep hover:scale-105 transition-all duration-200"
            >
              Get Started
            </Link>

            {/* Burger menu button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="lg:hidden flex items-center justify-center w-10 h-10 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
              aria-label="Toggle menu"
            >
              {isMenuOpen ? (
                <X className="w-6 h-6 text-gray-700" />
              ) : (
                <Menu className="w-6 h-6 text-gray-700" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <div className={`lg:hidden transition-all duration-300 ease-in-out ${isMenuOpen ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0 overflow-hidden'}`}>
          <div className="px-4 py-6 space-y-4 bg-white border-t border-gray-200 mt-4 rounded-lg shadow-lg">
            <a 
              href="#features" 
              className="flex items-center px-4 py-3 text-gray-700 hover:text-bee-black hover:bg-bee-yellow/10 rounded-xl text-base font-medium transition-all duration-200"
              onClick={closeMenu}
            >
              Features
            </a>
            <a 
              href="#pricing" 
              className="flex items-center px-4 py-3 text-gray-700 hover:text-bee-black hover:bg-bee-yellow/10 rounded-xl text-base font-medium transition-all duration-200"
              onClick={closeMenu}
            >
              Pricing
            </a>
            <Link 
              to="/members-info" 
              className="flex items-center px-4 py-3 text-gray-700 hover:text-bee-black hover:bg-bee-yellow/10 rounded-xl text-base font-medium transition-all duration-200"
              onClick={closeMenu}
            >
              Members
            </Link>
            <Link 
              to="/academies-info" 
              className="flex items-center px-4 py-3 text-gray-700 hover:text-bee-black hover:bg-bee-yellow/10 rounded-xl text-base font-medium transition-all duration-200"
              onClick={closeMenu}
            >
              Academies
            </Link>
            <Link 
              to="/blog" 
              className="flex items-center px-4 py-3 text-gray-700 hover:text-bee-black hover:bg-bee-yellow/10 rounded-xl text-base font-medium transition-all duration-200"
              onClick={closeMenu}
            >
              Blog
            </Link>
            <div className="pt-4 border-t border-gray-200">
              <Link 
                to="/login" 
                className="flex items-center w-full px-4 py-3 bg-bee-yellow text-bee-black hover:bg-bee-yellowDeep rounded-xl text-base font-medium transition-all duration-200 justify-center"
                onClick={closeMenu}
              >
                Get Started
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative px-4 sm:px-6 py-16 sm:py-20 bg-bee-yellow">
        <div className="max-w-7xl mx-auto text-center">
          <div className="mb-8">
            <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold text-bee-black mb-6">
              Compress the admin-work for your
              <span className="block text-bee-black">
                Martial Arts Academy
              </span>
            </h1>
            <p className="text-lg sm:text-xl lg:text-2xl text-bee-black max-w-3xl mx-auto leading-relaxed">
              MemberFlow helps you focus on what matters the most - <span className="pencil-underline font-semibold relative">your members</span>. Streamline daily operations with one system designed to take the admin work off your plate, giving you back the time to do what you do best.
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <Link 
              to="/login" 
              className="bg-bee-black text-bee-yellow px-6 sm:px-8 py-3 sm:py-4 rounded-xl text-base sm:text-lg font-semibold hover:bg-bee-yellow hover:text-bee-black hover:scale-105 transition-all duration-200 flex items-center space-x-2 border-2 border-bee-black"
            >
              <span>Start Your Free Trial</span>
              <ArrowRight className="w-5 h-5" />
            </Link>
            <button className="flex items-center space-x-2 text-bee-black hover:text-bee-white hover:bg-bee-black transition-colors px-4 sm:px-6 py-3 sm:py-3 rounded-xl border border-bee-black">
              <Play className="w-5 h-5" />
              <span>Watch Demo</span>
            </button>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-8 max-w-4xl mx-auto">
            <div className="text-center">
              <div className="text-2xl sm:text-3xl font-bold text-bee-black mb-2">500+</div>
              <div className="text-bee-grayMuted text-sm sm:text-base">Active Clubs</div>
            </div>
            <div className="text-center">
              <div className="text-2xl sm:text-3xl font-bold text-bee-black mb-2">50K+</div>
              <div className="text-bee-grayMuted text-sm sm:text-base">Members</div>
            </div>
            <div className="text-center">
              <div className="text-2xl sm:text-3xl font-bold text-bee-black mb-2">99.9%</div>
              <div className="text-bee-grayMuted text-sm sm:text-base">Uptime</div>
            </div>
            <div className="text-center">
              <div className="text-2xl sm:text-3xl font-bold text-bee-black mb-2">24/7</div>
              <div className="text-bee-grayMuted text-sm sm:text-base">Support</div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="px-4 sm:px-6 py-16 sm:py-20 bg-bee-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-bee-black mb-6">
              Everything your academy needs to
              <span className="block text-bee-yellow">
                Grow
              </span>
            </h2>
            <p className="text-lg sm:text-xl text-bee-grayMuted max-w-3xl mx-auto">
              MemberFlow provides comprehensive tools to manage every aspect of your academy, 
              from member registration, to automation and reporting.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            <div className="bg-bee-gray rounded-2xl p-6 sm:p-8 border border-bee-border hover:border-bee-yellow transition-all duration-300">
              <div className="w-12 h-12 bg-bee-yellow rounded-xl flex items-center justify-center mb-6">
                <Zap className="w-6 h-6 text-bee-black" />
              </div>
              <h3 className="text-lg sm:text-xl font-semibold text-bee-black mb-4">Member Management</h3>
              <p className="text-bee-grayMuted leading-relaxed text-sm sm:text-base">
                Complete member profiles with belt progression tracking, attendance history, and personal notes. 
                Manage memberships, payments, and communication all in one place.
              </p>
            </div>

            <div className="bg-bee-gray rounded-2xl p-6 sm:p-8 border border-bee-border hover:border-bee-yellow transition-all duration-300">
              <div className="w-12 h-12 bg-bee-yellow rounded-xl flex items-center justify-center mb-6">
                <Zap className="w-6 h-6 text-bee-black" />
              </div>
              <h3 className="text-lg sm:text-xl font-semibold text-bee-black mb-4">Class Scheduling</h3>
              <p className="text-bee-grayMuted leading-relaxed text-sm sm:text-base">
                Create and manage class schedules with automatic booking, attendance tracking, and capacity management. 
                Send reminders and notifications to keep everyone informed.
              </p>
            </div>

            <div className="bg-bee-gray rounded-2xl p-6 sm:p-8 border border-bee-border hover:border-bee-yellow transition-all duration-300">
              <div className="w-12 h-12 bg-bee-yellow rounded-xl flex items-center justify-center mb-6">
                <Zap className="w-6 h-6 text-bee-black" />
              </div>
              <h3 className="text-lg sm:text-xl font-semibold text-bee-black mb-4">Progress Tracking</h3>
              <p className="text-bee-grayMuted leading-relaxed text-sm sm:text-base">
                Monitor student progress with detailed analytics, attendance reports, and performance metrics. 
                Track belt advancement and set goals for continuous improvement.
              </p>
            </div>

            <div className="bg-bee-gray rounded-2xl p-6 sm:p-8 border border-bee-border hover:border-bee-yellow transition-all duration-300">
              <div className="w-12 h-12 bg-bee-yellow rounded-xl flex items-center justify-center mb-6">
                <Zap className="w-6 h-6 text-bee-black" />
              </div>
              <h3 className="text-lg sm:text-xl font-semibold text-bee-black mb-4">Achievement System</h3>
              <p className="text-bee-grayMuted leading-relaxed text-sm sm:text-base">
                Motivate students with a comprehensive achievement system. Award badges, recognize milestones, 
                and celebrate "Member of the Month" to build engagement and retention.
              </p>
            </div>

            <div className="bg-bee-gray rounded-2xl p-6 sm:p-8 border border-bee-border hover:border-bee-yellow transition-all duration-300">
              <div className="w-12 h-12 bg-bee-yellow rounded-xl flex items-center justify-center mb-6">
                <Zap className="w-6 h-6 text-bee-black" />
              </div>
              <h3 className="text-lg sm:text-xl font-semibold text-bee-black mb-4">Secure & Reliable</h3>
              <p className="text-bee-grayMuted leading-relaxed text-sm sm:text-base">
                Enterprise-grade security with data encryption, secure authentication, and regular backups. 
                Your club's data is protected with industry-leading security standards.
              </p>
            </div>

            <div className="bg-bee-gray rounded-2xl p-6 sm:p-8 border border-bee-border hover:border-bee-yellow transition-all duration-300">
              <div className="w-12 h-12 bg-bee-yellow rounded-xl flex items-center justify-center mb-6">
                <Zap className="w-6 h-6 text-bee-black" />
              </div>
              <h3 className="text-lg sm:text-xl font-semibold text-bee-black mb-4">Lightning Fast</h3>
              <p className="text-bee-grayMuted leading-relaxed text-sm sm:text-base">
                Built with modern technology for speed and reliability. Access your club data instantly 
                from any device, anywhere in the world with our cloud-based platform.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="px-6 py-20">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-bee-black mb-6">
              Built by practitioners,
              <span className="block text-bee-yellow">
                For practitioners 
              </span>
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-bee-gray rounded-2xl p-8 border border-bee-border">
              <div className="flex items-center mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                ))}
              </div>
              <p className="text-bee-grayMuted mb-6 leading-relaxed">
                "MemberFlow transformed how we manage our dojo. The member tracking and class scheduling features 
                have saved us hours every week. Our students love the achievement system!"
              </p>
              <div className="flex items-center">
                <div className="w-12 h-12 bg-bee-yellow rounded-full flex items-center justify-center mr-4">
                  <Zap className="w-5 h-5 text-bee-black" />
                </div>
                <div>
                  <div className="text-bee-black font-semibold">Sensei Michael</div>
                  <div className="text-bee-grayMuted">Black Belt Academy</div>
                </div>
              </div>
            </div>

            <div className="bg-bee-gray rounded-2xl p-8 border border-bee-border">
              <div className="flex items-center mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                ))}
              </div>
              <p className="text-bee-grayMuted mb-6 leading-relaxed">
                "The analytics and reporting features are incredible. I can now track student progress 
                and identify areas for improvement with detailed insights. Highly recommended!"
              </p>
              <div className="flex items-center">
                <div className="w-12 h-12 bg-bee-yellow rounded-full flex items-center justify-center mr-4">
                  <Zap className="w-5 h-5 text-bee-black" />
                </div>
                <div>
                  <div className="text-bee-black font-semibold">Sensei Kim</div>
                  <div className="text-bee-grayMuted">Dragon's Path Dojo</div>
                </div>
              </div>
            </div>

            <div className="bg-bee-gray rounded-2xl p-8 border border-bee-border">
              <div className="flex items-center mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                ))}
              </div>
              <p className="text-bee-grayMuted mb-6 leading-relaxed">
                "Switching to MemberFlow was the best decision for our club. The interface is intuitive, 
                customer support is excellent, and it has everything we need to grow our business."
              </p>
              <div className="flex items-center">
                <div className="w-12 h-12 bg-bee-yellow rounded-full flex items-center justify-center mr-4">
                  <Zap className="w-5 h-5 text-bee-black" />
                </div>
                <div>
                  <div className="text-bee-black font-semibold">Sensei Carlos</div>
                  <div className="text-bee-grayMuted">Warrior Spirit Gym</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="px-6 py-20 bg-bee-yellow/10">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-bee-black mb-6">
            Ready to Elevate Your
            <span className="block text-bee-yellow">
              Martial Arts Academy?
            </span>
          </h2>
          <p className="text-xl text-bee-grayMuted mb-8 leading-relaxed">
            Join hundreds of martial arts clubs already using MemberFlow to streamline their operations, 
            engage members, and grow their business.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              to="/login" 
              className="bg-bee-yellow text-bee-black px-8 py-4 rounded-xl text-lg font-semibold hover:bg-bee-yellowDeep hover:scale-105 transition-all duration-200 flex items-center justify-center space-x-2"
            >
              <span>Start Free Trial</span>
              <ArrowRight className="w-5 h-5" />
            </Link>
            <button className="border border-bee-yellow text-bee-black px-8 py-4 rounded-xl text-lg font-semibold hover:bg-bee-yellow/10 transition-all duration-200">
              Schedule Demo
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="px-6 py-12 border-t border-bee-border">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-bee-yellow rounded-lg flex items-center justify-center">
                  <Zap className="w-5 h-5 text-bee-black" />
                </div>
                <span className="text-xl font-bold text-bee-black">
                  MemberFlow
                </span>
              </div>
              <p className="text-bee-grayMuted leading-relaxed">
                The ultimate member management system for martial artists. A platform designed to help you build a thriving community.
              </p>
            </div>
            
            <div>
              <h4 className="text-bee-black font-semibold mb-4">Product</h4>
              <ul className="space-y-2 text-bee-grayMuted">
                <li><a href="#" className="hover:text-bee-yellow transition-colors">Features</a></li>
                <li><a href="#" className="hover:text-bee-yellow transition-colors">Pricing</a></li>
                <li><a href="#" className="hover:text-bee-yellow transition-colors">API</a></li>
                <li><a href="#" className="hover:text-bee-yellow transition-colors">Integrations</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-bee-black font-semibold mb-4">Support</h4>
              <ul className="space-y-2 text-bee-grayMuted">
                <li><a href="#" className="hover:text-bee-yellow transition-colors">Help Center</a></li>
                <li><a href="#" className="hover:text-bee-yellow transition-colors">Contact Us</a></li>
                <li><a href="#" className="hover:text-bee-yellow transition-colors">Status</a></li>
                <li><a href="#" className="hover:text-bee-yellow transition-colors">Documentation</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-bee-black font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-bee-grayMuted">
                <li><a href="#" className="hover:text-bee-yellow transition-colors">About</a></li>
                <li><a href="#" className="hover:text-bee-yellow transition-colors">Blog</a></li>
                <li><a href="#" className="hover:text-bee-yellow transition-colors">Careers</a></li>
                <li><a href="#" className="hover:text-bee-yellow transition-colors">Privacy</a></li>
              </ul>
            </div>
          </div>
          
          <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-bee-border">
            <p className="text-bee-grayMuted mb-4 md:mb-0">
              © 2024 MemberFlow. All rights reserved.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-bee-grayMuted hover:text-bee-yellow transition-colors">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="text-bee-grayMuted hover:text-bee-yellow transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="text-bee-grayMuted hover:text-bee-yellow transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="text-bee-grayMuted hover:text-bee-yellow transition-colors">
                <Youtube className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;

<style>
{`
  .pencil-underline {
    position: relative;
    display: inline-block;
  }
  .pencil-underline::after {
    content: '';
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0.1em;
    height: 8px;
    background: none;
    pointer-events: none;
    z-index: 1;
    width: 100%;
    background-repeat: no-repeat;
    background-size: 100% 8px;
    background-image: url("data:image/svg+xml,%3Csvg width='100%25' height='8' viewBox='0 0 100 8' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M2 6 Q 10 2, 18 6 T 34 6 T 50 6 T 66 6 T 82 6 T 98 6' stroke='black' stroke-width='2' fill='none'/%3E%3C/svg%3E");
  }
`}
</style> 