const User = require('../models/User');
const Artisan = require('../models/Artisan');
const Tradition = require('../models/Tradition');
const Workshop = require('../models/Workshop');
const Product = require('../models/Product');
const Booking = require('../models/Booking');
const Order = require('../models/Order');
const Review = require('../models/Review');
const Payment = require('../models/Payment');
const Report = require('../models/Report');
const { isDBConnected } = require('../config/db');
const demoStore = require('../utils/demoStore');

/**
 * GET /api/admin/dashboard
 * Calculates real live statistics from MongoDB database collections,
 * or serves computed demo statistics in Offline Demo Mode.
 */
const getDashboardStats = async (req, res, next) => {
  try {
    if (isDBConnected()) {
      const [
        totalUsers,
        totalArtisans,
        pendingArtisans,
        approvedArtisans,
        totalProducts,
        totalWorkshops,
        totalBookings,
        totalOrders,
        totalTraditions,
        totalReviews,
        pendingReviews,
        totalReports,
        pendingReports,
        allPayments,
        pendingArtisanList,
      ] = await Promise.all([
        User.countDocuments(),
        Artisan.countDocuments(),
        Artisan.countDocuments({ verificationStatus: 'pending' }),
        Artisan.countDocuments({ verificationStatus: { $in: ['approved', 'verified'] } }),
        Product.countDocuments(),
        Workshop.countDocuments(),
        Booking.countDocuments(),
        Order.countDocuments(),
        Tradition.countDocuments(),
        Review.countDocuments(),
        Review.countDocuments({ status: { $in: ['flagged', 'pending'] } }),
        Report.countDocuments(),
        Report.countDocuments({ status: 'under_review' }),
        Payment.find(),
        Artisan.find({ verificationStatus: 'pending' }).sort({ createdAt: -1 }).limit(6),
      ]);

      // Calculate real revenue from payments
      let totalRevenueAmount = 0;
      allPayments.forEach((p) => {
        if (p.amount) {
          totalRevenueAmount += p.amount;
        } else if (p.grossAmount) {
          const cleaned = p.grossAmount.replace(/[^0-9]/g, '');
          if (cleaned) totalRevenueAmount += parseInt(cleaned, 10);
        }
      });

      const formattedRevenue = `₹${totalRevenueAmount.toLocaleString('en-IN')}`;

      return res.json({
        success: true,
        isLiveDatabase: true,
        data: {
          stats: {
            totalUsers,
            totalArtisans,
            pendingVerifications: pendingArtisans,
            pendingArtisans,
            approvedArtisans,
            verifiedArtisans: approvedArtisans,
            totalProducts,
            totalWorkshops,
            totalBookings,
            totalOrders,
            totalTraditions,
            totalReviews,
            pendingReviews,
            totalReports,
            pendingReports,
            totalRevenue: formattedRevenue,
            totalRevenueRaw: totalRevenueAmount,
          },
          pendingArtisans: pendingArtisanList,
          summary: {
            databaseConnected: true,
            mode: 'Live MongoDB',
            timestamp: new Date().toISOString(),
            fairTradeCommission: '0%',
          },
        },
      });
    }

    // Offline / Demo Mode
    const demoData = demoStore.getDashboardStats();
    res.json({
      success: true,
      isLiveDatabase: false,
      data: demoData,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { getDashboardStats };
