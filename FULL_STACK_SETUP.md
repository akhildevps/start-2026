# NetZone - Full Stack Application

A modern, dynamic luxury resort website with Node.js backend, React frontend, and MongoDB database.

## Project Structure

```
start-2026/
├── backend/
│   ├── config/
│   │   └── database.js         # MongoDB connection
│   ├── models/
│   │   ├── Hero.js
│   │   ├── Feature.js
│   │   ├── Accommodation.js
│   │   ├── Amenity.js
│   │   ├── Booking.js
│   │   ├── Footer.js
│   │   └── Section.js
│   ├── controllers/            # API controllers for each resource
│   ├── routes/                 # API routes for each resource
│   ├── middleware/             # Express middleware
│   ├── package.json
│   └── server.js               # Express server entry point
│
├── frontend/
│   ├── public/
│   │   └── index.html
│   ├── src/
│   │   ├── components/
│   │   │   └── PageComponents.jsx   # Hero, Features, Accommodations, etc.
│   │   ├── pages/
│   │   │   └── Home.jsx             # Main landing page
│   │   ├── admin/
│   │   │   └── AdminDashboard.jsx   # Admin panel
│   │   ├── services/
│   │   │   └── api.js               # API client
│   │   ├── styles/
│   │   │   └── index.css
│   │   ├── App.js
│   │   └── index.js
│   └── package.json
│
├── admin/                      # Static admin panel (legacy)
├── images/                     # Resort images
├── css/                        # Static CSS (legacy)
└── PROJECT_STRUCTURE.md
```

## Tech Stack

- **Backend**: Node.js, Express.js
- **Frontend**: React 18, React Router, Axios
- **Database**: MongoDB (Atlas Cloud)
- **Styling**: Tailwind CSS
- **Other**: CORS, Multer (for file uploads)

## MongoDB Connection

```
mongodb+srv://username:pwd@@2026-gemini.paguc3x.mongodb.net/?appName=2026-gemini
```

## Installation & Setup

### Backend Setup

1. **Navigate to backend directory**
```bash
cd backend
```

2. **Install dependencies**
```bash
npm install
```

3. **Start the server**
```bash
npm start         # Production
npm run dev       # Development with nodemon
```

Server will run on `http://localhost:5000`

### Frontend Setup

1. **Navigate to frontend directory**
```bash
cd frontend
```

2. **Install dependencies**
```bash
npm install
```

3. **Create .env file**
```
REACT_APP_API_URL=http://localhost:5000/api
```

4. **Start the development server**
```bash
npm start
```

Frontend will run on `http://localhost:3000`

## API Endpoints

### Heroes
- `GET /api/heroes` - Get all heroes
- `POST /api/heroes` - Create new hero
- `GET /api/heroes/:id` - Get single hero
- `PUT /api/heroes/:id` - Update hero
- `DELETE /api/heroes/:id` - Delete hero
- `PATCH /api/heroes/:id/toggle` - Toggle visibility

### Features
- `GET /api/features` - Get all features
- `POST /api/features` - Create new feature
- `PUT /api/features/:id` - Update feature
- `DELETE /api/features/:id` - Delete feature
- `PATCH /api/features/:id/toggle` - Toggle visibility

### Accommodations
- `GET /api/accommodations` - Get all accommodations
- `POST /api/accommodations` - Create new accommodation
- `PUT /api/accommodations/:id` - Update accommodation
- `DELETE /api/accommodations/:id` - Delete accommodation
- `PATCH /api/accommodations/:id/toggle` - Toggle visibility

### Amenities
- `GET /api/amenities` - Get all amenities
- `POST /api/amenities` - Create new amenity
- `PUT /api/amenities/:id` - Update amenity
- `DELETE /api/amenities/:id` - Delete amenity
- `PATCH /api/amenities/:id/toggle` - Toggle visibility

### Bookings
- `GET /api/bookings` - Get all booking info
- `POST /api/bookings` - Create booking info
- `PUT /api/bookings/:id` - Update booking info
- `DELETE /api/bookings/:id` - Delete booking info
- `PATCH /api/bookings/:id/toggle` - Toggle visibility

### Footers
- `GET /api/footers` - Get all footer links
- `POST /api/footers` - Create footer link
- `PUT /api/footers/:id` - Update footer link
- `DELETE /api/footers/:id` - Delete footer link
- `PATCH /api/footers/:id/toggle` - Toggle visibility

### Sections
- `GET /api/sections` - Get all sections visibility
- `GET /api/sections/name/:name` - Get section by name
- `POST /api/sections` - Set section visibility

## Features

### Frontend
✅ Dynamic content loading from backend
✅ Responsive React components
✅ Admin dashboard for content management
✅ Real-time visibility toggles
✅ Navigation and routing
✅ Clean, modern UI

### Backend
✅ RESTful API
✅ MongoDB integration
✅ CRUD operations for all sections
✅ Visibility toggle functionality
✅ Error handling
✅ CORS enabled

## Database Models

### Hero
- title (String, required)
- subtitle (String)
- imageUrl (String)
- hidden (Boolean, default: false)
- createdAt, updatedAt (Date)

### Feature
- title (String, required)
- description (String)
- icon (String, default: ⭐)
- hidden (Boolean, default: false)

### Accommodation
- type (String, required)
- price (String, required)
- description (String)
- imageUrl (String)
- hidden (Boolean, default: false)

### Amenity
- name (String, required)
- description (String)
- imageUrl (String)
- hidden (Boolean, default: false)

### Booking
- email (String, required)
- phone (String, required)
- address (String)
- hidden (Boolean, default: false)

### Footer
- title (String, required)
- url (String, required)
- hidden (Boolean, default: false)

### Section
- name (String, required, unique)
- hidden (Boolean, default: false)

## Development Workflow

1. Start backend: `npm run dev` (in backend folder)
2. Start frontend: `npm start` (in frontend folder)
3. Access:
   - Website: http://localhost:3000
   - Admin: http://localhost:3000/admin
   - API Health: http://localhost:5000/api/health

## Next Steps

1. Add authentication (JWT)
2. Implement file upload functionality
3. Add form validation
4. Create CRUD forms in admin panel
5. Add email notifications
6. Connect payment gateway
7. Add image optimization

## Troubleshooting

### MongoDB Connection Issues
- Verify connection string
- Check network access in MongoDB Atlas
- Ensure cluster is running

### API Not Responding
- Check backend is running on port 5000
- Verify CORS is enabled
- Check network tab in browser devtools

### Frontend Not Loading
- Ensure `REACT_APP_API_URL` is set
- Clear node_modules and reinstall: `rm -rf node_modules && npm install`
- Check React version compatibility

## License

MIT License - 2026 NetZone
