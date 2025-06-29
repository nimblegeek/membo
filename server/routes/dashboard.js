const express = require('express');
const { PrismaClient } = require('@prisma/client');

const router = express.Router();
const prisma = new PrismaClient();

// Get dashboard stats
router.get('/stats', async (req, res) => {
  try {
    // Get total members
    const totalMembers = await prisma.user.count({
      where: { role: 'member' }
    });

    // Get active members (members with recent activity)
    const activeMembers = await prisma.user.count({
      where: {
        role: 'member',
        bookings: {
          some: {
            createdAt: {
              gte: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000) // Last 30 days
            }
          }
        }
      }
    });

    // Get total classes
    const totalClasses = await prisma.class.count();

    // Calculate average attendance
    const bookings = await prisma.booking.findMany({
      where: { status: 'attended' }
    });
    const averageAttendance = bookings.length > 0 ? Math.round((bookings.length / totalClasses) * 100) : 0;

    // Get current member of the month
    const currentAward = await prisma.award.findFirst({
      where: {
        month: new Date().toISOString().slice(0, 7) // Current month in YYYY-MM format
      },
      include: {
        user: true
      },
      orderBy: {
        createdAt: 'desc'
      }
    });

    const memberOfMonth = currentAward ? currentAward.user.name : 'Not selected yet';

    // Get recent signups (last 7 days)
    const recentSignups = await prisma.user.count({
      where: {
        role: 'member',
        createdAt: {
          gte: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000) // Last 7 days
        }
      }
    });

    res.json({
      totalMembers,
      activeMembers,
      totalClasses,
      averageAttendance,
      memberOfMonth,
      recentSignups
    });
  } catch (error) {
    console.error('Error fetching dashboard stats:', error);
    res.status(500).json({ error: 'Failed to fetch dashboard stats' });
  }
});

// Get user-specific dashboard data
router.get('/user/:userId', async (req, res) => {
  try {
    const { userId } = req.params;

    const user = await prisma.user.findUnique({
      where: { id: userId },
      include: {
        bookings: {
          include: {
            class: true
          },
          orderBy: {
            createdAt: 'desc'
          },
          take: 10
        }
      }
    });

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Calculate user stats
    const totalBookings = user.bookings.length;
    const attendedBookings = user.bookings.filter(b => b.status === 'attended').length;
    const attendanceRate = totalBookings > 0 ? Math.round((attendedBookings / totalBookings) * 100) : 0;

    // Calculate current streak
    let currentStreak = 0;
    const sortedBookings = user.bookings
      .filter(b => b.status === 'attended')
      .sort((a, b) => new Date(b.class.date).getTime() - new Date(a.class.date).getTime());

    if (sortedBookings.length > 0) {
      let lastDate = new Date(sortedBookings[0].class.date);
      currentStreak = 1;

      for (let i = 1; i < sortedBookings.length; i++) {
        const currentDate = new Date(sortedBookings[i].class.date);
        const dayDiff = Math.floor((lastDate - currentDate) / (1000 * 60 * 60 * 24));
        
        if (dayDiff === 1) {
          currentStreak++;
          lastDate = currentDate;
        } else {
          break;
        }
      }
    }

    res.json({
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role
      },
      stats: {
        totalBookings,
        attendedBookings,
        attendanceRate,
        currentStreak
      },
      recentBookings: user.bookings.slice(0, 5)
    });
  } catch (error) {
    console.error('Error fetching user dashboard:', error);
    res.status(500).json({ error: 'Failed to fetch user dashboard' });
  }
});

module.exports = router; 