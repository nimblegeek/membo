import React, { useState, useEffect } from 'react';
import { Trophy, Star, Users, Calendar } from 'lucide-react';
import { format } from 'date-fns';
import axios from 'axios';

interface Award {
  id: string;
  userId: string;
  month: string;
  title: string;
  user: {
    id: string;
    name: string;
    email: string;
  };
}

const Awards: React.FC = () => {
  const [currentAward, setCurrentAward] = useState<Award | null>(null);
  const [allAwards, setAllAwards] = useState<Award[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAwards();
  }, []);

  const fetchAwards = async () => {
    try {
      setLoading(true);
      const [currentResponse, allResponse] = await Promise.all([
        axios.get('/api/awards/current'),
        axios.get('/api/awards')
      ]);
      
      setCurrentAward(currentResponse.data);
      setAllAwards(allResponse.data);
    } catch (error) {
      console.error('Error fetching awards:', error);
    } finally {
      setLoading(false);
    }
  };

  const getMonthName = (monthString: string) => {
    const [year, month] = monthString.split('-');
    const date = new Date(parseInt(year), parseInt(month) - 1);
    return format(date, 'MMMM yyyy');
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
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Awards & Recognition</h1>
        <p className="text-gray-600">Celebrating excellence in martial arts training</p>
      </div>

      {/* Current Member of the Month */}
      {currentAward ? (
        <div className="card bg-gradient-to-r from-yellow-50 to-orange-50 border-yellow-200">
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-yellow-100 rounded-full mb-6">
              <Trophy className="w-10 h-10 text-yellow-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              Member of the Month
            </h2>
            <p className="text-lg text-gray-600 mb-4">
              {getMonthName(currentAward.month)}
            </p>
            <div className="bg-white rounded-lg p-6 shadow-sm">
              <div className="w-16 h-16 bg-primary-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white font-bold text-xl">
                  {currentAward.user.name.charAt(0)}
                </span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                {currentAward.user.name}
              </h3>
              <p className="text-gray-600 mb-4">
                Outstanding dedication and consistent attendance
              </p>
              <div className="flex items-center justify-center space-x-4 text-sm text-gray-500">
                <div className="flex items-center">
                  <Star className="w-4 h-4 text-yellow-500 mr-1" />
                  <span>Excellence</span>
                </div>
                <div className="flex items-center">
                  <Users className="w-4 h-4 text-blue-500 mr-1" />
                  <span>Leadership</span>
                </div>
                <div className="flex items-center">
                  <Calendar className="w-4 h-4 text-green-500 mr-1" />
                  <span>Consistency</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="card text-center">
          <Trophy className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No Current Award</h3>
          <p className="text-gray-600">
            Member of the Month will be announced soon. Keep training hard!
          </p>
        </div>
      )}

      {/* Motivational Section */}
      <div className="card bg-gradient-to-r from-primary-50 to-blue-50 border-primary-200">
        <div className="text-center">
          <h3 className="text-xl font-semibold text-primary-900 mb-4">
            🏆 How to Become Member of the Month
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                <Calendar className="w-6 h-6 text-primary-600" />
              </div>
              <h4 className="font-medium text-primary-900 mb-2">Consistent Attendance</h4>
              <p className="text-sm text-primary-700">
                Attend classes regularly and maintain a good attendance record
              </p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                <Users className="w-6 h-6 text-primary-600" />
              </div>
              <h4 className="font-medium text-primary-900 mb-2">Positive Attitude</h4>
              <p className="text-sm text-primary-700">
                Show enthusiasm, help others, and contribute to the gym culture
              </p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                <Trophy className="w-6 h-6 text-primary-600" />
              </div>
              <h4 className="font-medium text-primary-900 mb-2">Excellence</h4>
              <p className="text-sm text-primary-700">
                Demonstrate dedication to improvement and martial arts values
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Previous Awards */}
      <div className="card">
        <h2 className="text-xl font-semibold text-gray-900 mb-6">Previous Winners</h2>
        
        {allAwards.length === 0 ? (
          <div className="text-center py-8">
            <Trophy className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No Previous Awards</h3>
            <p className="text-gray-600">Be the first to earn this recognition!</p>
          </div>
        ) : (
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {allAwards.map((award) => (
              <div key={award.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                <div className="flex items-center space-x-3 mb-3">
                  <div className="w-10 h-10 bg-yellow-100 rounded-full flex items-center justify-center">
                    <Trophy className="w-5 h-5 text-yellow-600" />
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900">{award.title}</h4>
                    <p className="text-sm text-gray-600">{getMonthName(award.month)}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 bg-primary-600 rounded-full flex items-center justify-center">
                    <span className="text-white font-bold text-sm">
                      {award.user.name.charAt(0)}
                    </span>
                  </div>
                  <span className="text-sm font-medium text-gray-900">{award.user.name}</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Awards; 