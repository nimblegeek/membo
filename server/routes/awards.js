const express = require('express');
const { PrismaClient } = require('@prisma/client');

const router = express.Router();
const prisma = new PrismaClient();

// Get all awards
router.get('/', async (req, res) => {
  try {
    const awards = await prisma.award.findMany({
      include: {
        user: true
      },
      orderBy: {
        createdAt: 'desc'
      }
    });

    res.json(awards);
  } catch (error) {
    console.error('Get awards error:', error);
    res.status(500).json({ error: 'Failed to fetch awards' });
  }
});

// Get current month's Member of the Month
router.get('/current', async (req, res) => {
  try {
    const currentMonth = new Date().toISOString().slice(0, 7); // YYYY-MM format
    
    const currentAward = await prisma.award.findFirst({
      where: {
        month: currentMonth,
        title: 'Member of the Month'
      },
      include: {
        user: true
      }
    });

    res.json(currentAward);
  } catch (error) {
    console.error('Get current award error:', error);
    res.status(500).json({ error: 'Failed to fetch current award' });
  }
});

// Create a new award (admin only)
router.post('/', async (req, res) => {
  try {
    const { userId, month, title } = req.body;

    // Check if user exists
    const user = await prisma.user.findUnique({
      where: { id: userId }
    });

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Check if award already exists for this month and title
    const existingAward = await prisma.award.findFirst({
      where: {
        month,
        title
      }
    });

    if (existingAward) {
      return res.status(400).json({ error: 'Award already exists for this month' });
    }

    const award = await prisma.award.create({
      data: {
        userId,
        month,
        title
      },
      include: {
        user: true
      }
    });

    res.status(201).json(award);
  } catch (error) {
    console.error('Create award error:', error);
    res.status(500).json({ error: 'Failed to create award' });
  }
});

// Get top performers for the month
router.get('/top-performers/:month', async (req, res) => {
  try {
    const { month } = req.params;
    
    // Get all users with their attendance stats for the month
    const users = await prisma.user.findMany({
      where: {
        role: 'member'
      },
      include: {
        bookings: {
          where: {
            status: 'attended',
            class: {
              date: {
                gte: new Date(month + '-01'),
                lt: new Date(new Date(month + '-01').getTime() + 32 * 24 * 60 * 60 * 1000)
              }
            }
          }
        }
      }
    });

    // Calculate attendance for each user
    const performers = users.map(user => ({
      id: user.id,
      name: user.name,
      email: user.email,
      attendanceCount: user.bookings.length
    }));

    // Sort by attendance count (descending)
    performers.sort((a, b) => b.attendanceCount - a.attendanceCount);

    res.json(performers.slice(0, 10)); // Return top 10
  } catch (error) {
    console.error('Get top performers error:', error);
    res.status(500).json({ error: 'Failed to fetch top performers' });
  }
});

// Auto-select Member of the Month based on attendance
router.post('/auto-select/:month', async (req, res) => {
  try {
    const { month } = req.params;
    
    // Get top performer for the month
    const users = await prisma.user.findMany({
      where: {
        role: 'member'
      },
      include: {
        bookings: {
          where: {
            status: 'attended',
            class: {
              date: {
                gte: new Date(month + '-01'),
                lt: new Date(new Date(month + '-01').getTime() + 32 * 24 * 60 * 60 * 1000)
              }
            }
          }
        }
      }
    });

    const performers = users.map(user => ({
      id: user.id,
      name: user.name,
      attendanceCount: user.bookings.length
    }));

    performers.sort((a, b) => b.attendanceCount - a.attendanceCount);

    if (performers.length === 0) {
      return res.status(400).json({ error: 'No members found for this month' });
    }

    const topPerformer = performers[0];

    // Check if award already exists for this month
    const existingAward = await prisma.award.findFirst({
      where: {
        month,
        title: 'Member of the Month'
      }
    });

    if (existingAward) {
      return res.status(400).json({ error: 'Member of the Month already selected for this month' });
    }

    // Create the award
    const award = await prisma.award.create({
      data: {
        userId: topPerformer.id,
        month,
        title: 'Member of the Month'
      },
      include: {
        user: true
      }
    });

    res.status(201).json(award);
  } catch (error) {
    console.error('Auto-select award error:', error);
    res.status(500).json({ error: 'Failed to auto-select Member of the Month' });
  }
});

// Delete an award
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    
    await prisma.award.delete({
      where: { id }
    });

    res.json({ message: 'Award deleted successfully' });
  } catch (error) {
    console.error('Delete award error:', error);
    res.status(500).json({ error: 'Failed to delete award' });
  }
});

module.exports = router; 