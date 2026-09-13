const Product = require('../models/Product');
const AppError = require('../utils/AppError');
const { isDBConnected } = require('../config/db');
const demoStore = require('../utils/demoStore');

/**
 * GET /api/products
 * Query params: category, state, minPrice, maxPrice, artisanId, search, sort, page, limit, giOnly
 */
const getProducts = async (req, res, next) => {
  try {
    if (isDBConnected()) {
      const filter = {};
      const { category, state, minPrice, maxPrice, artisanId, search, giOnly, sort, page = 1, limit = 12 } = req.query;

      if (category && category !== 'All') {
        filter.category = new RegExp(category, 'i');
      }
      if (state && state !== 'All') {
        filter.state = new RegExp(state, 'i');
      }
      if (artisanId) {
        filter.$or = [{ artisan: artisanId }, { artisanId: artisanId }];
      }
      if (giOnly === 'true' || giOnly === true) {
        filter.$or = [{ isGiCertified: true }, { giTagNumber: { $exists: true, $ne: '' } }];
      }
      if (minPrice || maxPrice) {
        filter.price = {};
        if (minPrice) filter.price.$gte = Number(minPrice);
        if (maxPrice) filter.price.$lte = Number(maxPrice);
      }
      if (search) {
        const searchRegex = new RegExp(search, 'i');
        filter.$or = [
          { name: searchRegex },
          { description: searchRegex },
          { category: searchRegex },
          { state: searchRegex },
          { artisanName: searchRegex },
        ];
      }

      const p = Math.max(1, parseInt(page, 10) || 1);
      const l = Math.max(1, parseInt(limit, 10) || 12);
      const total = await Product.countDocuments(filter);
      const totalPages = Math.ceil(total / l) || 1;

      let sortOption = { createdAt: -1 };
      if (sort === 'price-low') sortOption = { price: 1 };
      else if (sort === 'price-high') sortOption = { price: -1 };
      else if (sort === 'rating') sortOption = { rating: -1 };

      const products = await Product.find(filter)
        .populate('artisan', 'name state craft profileImage')
        .sort(sortOption)
        .skip((p - 1) * l)
        .limit(l);

      return res.json({
        success: true,
        isLiveDatabase: true,
        data: products,
        pagination: {
          page: p,
          limit: l,
          total,
          totalPages,
        },
      });
    }

    // Offline Demo Mode
    const result = demoStore.getProducts(req.query);
    res.json({
      success: true,
      isLiveDatabase: false,
      data: result.data,
      pagination: result.pagination,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * GET /api/products/:id
 */
const getProductById = async (req, res, next) => {
  try {
    if (isDBConnected()) {
      const product = await Product.findById(req.params.id).populate('artisan');
      if (!product) {
        return next(new AppError('Product not found.', 404));
      }
      return res.json({ success: true, isLiveDatabase: true, data: product });
    }

    const product = demoStore.getProductById(req.params.id);
    if (!product) {
      return next(new AppError('Product not found.', 404));
    }
    res.json({ success: true, isLiveDatabase: false, data: product });
  } catch (error) {
    next(error);
  }
};

/**
 * POST /api/products
 */
const createProduct = async (req, res, next) => {
  try {
    const productData = { ...req.body };

    if (isDBConnected()) {
      const newProduct = await Product.create(productData);
      return res.status(201).json({ success: true, isLiveDatabase: true, data: newProduct });
    }

    const created = demoStore.createProduct(productData);
    res.status(201).json({ success: true, isLiveDatabase: false, data: created });
  } catch (error) {
    next(error);
  }
};

/**
 * PUT /api/products/:id
 */
const updateProduct = async (req, res, next) => {
  try {
    if (isDBConnected()) {
      const updated = await Product.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
      });
      if (!updated) {
        return next(new AppError('Product not found.', 404));
      }
      return res.json({ success: true, isLiveDatabase: true, data: updated });
    }

    const updated = demoStore.updateProduct(req.params.id, req.body);
    if (!updated) {
      return next(new AppError('Product not found.', 404));
    }
    res.json({ success: true, isLiveDatabase: false, data: updated });
  } catch (error) {
    next(error);
  }
};

/**
 * DELETE /api/products/:id
 */
const deleteProduct = async (req, res, next) => {
  try {
    if (isDBConnected()) {
      const product = await Product.findByIdAndDelete(req.params.id);
      if (!product) {
        return next(new AppError('Product not found.', 404));
      }
      return res.json({ success: true, isLiveDatabase: true, message: 'Product removed successfully.' });
    }

    const success = demoStore.deleteProduct(req.params.id);
    if (!success) {
      return next(new AppError('Product not found.', 404));
    }
    res.json({ success: true, isLiveDatabase: false, message: 'Product removed successfully.' });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
};
