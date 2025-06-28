# Membo - Martial Arts Member Management System

An engaging member management system for martial arts clubs that helps members book classes, track training stats, and compete to become "Member of the Month" to foster a positive gym culture.

## 🚀 Features

### Core Features
- **Class Booking**: View and book martial arts classes with real-time availability
- **Training Stats**: Track attendance, streaks, and performance metrics
- **Member of the Month**: Recognition system to motivate engagement
- **Mobile-Friendly**: Responsive design that works on all devices

### Admin Features
- **Dashboard**: Comprehensive overview of gym statistics and activity
- **User Management**: Add, edit, and manage members and admins
- **Class Management**: Create, edit, and manage class schedules
- **Attendance Tracking**: Mark attendance and view booking status
- **Awards System**: Select and manage Member of the Month awards

### Flexibility
- **Standalone Mode**: Complete self-contained system with local database
- **Integrated Mode**: Connect with external APIs like Zoezi for class data
- **Configurable**: Easy switching between modes via admin settings

## 🛠 Tech Stack

- **Frontend**: React 18 with TypeScript, Tailwind CSS
- **Backend**: Node.js with Express, Prisma ORM
- **Database**: SQLite (with Prisma)
- **Authentication**: JWT-based auth
- **API Integration**: Axios for external API calls
- **Icons**: Lucide React
- **Date Handling**: date-fns

## 📦 Installation

### Prerequisites
- Node.js 16+ 
- npm or yarn

### Quick Start

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd membo
   ```

2. **Install dependencies**
   ```bash
   npm run install-all
   ```

3. **Set up environment variables**
   ```bash
   # Copy example environment file
   cp server/env.example server/.env
   
   # Edit server/.env with your configuration
   ```

4. **Set up the database**
   ```bash
   npm run db:generate
   npm run db:push
   ```

5. **Start the development servers**
   ```bash
   npm run dev
   ```

The application will be available at:
- Frontend: http://localhost:3000
- Backend API: http://localhost:5000

### Default Login
- **Email**: admin@membo.com
- **Password**: admin123

## 🔧 Configuration

### Environment Variables

Create a `.env` file in the `server` directory:

```env
# Server Configuration
PORT=5000
NODE_ENV=development

# JWT Configuration
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production

# Database Configuration (SQLite)
DATABASE_URL="file:./dev.db"

# Client URL for CORS
CLIENT_URL=http://localhost:3000

# Zoezi API Configuration (for integrated mode)
ZOEZI_API_KEY=your-zoezi-api-key
ZOEZI_CUSTOMER_ID=your-zoezi-customer-id
ZOEZI_API_URL=https://api.zoezi.se/rest/v1/attendance/get
```

### API Integration (Zoezi)

To use integrated mode with Zoezi's API:

1. Get your API credentials from Zoezi
2. Update the environment variables with your API key and customer ID
3. Configure the system mode in the admin settings
4. Test the API connection using the admin dashboard

## 📱 Usage

### For Members
1. **Browse Classes**: View available martial arts classes
2. **Book Classes**: Reserve your spot in upcoming classes
3. **Track Progress**: Monitor your attendance and streaks
4. **View Awards**: See current and previous Member of the Month winners

### For Admins
1. **Dashboard**: Monitor gym activity and statistics
2. **Manage Classes**: Create and edit class schedules
3. **User Management**: Add and manage members
4. **Attendance**: Mark attendance for booked classes
5. **Awards**: Select Member of the Month based on performance
6. **Settings**: Configure system mode and API integration

## 🚀 Deployment

### Frontend (Vercel)

1. **Build the project**
   ```bash
   cd client
   npm run build
   ```

2. **Deploy to Vercel**
   ```bash
   # Install Vercel CLI
   npm i -g vercel
   
   # Deploy
   vercel
   ```

3. **Configure environment variables in Vercel dashboard**

### Backend (Render)

1. **Create a new Web Service on Render**
2. **Connect your GitHub repository**
3. **Configure build settings**:
   - Build Command: `cd server && npm install && npx prisma generate`
   - Start Command: `cd server && npm start`
4. **Set environment variables in Render dashboard**
5. **Deploy**

### Database

For production, consider using a managed SQLite service or migrating to PostgreSQL:

```bash
# Update DATABASE_URL in production environment
DATABASE_URL="postgresql://username:password@host:port/database"
```

## 🔒 Security

- JWT-based authentication
- Password hashing with bcrypt
- CORS configuration
- Helmet.js for security headers
- Input validation and sanitization

## 📊 API Endpoints

### Authentication
- `POST /api/auth/login` - User login
- `GET /api/auth/me` - Get current user

### Classes
- `GET /api/classes` - Get all classes
- `POST /api/classes` - Create class (admin)
- `PUT /api/classes/:id` - Update class (admin)
- `DELETE /api/classes/:id` - Delete class (admin)

### Bookings
- `GET /api/bookings` - Get all bookings (admin)
- `GET /api/bookings/user/:userId` - Get user bookings
- `POST /api/bookings` - Create booking
- `PATCH /api/bookings/:id/status` - Update booking status
- `GET /api/bookings/stats/:userId` - Get user stats

### Awards
- `GET /api/awards` - Get all awards
- `GET /api/awards/current` - Get current Member of the Month
- `POST /api/awards` - Create award (admin)
- `POST /api/awards/auto-select/:month` - Auto-select Member of the Month

### Admin
- `GET /api/admin/dashboard` - Get dashboard stats
- `GET /api/admin/users` - Get all users
- `POST /api/admin/users` - Create user
- `PUT /api/admin/users/:id` - Update user
- `DELETE /api/admin/users/:id` - Delete user

### Settings
- `GET /api/settings` - Get system settings
- `PUT /api/settings` - Update settings
- `POST /api/settings/test-api` - Test API connection

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

For support and questions:
- Create an issue in the GitHub repository
- Check the documentation in the `/docs` folder
- Review the API documentation above

## 🗺 Roadmap

- [ ] Push notifications for class reminders
- [ ] Advanced analytics and reporting
- [ ] Payment integration for class fees
- [ ] Mobile app (React Native)
- [ ] Multi-gym support
- [ ] Advanced scheduling features
- [ ] Social features and community building

---

Built with ❤️ for martial arts communities