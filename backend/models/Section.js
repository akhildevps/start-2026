const mongoose = require('mongoose');

const sectionSchema = new mongoose.Schema({
    name: { type: String, required: true, unique: true },
    hidden: { type: Boolean, default: false },
    title: { type: String },
    // Generic items for sections (e.g., carousel slides)
    items: [
        {
            imageUrl: { type: String },
            caption: { type: String },
            link: { type: String },
            order: { type: Number, default: 0 },
            hidden: { type: Boolean, default: false },
            createdAt: { type: Date, default: Date.now }
        }
    ],
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Section', sectionSchema);
