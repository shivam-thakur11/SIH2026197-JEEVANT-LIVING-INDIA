const Review = require('../models/Review');
const AppError = require('../utils/AppError');
const { isDBConnected } = require('../config/db');
const demoStore = require('../utils/demoStore');

/** GET /api/reviews — List reviews */
const getAllReviews = async (req, res, next) => {
  try {
    if (isDBConnected()) {
      const filter = {};
      if (req.query.status && req.query.status !== 'All') {
        filter.status = new RegExp(req.query.status, 'i');
      }
      if (req.query.artisan) {
        filter.artisan = req.query.artisan;
      }
      if (req.query.search) {
        const regex = new RegExp(req.query.search, 'i');
        filter.$or = [
          { comment: regex },
          { reviewerName: regex },
          { target: regex },
        ];
      }

      const reviews = await Review.find(filter)
        .populate('user reviewer', 'name email avatar')
        .populate('artisan', 'name craft')
        .populate('workshop', 'title')
        .sort({ createdAt: -1 });

      return res.json({
        success: true,
        count: reviews.length,
        isLiveDatabase: true,
        data: reviews,
      });
    }

    // Offline Demo Mode
    const reviews = demoStore.getReviews(req.query);
    res.json({
      success: true,
      count: reviews.length,
      isLiveDatabase: false,
      data: reviews,
    });
  } catch (error) {
    next(error);
  }
};

/** GET /api/reviews/:id */
const getReviewById = async (req, res, next) => {
  try {
    if (isDBConnected()) {
      const review = await Review.findById(req.params.id)
        .populate('user reviewer')
        .populate('artisan');
      if (!review) return next(new AppError('Review not found.', 404));
      return res.json({ success: true, isLiveDatabase: true, data: review });
    }

    // Offline Demo Mode
    const review = demoStore.getReviewById(req.params.id);
    if (!review) return next(new AppError('Review not found.', 404));
    res.json({ success: true, isLiveDatabase: false, data: review });
  } catch (error) {
    next(error);
  }
};

/** POST /api/reviews — Authenticated users */
const createReview = async (req, res, next) => {
  try {
    const reviewData = {
      ...req.body,
      user: req.user ? req.user._id || req.user.id : req.body.user,
      reviewer: req.user ? req.user._id || req.user.id : req.body.reviewer,
      reviewerName: req.user ? req.user.name : req.body.reviewerName || 'Cultural Enthusiast',
    };

    if (isDBConnected()) {
      const review = await Review.create(reviewData);
      return res.status(201).json({
        success: true,
        message: 'Review submitted successfully.',
        isLiveDatabase: true,
        data: review,
      });
    }

    // Offline Demo Mode
    const review = demoStore.createReview(reviewData);
    res.status(201).json({
      success: true,
      message: 'Review submitted successfully. (Offline Demo Mode)',
      isLiveDatabase: false,
      data: review,
    });
  } catch (error) {
    next(error);
  }
};

/** PUT /api/reviews/:id & PATCH /api/reviews/:id — Update / Moderate review */
const updateReview = async (req, res, next) => {
  try {
    if (isDBConnected()) {
      const review = await Review.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
      });
      if (!review) return next(new AppError('Review not found.', 404));
      return res.json({
        success: true,
        message: 'Review updated successfully.',
        isLiveDatabase: true,
        data: review,
      });
    }

    // Offline Demo Mode
    const review = demoStore.updateReview(req.params.id, req.body);
    if (!review) return next(new AppError('Review not found.', 404));
    res.json({
      success: true,
      message: 'Review updated successfully. (Offline Demo Mode)',
      isLiveDatabase: false,
      data: review,
    });
  } catch (error) {
    next(error);
  }
};

/** PATCH /api/reviews/:id/toggle-status — Admin: toggle published/flagged */
const toggleReviewStatus = async (req, res, next) => {
  try {
    if (isDBConnected()) {
      const review = await Review.findById(req.params.id);
      if (!review) return next(new AppError('Review not found.', 404));

      const isPublished = (review.status || '').toLowerCase() === 'published';
      review.status = isPublished ? 'flagged' : 'published';
      await review.save();

      return res.json({
        success: true,
        message: `Review moderation status updated to: ${review.status}`,
        isLiveDatabase: true,
        data: review,
      });
    }

    // Offline Demo Mode
    const review = demoStore.toggleReviewStatus(req.params.id);
    if (!review) return next(new AppError('Review not found.', 404));
    res.json({
      success: true,
      message: `Review moderation status updated to: ${review.status} (Offline Demo Mode)`,
      isLiveDatabase: false,
      data: review,
    });
  } catch (error) {
    next(error);
  }
};

/** DELETE /api/reviews/:id — Admin */
const deleteReview = async (req, res, next) => {
  try {
    if (isDBConnected()) {
      const review = await Review.findByIdAndDelete(req.params.id);
      if (!review) return next(new AppError('Review not found.', 404));
      return res.json({
        success: true,
        message: 'Review removed from moderation ledger.',
        isLiveDatabase: true,
      });
    }

    // Offline Demo Mode
    const deleted = demoStore.deleteReview(req.params.id);
    if (!deleted) return next(new AppError('Review not found.', 404));
    res.json({
      success: true,
      message: 'Review removed from moderation ledger. (Offline Demo Mode)',
      isLiveDatabase: false,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllReviews,
  getReviewById,
  createReview,
  updateReview,
  toggleReviewStatus,
  deleteReview,
};
