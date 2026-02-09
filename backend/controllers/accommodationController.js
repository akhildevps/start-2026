const Accommodation = require('../models/Accommodation');

// Get all accommodations
exports.getAccommodations = async (req, res) => {
    try {
        const accommodations = await Accommodation.find();
        res.status(200).json({ success: true, data: accommodations });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// Get single accommodation
exports.getAccommodation = async (req, res) => {
    try {
        const accommodation = await Accommodation.findById(req.params.id);
        if (!accommodation) {
            return res.status(404).json({ success: false, message: 'Accommodation not found' });
        }
        res.status(200).json({ success: true, data: accommodation });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// Create new accommodation
exports.createAccommodation = async (req, res) => {
    try {
        const { type, price, description, imageUrl } = req.body;
        const accommodation = await Accommodation.create({ type, price, description, imageUrl });
        res.status(201).json({ success: true, data: accommodation });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};

// Update accommodation
exports.updateAccommodation = async (req, res) => {
    try {
        const accommodation = await Accommodation.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        });
        if (!accommodation) {
            return res.status(404).json({ success: false, message: 'Accommodation not found' });
        }
        res.status(200).json({ success: true, data: accommodation });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};

// Delete accommodation
exports.deleteAccommodation = async (req, res) => {
    try {
        const accommodation = await Accommodation.findByIdAndDelete(req.params.id);
        if (!accommodation) {
            return res.status(404).json({ success: false, message: 'Accommodation not found' });
        }
        res.status(200).json({ success: true, message: 'Accommodation deleted successfully' });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// Toggle accommodation visibility
exports.toggleAccommodationVisibility = async (req, res) => {
    try {
        const accommodation = await Accommodation.findById(req.params.id);
        if (!accommodation) {
            return res.status(404).json({ success: false, message: 'Accommodation not found' });
        }
        accommodation.hidden = !accommodation.hidden;
        await accommodation.save();
        res.status(200).json({ success: true, data: accommodation });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};
