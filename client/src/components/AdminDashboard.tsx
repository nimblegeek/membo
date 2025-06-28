import React, { useState, useEffect } from 'react';
import { 
  Users, Calendar, TrendingUp, Settings, Plus, Edit, Trash2, 
  CheckCircle, XCircle, Clock, BarChart3 
} from 'lucide-react';
import axios from 'axios';

interface DashboardStats {
  totalMembers: number;
  totalClasses: number;
  totalBookings: number;
  totalAttended: number;
  attendanceRate: number;
}

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  stats: {
    totalBookings: number;
    attendedClasses: number;
    attendanceRate: number;
  };
}

interface Class {
  id: string;
  name: string;
  date: string;
  time: string;
  maxSlots: number;
}

const AdminDashboard: React.FC = () => {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [users, setUsers] = useState<User[]>([]);
  const [classes, setClasses] = useState<Class[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('overview');

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      const [statsResponse, usersResponse, classesResponse] = await Promise.all([
        axios.get('/api/admin/dashboard'),
        axios.get('/api/admin/users'),
        axios.get('/api/classes')
      ]);
      
      setStats(statsResponse.data.stats);
      setUsers(usersResponse.data);
      setClasses(classesResponse.data);
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteUser = async (userId: string) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      try {
        await axios.delete(`/api/admin/users/${userId}`);
        setUsers(users.filter(user => user.id !== userId));
      } catch (error) {
        console.error('Error deleting user:', error);
      }
    }
  };

  const handleDeleteClass = async (classId: string) => {
    if (window.confirm('Are you sure you want to delete this class?')) {
      try {
        await axios.delete(`/api/classes/${classId}`);
        setClasses(classes.filter(cls => cls.id !== classId));
      } catch (error) {
        console.error('Error deleting class:', error);
      }
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
        <div className="flex space-x-2">
          <button className="btn btn-primary flex items-center">
            <Plus className="w-4 h-4 mr-2" />
            Add Class
          </button>
          <button className="btn btn-secondary flex items-center">
            <Users className="w-4 h-4 mr-2" />
            Add User
          </button>
        </div>
      </div>

      {/* Stats Overview */}
      {stats && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
          <div className="card">
            <div className="flex items-center">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Users className="w-6 h-6 text-blue-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Members</p>
                <p className="text-2xl font-bold text-gray-900">{stats.totalMembers}</p>
              </div>
            </div>
          </div>

          <div className="card">
            <div className="flex items-center">
              <div className="p-2 bg-green-100 rounded-lg">
                <Calendar className="w-6 h-6 text-green-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Classes</p>
                <p className="text-2xl font-bold text-gray-900">{stats.totalClasses}</p>
              </div>
            </div>
          </div>

          <div className="card">
            <div className="flex items-center">
              <div className="p-2 bg-purple-100 rounded-lg">
                <BarChart3 className="w-6 h-6 text-purple-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Bookings</p>
                <p className="text-2xl font-bold text-gray-900">{stats.totalBookings}</p>
              </div>
            </div>
          </div>

          <div className="card">
            <div className="flex items-center">
              <div className="p-2 bg-yellow-100 rounded-lg">
                <CheckCircle className="w-6 h-6 text-yellow-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Attended</p>
                <p className="text-2xl font-bold text-gray-900">{stats.totalAttended}</p>
              </div>
            </div>
          </div>

          <div className="card">
            <div className="flex items-center">
              <div className="p-2 bg-red-100 rounded-lg">
                <TrendingUp className="w-6 h-6 text-red-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Attendance Rate</p>
                <p className="text-2xl font-bold text-gray-900">{stats.attendanceRate}%</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tabs */}
      <div className="border-b border-gray-200">
        <nav className="-mb-px flex space-x-8">
          {[
            { id: 'overview', name: 'Overview', icon: BarChart3 },
            { id: 'users', name: 'Users', icon: Users },
            { id: 'classes', name: 'Classes', icon: Calendar },
            { id: 'settings', name: 'Settings', icon: Settings }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`py-2 px-1 border-b-2 font-medium text-sm flex items-center ${
                activeTab === tab.id
                  ? 'border-primary-500 text-primary-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              <tab.icon className="w-4 h-4 mr-2" />
              {tab.name}
            </button>
          ))}
        </nav>
      </div>

      {/* Tab Content */}
      <div className="mt-6">
        {activeTab === 'overview' && (
          <div className="grid gap-6 md:grid-cols-2">
            <div className="card">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <CheckCircle className="w-5 h-5 text-green-600" />
                    <div>
                      <p className="font-medium text-gray-900">New class booking</p>
                      <p className="text-sm text-gray-600">John Doe booked Karate Class</p>
                    </div>
                  </div>
                  <span className="text-sm text-gray-500">2 min ago</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <Users className="w-5 h-5 text-blue-600" />
                    <div>
                      <p className="font-medium text-gray-900">New member joined</p>
                      <p className="text-sm text-gray-600">Jane Smith registered</p>
                    </div>
                  </div>
                  <span className="text-sm text-gray-500">1 hour ago</span>
                </div>
              </div>
            </div>

            <div className="card">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
              <div className="space-y-3">
                <button className="w-full btn btn-primary flex items-center justify-center">
                  <Plus className="w-4 h-4 mr-2" />
                  Create New Class
                </button>
                <button className="w-full btn btn-secondary flex items-center justify-center">
                  <Users className="w-4 h-4 mr-2" />
                  Add New Member
                </button>
                <button className="w-full btn btn-secondary flex items-center justify-center">
                  <Settings className="w-4 h-4 mr-2" />
                  System Settings
                </button>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'users' && (
          <div className="card">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-gray-900">Members</h3>
              <button className="btn btn-primary flex items-center">
                <Plus className="w-4 h-4 mr-2" />
                Add Member
              </button>
            </div>
            
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Member
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Role
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Attendance
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {users.map((user) => (
                    <tr key={user.id}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="w-8 h-8 bg-primary-600 rounded-full flex items-center justify-center">
                            <span className="text-white font-bold text-sm">
                              {user.name.charAt(0)}
                            </span>
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">{user.name}</div>
                            <div className="text-sm text-gray-500">{user.email}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          user.role === 'admin' 
                            ? 'bg-red-100 text-red-800' 
                            : 'bg-green-100 text-green-800'
                        }`}>
                          {user.role}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {user.stats.attendedClasses}/{user.stats.totalBookings} ({user.stats.attendanceRate}%)
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <button className="text-primary-600 hover:text-primary-900 mr-3">
                          <Edit className="w-4 h-4" />
                        </button>
                        <button 
                          onClick={() => handleDeleteUser(user.id)}
                          className="text-red-600 hover:text-red-900"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === 'classes' && (
          <div className="card">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-gray-900">Classes</h3>
              <button className="btn btn-primary flex items-center">
                <Plus className="w-4 h-4 mr-2" />
                Add Class
              </button>
            </div>
            
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {classes.map((classData) => (
                <div key={classData.id} className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-start justify-between mb-3">
                    <h4 className="font-medium text-gray-900">{classData.name}</h4>
                    <div className="flex space-x-1">
                      <button className="text-primary-600 hover:text-primary-900">
                        <Edit className="w-4 h-4" />
                      </button>
                      <button 
                        onClick={() => handleDeleteClass(classData.id)}
                        className="text-red-600 hover:text-red-900"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                  <div className="space-y-2 text-sm text-gray-600">
                    <div className="flex items-center">
                      <Calendar className="w-4 h-4 mr-2" />
                      <span>{new Date(classData.date).toLocaleDateString()}</span>
                    </div>
                    <div className="flex items-center">
                      <Clock className="w-4 h-4 mr-2" />
                      <span>{classData.time}</span>
                    </div>
                    <div className="flex items-center">
                      <Users className="w-4 h-4 mr-2" />
                      <span>Max: {classData.maxSlots}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'settings' && (
          <div className="card">
            <h3 className="text-lg font-semibold text-gray-900 mb-6">System Settings</h3>
            <div className="space-y-6">
              <div>
                <h4 className="text-md font-medium text-gray-900 mb-3">API Configuration</h4>
                <p className="text-gray-600 mb-4">
                  Configure integration with external booking systems like Zoezi.
                </p>
                <button className="btn btn-secondary">
                  Configure API Settings
                </button>
              </div>
              
              <div>
                <h4 className="text-md font-medium text-gray-900 mb-3">System Mode</h4>
                <p className="text-gray-600 mb-4">
                  Switch between standalone and integrated modes.
                </p>
                <div className="flex space-x-3">
                  <button className="btn btn-primary">Standalone Mode</button>
                  <button className="btn btn-secondary">Integrated Mode</button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard; 