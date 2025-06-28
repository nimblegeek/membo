const express = require('express');
const cors = require('cors');
const { PrismaClient } = require('@prisma/client');
const { checkJwt, extractUser } = require('./middleware/auth');

const app = express();
const prisma = new PrismaClient();
const PORT = process.env.PORT || 5001;

// Middleware
app.use(cors());
app.use(express.json());

// Health check endpoint (no auth required)
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    timestamp: new Date().toISOString(),
    message: 'Membo API is running'
  });
});

// Protected routes - require Auth0 authentication
app.use('/api/classes', checkJwt, extractUser, require('./routes/classes'));
app.use('/api/bookings', checkJwt, extractUser, require('./routes/bookings'));
app.use('/api/awards', checkJwt, extractUser, require('./routes/awards'));
app.use('/api/admin', checkJwt, extractUser, require('./routes/admin'));

// User profile route
app.get('/api/user/profile', checkJwt, extractUser, async (req, res) => {
  try {
    res.json(req.user);
  } catch (error) {
    res.status(500).json({ error: 'Failed to get user profile' });
  }
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  
  if (err.name === 'UnauthorizedError') {
    return res.status(401).json({ error: 'Invalid token' });
  }
  
  res.status(500).json({ error: 'Something went wrong!' });
});

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

const startServer = async () => {
  try {
    // Test database connection
    await prisma.$connect();
    console.log('📊 Database connected successfully');
    
    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error('❌ Failed to start server:', error);
    process.exit(1);
  }
};

startServer(); 