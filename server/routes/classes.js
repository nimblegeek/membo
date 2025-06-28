const express = require('express');
const axios = require('axios');
const { PrismaClient } = require('@prisma/client');

const router = express.Router();
const prisma = new PrismaClient();

// Get all classes (handles both standalone and integrated modes)
router.get('/', async (req, res) => {
  try {
    const settings = await prisma.setting.findFirst();
    const apiConfig = settings ? JSON.parse(settings.apiConfig) : {};

    if (settings?.mode === 'integrated' && apiConfig.apiKey) {
      // Integrated mode - fetch from Zoezi API
      try {
        const response = await axios.get(apiConfig.url, {
          headers: {
            'ApiKey': apiConfig.apiKey,
            'Content-Type': 'application/json'
          },
          params: {
            CustomerId: apiConfig.customerId,
            FromDate: new Date().toISOString().split('T')[0], // Today
            ToDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0] // 30 days from now
          }
        });

        // Transform Zoezi response to match our schema
        const classes = response.data.map(activity => ({
          id: activity.ActivityId,
          name: activity.ActivityName || 'Martial Arts Class',
          date: new Date(activity.Date),
          time: activity.Time || '18:00',
          maxSlots: activity.MaxSlots || 20,
          bookings: activity.Bookings || []
        }));

        res.json(classes);
      } catch (apiError) {
        console.error('Zoezi API error:', apiError);
        // Fallback to standalone mode if API fails
        const classes = await prisma.class.findMany({
          include: {
            bookings: true
          },
          orderBy: {
            date: 'asc'
          }
        });
        res.json(classes);
      }
    } else {
      // Standalone mode
      const classes = await prisma.class.findMany({
        include: {
          bookings: true
        },
        orderBy: {
          date: 'asc'
        }
      });
      res.json(classes);
    }
  } catch (error) {
    console.error('Get classes error:', error);
    res.status(500).json({ error: 'Failed to fetch classes' });
  }
});

// Create a new class (standalone mode only)
router.post('/', async (req, res) => {
  try {
    const settings = await prisma.setting.findFirst();
    
    if (settings?.mode === 'integrated') {
      return res.status(400).json({ error: 'Cannot create classes in integrated mode' });
    }

    const { name, date, time, maxSlots } = req.body;
    
    const newClass = await prisma.class.create({
      data: {
        name,
        date: new Date(date),
        time,
        maxSlots: parseInt(maxSlots)
      }
    });

    res.status(201).json(newClass);
  } catch (error) {
    console.error('Create class error:', error);
    res.status(500).json({ error: 'Failed to create class' });
  }
});

// Update a class (standalone mode only)
router.put('/:id', async (req, res) => {
  try {
    const settings = await prisma.setting.findFirst();
    
    if (settings?.mode === 'integrated') {
      return res.status(400).json({ error: 'Cannot update classes in integrated mode' });
    }

    const { id } = req.params;
    const { name, date, time, maxSlots } = req.body;
    
    const updatedClass = await prisma.class.update({
      where: { id },
      data: {
        name,
        date: new Date(date),
        time,
        maxSlots: parseInt(maxSlots)
      }
    });

    res.json(updatedClass);
  } catch (error) {
    console.error('Update class error:', error);
    res.status(500).json({ error: 'Failed to update class' });
  }
});

// Delete a class (standalone mode only)
router.delete('/:id', async (req, res) => {
  try {
    const settings = await prisma.setting.findFirst();
    
    if (settings?.mode === 'integrated') {
      return res.status(400).json({ error: 'Cannot delete classes in integrated mode' });
    }

    const { id } = req.params;
    
    await prisma.class.delete({
      where: { id }
    });

    res.json({ message: 'Class deleted successfully' });
  } catch (error) {
    console.error('Delete class error:', error);
    res.status(500).json({ error: 'Failed to delete class' });
  }
});

module.exports = router; 