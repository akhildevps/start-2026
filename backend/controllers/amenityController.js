const Amenity = require('../models/Amenity');

// Get all amenities
exports.getAmenities = async (req, res) => {
    try {
        const amenities = await Amenity.find();
        res.status(200).json({ success: true, data: amenities });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// Get single amenity
exports.getAmenity = async (req, res) => {
    try {
        const amenity = await Amenity.findById(req.params.id);
        if (!amenity) {
            return res.status(404).json({ success: false, message: 'Amenity not found' });
        }
        res.status(200).json({ success: true, data: amenity });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// Create new amenity
exports.createAmenity = async (req, res) => {
    try {
        const { name, description, imageUrl } = req.body;
        const amenity = await Amenity.create({ name, description, imageUrl });
        res.status(201).json({ success: true, data: amenity });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};

// Update amenity
exports.updateAmenity = async (req, res) => {
    try {
        const amenity = await Amenity.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        });
        if (!amenity) {
            return res.status(404).json({ success: false, message: 'Amenity not found' });
        }
        res.status(200).json({ success: true, data: amenity });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};

// Delete amenity
exports.deleteAmenity = async (req, res) => {
    try {
        const amenity = await Amenity.findByIdAndDelete(req.params.id);
        if (!amenity) {
            return res.status(404).json({ success: false, message: 'Amenity not found' });
        }
        res.status(200).json({ success: true, message: 'Amenity deleted successfully' });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// Toggle amenity visibility
exports.toggleAmenityVisibility = async (req, res) => {
    try {
        const amenity = await Amenity.findById(req.params.id);
        if (!amenity) {
            return res.status(404).json({ success: false, message: 'Amenity not found' });
        }
        amenity.hidden = !amenity.hidden;
        await amenity.save();
        res.status(200).json({ success: true, data: amenity });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};
