import React, { useState, useEffect } from 'react';
import { 
  Zap, Users, Calendar, TrendingUp, Award, 
  BarChart3, Settings, Star, 
  ChevronRight, Plus, Eye, Edit, Trash2
} from 'lucide-react';
import MemberManagement from './MemberManagement';
import { useAuth } from '../contexts/AuthContext';

interface AdminStats {
  totalMembers: number;
  activeMembers: number;
  totalClasses: number;
  averageAttendance: number;
  memberOfMonth: string;
  recentSignups: number;
}

const AdminDashboard: React.FC = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('overview');
  const [stats, setStats] = useState<AdminStats>({
    totalMembers: 0,
    activeMembers: 0,
    totalClasses: 0,
    averageAttendance: 0,
    memberOfMonth: '',
    recentSignups: 0
  });
  const [addMemberTrigger, setAddMemberTrigger] = useState(0);

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

  if (!user || user.role !== 'admin') {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="bg-bee-white rounded-xl shadow p-8 border border-bee-border text-center">
          <h2 className="text-2xl font-bold text-bee-black mb-2">Access Denied</h2>
          <p className="text-bee-grayMuted">You do not have permission to view this page.</p>
        </div>
      </div>
    );
  }

  const StatCard: React.FC<{ title: string; value: string | number; icon: React.ReactNode; color: string; change?: string }> = ({ 
    title, value, icon, color, change 
  }) => (
    <div className="bg-bee-white rounded-xl p-6 shadow-sm border border-bee-border hover:shadow-md transition-shadow">
      <div className="flex items-center justify-between mb-4">
        <div className={`w-12 h-12 ${color} rounded-xl flex items-center justify-center`}>
          {icon}
        </div>
        {change && (
          <span className="text-sm font-medium text-bee-black bg-bee-gray px-2 py-1 rounded-full">
            +{change}
          </span>
        )}
      </div>
      <div>
        <p className="text-sm font-medium text-bee-grayMuted mb-1">{title}</p>
        <p className="text-2xl font-bold text-bee-black">{value}</p>
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
          ? 'bg-bee-gray text-bee-black'
          : 'text-bee-grayMuted hover:text-bee-black hover:bg-bee-gray'
      }`}
    >
      {icon}
      <span>{label}</span>
    </button>
  );

  return (
    <div className="min-h-screen bg-bee-gray">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center space-x-3 mb-4">
            <div className="w-12 h-12 bg-bee-yellow rounded-xl flex items-center justify-center shadow-lg">
              <Zap className="w-6 h-6 text-bee-black" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-bee-black">
                MemberFlow Admin Dashboard
              </h1>
              <p className="text-bee-grayMuted">
                Manage your martial arts club with powerful tools and insights
              </p>
            </div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="bg-bee-white rounded-xl shadow-sm border border-bee-border p-2 mb-8">
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
                icon={<Users className="w-6 h-6 text-bee-black" />}
                color="bg-bee-yellow"
                change="12%"
              />
              <StatCard
                title="Active Members"
                value={stats.activeMembers}
                icon={<TrendingUp className="w-6 h-6 text-bee-black" />}
                color="bg-bee-yellow"
                change="8%"
              />
              <StatCard
                title="Total Classes"
                value={stats.totalClasses}
                icon={<Calendar className="w-6 h-6 text-bee-black" />}
                color="bg-bee-yellow"
              />
              <StatCard
                title="Avg Attendance"
                value={`${stats.averageAttendance}%`}
                icon={<BarChart3 className="w-6 h-6 text-bee-black" />}
                color="bg-bee-yellow"
                change="5%"
              />
            </div>

            {/* Main Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Recent Activity */}
              <div className="lg:col-span-2">
                <div className="bg-bee-white rounded-xl shadow-sm border border-bee-border">
                  <div className="p-6 border-b border-bee-border">
                    <h2 className="text-xl font-semibold text-bee-black">Recent Activity</h2>
                  </div>
                  <div className="p-6">
                    <div className="space-y-4">
                      <div className="flex items-center justify-between p-4 bg-bee-gray rounded-lg">
                        <div className="flex items-center space-x-3">
                          <div className="w-8 h-8 bg-bee-yellow rounded-full flex items-center justify-center">
                            <Users className="w-4 h-4 text-bee-black" />
                          </div>
                          <div>
                            <p className="font-medium text-bee-black">New member joined</p>
                            <p className="text-sm text-bee-grayMuted">John Smith signed up for Karate Basics</p>
                          </div>
                        </div>
                        <span className="text-sm text-bee-grayMuted">2 hours ago</span>
                      </div>
                      <div className="flex items-center justify-between p-4 bg-bee-gray rounded-lg">
                        <div className="flex items-center space-x-3">
                          <div className="w-8 h-8 bg-bee-yellow rounded-full flex items-center justify-center">
                            <Calendar className="w-4 h-4 text-bee-black" />
                          </div>
                          <div>
                            <p className="font-medium text-bee-black">Class completed</p>
                            <p className="text-sm text-bee-grayMuted">Judo Advanced had 15 attendees</p>
                          </div>
                        </div>
                        <span className="text-sm text-bee-grayMuted">4 hours ago</span>
                      </div>
                      <div className="flex items-center justify-between p-4 bg-bee-gray rounded-lg">
                        <div className="flex items-center space-x-3">
                          <div className="w-8 h-8 bg-bee-yellow rounded-full flex items-center justify-center">
                            <Award className="w-4 h-4 text-bee-black" />
                          </div>
                          <div>
                            <p className="font-medium text-bee-black">Achievement unlocked</p>
                            <p className="text-sm text-bee-grayMuted">Sarah Johnson reached 30-day streak</p>
                          </div>
                        </div>
                        <span className="text-sm text-bee-grayMuted">1 day ago</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Sidebar */}
              <div className="space-y-6">
                {/* Member of the Month */}
                <div className="bg-bee-white rounded-xl shadow-sm border border-bee-border p-6">
                  <div className="flex items-center mb-4">
                    <Star className="w-5 h-5 mr-2 text-bee-yellow" />
                    <h3 className="text-lg font-semibold text-bee-black">Member of the Month</h3>
                  </div>
                  <div className="text-center">
                    <div className="w-16 h-16 bg-bee-yellow rounded-full flex items-center justify-center mx-auto mb-3">
                      <Star className="w-8 h-8 text-bee-black" />
                    </div>
                    <h4 className="font-semibold text-bee-black mb-1">{stats.memberOfMonth}</h4>
                    <p className="text-sm text-bee-grayMuted">Outstanding dedication and progress</p>
                  </div>
                </div>

                {/* Quick Actions */}
                <div className="bg-bee-white rounded-xl shadow-sm border border-bee-border p-6">
                  <h3 className="text-lg font-semibold text-bee-black mb-4">Quick Actions</h3>
                  <div className="space-y-3">
                    <button
                      className="w-full flex items-center justify-between p-3 text-left bg-bee-yellow hover:bg-bee-black hover:text-bee-yellow rounded-lg transition-colors border border-bee-black"
                      onClick={() => {
                        setActiveTab('members');
                        setAddMemberTrigger(t => t + 1);
                      }}
                    >
                      <div className="flex items-center">
                        <Plus className="w-5 h-5 mr-3 text-bee-black" />
                        <span className="font-medium text-bee-black">Add New Member</span>
                      </div>
                      <ChevronRight className="w-4 h-4 text-bee-grayMuted" />
                    </button>
                    <button className="w-full flex items-center justify-between p-3 text-left bg-bee-white hover:bg-bee-yellow hover:text-bee-black rounded-lg transition-colors border border-bee-black">
                      <div className="flex items-center">
                        <Calendar className="w-5 h-5 mr-3 text-bee-black" />
                        <span className="font-medium text-bee-black">Create Class</span>
                      </div>
                      <ChevronRight className="w-4 h-4 text-bee-grayMuted" />
                    </button>
                    <button className="w-full flex items-center justify-between p-3 text-left bg-bee-yellow hover:bg-bee-black hover:text-bee-yellow rounded-lg transition-colors border border-bee-black">
                      <div className="flex items-center">
                        <Award className="w-5 h-5 mr-3 text-bee-black" />
                        <span className="font-medium text-bee-black">Select Awards</span>
                      </div>
                      <ChevronRight className="w-4 h-4 text-bee-grayMuted" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'members' && (
          <div className="bg-bee-white rounded-xl shadow-sm border border-bee-border">
            <MemberManagement addMemberTrigger={addMemberTrigger} />
          </div>
        )}

        {activeTab === 'classes' && (
          <div className="bg-bee-white rounded-xl shadow-sm border border-bee-border p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-bee-black">Class Management</h2>
              <button className="bg-bee-yellow text-bee-black px-4 py-2 rounded-lg hover:bg-bee-black transition-colors flex items-center space-x-2">
                <Plus className="w-4 h-4" />
                <span>Add Class</span>
              </button>
            </div>
            <p className="text-bee-grayMuted">Class management features coming soon...</p>
          </div>
        )}

        {activeTab === 'awards' && (
          <div className="bg-bee-white rounded-xl shadow-sm border border-bee-border p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-bee-black">Awards & Recognition</h2>
              <button className="bg-bee-yellow text-bee-black px-4 py-2 rounded-lg hover:bg-bee-black transition-colors flex items-center space-x-2">
                <Award className="w-4 h-4" />
                <span>Create Award</span>
              </button>
            </div>
            <p className="text-bee-grayMuted">Awards management features coming soon...</p>
          </div>
        )}

        {activeTab === 'settings' && (
          <div className="bg-bee-white rounded-xl shadow-sm border border-bee-border p-6">
            <h2 className="text-xl font-semibold text-bee-black mb-6">Club Settings</h2>
            <p className="text-bee-grayMuted">Settings and configuration options coming soon...</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard; 