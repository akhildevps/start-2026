const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
    email: { type: String, required: true },
    phone: { type: String, required: true },
    address: { type: String },
    hidden: { type: Boolean, default: false },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Booking', bookingSchema);
