const express = require('express');
const { PrismaClient } = require('@prisma/client');

const router = express.Router();
const prisma = new PrismaClient();

// Get admin dashboard stats
router.get('/dashboard', async (req, res) => {
  try {
    const userCount = await prisma.user.count({ where: { role: 'member' } });
    const classCount = await prisma.class.count();
    const bookingCount = await prisma.booking.count();
    const attendedCount = await prisma.booking.count({ where: { status: 'attended' } });
    
    // Get recent bookings
    const recentBookings = await prisma.booking.findMany({
      take: 10,
      include: {
        user: true,
        class: true
      },
      orderBy: {
        createdAt: 'desc'
      }
    });

    // Get top performers this month
    const currentMonth = new Date().toISOString().slice(0, 7);
    const topPerformers = await prisma.user.findMany({
      where: {
        role: 'member'
      },
      include: {
        bookings: {
          where: {
            status: 'attended',
            class: {
              date: {
                gte: new Date(currentMonth + '-01'),
                lt: new Date(new Date(currentMonth + '-01').getTime() + 32 * 24 * 60 * 60 * 1000)
              }
            }
          }
        }
      }
    });

    const performers = topPerformers
      .map(user => ({
        id: user.id,
        name: user.name,
        attendanceCount: user.bookings.length
      }))
      .sort((a, b) => b.attendanceCount - a.attendanceCount)
      .slice(0, 5);

    res.json({
      stats: {
        totalMembers: userCount,
        totalClasses: classCount,
        totalBookings: bookingCount,
        totalAttended: attendedCount,
        attendanceRate: bookingCount > 0 ? (attendedCount / bookingCount * 100).toFixed(1) : 0
      },
      recentBookings,
      topPerformers: performers
    });
  } catch (error) {
    console.error('Get dashboard error:', error);
    res.status(500).json({ error: 'Failed to fetch dashboard data' });
  }
});

// Get all users
router.get('/users', async (req, res) => {
  try {
    const users = await prisma.user.findMany({
      include: {
        bookings: {
          include: {
            class: true
          }
        },
        awards: true
      },
      orderBy: {
        createdAt: 'desc'
      }
    });

    // Add stats to each user
    const usersWithStats = users.map(user => {
      const totalBookings = user.bookings.length;
      const attendedClasses = user.bookings.filter(b => b.status === 'attended').length;
      
      return {
        ...user,
        stats: {
          totalBookings,
          attendedClasses,
          attendanceRate: totalBookings > 0 ? (attendedClasses / totalBookings * 100).toFixed(1) : 0
        }
      };
    });

    res.json(usersWithStats);
  } catch (error) {
    console.error('Get users error:', error);
    res.status(500).json({ error: 'Failed to fetch users' });
  }
});

// Create a new user
router.post('/users', async (req, res) => {
  try {
    const { name, email, phone, role, beltLevel, status } = req.body;

    if (!name || !email || !role) {
      return res.status(400).json({ error: 'Name, email, and role are required' });
    }

    if (!['member', 'admin'].includes(role)) {
      return res.status(400).json({ error: 'Role must be "member" or "admin"' });
    }

    // Check if email already exists
    const existingUser = await prisma.user.findUnique({
      where: { email }
    });

    if (existingUser) {
      return res.status(400).json({ error: 'Email already exists' });
    }

    const user = await prisma.user.create({
      data: {
        name,
        email,
        phone: phone || null,
        role,
        beltLevel: beltLevel || 'White',
        status: status || 'active'
      }
    });

    res.status(201).json(user);
  } catch (error) {
    console.error('Create user error:', error);
    res.status(500).json({ error: 'Failed to create user' });
  }
});

// Update user
router.put('/users/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email, phone, role, beltLevel, status } = req.body;

    if (!name || !email || !role) {
      return res.status(400).json({ error: 'Name, email, and role are required' });
    }

    if (!['member', 'admin'].includes(role)) {
      return res.status(400).json({ error: 'Role must be "member" or "admin"' });
    }

    // Check if email already exists for another user
    const existingUser = await prisma.user.findFirst({
      where: {
        email,
        id: { not: id }
      }
    });

    if (existingUser) {
      return res.status(400).json({ error: 'Email already exists' });
    }

    const user = await prisma.user.update({
      where: { id },
      data: {
        name,
        email,
        phone: phone || null,
        role,
        beltLevel: beltLevel || 'White',
        status: status || 'active'
      }
    });

    res.json(user);
  } catch (error) {
    console.error('Update user error:', error);
    res.status(500).json({ error: 'Failed to update user' });
  }
});

// Delete user
router.delete('/users/:id', async (req, res) => {
  try {
    const { id } = req.params;
    
    await prisma.user.delete({
      where: { id }
    });

    res.json({ message: 'User deleted successfully' });
  } catch (error) {
    console.error('Delete user error:', error);
    res.status(500).json({ error: 'Failed to delete user' });
  }
});

// Mark attendance for a booking
router.patch('/bookings/:id/attendance', async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (!['booked', 'attended', 'canceled'].includes(status)) {
      return res.status(400).json({ error: 'Invalid status' });
    }

    const booking = await prisma.booking.update({
      where: { id },
      data: { status },
      include: {
        user: true,
        class: true
      }
    });

    res.json(booking);
  } catch (error) {
    console.error('Mark attendance error:', error);
    res.status(500).json({ error: 'Failed to mark attendance' });
  }
});

// Bulk mark attendance for a class
router.post('/classes/:classId/attendance', async (req, res) => {
  try {
    const { classId } = req.params;
    const { attendances } = req.body; // Array of { bookingId, status }

    if (!Array.isArray(attendances)) {
      return res.status(400).json({ error: 'Attendances must be an array' });
    }

    const updates = attendances.map(({ bookingId, status }) =>
      prisma.booking.update({
        where: { id: bookingId },
        data: { status }
      })
    );

    await prisma.$transaction(updates);

    res.json({ message: 'Attendance marked successfully' });
  } catch (error) {
    console.error('Bulk mark attendance error:', error);
    res.status(500).json({ error: 'Failed to mark attendance' });
  }
});

module.exports = router; 