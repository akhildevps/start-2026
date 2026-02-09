const mongoose = require('mongoose');

const footerSchema = new mongoose.Schema({
    title: { type: String, required: true },
    url: { type: String, required: true },
    hidden: { type: Boolean, default: false },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Footer', footerSchema);
