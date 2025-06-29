import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { 
  Calendar, TrendingUp, Award, Users, 
  Clock, Target, Zap, Star, Activity,
  ChevronRight, BookOpen, Trophy, Flame
} from 'lucide-react';
import ClassList from './ClassList';

interface DashboardStats {
  totalClasses: number;
  attendanceRate: number;
  currentStreak: number;
  memberOfMonth: string;
  upcomingClasses: number;
  totalMembers: number;
}

const Dashboard: React.FC = () => {
  const { user } = useAuth();
  const [stats, setStats] = useState<DashboardStats>({
    totalClasses: 0,
    attendanceRate: 0,
    currentStreak: 0,
    memberOfMonth: '',
    upcomingClasses: 0,
    totalMembers: 0
  });

  useEffect(() => {
    // Fetch dashboard stats from API
    const fetchStats = async () => {
      try {
        const response = await fetch('http://localhost:5001/api/dashboard/stats');
        if (response.ok) {
          const data = await response.json();
          setStats(data);
        }
      } catch (error) {
        console.error('Error fetching dashboard stats:', error);
        // Set mock data for development
        setStats({
          totalClasses: 24,
          attendanceRate: 85,
          currentStreak: 5,
          memberOfMonth: 'Sarah Johnson',
          upcomingClasses: 3,
          totalMembers: 45
        });
      }
    };

    fetchStats();
  }, []);

  const StatCard: React.FC<{ title: string; value: string | number; icon: React.ReactNode; color: string }> = ({ 
    title, value, icon, color 
  }) => (
    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600 mb-1">{title}</p>
          <p className="text-2xl font-bold text-gray-900">{value}</p>
        </div>
        <div className={`w-12 h-12 ${color} rounded-xl flex items-center justify-center`}>
          {icon}
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Header */}
        <div className="mb-8">
          <div className="flex items-center space-x-3 mb-4">
            <div className="w-12 h-12 bg-gradient-to-r from-violet-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
              <Zap className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                Welcome back, {user?.name}!
              </h1>
              <p className="text-gray-600">
                Ready to continue your martial arts journey with RolVibe
              </p>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard
            title="Classes Attended"
            value={stats.totalClasses}
            icon={<BookOpen className="w-6 h-6 text-white" />}
            color="bg-gradient-to-r from-violet-500 to-purple-600"
          />
          <StatCard
            title="Attendance Rate"
            value={`${stats.attendanceRate}%`}
            icon={<TrendingUp className="w-6 h-6 text-white" />}
            color="bg-gradient-to-r from-green-500 to-emerald-600"
          />
          <StatCard
            title="Current Streak"
            value={stats.currentStreak}
            icon={<Flame className="w-6 h-6 text-white" />}
            color="bg-gradient-to-r from-orange-500 to-red-600"
          />
          <StatCard
            title="Upcoming Classes"
            value={stats.upcomingClasses}
            icon={<Calendar className="w-6 h-6 text-white" />}
            color="bg-gradient-to-r from-blue-500 to-indigo-600"
          />
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Class Schedule */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-sm border border-gray-100">
              <div className="p-6 border-b border-gray-100">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-semibold text-gray-900 flex items-center">
                    <Calendar className="w-5 h-5 mr-2 text-violet-600" />
                    This Week's Classes
                  </h2>
                  <button className="text-violet-600 hover:text-violet-700 text-sm font-medium flex items-center">
                    View All
                    <ChevronRight className="w-4 h-4 ml-1" />
                  </button>
                </div>
              </div>
              <div className="p-6">
                <ClassList />
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Member of the Month */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              <div className="flex items-center mb-4">
                <Trophy className="w-5 h-5 mr-2 text-yellow-500" />
                <h3 className="text-lg font-semibold text-gray-900">Member of the Month</h3>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Star className="w-8 h-8 text-white" />
                </div>
                <h4 className="font-semibold text-gray-900 mb-1">{stats.memberOfMonth}</h4>
                <p className="text-sm text-gray-600">Congratulations on your dedication!</p>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
              <div className="space-y-3">
                <button className="w-full flex items-center justify-between p-3 text-left bg-violet-50 hover:bg-violet-100 rounded-lg transition-colors">
                  <div className="flex items-center">
                    <Calendar className="w-5 h-5 mr-3 text-violet-600" />
                    <span className="font-medium text-gray-900">Book a Class</span>
                  </div>
                  <ChevronRight className="w-4 h-4 text-gray-400" />
                </button>
                <button className="w-full flex items-center justify-between p-3 text-left bg-green-50 hover:bg-green-100 rounded-lg transition-colors">
                  <div className="flex items-center">
                    <Target className="w-5 h-5 mr-3 text-green-600" />
                    <span className="font-medium text-gray-900">View Progress</span>
                  </div>
                  <ChevronRight className="w-4 h-4 text-gray-400" />
                </button>
                <button className="w-full flex items-center justify-between p-3 text-left bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors">
                  <div className="flex items-center">
                    <Award className="w-5 h-5 mr-3 text-blue-600" />
                    <span className="font-medium text-gray-900">See Awards</span>
                  </div>
                  <ChevronRight className="w-4 h-4 text-gray-400" />
                </button>
              </div>
            </div>

            {/* Recent Activity */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h3>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">Class booked</p>
                    <p className="text-xs text-gray-500">Karate Advanced - Tomorrow 6:00 PM</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">Achievement unlocked</p>
                    <p className="text-xs text-gray-500">5-day attendance streak</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-purple-500 rounded-full mt-2"></div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">Class completed</p>
                    <p className="text-xs text-gray-500">Judo Basics - 2 hours ago</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard; 