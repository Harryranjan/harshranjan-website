# Harsh Ranjan Personal Branding Website

A full-stack personal branding platform for a digital marketing expert, built with React, Node.js, Express, and MySQL.

## 🏗️ Tech Stack

### Frontend

- **React 18** with Vite
- **Tailwind CSS** for styling
- **React Router** for navigation
- **React Helmet Async** for SEO
- **Framer Motion** for animations (optional)
- **Axios** for API calls

### Backend

- **Node.js** + **Express**
- **MySQL** with Sequelize ORM
- **JWT** authentication
- **Bcrypt** for password hashing
- **NodeMailer** for emails
- **Helmet** for security
- **Morgan** for logging

## 📁 Project Structure

```
harsh-ranjan-website/
├── frontend/              # React frontend
│   ├── src/
│   │   ├── components/   # Reusable components
│   │   ├── pages/        # Page components
│   │   ├── context/      # Context API
│   │   ├── utils/        # Utility functions
│   │   └── assets/       # Images, fonts, etc.
│   ├── package.json
│   └── vite.config.js
│
├── backend/              # Node.js backend
│   ├── config/          # Configuration files
│   ├── controllers/     # Route controllers
│   ├── models/          # Database models
│   ├── routes/          # API routes
│   ├── middleware/      # Custom middleware
│   ├── utils/           # Utility functions
│   ├── server.js        # Entry point
│   └── package.json
│
└── roadmap.md           # Development roadmap
```

## 🚀 Getting Started

### Prerequisites

- Node.js (v18 or higher)
- MySQL (v8 or higher)
- npm or yarn

### Backend Setup

1. Navigate to backend directory:

```bash
cd backend
```

2. Install dependencies:

```bash
npm install
```

3. Create `.env` file (copy from `.env.example`):

```bash
cp .env.example .env
```

4. Update `.env` with your database credentials and configuration

5. Create MySQL database:

```bash
mysql -u root -p
CREATE DATABASE harsh_ranjan_website;
```

6. Run database schema (optional - Sequelize will auto-create tables):

```bash
mysql -u root -p harsh_ranjan_website < database-schema.sql
```

7. Start the development server:

```bash
npm run dev
```

Backend will run on `http://localhost:5000`

### Frontend Setup

1. Navigate to frontend directory:

```bash
cd frontend
```

2. Install dependencies:

```bash
npm install
```

3. Create `.env` file (copy from `.env.example`):

```bash
cp .env.example .env
```

4. Start the development server:

```bash
npm run dev
```

Frontend will run on `http://localhost:5173`

## 🗄️ Database Schema

The application includes the following tables:

- `users` - User authentication and roles
- `profiles` - User profile information
- `projects` - Portfolio/case studies
- `blog_posts` - Blog articles
- `testimonials` - Client testimonials
- `skills` - Skills and competencies
- `contact_messages` - Contact form submissions
- `newsletter_subscribers` - Email subscribers
- `downloads` - Lead magnet downloads

## 📝 API Endpoints

### Authentication

- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user
- `POST /api/auth/logout` - Logout user

### Coming Soon

- Projects/Portfolio endpoints
- Blog endpoints
- Testimonials endpoints
- Contact form endpoints
- User profile endpoints

## 🔐 Security Features

- JWT-based authentication
- Password hashing with bcrypt
- Helmet.js for security headers
- CORS configuration
- Rate limiting
- Input validation with express-validator
- SQL injection prevention with Sequelize ORM

## 📦 Available Scripts

### Backend

- `npm start` - Start production server
- `npm run dev` - Start development server with nodemon

### Frontend

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build

## 🎯 Development Roadmap

See [roadmap.md](./roadmap.md) for the complete feature list and implementation timeline.

### Phase 1 (Month 1-2) - Core Features

- ✅ Project structure setup
- ✅ Authentication system
- ✅ Database schema
- ✅ Basic frontend with routing
- 🔲 Hero section with animations
- 🔲 Services page
- 🔲 Portfolio/case studies
- 🔲 Blog system
- 🔲 Contact form

### Phase 2 (Month 3-4) - Monetization & Growth

- 🔲 Google AdSense integration
- 🔲 Email marketing integration
- 🔲 Lead magnets & downloads
- 🔲 Newsletter subscription
- 🔲 Analytics dashboard

### Phase 3 (Month 5-6) - Advanced Features

- 🔲 Client portal
- 🔲 Webinar platform
- 🔲 Affiliate marketing
- 🔲 Community forum
- 🔲 Multi-language support

## 📄 License

MIT

## 👤 Author

**Harsh Ranjan**  
Digital Marketing Expert | 7 Years Experience

---

Built with ❤️ by Harsh Ranjan
