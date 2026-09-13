const { body, validationResult } = require('express-validator');

// Validation error handler middleware
const validate = (validations) => {
  return async (req, res, next) => {
    for (const validation of validations) {
      const result = await validation.run(req);
      if (result.errors.length) break;
    }

    const errors = validationResult(req);
    if (errors.isEmpty()) {
      return next();
    }

    return res.status(400).json({
      success: false,
      message: errors.array()[0].msg,
      errors: errors.array(),
    });
  };
};

const registerValidation = [
  body('name').trim().notEmpty().withMessage('Name is required'),
  body('email').isEmail().withMessage('Valid email address is required'),
  body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),
];

const loginValidation = [
  body('email').isEmail().withMessage('Valid email address is required'),
  body('password').notEmpty().withMessage('Password is required'),
];

const artisanValidation = [
  body('name').trim().notEmpty().withMessage('Artisan name is required'),
  body('craft').trim().notEmpty().withMessage('Craft specialty is required'),
  body('state').trim().notEmpty().withMessage('State / Region is required'),
];

const traditionValidation = [
  body('state').trim().notEmpty().withMessage('State is required'),
];

const workshopValidation = [
  body('title').trim().notEmpty().withMessage('Workshop title is required'),
  body('artisan').notEmpty().withMessage('Artisan ID is required'),
];

const reviewValidation = [
  body('rating').isInt({ min: 1, max: 5 }).withMessage('Rating must be an integer between 1 and 5'),
  body('comment').trim().notEmpty().withMessage('Review comment is required'),
];

const reportValidation = [
  body('targetId').trim().notEmpty().withMessage('Target ID is required'),
  body('reason').trim().notEmpty().withMessage('Reason is required'),
];

module.exports = {
  validate,
  registerValidation,
  loginValidation,
  artisanValidation,
  traditionValidation,
  workshopValidation,
  reviewValidation,
  reportValidation,
};
