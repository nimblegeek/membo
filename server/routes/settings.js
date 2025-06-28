const express = require('express');
const { PrismaClient } = require('@prisma/client');

const router = express.Router();
const prisma = new PrismaClient();

// Get current settings
router.get('/', async (req, res) => {
  try {
    const settings = await prisma.setting.findFirst();
    
    if (!settings) {
      // Create default settings if none exist
      const defaultSettings = await prisma.setting.create({
        data: {
          id: '1',
          mode: 'standalone',
          apiConfig: JSON.stringify({
            url: 'https://api.zoezi.se/rest/v1/attendance/get',
            apiKey: '',
            customerId: ''
          })
        }
      });
      return res.json(defaultSettings);
    }

    res.json(settings);
  } catch (error) {
    console.error('Get settings error:', error);
    res.status(500).json({ error: 'Failed to fetch settings' });
  }
});

// Update settings
router.put('/', async (req, res) => {
  try {
    const { mode, apiConfig } = req.body;

    if (!['standalone', 'integrated'].includes(mode)) {
      return res.status(400).json({ error: 'Invalid mode. Must be "standalone" or "integrated"' });
    }

    // Validate API config if in integrated mode
    if (mode === 'integrated') {
      try {
        const config = JSON.parse(apiConfig);
        if (!config.url || !config.apiKey || !config.customerId) {
          return res.status(400).json({ 
            error: 'API configuration must include url, apiKey, and customerId' 
          });
        }
      } catch (parseError) {
        return res.status(400).json({ error: 'Invalid API configuration JSON' });
      }
    }

    const settings = await prisma.setting.upsert({
      where: { id: '1' },
      update: {
        mode,
        apiConfig: typeof apiConfig === 'string' ? apiConfig : JSON.stringify(apiConfig)
      },
      create: {
        id: '1',
        mode,
        apiConfig: typeof apiConfig === 'string' ? apiConfig : JSON.stringify(apiConfig)
      }
    });

    res.json(settings);
  } catch (error) {
    console.error('Update settings error:', error);
    res.status(500).json({ error: 'Failed to update settings' });
  }
});

// Test API connection
router.post('/test-api', async (req, res) => {
  try {
    const settings = await prisma.setting.findFirst();
    
    if (!settings || settings.mode !== 'integrated') {
      return res.status(400).json({ error: 'Not in integrated mode' });
    }

    const apiConfig = JSON.parse(settings.apiConfig);
    
    // Test the API connection
    const axios = require('axios');
    const response = await axios.get(apiConfig.url, {
      headers: {
        'ApiKey': apiConfig.apiKey,
        'Content-Type': 'application/json'
      },
      params: {
        CustomerId: apiConfig.customerId,
        FromDate: new Date().toISOString().split('T')[0],
        ToDate: new Date().toISOString().split('T')[0]
      },
      timeout: 10000 // 10 second timeout
    });

    res.json({ 
      success: true, 
      message: 'API connection successful',
      dataCount: response.data?.length || 0
    });
  } catch (error) {
    console.error('API test error:', error);
    res.status(500).json({ 
      error: 'API connection failed', 
      details: error.message 
    });
  }
});

// Get system status
router.get('/status', async (req, res) => {
  try {
    const settings = await prisma.setting.findFirst();
    const userCount = await prisma.user.count();
    const classCount = await prisma.class.count();
    const bookingCount = await prisma.booking.count();
    const awardCount = await prisma.award.count();

    res.json({
      mode: settings?.mode || 'standalone',
      stats: {
        users: userCount,
        classes: classCount,
        bookings: bookingCount,
        awards: awardCount
      },
      database: 'connected',
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('Get status error:', error);
    res.status(500).json({ error: 'Failed to get system status' });
  }
});

module.exports = router; 