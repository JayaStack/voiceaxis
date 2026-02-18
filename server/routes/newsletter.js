'use strict'
const express         = require('express')
const { body, param } = require('express-validator')
const validateRequest = require('../middleware/validateRequest')
const { subscribe, unsubscribe, getCount } = require('../controllers/newsletterController')

const router = express.Router()

const emailValidation = [
  body('email')
    .trim()
    .notEmpty().withMessage('Email is required.')
    .isEmail().withMessage('Please enter a valid email address.')
    .normalizeEmail()
    .isLength({ max: 254 }).withMessage('Email address is too long.'),

  body('source')
    .optional({ checkFalsy: true })
    .isIn(['footer', 'popup', 'blog', 'api']).withMessage('Invalid source.'),
]

router.post('/',              emailValidation, validateRequest, subscribe)
router.delete('/:email',      unsubscribe)
router.get('/count',          getCount)

module.exports = router
