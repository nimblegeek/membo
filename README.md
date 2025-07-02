# MemberFlow - Member Management for martial arts academies

<div align="center">
  <img src="https://img.shields.io/badge/React-18.2.0-blue?style=for-the-badge&logo=react" alt="React" />
  <img src="https://img.shields.io/badge/TypeScript-4.9.5-blue?style=for-the-badge&logo=typescript" alt="TypeScript" />
  <img src="https://img.shields.io/badge/Node.js-Express-green?style=for-the-badge&logo=node.js" alt="Node.js" />
  <img src="https://img.shields.io/badge/Prisma-ORM-purple?style=for-the-badge&logo=prisma" alt="Prisma" />
  <img src="https://img.shields.io/badge/Tailwind-CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white" alt="Tailwind CSS" />
</div>

## 🥋 About RolVibe

**RolVibe** is the ultimate martial arts club management platform designed to help dojos streamline their operations, engage members, and build thriving communities. Built with modern technology and a focus on user experience, RolVibe provides comprehensive tools for managing every aspect of your martial arts club.

### ✨ Key Features

- **🎯 Member Management** - Complete member profiles with belt progression tracking
- **📅 Class Scheduling** - Smart booking system with attendance tracking
- **📊 Progress Analytics** - Detailed insights into member engagement and performance
- **🏆 Achievement System** - Motivate students with badges and "Member of the Month"
- **🔒 Secure & Reliable** - Enterprise-grade security with data encryption
- **⚡ Lightning Fast** - Modern cloud-based platform accessible anywhere

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ 
- npm or yarn
- SQLite (for development)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/rolvibe.git
   cd rolvibe
   ```

2. **Install dependencies**
   ```bash
   # Install root dependencies
   npm install
   
   # Install server dependencies
   cd server && npm install
   
   # Install client dependencies
   cd ../client && npm install
   ```

3. **Set up the database**
   ```bash
   cd server
   npx prisma migrate dev
   npx prisma generate
   ```

4. **Start the development servers**
   ```bash
   # Terminal 1 - Start backend server
   cd server && npm start
   
   # Terminal 2 - Start frontend server
   cd client && npm start
   ```

5. **Access the application**
   - Frontend: http://localhost:3003
   - Backend API: http://localhost:5001
   - Prisma Studio: http://localhost:5555

## 🏗️ Architecture

### Frontend (React + TypeScript)
- **React 18** with TypeScript for type safety
- **Tailwind CSS** for modern, responsive design
- **React Router** for navigation
- **Axios** for API communication
- **Lucide React** for beautiful icons

### Backend (Node.js + Express)
- **Express.js** REST API
- **Prisma ORM** for database management
- **SQLite** for development (easily switchable to PostgreSQL/MySQL)
- **JWT Authentication** (Auth0 integration ready)

### Database Schema
- **Users** - Member profiles with belt levels and status
- **Classes** - Martial arts class schedules
- **Bookings** - Class attendance and booking records
- **Awards** - Achievement and recognition system
- **Settings** - System configuration

## 📱 Features Overview

### For Club Owners & Instructors
- **Dashboard Analytics** - Real-time insights into club performance
- **Member Management** - Complete member lifecycle management
- **Class Scheduling** - Flexible scheduling with capacity management
- **Attendance Tracking** - Automated attendance and progress monitoring
- **Communication Tools** - Built-in messaging and notifications

### For Members
- **Class Booking** - Easy online class registration
- **Progress Tracking** - Visual progress dashboards
- **Achievement System** - Gamified learning with badges and rewards
- **Mobile-First Design** - Access from any device, anywhere

## 🎨 Design System

RolVibe uses a modern design system with:
- **Color Palette**: Violet and Purple gradients for energy and passion
- **Typography**: Clean, readable fonts optimized for all devices
- **Components**: Reusable UI components with consistent styling
- **Responsive Design**: Mobile-first approach for accessibility

## 🔧 Development

### Available Scripts

```bash
# Development
npm run dev          # Start both frontend and backend
npm run server       # Start backend only
npm run client       # Start frontend only

# Database
npm run db:generate  # Generate Prisma client
npm run db:push      # Push schema changes
npm run db:studio    # Open Prisma Studio
npm run db:migrate   # Run database migrations

# Production
npm run build        # Build for production
npm start            # Start production server
```

### Environment Variables

Create `.env` files in both `server/` and `client/` directories:

**Server (.env)**
```env
DATABASE_URL="file:./dev.db"
JWT_SECRET="your-jwt-secret"
PORT=5001
```

**Client (.env)**
```env
REACT_APP_API_URL="http://localhost:5001"
REACT_APP_AUTH0_DOMAIN="your-auth0-domain"
REACT_APP_AUTH0_CLIENT_ID="your-auth0-client-id"
```

## 🚀 Deployment

### Backend Deployment
1. Set up your production database (PostgreSQL recommended)
2. Configure environment variables
3. Run `npm run build` and `npm start`

### Frontend Deployment
1. Configure production API endpoints
2. Run `npm run build`
3. Deploy the `build/` folder to your hosting service

### Development Workflow
1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

- **Documentation**: [docs.rolvibe.com](https://docs.rolvibe.com)
- **Issues**: [GitHub Issues](https://github.com/your-username/rolvibe/issues)
- **Discussions**: [GitHub Discussions](https://github.com/your-username/rolvibe/discussions)
- **Email**: support@rolvibe.com

## 🙏 Acknowledgments

- Built with ❤️ for the martial arts community
- Inspired by the dedication of martial arts instructors worldwide
- Powered by modern web technologies

---

<div align="center">
  <strong>Transform your martial arts club with RolVibe</strong><br/>
  <em>Empowering dojos to build stronger communities</em>
</div>
