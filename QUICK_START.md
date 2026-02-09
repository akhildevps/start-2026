# Quick Start Guide - NetZone Full Stack

## 🚀 Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- MongoDB Atlas account (already configured)

## 📦 Installation (5 minutes)

### Step 1: Backend Setup

```bash
# Navigate to backend
cd backend

# Install dependencies
npm install

# Create .env file (copy from .env.example)
# MongoDB URI is already configured in the file

# Start backend server
npm run dev
```

✅ Backend running on: `http://localhost:5000`

### Step 2: Frontend Setup

```bash
# In a new terminal, navigate to frontend
cd frontend

# Install dependencies
npm install

# Create .env file
echo REACT_APP_API_URL=http://localhost:5000/api > .env

# Start React development server
npm start
```

✅ Frontend running on: `http://localhost:3000`

## 🌐 Access the Application

- **Main Website**: http://localhost:3000
- **Admin Dashboard**: http://localhost:3000/admin
- **API Health Check**: http://localhost:5000/api/health

## 📝 Default Database

The MongoDB connection string is already configured:
```


No credentials needed - just start the servers!

## 🎯 Features Available

### Public Site
- ✅ Dynamic hero slider
- ✅ Resort highlights/features
- ✅ Luxury accommodations showcase
- ✅ Amenities display
- ✅ Booking information
- ✅ Footer links

### Admin Panel (`/admin`)
- ✅ Manage all sections
- ✅ View all content items
- ✅ Toggle visibility (show/hide items)
- ✅ Edit items
- ✅ Delete items
- ✅ Real-time updates

## 🔌 API Endpoints Quick Reference

```
Heroes:        GET/POST /api/heroes, PUT/DELETE /api/heroes/:id
Features:      GET/POST /api/features, PUT/DELETE /api/features/:id
Rooms:         GET/POST /api/accommodations, PUT/DELETE /api/accommodations/:id
Amenities:     GET/POST /api/amenities, PUT/DELETE /api/amenities/:id
Bookings:      GET/POST /api/bookings, PUT/DELETE /api/bookings/:id
Footer Links:  GET/POST /api/footers, PUT/DELETE /api/footers/:id
Sections:      GET /api/sections, POST /api/sections (visibility)
```

## 🛠️ Common Commands

### Backend
```bash
npm start       # Production mode
npm run dev     # Development with auto-reload
```

### Frontend
```bash
npm start       # Start dev server
npm run build   # Build for production
npm test        # Run tests
```

## 📱 Project Structure

```
backend/
  ├── models/          ← Database schemas
  ├── controllers/     ← API logic
  ├── routes/          ← API endpoints
  ├── config/          ← Database config
  └── server.js        ← Main server file

frontend/
  ├── src/
  │   ├── components/  ← Reusable components
  │   ├── pages/       ← Page components
  │   ├── admin/       ← Admin dashboard
  │   └── services/    ← API client
  └── package.json
```

## 🚨 Troubleshooting

### Backend won't start
```bash
# Check if port 5000 is in use
# Change PORT in backend/.env
```

### Frontend can't reach API
```bash
# Verify REACT_APP_API_URL in frontend/.env
# Should be: http://localhost:5000/api
```

### MongoDB connection failed
```bash
# Check connection string in backend/.env
# Verify MongoDB Atlas network access settings
```

## 📚 Next Steps

1. **Add Content**: Use admin panel to add resort data
2. **Customize Styling**: Modify `frontend/src/styles/index.css`
3. **Add Authentication**: Implement JWT in backend
4. **Deploy**: Use Vercel (frontend), Heroku/Railway (backend)

## 💡 Tips

- Backend logs show API requests
- Use Chrome DevTools Network tab to debug API calls
- Check `frontend/.env` if API calls fail
- Database is cloud-hosted, no local setup needed

## 🎓 Learning Resources

- Express.js: https://expressjs.com/
- React: https://react.dev/
- MongoDB: https://www.mongodb.com/docs/
- Mongoose: https://mongoosejs.com/

---

**Enjoy building! 🚀**

For detailed documentation, see `FULL_STACK_SETUP.md`
