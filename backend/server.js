// Load environment variables from .env file FIRST
require('dotenv').config();

const express = require('express');
const cors = require('cors');
const morgan = require('morgan');

const connectDB = require('./config/db');
const { errorMiddleware } = require('./middleware/errorMiddleware');

// Route imports
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const artisanRoutes = require('./routes/artisanRoutes');
const traditionRoutes = require('./routes/traditionRoutes');
const workshopRoutes = require('./routes/workshopRoutes');
const productRoutes = require('./routes/productRoutes');
const bookingRoutes = require('./routes/bookingRoutes');
const orderRoutes = require('./routes/orderRoutes');
const savedCultureRoutes = require('./routes/savedCultureRoutes');
const searchRoutes = require('./routes/searchRoutes');
const reviewRoutes = require('./routes/reviewRoutes');
const paymentRoutes = require('./routes/paymentRoutes');
const reportRoutes = require('./routes/reportRoutes');
const dashboardRoutes = require('./routes/dashboardRoutes');
const aiRoutes = require('./routes/aiRoutes');
const notificationRoutes = require('./routes/notificationRoutes');
const wishlistRoutes = require('./routes/wishlistRoutes');
const regionRoutes = require('./routes/regionRoutes');

// Initialize MongoDB connection
connectDB();

const app = express();

// ─── Middleware ─────────────────────────────────────────────────────────────

// CORS Configuration — support both localhost:5173 and localhost:5174 dynamically
const allowedOrigins = [
  'http://localhost:5173',
  'http://localhost:5174',
  'http://127.0.0.1:5173',
  'http://127.0.0.1:5174',
  process.env.CLIENT_URL,
  process.env.FRONTEND_URL
].filter(Boolean);

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin) || /^http:\/\/localhost:\d+$/.test(origin)) {
        callback(null, true);
      } else {
        callback(null, true);
      }
    },
    credentials: true,
  })
);

// Body Parsers
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// HTTP Request Logger
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// ─── Health Check Endpoint ──────────────────────────────────────────────────
// Returns { "success": true, "message": "JEEVANT API is running" }
app.get('/api/health', (req, res) => {
  const dbActive = connectDB.isDBConnected ? connectDB.isDBConnected() : false;
  res.status(200).json({
    success: true,
    message: 'JEEVANT API is running',
    database: dbActive ? 'MongoDB Connected' : 'Offline Demo Mode',
    isLiveDatabase: dbActive,
    version: '1.0.0',
    theme: 'Heritage & Culture (SIH 2026)',
    problemStatement: '26197 - Student Innovation',
    timestamp: new Date().toISOString(),
  });
});

// ─── API Routes ─────────────────────────────────────────────────────────────
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/artisans', artisanRoutes);
app.use('/api/traditions', traditionRoutes);
app.use('/api/workshops', workshopRoutes);
app.use('/api/products', productRoutes);
app.use('/api/bookings', bookingRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/saved-cultures', savedCultureRoutes);
app.use('/api/search', searchRoutes);
app.use('/api/reviews', reviewRoutes);
app.use('/api/payments', paymentRoutes);
app.use('/api/reports', reportRoutes);
app.use('/api/admin', dashboardRoutes);
app.use('/api/dashboard', dashboardRoutes);
app.use('/api/ai', aiRoutes);
app.use('/api/notifications', notificationRoutes);
app.use('/api/wishlist', wishlistRoutes);
app.use('/api/regions', regionRoutes);

// Handle 404 routes
app.use('*', (req, res) => {
  res.status(404).json({
    success: false,
    message: `API Route ${req.originalUrl} not found on JEEVANT server.`,
  });
});

// ─── Centralized Error Handling ─────────────────────────────────────────────
app.use(errorMiddleware);

// ─── Start Server ────────────────────────────────────────────────────────────
const PORT = process.env.PORT || 5000;

// Process safety handlers
process.on('uncaughtException', (err) => {
  console.error('💥 Uncaught Exception:', err);
});
process.on('unhandledRejection', (reason, promise) => {
  console.error('💥 Unhandled Rejection at:', promise, 'reason:', reason);
});

if (process.env.NODE_ENV !== 'test') {
  app.listen(PORT, () => {
    console.log(`========================================================`);
    console.log(`🚀 JEEVANT: LIVING INDIA Backend Server Running`);
    console.log(`📍 URL: http://localhost:${PORT}`);
    console.log(`🌐 Allowed Clients: ${allowedOrigins.join(', ')}`);
    console.log(`📦 Mode: ${process.env.NODE_ENV || 'development'}`);
    console.log(`========================================================`);
  });
}

module.exports = app;
