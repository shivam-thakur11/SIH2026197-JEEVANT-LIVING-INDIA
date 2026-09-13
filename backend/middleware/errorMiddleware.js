/**
 * Centralized Error-Handling Middleware
 * Returns consistent, structured JSON responses:
 * {
 *   "success": false,
 *   "message": "...",
 *   "errors": [...] // optional validation details
 * }
 */
const errorMiddleware = (err, req, res, next) => {
  let statusCode = err.statusCode || 500;
  let message = err.message || 'Internal Server Error';

  // Handle Mongoose Bad ObjectId (CastError)
  if (err.name === 'CastError') {
    statusCode = 400;
    message = `Invalid ID format: ${err.value}`;
  }

  // Handle Mongoose Duplicate Key Error (code 11000)
  if (err.code === 11000) {
    statusCode = 400;
    const field = Object.keys(err.keyValue || {})[0] || 'field';
    message = `An account or record with this ${field} already exists.`;
  }

  // Handle Mongoose Validation Errors
  if (err.name === 'ValidationError') {
    statusCode = 400;
    const errors = Object.values(err.errors).map((e) => e.message);
    message = errors.join(', ');
  }

  // Log error stack trace in development
  if (process.env.NODE_ENV === 'development') {
    console.error(`💥 [ERROR ${statusCode}]:`, err.message);
    if (statusCode === 500) console.error(err.stack);
  }

  res.status(statusCode).json({
    success: false,
    message,
    ...(process.env.NODE_ENV === 'development' && statusCode === 500 ? { stack: err.stack } : {}),
  });
};

module.exports = {
  errorMiddleware,
  errorHandler: errorMiddleware, // Alias for backward compatibility
};
