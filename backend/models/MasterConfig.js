const mongoose = require('mongoose');

const masterConfigSchema = new mongoose.Schema({
    siteName: { type: String, default: 'Sanctuary Cove' },
    tabName: { type: String, default: 'Sanctuary Cove' },
    footerName: { type: String, default: 'Sanctuary Cove Footer' },
    iconUrl: { type: String }, // Favicon/site icon URL
    menuTabs: [{ type: String }],
    sections: [
        {
            name: { type: String }, // e.g., 'carousel', 'heroes', 'features'
            displayName: { type: String }, // Display name/title in the section header
            menuName: { type: String }, // Name shown in menu (defaults to displayName if not set)
            hidden: { type: Boolean, default: false }, // Hide entire section from view and menu
            hideFromMenu: { type: Boolean, default: false } // Hide from menu only, but still show on page
        }
    ],
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('MasterConfig', masterConfigSchema);
