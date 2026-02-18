'use strict'

/**
 * errorHandler — Global Express error middleware.
 * Must be registered AFTER all routes (4 parameters required by Express).
 */
// eslint-disable-next-line no-unused-vars
const errorHandler = (err, req, res, next) => {
  // Log full error in server console
  console.error(`[${new Date().toISOString()}] ERROR ${req.method} ${req.path}:`, err.message)
  if (process.env.NODE_ENV === 'development') console.error(err.stack)

  // Mongoose validation error
  if (err.name === 'ValidationError') {
    const errors = Object.values(err.errors).map((e) => ({
      field:   e.path,
      message: e.message,
    }))
    return res.status(422).json({
      success: false,
      message: 'Validation failed.',
      errors,
    })
  }

  // Mongoose duplicate key
  if (err.code === 11000) {
    const field = Object.keys(err.keyValue || {})[0] || 'field'
    return res.status(409).json({
      success: false,
      message: `A record with this ${field} already exists.`,
    })
  }

  // Mongoose cast error (invalid ObjectId, etc.)
  if (err.name === 'CastError') {
    return res.status(400).json({
      success: false,
      message: `Invalid value for field: ${err.path}`,
    })
  }

  // CORS error
  if (err.message && err.message.includes('CORS')) {
    return res.status(403).json({ success: false, message: err.message })
  }

  // Default server error — don't expose internals in production
  const statusCode = err.statusCode || 500
  const message    = process.env.NODE_ENV === 'production'
    ? 'An internal server error occurred. Please try again.'
    : err.message

  res.status(statusCode).json({ success: false, message })
}

module.exports = errorHandler
