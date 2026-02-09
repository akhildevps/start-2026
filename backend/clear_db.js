const mongoose = require('mongoose');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '../.env') });

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
    console.error('❌ MONGODB_URI is missing in .env file');
    process.exit(1);
}

const clearDB = async () => {
    try {
        const conn = await mongoose.connect(MONGODB_URI);
        console.log(`✅ MongoDB Connected: ${conn.connection.host}`);

        // Get all collections
        const collections = await mongoose.connection.db.collections();

        if (collections.length === 0) {
             console.log('⚠️  No collections found to clear.');
        } else {
            for (let collection of collections) {
                // Delete all documents in the collection
                await collection.deleteMany({});
                console.log(`🗑️  Cleared collection: ${collection.collectionName}`);
            }
            console.log('✨ All data removed successfully!');
        }
        
        process.exit(0);
    } catch (error) {
        console.error(`❌ Error clearing database: ${error.message}`);
        process.exit(1);
    }
};

clearDB();
