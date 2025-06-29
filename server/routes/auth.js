const express = require('express');
const { PrismaClient } = require('@prisma/client');

const router = express.Router();
const prisma = new PrismaClient();

// Login endpoint
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // For development, use mock authentication
    // In production, this would validate against Auth0 or your auth system
    if (email === 'admin@rolvibe.com' && password === 'admin123') {
      const user = await prisma.user.findFirst({
        where: { email: 'admin@rolvibe.com' }
      });

      if (!user) {
        // Create admin user if it doesn't exist
        const newUser = await prisma.user.create({
          data: {
            name: 'Coach Admin',
            email: 'admin@rolvibe.com',
            role: 'admin',
            beltLevel: 'black',
            status: 'active'
          }
        });
        return res.json({ user: newUser, token: 'mock-admin-token' });
      }

      return res.json({ user, token: 'mock-admin-token' });
    }

    if (email === 'member@rolvibe.com' && password === 'member123') {
      const user = await prisma.user.findFirst({
        where: { email: 'member@rolvibe.com' }
      });

      if (!user) {
        // Create member user if it doesn't exist
        const newUser = await prisma.user.create({
          data: {
            name: 'Demo Member',
            email: 'member@rolvibe.com',
            role: 'member',
            beltLevel: 'white',
            status: 'active'
          }
        });
        return res.json({ user: newUser, token: 'mock-member-token' });
      }

      return res.json({ user, token: 'mock-member-token' });
    }

    res.status(401).json({ error: 'Invalid credentials' });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ error: 'Login failed' });
  }
});

// Get current user
router.get('/me', async (req, res) => {
  try {
    // For development, return mock user
    // In production, this would extract user from JWT token
    const user = await prisma.user.findFirst({
      where: { role: 'admin' }
    });

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json({ user });
  } catch (error) {
    console.error('Get user error:', error);
    res.status(500).json({ error: 'Failed to get user' });
  }
});

// Logout endpoint
router.post('/logout', (req, res) => {
  // In production, this would invalidate the JWT token
  res.json({ message: 'Logged out successfully' });
});

// Register endpoint (for admin use)
router.post('/register', async (req, res) => {
  try {
    const { name, email, role = 'member', beltLevel = 'white' } = req.body;

    // Check if user already exists
    const existingUser = await prisma.user.findFirst({
      where: { email }
    });

    if (existingUser) {
      return res.status(400).json({ error: 'User already exists' });
    }

    // Create new user
    const user = await prisma.user.create({
      data: {
        name,
        email,
        role,
        beltLevel,
        status: 'active'
      }
    });

    res.status(201).json({ user });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ error: 'Registration failed' });
  }
});

module.exports = router; 