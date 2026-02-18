'use strict'
const express        = require('express')
const { body }       = require('express-validator')
const validateRequest = require('../middleware/validateRequest')
const { createContact, listContacts } = require('../controllers/contactController')

const router = express.Router()

/* ── Validation rules ── */
const contactValidation = [
  body('name')
    .trim()
    .notEmpty().withMessage('Full name is required.')
    .isLength({ max: 100 }).withMessage('Name cannot exceed 100 characters.'),

  body('email')
    .trim()
    .notEmpty().withMessage('Work email is required.')
    .isEmail().withMessage('Please enter a valid email address.')
    .normalizeEmail(),

  body('company')
    .trim()
    .notEmpty().withMessage('Company name is required.')
    .isLength({ max: 200 }).withMessage('Company name is too long.'),

  body('phone')
    .optional({ checkFalsy: true })
    .trim()
    .isLength({ max: 30 }).withMessage('Phone number is too long.'),

  body('employees')
    .optional({ checkFalsy: true })
    .isIn(['', '1-10', '11-50', '51-200', '201-1000', '1000+']).withMessage('Invalid team size value.'),

  body('message')
    .trim()
    .notEmpty().withMessage('Please tell us about your use case.')
    .isLength({ max: 3000 }).withMessage('Message cannot exceed 3000 characters.'),
]

/* ── Routes ── */
router.post('/', contactValidation, validateRequest, createContact)
router.get('/',  listContacts)   // Protect with auth middleware in production

module.exports = router
