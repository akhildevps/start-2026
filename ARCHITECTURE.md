# Architecture Overview

## Full Stack Architecture - Sanctuary Cove

```
┌─────────────────────────────────────────────────────────────────┐
│                    CLIENT (Browser)                              │
│                                                                   │
│  ┌──────────────────────────────────────────────────────────┐   │
│  │  React App (http://localhost:3000)                       │   │
│  │  ├── Home Page (Dynamic Content)                         │   │
│  │  ├── Admin Dashboard (/admin)                            │   │
│  │  └── Navigation                                          │   │
│  └──────────────────────────────────────────────────────────┘   │
│                           ↑ HTTP Requests                        │
│                           ↓ JSON Responses                       │
└────────────────────────────┼──────────────────────────────────────┘
                             │ Axios API Client
                             │
┌────────────────────────────┼──────────────────────────────────────┐
│                    NETWORK                                        │
│                  (Internet/Localhost)                             │
└────────────────────────────┼──────────────────────────────────────┘
                             │
                             ↓
┌─────────────────────────────────────────────────────────────────┐
│                  EXPRESS SERVER                                  │
│            (http://localhost:5000)                               │
│                                                                   │
│  ┌──────────────────────────────────────────────────────────┐   │
│  │  API Routes                                              │   │
│  │  ├── /api/heroes          (CRUD for hero slides)        │   │
│  │  ├── /api/features        (CRUD for features)           │   │
│  │  ├── /api/accommodations  (CRUD for rooms)              │   │
│  │  ├── /api/amenities       (CRUD for amenities)          │   │
│  │  ├── /api/bookings        (CRUD for booking info)       │   │
│  │  ├── /api/footers         (CRUD for footer links)       │   │
│  │  └── /api/sections        (Manage section visibility)   │   │
│  └──────────────────────────────────────────────────────────┘   │
│                          ↓                                        │
│  ┌──────────────────────────────────────────────────────────┐   │
│  │  Controllers (Business Logic)                            │   │
│  │  ├── heroController                                     │   │
│  │  ├── featureController                                  │   │
│  │  ├── accommodationController                            │   │
│  │  └── ... (more controllers)                             │   │
│  └──────────────────────────────────────────────────────────┘   │
│                          ↓                                        │
│  ┌──────────────────────────────────────────────────────────┐   │
│  │  Mongoose Models (Data Schemas)                          │   │
│  │  ├── Hero Schema                                         │   │
│  │  ├── Feature Schema                                      │   │
│  │  ├── Accommodation Schema                                │   │
│  │  └── ... (more schemas)                                  │   │
│  └──────────────────────────────────────────────────────────┘   │
│                          ↓                                        │
└─────────────────────────────────────────────────────────────────┘
                             │
                             ↓
        ┌────────────────────────────────────────┐
        │      MONGODB ATLAS (Cloud)             │
        │  user anem+srv://pwd:...          │
        │                                        │
        │  Collections:                          │
        │  ├── heroes                            │
        │  ├── features                          │
        │  ├── accommodations                    │
        │  ├── amenities                         │
        │  ├── bookings                          │
        │  ├── footers                           │
        │  └── sections                          │
        └────────────────────────────────────────┘
```

## Data Flow

### Reading Data
1. React Component → API Service (axios)
2. HTTP GET Request → Express Route
3. Route → Controller → Mongoose Query
4. MongoDB Returns Data
5. Controller Sends JSON Response
6. React Updates State & Re-renders

### Creating/Updating Data
1. Admin Form Input → API Service
2. HTTP POST/PUT Request → Express Route
3. Route → Controller → Mongoose Save
4. MongoDB Confirms Write
5. Controller Sends Confirmation Response
6. React Updates UI & Fetches Fresh Data

## API Request-Response Cycle

