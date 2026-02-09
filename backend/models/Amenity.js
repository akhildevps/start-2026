const mongoose = require('mongoose');

const amenitySchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String },
    imageUrl: { type: String },
    hidden: { type: Boolean, default: false },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Amenity', amenitySchema);
