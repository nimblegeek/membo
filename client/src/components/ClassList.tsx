import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Calendar, Clock, Users, BookOpen, CheckCircle, XCircle, ChevronLeft, ChevronRight, MapPin, Star } from 'lucide-react';
import { format, addDays, startOfWeek, isSameDay, parseISO } from 'date-fns';
import axios from 'axios';

interface Class {
  id: string;
  name: string;
  date: string;
  time: string;
  maxSlots: number;
  bookings?: Booking[];
  instructor?: string;
  level?: string;
  description?: string;
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
  const [currentWeek, setCurrentWeek] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  // Sample class data for demonstration
  const sampleClasses: Class[] = [
    {
      id: '1',
      name: 'Morning Kickboxing',
      date: format(addDays(startOfWeek(new Date()), 0), 'yyyy-MM-dd'),
      time: '07:00',
      maxSlots: 15,
      instructor: 'Sensei Mike',
      level: 'All Levels',
      description: 'High-energy kickboxing workout to start your day'
    },
    {
      id: '2',
      name: 'Brazilian Jiu-Jitsu',
      date: format(addDays(startOfWeek(new Date()), 0), 'yyyy-MM-dd'),
      time: '18:00',
      maxSlots: 12,
      instructor: 'Professor Silva',
      level: 'Intermediate',
      description: 'Ground fighting techniques and submissions'
    },
    {
      id: '3',
      name: 'Muay Thai Basics',
      date: format(addDays(startOfWeek(new Date()), 1), 'yyyy-MM-dd'),
      time: '17:30',
      maxSlots: 18,
      instructor: 'Kru David',
      level: 'Beginner',
      description: 'Learn the art of eight limbs'
    },
    {
      id: '4',
      name: 'Advanced Karate',
      date: format(addDays(startOfWeek(new Date()), 1), 'yyyy-MM-dd'),
      time: '19:00',
      maxSlots: 10,
      instructor: 'Sensei Sarah',
      level: 'Advanced',
      description: 'Advanced kata and sparring techniques'
    },
    {
      id: '5',
      name: 'Kids Martial Arts',
      date: format(addDays(startOfWeek(new Date()), 2), 'yyyy-MM-dd'),
      time: '16:00',
      maxSlots: 20,
      instructor: 'Coach Emma',
      level: 'Kids (6-12)',
      description: 'Fun and safe martial arts for children'
    },
    {
      id: '6',
      name: 'Evening Kickboxing',
      date: format(addDays(startOfWeek(new Date()), 2), 'yyyy-MM-dd'),
      time: '19:30',
      maxSlots: 16,
      instructor: 'Sensei Mike',
      level: 'All Levels',
      description: 'Evening cardio kickboxing session'
    },
    {
      id: '7',
      name: 'Self-Defense Workshop',
      date: format(addDays(startOfWeek(new Date()), 3), 'yyyy-MM-dd'),
      time: '18:00',
      maxSlots: 25,
      instructor: 'Master Johnson',
      level: 'All Levels',
      description: 'Practical self-defense techniques'
    },
    {
      id: '8',
      name: 'Competition Training',
      date: format(addDays(startOfWeek(new Date()), 4), 'yyyy-MM-dd'),
      time: '17:00',
      maxSlots: 8,
      instructor: 'Coach Martinez',
      level: 'Competition',
      description: 'Intensive training for upcoming competitions'
    },
    {
      id: '9',
      name: 'Weekend Warrior',
      date: format(addDays(startOfWeek(new Date()), 5), 'yyyy-MM-dd'),
      time: '10:00',
      maxSlots: 30,
      instructor: 'Sensei Mike',
      level: 'All Levels',
      description: 'Weekend fitness and martial arts combo'
    },
    {
      id: '10',
      name: 'Meditation & Tai Chi',
      date: format(addDays(startOfWeek(new Date()), 6), 'yyyy-MM-dd'),
      time: '09:00',
      maxSlots: 15,
      instructor: 'Master Chen',
      level: 'All Levels',
      description: 'Peaceful mind-body practice'
    }
  ];

