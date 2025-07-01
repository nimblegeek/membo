import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Zap, Calendar, TrendingUp, Award, Shield, 
  Star, CheckCircle, ArrowRight, Play,
  Facebook, Twitter, Instagram, Youtube
} from 'lucide-react';

const LandingPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-bee-gray">
      {/* Navigation */}
      <nav className="relative z-10 px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-bee-yellow rounded-xl flex items-center justify-center">
              <Zap className="w-6 h-6 text-bee-black" />
            </div>
            <span className="text-2xl font-bold text-bee-black">
              MemberFlow
            </span>
          </div>
          <div className="hidden md:flex items-center space-x-8">
            <a href="#features" className="text-bee-black hover:text-bee-yellow transition-colors">Features</a>
            <a href="#pricing" className="text-bee-black hover:text-bee-yellow transition-colors">Pricing</a>
            <a href="#contact" className="text-bee-black hover:text-bee-yellow transition-colors">Contact</a>
            <Link 
              to="/login" 
              className="bg-bee-yellow text-bee-black px-6 py-2 rounded-lg hover:bg-bee-yellowDeep hover:scale-105 transition-all duration-200"
            >
              Get Started
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative px-6 py-20 bg-bee-yellow">
        <div className="max-w-7xl mx-auto text-center">
          <div className="mb-8">
            <h1 className="text-5xl md:text-7xl font-bold text-bee-black mb-6">
              Transform Your
              <span className="block text-bee-black">
                Martial Arts Club
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-bee-black max-w-3xl mx-auto leading-relaxed">
              MemberFlow is the ultimate martial arts club management platform. Streamline member management, 
              track progress, and build a thriving community with powerful tools designed for modern dojos.
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <Link 
              to="/login" 
              className="bg-bee-black text-bee-yellow px-8 py-4 rounded-xl text-lg font-semibold hover:bg-bee-yellow hover:text-bee-black hover:scale-105 transition-all duration-200 flex items-center space-x-2 border-2 border-bee-black"
            >
              <span>Start Your Free Trial</span>
              <ArrowRight className="w-5 h-5" />
            </Link>
            <button className="flex items-center space-x-2 text-bee-black hover:text-bee-white hover:bg-bee-black transition-colors px-6 py-3 rounded-xl border border-bee-black">
              <Play className="w-5 h-5" />
              <span>Watch Demo</span>
            </button>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
            <div className="text-center">
              <div className="text-3xl font-bold text-bee-black mb-2">500+</div>
              <div className="text-bee-grayMuted">Active Clubs</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-bee-black mb-2">50K+</div>
              <div className="text-bee-grayMuted">Members</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-bee-black mb-2">99.9%</div>
              <div className="text-bee-grayMuted">Uptime</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-bee-black mb-2">24/7</div>
              <div className="text-bee-grayMuted">Support</div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="px-6 py-20 bg-bee-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-bee-black mb-6">
              Everything You Need to
              <span className="block text-bee-yellow">
                Succeed
              </span>
            </h2>
            <p className="text-xl text-bee-grayMuted max-w-3xl mx-auto">
              MemberFlow provides comprehensive tools to manage every aspect of your martial arts club, 
              from member registration to advanced analytics.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-bee-gray rounded-2xl p-8 border border-bee-border hover:border-bee-yellow transition-all duration-300">
              <div className="w-12 h-12 bg-bee-yellow rounded-xl flex items-center justify-center mb-6">
                <Zap className="w-6 h-6 text-bee-black" />
              </div>
              <h3 className="text-xl font-semibold text-bee-black mb-4">Member Management</h3>
              <p className="text-bee-grayMuted leading-relaxed">
                Complete member profiles with belt progression tracking, attendance history, and personal notes. 
                Manage memberships, payments, and communication all in one place.
              </p>
            </div>

            <div className="bg-bee-gray rounded-2xl p-8 border border-bee-border hover:border-bee-yellow transition-all duration-300">
              <div className="w-12 h-12 bg-bee-yellow rounded-xl flex items-center justify-center mb-6">
                <Zap className="w-6 h-6 text-bee-black" />
              </div>
              <h3 className="text-xl font-semibold text-bee-black mb-4">Class Scheduling</h3>
              <p className="text-bee-grayMuted leading-relaxed">
                Create and manage class schedules with automatic booking, attendance tracking, and capacity management. 
                Send reminders and notifications to keep everyone informed.
              </p>
            </div>

            <div className="bg-bee-gray rounded-2xl p-8 border border-bee-border hover:border-bee-yellow transition-all duration-300">
              <div className="w-12 h-12 bg-bee-yellow rounded-xl flex items-center justify-center mb-6">
                <Zap className="w-6 h-6 text-bee-black" />
              </div>
              <h3 className="text-xl font-semibold text-bee-black mb-4">Progress Tracking</h3>
              <p className="text-bee-grayMuted leading-relaxed">
                Monitor student progress with detailed analytics, attendance reports, and performance metrics. 
                Track belt advancement and set goals for continuous improvement.
              </p>
            </div>

            <div className="bg-bee-gray rounded-2xl p-8 border border-bee-border hover:border-bee-yellow transition-all duration-300">
              <div className="w-12 h-12 bg-bee-yellow rounded-xl flex items-center justify-center mb-6">
                <Zap className="w-6 h-6 text-bee-black" />
              </div>
              <h3 className="text-xl font-semibold text-bee-black mb-4">Achievement System</h3>
              <p className="text-bee-grayMuted leading-relaxed">
                Motivate students with a comprehensive achievement system. Award badges, recognize milestones, 
                and celebrate "Member of the Month" to build engagement and retention.
              </p>
            </div>

            <div className="bg-bee-gray rounded-2xl p-8 border border-bee-border hover:border-bee-yellow transition-all duration-300">
              <div className="w-12 h-12 bg-bee-yellow rounded-xl flex items-center justify-center mb-6">
                <Zap className="w-6 h-6 text-bee-black" />
              </div>
              <h3 className="text-xl font-semibold text-bee-black mb-4">Secure & Reliable</h3>
              <p className="text-bee-grayMuted leading-relaxed">
                Enterprise-grade security with data encryption, secure authentication, and regular backups. 
                Your club's data is protected with industry-leading security standards.
              </p>
            </div>

            <div className="bg-bee-gray rounded-2xl p-8 border border-bee-border hover:border-bee-yellow transition-all duration-300">
              <div className="w-12 h-12 bg-bee-yellow rounded-xl flex items-center justify-center mb-6">
                <Zap className="w-6 h-6 text-bee-black" />
              </div>
              <h3 className="text-xl font-semibold text-bee-black mb-4">Lightning Fast</h3>
              <p className="text-bee-grayMuted leading-relaxed">
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
              Loved by Martial Arts
              <span className="block text-bee-yellow">
                Masters Worldwide
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
            Ready to Transform Your
            <span className="block text-bee-yellow">
              Martial Arts Club?
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
                The ultimate martial arts club management platform designed to help you build a thriving community.
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