```
REQUEST:
────────
POST /api/heroes
{
  "title": "Welcome to Paradise",
  "subtitle": "Experience Luxury"
}

RESPONSE:
─────────
{
  "success": true,
  "data": {
    "_id": "507f1f77bcf86cd799439011",
    "title": "Welcome to Paradise",
    "subtitle": "Experience Luxury",
    "hidden": false,
    "createdAt": "2026-02-06T10:30:00Z",
    "updatedAt": "2026-02-06T10:30:00Z"
  }
}
```

## Component Hierarchy (Frontend)

```
App.js (Router)
├── Home Page
│   ├── Navigation
│   ├── HeroSection (from API)
│   ├── FeaturesSection (from API)
│   ├── AccommodationsSection (from API)
│   ├── AmenitiesSection (from API)
│   ├── BookingSection (from API)
│   └── Footer
│
└── AdminDashboard
    ├── Navigation
    ├── Tab Navigation
    └── Content Sections
        ├── HeroList (with edit/delete/toggle)
        ├── FeatureList
        ├── AccommodationList
        ├── AmenityList
        ├── BookingList
        └── FooterList
```

## Backend Structure

```
backend/
├── server.js          ← Main Express app & route setup
├── package.json       ← Dependencies
├── .env               ← Environment variables
│
├── config/
│   └── database.js    ← MongoDB connection
│
├── models/            ← Mongoose Schemas
│   ├── Hero.js
│   ├── Feature.js
│   ├── Accommodation.js
│   ├── Amenity.js
│   ├── Booking.js
│   ├── Footer.js
│   └── Section.js
│
├── controllers/       ← Business Logic
│   ├── heroController.js
│   ├── featureController.js
│   ├── accommodationController.js
│   ├── amenityController.js
│   ├── bookingController.js
│   ├── footerController.js
│   └── sectionController.js
│
├── routes/            ← API Endpoints
│   ├── heroRoutes.js
│   ├── featureRoutes.js
│   ├── accommodationRoutes.js
│   ├── amenityRoutes.js
│   ├── bookingRoutes.js
│   ├── footerRoutes.js
│   └── sectionRoutes.js
│
└── middleware/        ← Express Middleware
    └── (auth, error handling, etc.)
```

## Technology Choices

### Why Node.js + Express?
- ✅ Fast, scalable server
- ✅ JavaScript (same as frontend)
- ✅ Rich ecosystem (npm)
- ✅ Great for REST APIs

### Why React?
- ✅ Component-based architecture
- ✅ Fast rendering (virtual DOM)
- ✅ Large community
- ✅ Easy state management

### Why MongoDB?
- ✅ Flexible schema (good for varying data)
- ✅ Cloud hosting (MongoDB Atlas)
- ✅ NoSQL (JSON-like documents)
- ✅ Scalable

## Deployment Strategy

```
Frontend (React)          Backend (Node.js)         Database
    ↓                          ↓                      ↓
Vercel / Netlify      Heroku / Railway        MongoDB Atlas
  (CDN Hosted)       (Containerized)        (Cloud Hosted)
```

## Environment Variables

### Backend (.env)
```
MONGODB_URI=<mongo_connection_string>
PORT=5000
NODE_ENV=development
CORS_ORIGIN=http://localhost:3000
```

### Frontend (.env)
```
REACT_APP_API_URL=http://localhost:5000/api
```

## Authentication Flow (Optional Future Enhancement)

```
1. User Login (Admin)
   ↓
2. Backend validates credentials
   ↓
3. Backend generates JWT token
   ↓
4. Frontend stores JWT in localStorage
   ↓
5. Frontend includes JWT in API requests
   ↓
6. Backend verifies JWT for protected routes
```

## Error Handling

### Backend
- Try-catch blocks in controllers
- Mongoose validation errors
- HTTP status codes (200, 201, 400, 404, 500)
- Standard error response format

### Frontend
- Error boundaries (future)
- Toast notifications
- Fallback UI
- Logging for debugging

---

**This architecture is scalable, maintainable, and follows industry best practices!**
