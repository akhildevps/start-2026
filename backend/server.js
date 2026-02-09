const express = require('express');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '../.env') }); // Load .env file from root
const cors = require('cors');
const connectDB = require('./config/database');

// Import routes
const heroRoutes = require('./routes/heroRoutes');
const featureRoutes = require('./routes/featureRoutes');
const accommodationRoutes = require('./routes/accommodationRoutes');
const amenityRoutes = require('./routes/amenityRoutes');
const bookingRoutes = require('./routes/bookingRoutes');
const footerRoutes = require('./routes/footerRoutes');
const sectionRoutes = require('./routes/sectionRoutes');
const masterConfigRoutes = require('./routes/masterConfigRoutes');
const uploadRoutes = require('./routes/uploadRoutes');

// Initialize Express app
const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// CORS Configuration
const corsOptions = {
    origin: process.env.FRONTEND_URL || 'http://localhost:3000',
    credentials: true,
};
app.use(cors(corsOptions));

// Serve static files from project `images` folder (start-2026/images)
app.use('/images', express.static(path.join(__dirname, '../images')));

// Connect to MongoDB
connectDB();

// API Routes
app.use('/api/heroes', heroRoutes);
app.use('/api/features', featureRoutes);
app.use('/api/accommodations', accommodationRoutes);
app.use('/api/amenities', amenityRoutes);
app.use('/api/bookings', bookingRoutes);
app.use('/api/footers', footerRoutes);
app.use('/api/sections', sectionRoutes);
app.use('/api/config', masterConfigRoutes);
app.use('/api/upload', uploadRoutes);

// Health check route
app.get('/api/health', (req, res) => {
    res.status(200).json({ success: true, message: 'Server is running' });
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ success: false, message: 'Internal server error' });
});

// 404 handler for API
app.use((req, res) => {
    res.status(404).json({ success: false, message: 'Route not found' });
});


// Start server
const PORT = process.env.PORT || 5000;
if (process.env.NODE_ENV !== 'production') {
    app.listen(PORT, () => {
        console.log(`✅ Server running on port ${PORT}`);
    });
}

module.exports = app;
