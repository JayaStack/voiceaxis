'use strict'
const { validationResult } = require('express-validator')

/**
 * validateRequest — runs after express-validator checks.
 * Collects all field errors and returns a structured 422 response.
 */
const validateRequest = (req, res, next) => {
  const result = validationResult(req)
  if (result.isEmpty()) return next()

  const errors = result.array().map((err) => ({
    field:   err.path,
    message: err.msg,
  }))

  return res.status(422).json({
    success: false,
    message: 'Validation failed. Please check the fields below.',
    errors,
  })
}

module.exports = validateRequest
