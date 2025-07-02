import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { 
  Calendar, TrendingUp, Award, Zap, 
  Clock, Target, Star,
  ChevronRight, BookOpen, Trophy, Flame
} from 'lucide-react';
import ClassList from './ClassList';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface DashboardStats {
  totalClasses: number;
  attendanceRate: number;
  currentStreak: number;
  memberOfMonth: string;
  upcomingClasses: number;
  totalMembers: number;
}

// Mock attendance data for the last 8 weeks
const attendanceData = [
  { week: 'Wk 1', attendance: 42 },
  { week: 'Wk 2', attendance: 48 },
  { week: 'Wk 3', attendance: 38 },
  { week: 'Wk 4', attendance: 55 },
  { week: 'Wk 5', attendance: 60 },
  { week: 'Wk 6', attendance: 53 },
  { week: 'Wk 7', attendance: 58 },
  { week: 'Wk 8', attendance: 62 },
];

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
    <div className="bg-bee-white rounded-2xl p-6 shadow-sm border border-bee-border hover:shadow-md transition-shadow">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-bee-grayMuted mb-1">{title}</p>
          <p className="text-2xl font-bold text-bee-black">{value}</p>
        </div>
        <div className={`w-12 h-12 ${color} rounded-xl flex items-center justify-center`}>
          {icon}
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-bee-gray">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Header */}
        <div className="mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center space-y-4 sm:space-y-0 sm:space-x-3 mb-4">
            <div className="w-12 h-12 bg-bee-yellow rounded-xl flex items-center justify-center shadow-lg">
              <Zap className="w-6 h-6 text-bee-black" />
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-bee-black">
                Welcome back, {user?.name}!
              </h1>
              <p className="text-bee-grayMuted text-sm sm:text-base">
                Ready to continue your martial arts journey with MemberFlow
              </p>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-8">
          <StatCard
            title="Classes Attended"
            value={stats.totalClasses}
            icon={<BookOpen className="w-6 h-6 text-bee-black" />}
            color="bg-bee-yellow"
          />
          <StatCard
            title="Attendance Rate"
            value={`${stats.attendanceRate}%`}
            icon={<TrendingUp className="w-6 h-6 text-bee-black" />}
            color="bg-bee-yellow"
          />
          <StatCard
            title="Current Streak"
            value={stats.currentStreak}
            icon={<Flame className="w-6 h-6 text-bee-black" />}
            color="bg-bee-orange"
          />
          <StatCard
            title="Upcoming Classes"
            value={stats.upcomingClasses}
            icon={<Calendar className="w-6 h-6 text-bee-black" />}
            color="bg-bee-yellow"
          />
        </div>

        {/* Attendance Overview */}
        <div className="bg-bee-white rounded-2xl shadow-sm border border-bee-border p-4 sm:p-6 lg:p-8 mb-8 lg:mb-10">
          <h2 className="text-lg sm:text-xl font-bold text-bee-black mb-4 sm:mb-6">Attendance Overview</h2>
          <ResponsiveContainer width="100%" height={200} className="sm:h-[260px]">
            <LineChart data={attendanceData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="week" tick={{ fontSize: 14, fill: '#8A8A8A' }} />
              <YAxis tick={{ fontSize: 14, fill: '#8A8A8A' }} />
              <Tooltip contentStyle={{ background: '#fffbe6', borderColor: '#ffe066', color: '#222' }} />
              <Line type="monotone" dataKey="attendance" stroke="#FFD600" strokeWidth={3} dot={{ r: 5, fill: '#FFD600' }} activeDot={{ r: 7, fill: '#FFD600' }} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
          {/* Class Schedule */}
          <div className="lg:col-span-2">
            <div className="bg-bee-white rounded-2xl shadow-sm border border-bee-border">
              <div className="p-4 sm:p-6 border-b border-bee-border">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-2 sm:space-y-0">
                  <h2 className="text-lg sm:text-xl font-semibold text-bee-black flex items-center">
                    <Calendar className="w-5 h-5 mr-2 text-bee-yellow" />
                    This Week's Classes
                  </h2>
                  <button className="text-bee-yellow hover:text-bee-orange text-sm font-medium flex items-center self-start sm:self-auto">
                    View All
                    <ChevronRight className="w-4 h-4 ml-1" />
                  </button>
                </div>
              </div>
              <div className="p-4 sm:p-6">
                <ClassList />
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-4 sm:space-y-6">
            {/* Member of the Month */}
            <div className="bg-bee-white rounded-2xl shadow-sm border border-bee-border p-4 sm:p-6">
              <div className="flex items-center mb-4">
                <Trophy className="w-5 h-5 mr-2 text-bee-yellow" />
                <h3 className="text-base sm:text-lg font-semibold text-bee-black">Member of the Month</h3>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-r from-bee-yellow to-bee-orange rounded-full flex items-center justify-center mx-auto mb-3">
                  <Star className="w-6 h-6 sm:w-8 sm:h-8 text-bee-white" />
                </div>
                <h4 className="font-semibold text-bee-black mb-1 text-sm sm:text-base">{stats.memberOfMonth}</h4>
                <p className="text-xs sm:text-sm text-bee-grayMuted">Congratulations on your dedication!</p>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-bee-white rounded-2xl shadow-sm border border-bee-border p-4 sm:p-6">
              <h3 className="text-base sm:text-lg font-semibold text-bee-black mb-4">Quick Actions</h3>
              <div className="space-y-3">
                <button className="w-full flex items-center justify-between p-3 text-left bg-bee-yellow/10 hover:bg-bee-yellow/20 rounded-lg transition-colors">
                  <div className="flex items-center">
                    <Calendar className="w-5 h-5 mr-3 text-bee-yellow" />
                    <span className="font-medium text-bee-black">Book a Class</span>
                  </div>
                  <ChevronRight className="w-4 h-4 text-bee-grayMuted" />
                </button>
                <button className="w-full flex items-center justify-between p-3 text-left bg-bee-orange/10 hover:bg-bee-orange/20 rounded-lg transition-colors">
                  <div className="flex items-center">
                    <Target className="w-5 h-5 mr-3 text-bee-orange" />
                    <span className="font-medium text-bee-black">View Progress</span>
                  </div>
                  <ChevronRight className="w-4 h-4 text-bee-grayMuted" />
                </button>
                <button className="w-full flex items-center justify-between p-3 text-left bg-bee-yellow/10 hover:bg-bee-yellow/20 rounded-lg transition-colors">
                  <div className="flex items-center">
                    <Award className="w-5 h-5 mr-3 text-bee-yellow" />
                    <span className="font-medium text-bee-black">See Awards</span>
                  </div>
                  <ChevronRight className="w-4 h-4 text-bee-grayMuted" />
                </button>
              </div>
            </div>

            {/* Recent Activity */}
            <div className="bg-bee-white rounded-2xl shadow-sm border border-bee-border p-4 sm:p-6">
              <h3 className="text-base sm:text-lg font-semibold text-bee-black mb-4">Recent Activity</h3>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-bee-orange rounded-full mt-2"></div>
                  <div>
                    <p className="text-sm font-medium text-bee-black">Class booked</p>
                    <p className="text-xs text-bee-grayMuted">Karate Advanced - Tomorrow 6:00 PM</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-bee-yellow rounded-full mt-2"></div>
                  <div>
                    <p className="text-sm font-medium text-bee-black">Achievement unlocked</p>
                    <p className="text-xs text-bee-grayMuted">5-day attendance streak</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-bee-yellow rounded-full mt-2"></div>
                  <div>
                    <p className="text-sm font-medium text-bee-black">Class completed</p>
                    <p className="text-xs text-bee-grayMuted">Judo Basics - 2 hours ago</p>
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