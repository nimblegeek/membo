import React, { useState, useEffect } from 'react';
import { 
  Award, Star, Trophy, Medal, 
  Calendar, Users, TrendingUp, Zap 
} from 'lucide-react';

interface AwardData {
  id: string;
  title: string;
  description: string;
  recipient: string;
  date: string;
  type: 'member-of-month' | 'achievement' | 'milestone';
  icon: React.ReactNode;
}

const Awards: React.FC = () => {
  const [awards, setAwards] = useState<AwardData[]>([]);
  const [currentMember, setCurrentMember] = useState<string>('');

  useEffect(() => {
    // Fetch awards data from API
    const fetchAwards = async () => {
      try {
        const response = await fetch('http://localhost:5001/api/awards');
        if (response.ok) {
          const data = await response.json();
          setAwards(data);
        }
      } catch (error) {
        console.error('Error fetching awards:', error);
        // Set mock data for development
        setAwards([
          {
            id: '1',
            title: 'Member of the Month',
            description: 'Outstanding dedication and progress in martial arts training',
            recipient: 'Sarah Johnson',
            date: 'December 2024',
            type: 'member-of-month',
            icon: <Star className="w-6 h-6 text-yellow-500" />
          },
          {
            id: '2',
            title: '30-Day Attendance Streak',
            description: 'Consistent training commitment and discipline',
            recipient: 'Mike Chen',
            date: 'November 2024',
            type: 'milestone',
            icon: <TrendingUp className="w-6 h-6 text-green-500" />
          },
          {
            id: '3',
            title: 'Belt Promotion - Blue Belt',
            description: 'Achieved blue belt level through dedicated practice',
            recipient: 'Alex Rodriguez',
            date: 'October 2024',
            type: 'achievement',
            icon: <Medal className="w-6 h-6 text-blue-500" />
          }
        ]);
        setCurrentMember('Sarah Johnson');
      }
    };

    fetchAwards();
  }, []);

  const getAwardColor = (type: string) => {
    switch (type) {
      case 'member-of-month':
        return 'bg-gradient-to-r from-bee-yellow to-bee-orange';
      case 'achievement':
        return 'bg-bee-yellow';
      case 'milestone':
        return 'bg-bee-orange';
      default:
        return 'bg-bee-yellow';
    }
  };

  return (
    <div className="min-h-screen bg-bee-gray">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center space-x-3 mb-4">
            <div className="w-12 h-12 bg-bee-yellow rounded-xl flex items-center justify-center shadow-lg">
              <Award className="w-6 h-6 text-bee-black" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-bee-black">
                Awards & Recognition
              </h1>
              <p className="text-bee-grayMuted">
                Celebrating excellence and achievement in our martial arts community
              </p>
            </div>
          </div>
        </div>

        {/* Current Member of the Month */}
        {currentMember && (
          <div className="bg-bee-white rounded-xl shadow-sm border border-bee-border p-8 mb-8">
            <div className="text-center">
              <div className="w-24 h-24 bg-gradient-to-r from-bee-yellow to-bee-orange rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
                <Trophy className="w-12 h-12 text-bee-black" />
              </div>
              <h2 className="text-2xl font-bold text-bee-black mb-2">
                Current Member of the Month
              </h2>
              <h3 className="text-xl font-semibold text-bee-black mb-4">
                {currentMember}
              </h3>
              <p className="text-bee-grayMuted max-w-2xl mx-auto">
                Congratulations to {currentMember} for demonstrating exceptional dedication, 
                leadership, and progress in their martial arts journey. Your commitment 
                inspires us all!
              </p>
            </div>
          </div>
        )}

        {/* Awards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {awards.map((award) => (
            <div key={award.id} className="bg-bee-white rounded-xl shadow-sm border border-bee-border hover:shadow-md transition-shadow">
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className={`w-12 h-12 ${getAwardColor(award.type)} rounded-xl flex items-center justify-center`}>
                    {award.icon}
                  </div>
                  <span className="text-sm text-bee-grayMuted">{award.date}</span>
                </div>
                <h3 className="text-lg font-semibold text-bee-black mb-2">
                  {award.title}
                </h3>
                <p className="text-bee-grayMuted mb-4 leading-relaxed">
                  {award.description}
                </p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <div className="w-8 h-8 bg-bee-yellow rounded-full flex items-center justify-center">
                      <span className="text-bee-black font-bold text-sm">
                        {award.recipient.split(' ').map(n => n[0]).join('')}
                      </span>
                    </div>
                    <span className="font-medium text-bee-black">{award.recipient}</span>
                  </div>
                  <Award className="w-5 h-5 text-bee-grayMuted" />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Achievement Stats */}
        <div className="mt-12 bg-bee-white rounded-xl shadow-sm border border-bee-border p-8">
          <h2 className="text-2xl font-bold text-bee-black mb-6 text-center">
            Club Achievement Statistics
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="w-16 h-16 bg-bee-yellow rounded-full flex items-center justify-center mx-auto mb-4">
                <Trophy className="w-8 h-8 text-bee-black" />
              </div>
              <div className="text-3xl font-bold text-bee-black mb-2">12</div>
              <div className="text-bee-grayMuted">Members of the Month</div>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-bee-orange rounded-full flex items-center justify-center mx-auto mb-4">
                <TrendingUp className="w-8 h-8 text-bee-black" />
              </div>
              <div className="text-3xl font-bold text-bee-black mb-2">45</div>
              <div className="text-bee-grayMuted">Achievement Awards</div>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-bee-yellow rounded-full flex items-center justify-center mx-auto mb-4">
                <Medal className="w-8 h-8 text-bee-black" />
              </div>
              <div className="text-3xl font-bold text-bee-black mb-2">28</div>
              <div className="text-bee-grayMuted">Belt Promotions</div>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-bee-orange rounded-full flex items-center justify-center mx-auto mb-4">
                <Zap className="w-8 h-8 text-bee-black" />
              </div>
              <div className="text-3xl font-bold text-bee-black mb-2">156</div>
              <div className="text-bee-grayMuted">Milestone Reached</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Awards; 