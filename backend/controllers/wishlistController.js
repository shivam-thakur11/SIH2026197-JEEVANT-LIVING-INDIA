const mongoose = require('mongoose');
const Wishlist = require('../models/Wishlist');
const Product = require('../models/Product');
const AppError = require('../utils/AppError');
const { isDBConnected } = require('../config/db');

/**
 * GET /api/wishlist
 * Query: userId, page, limit
 */
const getWishlist = async (req, res, next) => {
  try {
    const { userId, page = 1, limit = 50 } = req.query;

    if (!userId) {
      return res.json({
        success: true,
        isLiveDatabase: isDBConnected(),
        data: [],
        ids: [],
        pagination: { page: 1, limit, total: 0, totalPages: 1 },
      });
    }

    if (isDBConnected()) {
      const filter = {};
      if (mongoose.Types.ObjectId.isValid(userId)) {
        filter.$or = [{ user: userId }, { userId: String(userId) }];
      } else {
        filter.userId = String(userId);
      }

      const p = Math.max(1, parseInt(page, 10) || 1);
      const l = Math.max(1, parseInt(limit, 10) || 50);

      const total = await Wishlist.countDocuments(filter);
      const items = await Wishlist.find(filter)
        .populate('product')
        .sort({ createdAt: -1 })
        .skip((p - 1) * l)
        .limit(l);

      const ids = items.map((item) => item.productId);

      return res.json({
        success: true,
        isLiveDatabase: true,
        data: items,
        ids,
        pagination: {
          page: p,
          limit: l,
          total,
          totalPages: Math.ceil(total / l) || 1,
        },
      });
    }

    // Offline demo mode fallback
    return res.json({
      success: true,
      isLiveDatabase: false,
      data: [],
      ids: [],
      pagination: { page: 1, limit: 50, total: 0, totalPages: 1 },
    });
  } catch (error) {
    next(error);
  }
};

/**
 * POST /api/wishlist/toggle
 * Body: { userId, productId }
 */
const toggleWishlist = async (req, res, next) => {
  try {
    const { userId, productId } = req.body;

    if (!userId || !productId) {
      return next(new AppError('userId and productId are required.', 400));
    }

    if (isDBConnected()) {
      const isUserObj = mongoose.Types.ObjectId.isValid(userId);
      const isProdObj = mongoose.Types.ObjectId.isValid(productId);

      const findQuery = {
        $or: [
          { userId: String(userId), productId: String(productId) },
          ...(isUserObj && isProdObj ? [{ user: userId, product: productId }] : []),
        ],
      };

      const existing = await Wishlist.findOne(findQuery);

      if (existing) {
        await Wishlist.findByIdAndDelete(existing._id);
        return res.json({
          success: true,
          isLiveDatabase: true,
          saved: false,
          productId: String(productId),
          message: 'Item removed from wishlist',
        });
      }

      // Find product details
      let prod = null;
      if (isProdObj) {
        prod = await Product.findById(productId);
      }
      if (!prod) {
        prod = await Product.findOne({
          $or: [
            { _id: isProdObj ? productId : null },
            { id: String(productId) },
            { title: new RegExp(`^${productId}$`, 'i') },
          ],
        });
      }

      const created = await Wishlist.create({
        user: isUserObj ? userId : null,
        userId: String(userId),
        product: prod && prod._id ? prod._id : null,
        productId: String(productId),
        productName: prod ? (prod.title || prod.name) : 'Handicraft Item',
        price: prod ? (prod.price || 0) : 0,
        category: prod ? prod.category : '',
        state: prod ? prod.state : '',
        image: prod ? prod.image : '',
      });

      return res.json({
        success: true,
        isLiveDatabase: true,
        saved: true,
        productId: String(productId),
        data: created,
        message: 'Item saved to wishlist',
      });
    }

    // Offline demo mode fallback
    return res.json({
      success: true,
      isLiveDatabase: false,
      saved: true,
      productId: String(productId),
      message: 'Item toggled in offline demo mode',
    });
  } catch (error) {
    next(error);
  }
};

/**
 * DELETE /api/wishlist
 * Query: userId
 */
const clearWishlist = async (req, res, next) => {
  try {
    const { userId } = req.query;
    if (!userId) {
      return next(new AppError('userId is required', 400));
    }

    if (isDBConnected()) {
      const isUserObj = mongoose.Types.ObjectId.isValid(userId);
      await Wishlist.deleteMany({
        $or: [{ userId: String(userId) }, ...(isUserObj ? [{ user: userId }] : [])],
      });

      return res.json({
        success: true,
        isLiveDatabase: true,
        message: 'Wishlist cleared',
      });
    }

    return res.json({
      success: true,
      isLiveDatabase: false,
      message: 'Wishlist cleared in demo mode',
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getWishlist,
  toggleWishlist,
  clearWishlist,
};
