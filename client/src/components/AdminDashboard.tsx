import React, { useState, useEffect } from 'react';
import { 
  Users, Calendar, TrendingUp, Award, 
  BarChart3, Settings, Zap, Star, 
  ChevronRight, Plus, Eye, Edit, Trash2
} from 'lucide-react';
import MemberManagement from './MemberManagement';

interface AdminStats {
  totalMembers: number;
  activeMembers: number;
  totalClasses: number;
  averageAttendance: number;
  memberOfMonth: string;
  recentSignups: number;
}

const AdminDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [stats, setStats] = useState<AdminStats>({
    totalMembers: 0,
    activeMembers: 0,
    totalClasses: 0,
    averageAttendance: 0,
    memberOfMonth: '',
    recentSignups: 0
  });

  useEffect(() => {
    // Fetch admin stats from API
    const fetchStats = async () => {
      try {
        const response = await fetch('http://localhost:5001/api/admin/dashboard');
        if (response.ok) {
          const data = await response.json();
          setStats(data);
        }
      } catch (error) {
        console.error('Error fetching admin stats:', error);
        // Set mock data for development
        setStats({
          totalMembers: 45,
          activeMembers: 38,
          totalClasses: 12,
          averageAttendance: 85,
          memberOfMonth: 'Sarah Johnson',
          recentSignups: 3
        });
      }
    };

    fetchStats();
  }, []);

  const StatCard: React.FC<{ title: string; value: string | number; icon: React.ReactNode; color: string; change?: string }> = ({ 
    title, value, icon, color, change 
  }) => (
    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
      <div className="flex items-center justify-between mb-4">
        <div className={`w-12 h-12 ${color} rounded-xl flex items-center justify-center`}>
          {icon}
        </div>
        {change && (
          <span className="text-sm font-medium text-green-600 bg-green-50 px-2 py-1 rounded-full">
            +{change}
          </span>
        )}
      </div>
      <div>
        <p className="text-sm font-medium text-gray-600 mb-1">{title}</p>
        <p className="text-2xl font-bold text-gray-900">{value}</p>
      </div>
    </div>
  );

  const TabButton: React.FC<{ id: string; label: string; icon: React.ReactNode }> = ({ 
    id, label, icon 
  }) => (
    <button
      onClick={() => setActiveTab(id)}
      className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-colors ${
        activeTab === id
          ? 'bg-violet-100 text-violet-700'
          : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
      }`}
    >
      {icon}
      <span>{label}</span>
    </button>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center space-x-3 mb-4">
            <div className="w-12 h-12 bg-gradient-to-r from-violet-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
              <Zap className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                RolVibe Admin Dashboard
              </h1>
              <p className="text-gray-600">
                Manage your martial arts club with powerful tools and insights
              </p>
            </div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-2 mb-8">
          <div className="flex space-x-2">
            <TabButton
              id="overview"
              label="Overview"
              icon={<BarChart3 className="w-4 h-4" />}
            />
            <TabButton
              id="members"
              label="Members"
              icon={<Users className="w-4 h-4" />}
            />
            <TabButton
              id="classes"
              label="Classes"
              icon={<Calendar className="w-4 h-4" />}
            />
            <TabButton
              id="awards"
              label="Awards"
              icon={<Award className="w-4 h-4" />}
            />
            <TabButton
              id="settings"
              label="Settings"
              icon={<Settings className="w-4 h-4" />}
            />
          </div>
        </div>

        {/* Tab Content */}
        {activeTab === 'overview' && (
          <div className="space-y-8">
            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <StatCard
                title="Total Members"
                value={stats.totalMembers}
                icon={<Users className="w-6 h-6 text-white" />}
                color="bg-gradient-to-r from-violet-500 to-purple-600"
                change="12%"
              />
              <StatCard
                title="Active Members"
                value={stats.activeMembers}
                icon={<TrendingUp className="w-6 h-6 text-white" />}
                color="bg-gradient-to-r from-green-500 to-emerald-600"
                change="8%"
              />
              <StatCard
                title="Total Classes"
                value={stats.totalClasses}
                icon={<Calendar className="w-6 h-6 text-white" />}
                color="bg-gradient-to-r from-blue-500 to-indigo-600"
              />
              <StatCard
                title="Avg Attendance"
                value={`${stats.averageAttendance}%`}
                icon={<BarChart3 className="w-6 h-6 text-white" />}
                color="bg-gradient-to-r from-orange-500 to-red-600"
                change="5%"
              />
            </div>

            {/* Main Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Recent Activity */}
              <div className="lg:col-span-2">
                <div className="bg-white rounded-xl shadow-sm border border-gray-100">
                  <div className="p-6 border-b border-gray-100">
                    <h2 className="text-xl font-semibold text-gray-900">Recent Activity</h2>
                  </div>
                  <div className="p-6">
                    <div className="space-y-4">
                      <div className="flex items-center justify-between p-4 bg-green-50 rounded-lg">
                        <div className="flex items-center space-x-3">
                          <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                            <Users className="w-4 h-4 text-white" />
                          </div>
                          <div>
                            <p className="font-medium text-gray-900">New member joined</p>
                            <p className="text-sm text-gray-600">John Smith signed up for Karate Basics</p>
                          </div>
                        </div>
                        <span className="text-sm text-gray-500">2 hours ago</span>
                      </div>
                      <div className="flex items-center justify-between p-4 bg-blue-50 rounded-lg">
                        <div className="flex items-center space-x-3">
                          <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                            <Calendar className="w-4 h-4 text-white" />
                          </div>
                          <div>
                            <p className="font-medium text-gray-900">Class completed</p>
                            <p className="text-sm text-gray-600">Judo Advanced had 15 attendees</p>
                          </div>
                        </div>
                        <span className="text-sm text-gray-500">4 hours ago</span>
                      </div>
                      <div className="flex items-center justify-between p-4 bg-purple-50 rounded-lg">
                        <div className="flex items-center space-x-3">
                          <div className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center">
                            <Award className="w-4 h-4 text-white" />
                          </div>
                          <div>
                            <p className="font-medium text-gray-900">Achievement unlocked</p>
                            <p className="text-sm text-gray-600">Sarah Johnson reached 30-day streak</p>
                          </div>
                        </div>
                        <span className="text-sm text-gray-500">1 day ago</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Sidebar */}
              <div className="space-y-6">
                {/* Member of the Month */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                  <div className="flex items-center mb-4">
                    <Star className="w-5 h-5 mr-2 text-yellow-500" />
                    <h3 className="text-lg font-semibold text-gray-900">Member of the Month</h3>
                  </div>
                  <div className="text-center">
                    <div className="w-16 h-16 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-3">
                      <Star className="w-8 h-8 text-white" />
                    </div>
                    <h4 className="font-semibold text-gray-900 mb-1">{stats.memberOfMonth}</h4>
                    <p className="text-sm text-gray-600">Outstanding dedication and progress</p>
                  </div>
                </div>

                {/* Quick Actions */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
                  <div className="space-y-3">
                    <button className="w-full flex items-center justify-between p-3 text-left bg-violet-50 hover:bg-violet-100 rounded-lg transition-colors">
                      <div className="flex items-center">
                        <Plus className="w-5 h-5 mr-3 text-violet-600" />
                        <span className="font-medium text-gray-900">Add New Member</span>
                      </div>
                      <ChevronRight className="w-4 h-4 text-gray-400" />
                    </button>
                    <button className="w-full flex items-center justify-between p-3 text-left bg-green-50 hover:bg-green-100 rounded-lg transition-colors">
                      <div className="flex items-center">
                        <Calendar className="w-5 h-5 mr-3 text-green-600" />
                        <span className="font-medium text-gray-900">Create Class</span>
                      </div>
                      <ChevronRight className="w-4 h-4 text-gray-400" />
                    </button>
                    <button className="w-full flex items-center justify-between p-3 text-left bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors">
                      <div className="flex items-center">
                        <Award className="w-5 h-5 mr-3 text-blue-600" />
                        <span className="font-medium text-gray-900">Select Awards</span>
                      </div>
                      <ChevronRight className="w-4 h-4 text-gray-400" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'members' && (
          <div className="bg-white rounded-xl shadow-sm border border-gray-100">
            <MemberManagement />
          </div>
        )}

        {activeTab === 'classes' && (
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-gray-900">Class Management</h2>
              <button className="bg-violet-600 text-white px-4 py-2 rounded-lg hover:bg-violet-700 transition-colors flex items-center space-x-2">
                <Plus className="w-4 h-4" />
                <span>Add Class</span>
              </button>
            </div>
            <p className="text-gray-600">Class management features coming soon...</p>
          </div>
        )}

        {activeTab === 'awards' && (
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-gray-900">Awards & Recognition</h2>
              <button className="bg-violet-600 text-white px-4 py-2 rounded-lg hover:bg-violet-700 transition-colors flex items-center space-x-2">
                <Award className="w-4 h-4" />
                <span>Create Award</span>
              </button>
            </div>
            <p className="text-gray-600">Awards management features coming soon...</p>
          </div>
        )}

        {activeTab === 'settings' && (
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Club Settings</h2>
            <p className="text-gray-600">Settings and configuration options coming soon...</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard; 