  useEffect(() => {
    // Use sample data for now, but keep the API call structure
    setClasses(sampleClasses);
    setLoading(false);
  }, []);

  const handleBooking = async (classId: string) => {
    if (!user) return;

    try {
      setBookingStatus(prev => ({ ...prev, [classId]: 'booking' }));
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));

      setBookingStatus(prev => ({ ...prev, [classId]: 'success' }));
      
      setTimeout(() => {
        setBookingStatus(prev => ({ ...prev, [classId]: '' }));
      }, 2000);
    } catch (err: any) {
      setBookingStatus(prev => ({ ...prev, [classId]: 'error' }));
      
      setTimeout(() => {
        setBookingStatus(prev => ({ ...prev, [classId]: '' }));
      }, 3000);
    }
  };

  const getBookedSlots = (classData: Class) => {
    if (!classData.bookings) return Math.floor(Math.random() * classData.maxSlots * 0.8);
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

  const getLevelColor = (level: string) => {
    switch (level.toLowerCase()) {
      case 'beginner': return 'bg-green-100 text-green-800';
      case 'intermediate': return 'bg-yellow-100 text-yellow-800';
      case 'advanced': return 'bg-red-100 text-red-800';
      case 'all levels': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const weekDays = Array.from({ length: 7 }, (_, i) => addDays(startOfWeek(currentWeek), i));

  const getClassesForDate = (date: Date) => {
    return classes.filter(classData => isSameDay(parseISO(classData.date), date));
  };

  const navigateWeek = (direction: 'prev' | 'next') => {
    setCurrentWeek(prev => addDays(prev, direction === 'next' ? 7 : -7));
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
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
          onClick={() => window.location.reload()}
          className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
        >
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Weekly Class Schedule</h1>
        <p className="text-gray-600">Book your favorite martial arts classes for the week</p>
      </div>

      {/* Week Navigation */}
      <div className="flex items-center justify-between mb-6">
        <button
          onClick={() => navigateWeek('prev')}
          className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
        
        <h2 className="text-xl font-semibold text-gray-900">
          {format(startOfWeek(currentWeek), 'MMMM d')} - {format(addDays(startOfWeek(currentWeek), 6), 'MMMM d, yyyy')}
        </h2>
        
        <button
          onClick={() => navigateWeek('next')}
          className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>

      {/* Weekly Calendar View */}
      <div className="grid gap-4 md:grid-cols-7">
        {weekDays.map((day) => {
          const dayClasses = getClassesForDate(day);
          const isToday = isSameDay(day, new Date());
          
          return (
            <div
              key={day.toISOString()}
              className={`bg-white rounded-lg shadow-sm border-2 ${
                isToday ? 'border-blue-500' : 'border-gray-200'
              } p-4 min-h-[200px]`}
            >
              {/* Day Header */}
              <div className="text-center mb-4">
                <div className={`text-sm font-medium ${
                  isToday ? 'text-blue-600' : 'text-gray-500'
                }`}>
                  {format(day, 'EEE')}
                </div>
                <div className={`text-2xl font-bold ${
                  isToday ? 'text-blue-600' : 'text-gray-900'
                }`}>
                  {format(day, 'd')}
                </div>
                {isToday && (
                  <div className="text-xs text-blue-600 font-medium">TODAY</div>
                )}
              </div>

              {/* Classes for this day */}
              <div className="space-y-3">
                {dayClasses.length === 0 ? (
                  <div className="text-center text-gray-400 text-sm py-4">
                    No classes
                  </div>
                ) : (
                  dayClasses.map((classData) => {
                    const bookedSlots = getBookedSlots(classData);
                    const isBooked = isUserBooked(classData);
                    const isFull = isClassFull(classData);
                    const status = bookingStatus[classData.id];

                    return (
                      <div
                        key={classData.id}
                        className="bg-gray-50 rounded-lg p-3 hover:bg-gray-100 transition-colors cursor-pointer"
                        onClick={() => setSelectedDate(day)}
                      >
                        <div className="flex items-start justify-between mb-2">
                          <h4 className="text-sm font-semibold text-gray-900 line-clamp-2">
                            {classData.name}
                          </h4>
                          <span className={`text-xs font-medium ${getStatusColor(classData)}`}>
                            {bookedSlots}/{classData.maxSlots}
                          </span>
                        </div>
                        
                        <div className="flex items-center text-xs text-gray-600 mb-2">
                          <Clock className="w-3 h-3 mr-1" />
                          {classData.time}
                        </div>
                        
                        <div className="flex items-center justify-between">
                          <span className={`text-xs px-2 py-1 rounded-full ${getLevelColor(classData.level || '')}`}>
                            {classData.level}
                          </span>
                          
                          {isBooked ? (
                            <CheckCircle className="w-4 h-4 text-green-600" />
                          ) : isFull ? (
                            <XCircle className="w-4 h-4 text-red-600" />
                          ) : (
                            <BookOpen className="w-4 h-4 text-blue-600" />
                          )}
                        </div>
                      </div>
                    );
                  })
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Selected Day Details Modal */}
      {selectedDate && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-gray-900">
                  Classes for {format(selectedDate, 'EEEE, MMMM d, yyyy')}
                </h3>
                <button
                  onClick={() => setSelectedDate(null)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <XCircle className="w-6 h-6" />
                </button>
              </div>

              <div className="space-y-4">
                {getClassesForDate(selectedDate).map((classData) => {
                  const bookedSlots = getBookedSlots(classData);
                  const isBooked = isUserBooked(classData);
                  const isFull = isClassFull(classData);
                  const status = bookingStatus[classData.id];

                  return (
                    <div key={classData.id} className="border border-gray-200 rounded-lg p-4">
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <h4 className="text-lg font-semibold text-gray-900 mb-1">
                            {classData.name}
                          </h4>
                          <p className="text-sm text-gray-600 mb-2">
                            {classData.description}
                          </p>
                        </div>
                        <span className={`text-sm font-medium ${getStatusColor(classData)}`}>
                          {bookedSlots}/{classData.maxSlots} slots
                        </span>
                      </div>

                      <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
                        <div className="flex items-center text-gray-600">
                          <Clock className="w-4 h-4 mr-2" />
                          <span>{classData.time}</span>
                        </div>
                        <div className="flex items-center text-gray-600">
                          <Users className="w-4 h-4 mr-2" />
                          <span>{classData.instructor}</span>
                        </div>
                        <div className="flex items-center text-gray-600">
                          <MapPin className="w-4 h-4 mr-2" />
                          <span>Main Dojo</span>
                        </div>
                        <div className="flex items-center">
                          <span className={`px-2 py-1 rounded-full text-xs ${getLevelColor(classData.level || '')}`}>
                            {classData.level}
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center justify-between">
                        {isBooked ? (
                          <div className="flex items-center text-green-600">
                            <CheckCircle className="w-5 h-5 mr-2" />
                            <span className="font-medium">You're Booked!</span>
                          </div>
                        ) : (
                          <button
                            onClick={() => handleBooking(classData.id)}
                            disabled={isFull || status === 'booking'}
                            className={`flex items-center px-4 py-2 rounded-lg font-medium transition-colors ${
                              isFull || status === 'booking'
                                ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                                : 'bg-blue-600 text-white hover:bg-blue-700'
                            }`}
                          >
                            {status === 'booking' ? (
                              <>
                                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                                Booking...
                              </>
                            ) : status === 'success' ? (
                              <>
                                <CheckCircle className="w-5 h-5 mr-2" />
                                Booked!
                              </>
                            ) : status === 'error' ? (
                              <>
                                <XCircle className="w-5 h-5 mr-2" />
                                Error
                              </>
                            ) : isFull ? (
                              <>
                                <XCircle className="w-5 h-5 mr-2" />
                                Class Full
                              </>
                            ) : (
                              <>
                                <BookOpen className="w-5 h-5 mr-2" />
                                Book This Class
                              </>
                            )}
                          </button>
                        )}

                        {!isBooked && !isFull && (
                          <div className="flex items-center text-yellow-600">
                            <Star className="w-4 h-4 mr-1" />
                            <span className="text-sm">Popular class</span>
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ClassList; 