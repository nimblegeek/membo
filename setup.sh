#!/bin/bash

echo "🚀 Setting up Membo - Martial Arts Member Management System"
echo "=========================================================="

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js 16+ first."
    exit 1
fi

# Check Node.js version
NODE_VERSION=$(node -v | cut -d'v' -f2 | cut -d'.' -f1)
if [ "$NODE_VERSION" -lt 16 ]; then
    echo "❌ Node.js version 16+ is required. Current version: $(node -v)"
    exit 1
fi

echo "✅ Node.js version: $(node -v)"

# Install dependencies
echo "📦 Installing dependencies..."
npm run install-all

if [ $? -ne 0 ]; then
    echo "❌ Failed to install dependencies"
    exit 1
fi

echo "✅ Dependencies installed successfully"

# Set up environment file
echo "🔧 Setting up environment configuration..."
if [ ! -f "server/.env" ]; then
    cp server/env.example server/.env
    echo "✅ Environment file created at server/.env"
    echo "⚠️  Please edit server/.env with your configuration"
else
    echo "✅ Environment file already exists"
fi

# Set up database
echo "🗄️  Setting up database..."
cd server
npx prisma generate
npx prisma db push
cd ..

if [ $? -ne 0 ]; then
    echo "❌ Failed to set up database"
    exit 1
fi

echo "✅ Database set up successfully"

# Create sample data
echo "📊 Creating sample data..."
cd server
node -e "
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function createSampleData() {
  try {
    // Create sample users
    const user1 = await prisma.user.create({
      data: {
        name: 'John Doe',
        email: 'john@example.com',
        role: 'member'
      }
    });

    const user2 = await prisma.user.create({
      data: {
        name: 'Jane Smith',
        email: 'jane@example.com',
        role: 'member'
      }
    });

    // Create sample classes
    const class1 = await prisma.class.create({
      data: {
        name: 'Karate Basics',
        date: new Date(Date.now() + 24 * 60 * 60 * 1000), // Tomorrow
        time: '18:00',
        maxSlots: 20
      }
    });

    const class2 = await prisma.class.create({
      data: {
        name: 'Advanced Karate',
        date: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000), // Day after tomorrow
        time: '19:30',
        maxSlots: 15
      }
    });

    // Create sample bookings
    await prisma.booking.create({
      data: {
        userId: user1.id,
        classId: class1.id,
        status: 'booked'
      }
    });

    await prisma.booking.create({
      data: {
        userId: user2.id,
        classId: class1.id,
        status: 'attended'
      }
    });

    console.log('✅ Sample data created successfully');
  } catch (error) {
    console.error('❌ Error creating sample data:', error);
  } finally {
    await prisma.\$disconnect();
  }
}

createSampleData();
"
cd ..

echo ""
echo "🎉 Setup completed successfully!"
echo ""
echo "📋 Next steps:"
echo "1. Edit server/.env with your configuration"
echo "2. Run 'npm run dev' to start the development servers"
echo "3. Open http://localhost:3000 in your browser"
echo "4. Login with admin@membo.com / admin123"
echo ""
echo "📚 For more information, see README.md"
echo ""
echo "Happy coding! 🥋" 