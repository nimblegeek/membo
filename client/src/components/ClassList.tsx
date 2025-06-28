import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Calendar, Clock, Users, BookOpen, CheckCircle, XCircle } from 'lucide-react';
import { format } from 'date-fns';
import axios from 'axios';

interface Class {
  id: string;
  name: string;
  date: string;
  time: string;
  maxSlots: number;
  bookings?: Booking[];
}

interface Booking {
  id: string;
  userId: string;
  classId: string;
  status: 'booked' | 'attended' | 'canceled';
}

const ClassList: React.FC = () => {
  const { user } = useAuth();
  const [classes, setClasses] = useState<Class[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [bookingStatus, setBookingStatus] = useState<Record<string, string>>({});

  useEffect(() => {
    fetchClasses();
  }, []);

  const fetchClasses = async () => {
    try {
      setLoading(true);
      const response = await axios.get('/api/classes');
      setClasses(response.data);
    } catch (err) {
      setError('Failed to fetch classes');
      console.error('Error fetching classes:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleBooking = async (classId: string) => {
    if (!user) return;

    try {
      setBookingStatus(prev => ({ ...prev, [classId]: 'booking' }));
      
      await axios.post('/api/bookings', {
        userId: user.id,
        classId
      });

      setBookingStatus(prev => ({ ...prev, [classId]: 'success' }));
      
      // Refresh classes to update booking counts
      setTimeout(() => {
        fetchClasses();
        setBookingStatus(prev => ({ ...prev, [classId]: '' }));
      }, 2000);
    } catch (err: any) {
      setBookingStatus(prev => ({ ...prev, [classId]: 'error' }));
      console.error('Booking error:', err);
      
      setTimeout(() => {
        setBookingStatus(prev => ({ ...prev, [classId]: '' }));
      }, 3000);
    }
  };

  const getBookedSlots = (classData: Class) => {
    if (!classData.bookings) return 0;
    return classData.bookings.filter(booking => booking.status !== 'canceled').length;
  };

  const isUserBooked = (classData: Class) => {
    if (!user || !classData.bookings) return false;
    return classData.bookings.some(
      booking => booking.userId === user.id && booking.status !== 'canceled'
    );
  };

  const isClassFull = (classData: Class) => {
    return getBookedSlots(classData) >= classData.maxSlots;
  };

  const getStatusColor = (classData: Class) => {
    if (isClassFull(classData)) return 'text-red-600';
    if (getBookedSlots(classData) > classData.maxSlots * 0.8) return 'text-yellow-600';
    return 'text-green-600';
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-8">
        <XCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
        <h3 className="text-lg font-medium text-gray-900 mb-2">Error Loading Classes</h3>
        <p className="text-gray-600 mb-4">{error}</p>
        <button
          onClick={fetchClasses}
          className="btn btn-primary"
        >
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-900">Martial Arts Classes</h1>
        <div className="text-sm text-gray-500">
          {classes.length} classes available
        </div>
      </div>

      {classes.length === 0 ? (
        <div className="text-center py-12">
          <Calendar className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No Classes Available</h3>
          <p className="text-gray-600">Check back later for upcoming classes.</p>
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {classes.map((classData) => {
            const bookedSlots = getBookedSlots(classData);
            const isBooked = isUserBooked(classData);
            const isFull = isClassFull(classData);
            const status = bookingStatus[classData.id];

            return (
              <div key={classData.id} className="card hover:shadow-md transition-shadow">
                <div className="flex items-start justify-between mb-4">
                  <h3 className="text-lg font-semibold text-gray-900">{classData.name}</h3>
                  <span className={`text-sm font-medium ${getStatusColor(classData)}`}>
                    {bookedSlots}/{classData.maxSlots} slots
                  </span>
                </div>

                <div className="space-y-3 mb-6">
                  <div className="flex items-center text-gray-600">
                    <Calendar className="w-4 h-4 mr-2" />
                    <span>{format(new Date(classData.date), 'EEEE, MMMM d, yyyy')}</span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <Clock className="w-4 h-4 mr-2" />
                    <span>{classData.time}</span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <Users className="w-4 h-4 mr-2" />
                    <span>{bookedSlots} booked</span>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  {isBooked ? (
                    <div className="flex items-center text-green-600">
                      <CheckCircle className="w-4 h-4 mr-2" />
                      <span className="text-sm font-medium">Booked</span>
                    </div>
                  ) : (
                    <button
                      onClick={() => handleBooking(classData.id)}
                      disabled={isFull || status === 'booking'}
                      className={`btn btn-primary flex items-center ${
                        isFull || status === 'booking' ? 'opacity-50 cursor-not-allowed' : ''
                      }`}
                    >
                      {status === 'booking' ? (
                        <>
                          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                          Booking...
                        </>
                      ) : status === 'success' ? (
                        <>
                          <CheckCircle className="w-4 h-4 mr-2" />
                          Booked!
                        </>
                      ) : status === 'error' ? (
                        <>
                          <XCircle className="w-4 h-4 mr-2" />
                          Error
                        </>
                      ) : isFull ? (
                        <>
                          <XCircle className="w-4 h-4 mr-2" />
                          Full
                        </>
                      ) : (
                        <>
                          <BookOpen className="w-4 h-4 mr-2" />
                          Book Class
                        </>
                      )}
                    </button>
                  )}

                  {isFull && !isBooked && (
                    <span className="text-sm text-red-600 font-medium">Class Full</span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default ClassList; 