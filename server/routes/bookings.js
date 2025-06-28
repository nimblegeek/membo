const express = require('express');
const { PrismaClient } = require('@prisma/client');

const router = express.Router();
const prisma = new PrismaClient();

// Get all bookings for a user
router.get('/user/:userId', async (req, res) => {
  try {
    const { userId } = req.params;
    
    const bookings = await prisma.booking.findMany({
      where: { userId },
      include: {
        class: true
      },
      orderBy: {
        createdAt: 'desc'
      }
    });

    res.json(bookings);
  } catch (error) {
    console.error('Get user bookings error:', error);
    res.status(500).json({ error: 'Failed to fetch bookings' });
  }
});

// Get all bookings (admin)
router.get('/', async (req, res) => {
  try {
    const bookings = await prisma.booking.findMany({
      include: {
        user: true,
        class: true
      },
      orderBy: {
        createdAt: 'desc'
      }
    });

    res.json(bookings);
  } catch (error) {
    console.error('Get all bookings error:', error);
    res.status(500).json({ error: 'Failed to fetch bookings' });
  }
});

// Create a new booking
router.post('/', async (req, res) => {
  try {
    const { userId, classId } = req.body;

    // Check if class exists and has available slots
    const classData = await prisma.class.findUnique({
      where: { id: classId },
      include: {
        bookings: true
      }
    });

    if (!classData) {
      return res.status(404).json({ error: 'Class not found' });
    }

    // Check if user is already booked
    const existingBooking = await prisma.booking.findFirst({
      where: {
        userId,
        classId,
        status: { in: ['booked', 'attended'] }
      }
    });

    if (existingBooking) {
      return res.status(400).json({ error: 'Already booked for this class' });
    }

    // Check if class is full
    const bookedSlots = classData.bookings.filter(b => b.status !== 'canceled').length;
    if (bookedSlots >= classData.maxSlots) {
      return res.status(400).json({ error: 'Class is full' });
    }

    const booking = await prisma.booking.create({
      data: {
        userId,
        classId,
        status: 'booked'
      },
      include: {
        class: true,
        user: true
      }
    });

    res.status(201).json(booking);
  } catch (error) {
    console.error('Create booking error:', error);
    res.status(500).json({ error: 'Failed to create booking' });
  }
});

// Update booking status (mark attendance)
router.patch('/:id/status', async (req, res) => {
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
        class: true,
        user: true
      }
    });

    res.json(booking);
  } catch (error) {
    console.error('Update booking status error:', error);
    res.status(500).json({ error: 'Failed to update booking status' });
  }
});

// Cancel a booking
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    
    await prisma.booking.update({
      where: { id },
      data: { status: 'canceled' }
    });

    res.json({ message: 'Booking canceled successfully' });
  } catch (error) {
    console.error('Cancel booking error:', error);
    res.status(500).json({ error: 'Failed to cancel booking' });
  }
});

// Get user stats
router.get('/stats/:userId', async (req, res) => {
  try {
    const { userId } = req.params;
    
    const bookings = await prisma.booking.findMany({
      where: { userId },
      include: {
        class: true
      }
    });

    const totalBookings = bookings.length;
    const attendedClasses = bookings.filter(b => b.status === 'attended').length;
    const currentStreak = calculateStreak(bookings.filter(b => b.status === 'attended'));

    res.json({
      totalBookings,
      attendedClasses,
      currentStreak,
      attendanceRate: totalBookings > 0 ? (attendedClasses / totalBookings * 100).toFixed(1) : 0
    });
  } catch (error) {
    console.error('Get user stats error:', error);
    res.status(500).json({ error: 'Failed to fetch user stats' });
  }
});

// Helper function to calculate attendance streak
function calculateStreak(attendedBookings) {
  if (attendedBookings.length === 0) return 0;
  
  const sortedBookings = attendedBookings.sort((a, b) => new Date(b.class.date) - new Date(a.class.date));
  let streak = 0;
  let currentDate = new Date();
  
  for (const booking of sortedBookings) {
    const classDate = new Date(booking.class.date);
    const daysDiff = Math.floor((currentDate - classDate) / (1000 * 60 * 60 * 24));
    
    if (daysDiff <= 1) {
      streak++;
      currentDate = classDate;
    } else {
      break;
    }
  }
  
  return streak;
}

module.exports = router; 