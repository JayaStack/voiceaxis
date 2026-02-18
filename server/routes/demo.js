'use strict'
const express         = require('express')
const { body }        = require('express-validator')
const validateRequest = require('../middleware/validateRequest')
const { createDemoBooking, listDemoBookings } = require('../controllers/demoController')

const router = express.Router()

const demoValidation = [
  body('name')
    .trim()
    .notEmpty().withMessage('Full name is required.')
    .isLength({ max: 100 }),

  body('email')
    .trim()
    .notEmpty().withMessage('Work email is required.')
    .isEmail().withMessage('Please enter a valid email address.')
    .normalizeEmail(),

  body('company')
    .optional({ checkFalsy: true })
    .trim()
    .isLength({ max: 200 }),

  body('date')
    .notEmpty().withMessage('Preferred date is required.')
    .isISO8601().withMessage('Please provide a valid date.')
    .custom((val) => {
      const chosen = new Date(val)
      const today  = new Date()
      today.setHours(0, 0, 0, 0)
      if (chosen < today) throw new Error('Please select a future date.')
      return true
    }),

  body('time')
    .optional({ checkFalsy: true })
    .isIn(['', '09:00', '10:00', '11:00', '14:00', '15:00', '16:00']).withMessage('Invalid time slot.'),

  body('timezone')
    .optional({ checkFalsy: true })
    .isIn(['', 'IST', 'SGT', 'GST', 'EST', 'PST', 'GMT']).withMessage('Invalid timezone.'),
]

router.post('/', demoValidation, validateRequest, createDemoBooking)
router.get('/',  listDemoBookings)

module.exports = router
