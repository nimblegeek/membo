const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const { PrismaClient } = require('@prisma/client');
require('dotenv').config();

const app = express();
const prisma = new PrismaClient();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(helmet());
app.use(cors({
  origin: process.env.CLIENT_URL || 'http://localhost:3000',
  credentials: true
}));
app.use(express.json());

// JWT Middleware
const authenticateToken = require('./middleware/auth');

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/classes', require('./routes/classes'));
app.use('/api/bookings', require('./routes/bookings'));
app.use('/api/awards', require('./routes/awards'));
app.use('/api/settings', require('./routes/settings'));
app.use('/api/admin', authenticateToken, require('./routes/admin'));

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

// Initialize database and start server
async function startServer() {
  try {
    // Initialize default settings if they don't exist
    const existingSettings = await prisma.setting.findFirst();
    if (!existingSettings) {
      await prisma.setting.create({
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
    }

    // Create default admin user if none exists
    const adminExists = await prisma.user.findFirst({
      where: { role: 'admin' }
    });

    if (!adminExists) {
      await prisma.user.create({
        data: {
          name: 'Admin',
          email: 'admin@membo.com',
          role: 'admin'
        }
      });
      console.log('Default admin user created: admin@membo.com');
    }

    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
      console.log(`📊 Database connected successfully`);
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
}

startServer();

// Graceful shutdown
process.on('SIGTERM', async () => {
  console.log('SIGTERM received, shutting down gracefully');
  await prisma.$disconnect();
  process.exit(0);
}); 