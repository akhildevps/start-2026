const mongoose = require('mongoose');

const accommodationSchema = new mongoose.Schema({
    type: { type: String, required: true },
    price: { type: String, required: true },
    description: { type: String },
    imageUrl: { type: String },
    hidden: { type: Boolean, default: false },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Accommodation', accommodationSchema);
