const mongoose = require('mongoose');
const dns = require('dns');

// Configure public DNS servers to resolve MongoDB Atlas SRV records reliably on Windows & various ISPs
try {
  dns.setServers(['8.8.8.8', '1.1.1.1']);
} catch (e) {
  // Gracefully continue if environment restricts custom DNS servers
}

/**
 * Returns true if Mongoose is connected to a live MongoDB instance (readyState === 1).
 */
const isDBConnected = () => mongoose.connection.readyState === 1;

/**
 * Connects to MongoDB using Mongoose.
 * Connection string is read strictly from process.env.MONGO_URI (or MONGODB_URI).
 * Clear success or failure messages are logged.
 */
const connectDB = async () => {
  const uri = process.env.MONGO_URI || process.env.MONGODB_URI;

  if (!uri) {
    console.warn('⚠️  MONGO_URI is not defined in environment variables.');
    console.warn('   Please set MONGO_URI in your backend/.env file to enable live MongoDB persistence.');
    console.warn('   🚀 Running backend in Offline Demo Mode (In-Memory Cultural Registry active).');
    return null;
  }

  try {
    // Disable command buffering so failed queries fail immediately instead of hanging
    mongoose.set('bufferCommands', false);

    const conn = await mongoose.connect(uri, {
      serverSelectionTimeoutMS: 5000,
    });
    console.log(`✅ MongoDB Connected Successfully: ${conn.connection.host}`);
    console.log(`🗄️  Database Name: ${conn.connection.name}`);
    return conn;
  } catch (error) {
    console.error(`❌ MongoDB Connection Error: ${error.message}`);
    console.error('   Please check your MONGO_URI string or ensure local mongod service is running.');
    console.warn('   🚀 Falling back to Offline Demo Mode (In-Memory Cultural Registry active).');
    return null;
  }
};

connectDB.isDBConnected = isDBConnected;
module.exports = connectDB;
module.exports.connectDB = connectDB;
module.exports.isDBConnected = isDBConnected;
