import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Calendar, Clock, TrendingUp, Award, CheckCircle, XCircle } from 'lucide-react';
import { format } from 'date-fns';
import axios from 'axios';

interface Booking {
  id: string;
  status: 'booked' | 'attended' | 'canceled';
  class: {
    id: string;
    name: string;
    date: string;
    time: string;
  };
}

interface UserStats {
  totalBookings: number;
  attendedClasses: number;
  currentStreak: number;
  attendanceRate: number;
}

const Profile: React.FC = () => {
  const { user } = useAuth();
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [stats, setStats] = useState<UserStats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      fetchUserData();
    }
  }, [user]);

  const fetchUserData = async () => {
    try {
      setLoading(true);
      const [bookingsResponse, statsResponse] = await Promise.all([
        axios.get(`/api/bookings/user/${user!.id}`),
        axios.get(`/api/bookings/stats/${user!.id}`)
      ]);
      
      setBookings(bookingsResponse.data);
      setStats(statsResponse.data);
    } catch (error) {
      console.error('Error fetching user data:', error);
    } finally {
      setLoading(false);
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'attended':
        return <CheckCircle className="w-4 h-4 text-green-600" />;
      case 'booked':
        return <Clock className="w-4 h-4 text-blue-600" />;
      case 'canceled':
        return <XCircle className="w-4 h-4 text-red-600" />;
      default:
        return null;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'attended':
        return 'text-green-600 bg-green-50';
      case 'booked':
        return 'text-blue-600 bg-blue-50';
      case 'canceled':
        return 'text-red-600 bg-red-50';
      default:
        return 'text-gray-600 bg-gray-50';
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
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center space-x-4">
        <div className="w-16 h-16 bg-primary-600 rounded-full flex items-center justify-center">
          <span className="text-white font-bold text-xl">{user?.name.charAt(0)}</span>
        </div>
        <div>
          <h1 className="text-3xl font-bold text-gray-900">{user?.name}</h1>
          <p className="text-gray-600">{user?.email}</p>
        </div>
      </div>

      {/* Stats Cards */}
      {stats && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="card">
            <div className="flex items-center">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Calendar className="w-6 h-6 text-blue-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Bookings</p>
                <p className="text-2xl font-bold text-gray-900">{stats.totalBookings}</p>
              </div>
            </div>
          </div>

          <div className="card">
            <div className="flex items-center">
              <div className="p-2 bg-green-100 rounded-lg">
                <CheckCircle className="w-6 h-6 text-green-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Classes Attended</p>
                <p className="text-2xl font-bold text-gray-900">{stats.attendedClasses}</p>
              </div>
            </div>
          </div>

          <div className="card">
            <div className="flex items-center">
                          <div className="p-2 bg-blue-100 rounded-lg">
              <TrendingUp className="w-6 h-6 text-blue-600" />
            </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Current Streak</p>
                <p className="text-2xl font-bold text-gray-900">{stats.currentStreak}</p>
              </div>
            </div>
          </div>

          <div className="card">
            <div className="flex items-center">
              <div className="p-2 bg-yellow-100 rounded-lg">
                <Award className="w-6 h-6 text-yellow-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Attendance Rate</p>
                <p className="text-2xl font-bold text-gray-900">{stats.attendanceRate}%</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Motivational Messages */}
      {stats && (
        <div className="card bg-gradient-to-r from-primary-50 to-blue-50 border-primary-200">
          <div className="flex items-center">
            <Award className="w-8 h-8 text-primary-600 mr-4" />
            <div>
              <h3 className="text-lg font-semibold text-primary-900">
                {stats.currentStreak > 0 
                  ? `Amazing! You're on a ${stats.currentStreak}-class streak! 🔥`
                  : stats.attendedClasses > 0
                  ? `Great job! You've attended ${stats.attendedClasses} classes! 💪`
                  : "Ready to start your martial arts journey? Book your first class! 🥋"
                }
              </h3>
              <p className="text-primary-700 mt-1">
                Keep up the great work and stay consistent with your training!
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Recent Bookings */}
      <div className="card">
        <h2 className="text-xl font-semibold text-gray-900 mb-6">Recent Bookings</h2>
        
        {bookings.length === 0 ? (
          <div className="text-center py-8">
            <Calendar className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No Bookings Yet</h3>
            <p className="text-gray-600">Start by booking your first martial arts class!</p>
          </div>
        ) : (
          <div className="space-y-4">
            {bookings.slice(0, 10).map((booking) => (
              <div key={booking.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                <div className="flex items-center space-x-4">
                  {getStatusIcon(booking.status)}
                  <div>
                    <h4 className="font-medium text-gray-900">{booking.class.name}</h4>
                    <p className="text-sm text-gray-600">
                      {format(new Date(booking.class.date), 'EEEE, MMMM d, yyyy')} at {booking.class.time}
                    </p>
                  </div>
                </div>
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(booking.status)}`}>
                  {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile; 