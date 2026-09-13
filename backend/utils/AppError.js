/**
 * Custom error class so we can attach a status code to errors.
 * Usage: throw new AppError('Not found', 404);
 */
class AppError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
    this.isOperational = true; // marks this as a known, handled error
  }
}

module.exports = AppError;
