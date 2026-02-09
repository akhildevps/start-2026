const mongoose = require('mongoose');

const MONGODB_URI = process.env.MONGODB_URI ;

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(MONGODB_URI);
        console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
        return conn;
    } catch (error) {
        console.error(`❌ MongoDB Connection Error: ${error.message}`);
        if (error.message.includes('ENOTFOUND')) {
            console.error('⚠️  Check your .env file. You are likely using a placeholder "cluster.mongodb.net" address instead of your actual database host.');
        }
        process.exit(1);
    }
};

module.exports = connectDB;
