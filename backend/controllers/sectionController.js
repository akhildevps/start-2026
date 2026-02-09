const Section = require('../models/Section');

// Get all sections visibility
exports.getSections = async (req, res) => {
    try {
        const sections = await Section.find();
        res.status(200).json({ success: true, data: sections });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// Get single section
exports.getSection = async (req, res) => {
    try {
        const section = await Section.findById(req.params.id);
        if (!section) {
            return res.status(404).json({ success: false, message: 'Section not found' });
        }
        res.status(200).json({ success: true, data: section });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// Set section visibility
exports.setSectionVisibility = async (req, res) => {
    try {
        const { name, hidden } = req.body;
        let section = await Section.findOne({ name });
        
        if (!section) {
            section = await Section.create({ name, hidden });
        } else {
            section.hidden = hidden;
            await section.save();
        }
        
        res.status(200).json({ success: true, data: section });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};

// Get section by name
exports.getSectionByName = async (req, res) => {
    try {
        const section = await Section.findOne({ name: req.params.name });
        if (!section) {
            return res.status(404).json({ success: false, message: 'Section not found' });
        }
        res.status(200).json({ success: true, data: section });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// Add an item (e.g., carousel slide) to a named section
exports.addSectionItem = async (req, res) => {
    try {
        const { name } = req.params;
        const { imageUrl, caption, link, order, hidden } = req.body || {};

        // Basic validation
        if (!imageUrl) {
            return res.status(400).json({ success: false, message: 'imageUrl is required for a carousel item' });
        }

        let section = await Section.findOne({ name });
        if (!section) {
            section = await Section.create({ name, items: [] });
        }

        const newItem = { imageUrl, caption, link, order: order || 0, hidden: !!hidden };
        section.items.push(newItem);
        await section.save();

        const added = section.items[section.items.length - 1];
        res.status(201).json({ success: true, data: added });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};

// Update an item within a named section
exports.updateSectionItem = async (req, res) => {
    try {
        const { name, itemId } = req.params;
        const { imageUrl, caption, link, order, hidden } = req.body;

        const section = await Section.findOne({ name });
        if (!section) return res.status(404).json({ success: false, message: 'Section not found' });

        const item = section.items.id(itemId);
        if (!item) return res.status(404).json({ success: false, message: 'Item not found' });

        if (imageUrl !== undefined) item.imageUrl = imageUrl;
        if (caption !== undefined) item.caption = caption;
        if (link !== undefined) item.link = link;
        if (order !== undefined) item.order = order;
        if (hidden !== undefined) item.hidden = hidden;

        await section.save();
        res.status(200).json({ success: true, data: item });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};

// Delete an item from a named section
exports.deleteSectionItem = async (req, res) => {
    try {
        const { name, itemId } = req.params;
        const section = await Section.findOne({ name });
        if (!section) return res.status(404).json({ success: false, message: 'Section not found' });

        const item = section.items.id(itemId);
        if (!item) return res.status(404).json({ success: false, message: 'Item not found' });

        item.remove();
        await section.save();
        res.status(200).json({ success: true, message: 'Item removed' });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};
