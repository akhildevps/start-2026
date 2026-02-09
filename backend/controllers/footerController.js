const Footer = require('../models/Footer');

// Get all footer links
exports.getFooters = async (req, res) => {
    try {
        const footers = await Footer.find();
        res.status(200).json({ success: true, data: footers });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// Get single footer link
exports.getFooter = async (req, res) => {
    try {
        const footer = await Footer.findById(req.params.id);
        if (!footer) {
            return res.status(404).json({ success: false, message: 'Footer not found' });
        }
        res.status(200).json({ success: true, data: footer });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// Create new footer link
exports.createFooter = async (req, res) => {
    try {
        const { title, url } = req.body;
        const footer = await Footer.create({ title, url });
        res.status(201).json({ success: true, data: footer });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};

// Update footer link
exports.updateFooter = async (req, res) => {
    try {
        const footer = await Footer.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        });
        if (!footer) {
            return res.status(404).json({ success: false, message: 'Footer not found' });
        }
        res.status(200).json({ success: true, data: footer });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};

// Delete footer link
exports.deleteFooter = async (req, res) => {
    try {
        const footer = await Footer.findByIdAndDelete(req.params.id);
        if (!footer) {
            return res.status(404).json({ success: false, message: 'Footer not found' });
        }
        res.status(200).json({ success: true, message: 'Footer deleted successfully' });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// Toggle footer visibility
exports.toggleFooterVisibility = async (req, res) => {
    try {
        const footer = await Footer.findById(req.params.id);
        if (!footer) {
            return res.status(404).json({ success: false, message: 'Footer not found' });
        }
        footer.hidden = !footer.hidden;
        await footer.save();
        res.status(200).json({ success: true, data: footer });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};
