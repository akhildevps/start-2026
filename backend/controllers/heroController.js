const Hero = require('../models/Hero');

// Get all hero slides
exports.getHeroes = async (req, res) => {
    try {
        const heroes = await Hero.find();
        res.status(200).json({ success: true, data: heroes });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// Get single hero
exports.getHero = async (req, res) => {
    try {
        const hero = await Hero.findById(req.params.id);
        if (!hero) {
            return res.status(404).json({ success: false, message: 'Hero not found' });
        }
        res.status(200).json({ success: true, data: hero });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// Create new hero
exports.createHero = async (req, res) => {
    try {
        const { title, subtitle, imageUrl } = req.body;
        const hero = await Hero.create({ title, subtitle, imageUrl });
        res.status(201).json({ success: true, data: hero });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};

// Update hero
exports.updateHero = async (req, res) => {
    try {
        const hero = await Hero.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        });
        if (!hero) {
            return res.status(404).json({ success: false, message: 'Hero not found' });
        }
        res.status(200).json({ success: true, data: hero });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};

// Delete hero
exports.deleteHero = async (req, res) => {
    try {
        const hero = await Hero.findByIdAndDelete(req.params.id);
        if (!hero) {
            return res.status(404).json({ success: false, message: 'Hero not found' });
        }
        res.status(200).json({ success: true, message: 'Hero deleted successfully' });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// Toggle hero visibility
exports.toggleHeroVisibility = async (req, res) => {
    try {
        const hero = await Hero.findById(req.params.id);
        if (!hero) {
            return res.status(404).json({ success: false, message: 'Hero not found' });
        }
        hero.hidden = !hero.hidden;
        await hero.save();
        res.status(200).json({ success: true, data: hero });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};
