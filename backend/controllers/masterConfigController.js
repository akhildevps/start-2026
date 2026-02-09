const MasterConfig = require('../models/MasterConfig');

const DEFAULT_SECTIONS = [
    { name: 'carousel', displayName: 'Carousel', menuName: '', hideFromMenu: false },
    { name: 'heroes', displayName: 'Heroes', menuName: '', hideFromMenu: false },
    { name: 'features', displayName: 'Features', menuName: '', hideFromMenu: false },
    { name: 'accommodations', displayName: 'Accommodations', menuName: '', hideFromMenu: false },
    { name: 'amenities', displayName: 'Amenities', menuName: '', hideFromMenu: false },
    { name: 'bookings', displayName: 'Bookings', menuName: '', hideFromMenu: false },
    { name: 'footers', displayName: 'Footers', menuName: '', hideFromMenu: false },
];

// Get master config (singleton)
exports.getConfig = async (req, res) => {
    try {
        let cfg = await MasterConfig.findOne();
        if (!cfg) {
            cfg = await MasterConfig.create({ sections: DEFAULT_SECTIONS });
        } else if (!cfg.sections || cfg.sections.length === 0) {
            cfg.sections = DEFAULT_SECTIONS;
            await cfg.save();
        }
        res.status(200).json({ success: true, data: cfg });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// Update master config
exports.updateConfig = async (req, res) => {
    try {
        let cfg = await MasterConfig.findOne();
        const { siteName, tabName, footerName, iconUrl, menuTabs, sections } = req.body;
        if (!cfg) {
            cfg = await MasterConfig.create({ siteName, tabName, footerName, iconUrl, menuTabs, sections: sections || DEFAULT_SECTIONS });
        } else {
            if (siteName !== undefined) cfg.siteName = siteName;
            if (tabName !== undefined) cfg.tabName = tabName;
            if (footerName !== undefined) cfg.footerName = footerName;
            if (iconUrl !== undefined) cfg.iconUrl = iconUrl;
            if (menuTabs !== undefined) cfg.menuTabs = menuTabs;
            if (sections !== undefined) cfg.sections = sections;
            cfg.updatedAt = Date.now();
            await cfg.save();
        }
        res.status(200).json({ success: true, data: cfg });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};

// Update single section in config
exports.updateSection = async (req, res) => {
    try {
        const { sectionName } = req.params;
        const { displayName, menuName, hidden, hideFromMenu } = req.body;
        
        let cfg = await MasterConfig.findOne();
        if (!cfg) {
            cfg = await MasterConfig.create({ sections: DEFAULT_SECTIONS });
        }

        // Find and update section
        const section = cfg.sections.find(s => s.name === sectionName);
        if (section) {
            if (displayName !== undefined) section.displayName = displayName;
            if (menuName !== undefined) section.menuName = menuName;
            if (hidden !== undefined) section.hidden = hidden;
            if (hideFromMenu !== undefined) section.hideFromMenu = hideFromMenu;
        }

        cfg.updatedAt = Date.now();
        await cfg.save();
        res.status(200).json({ success: true, data: cfg });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};
