const Feature = require('../models/Feature');

// Get all features
exports.getFeatures = async (req, res) => {
    try {
        const features = await Feature.find();
        res.status(200).json({ success: true, data: features });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// Get single feature
exports.getFeature = async (req, res) => {
    try {
        const feature = await Feature.findById(req.params.id);
        if (!feature) {
            return res.status(404).json({ success: false, message: 'Feature not found' });
        }
        res.status(200).json({ success: true, data: feature });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// Create new feature
exports.createFeature = async (req, res) => {
    try {
        const { title, description, icon } = req.body;
        const feature = await Feature.create({ title, description, icon });
        res.status(201).json({ success: true, data: feature });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};

// Update feature
exports.updateFeature = async (req, res) => {
    try {
        const feature = await Feature.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        });
        if (!feature) {
            return res.status(404).json({ success: false, message: 'Feature not found' });
        }
        res.status(200).json({ success: true, data: feature });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};

// Delete feature
exports.deleteFeature = async (req, res) => {
    try {
        const feature = await Feature.findByIdAndDelete(req.params.id);
        if (!feature) {
            return res.status(404).json({ success: false, message: 'Feature not found' });
        }
        res.status(200).json({ success: true, message: 'Feature deleted successfully' });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// Toggle feature visibility
exports.toggleFeatureVisibility = async (req, res) => {
    try {
        const feature = await Feature.findById(req.params.id);
        if (!feature) {
            return res.status(404).json({ success: false, message: 'Feature not found' });
        }
        feature.hidden = !feature.hidden;
        await feature.save();
        res.status(200).json({ success: true, data: feature });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};
