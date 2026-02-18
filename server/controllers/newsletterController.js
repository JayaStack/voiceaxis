'use strict'
const NewsletterSubscriber = require('../models/NewsletterSubscriber')

/**
 * POST /api/newsletter
 * Subscribe an email address. Idempotent — re-subscribes inactive subscribers.
 */
const subscribe = async (req, res, next) => {
  try {
    const { email, source = 'footer' } = req.body

    const existing = await NewsletterSubscriber.findOne({ email })

    if (existing) {
      if (!existing.active) {
        // Re-subscribe
        existing.active          = true
        existing.consentedAt     = new Date()
        existing.unsubscribedAt  = undefined
        await existing.save()
        return res.json({ success: true, message: 'Welcome back! You have been re-subscribed.' })
      }
      return res.json({ success: true, message: 'You are already subscribed. Stay tuned!' })
    }

    await NewsletterSubscriber.create({
      email,
      source,
      ipAddress: req.ip,
    })

    res.status(201).json({
      success: true,
      message: 'Successfully subscribed to VoiceAxis product updates.',
    })
  } catch (err) {
    // Duplicate key — race condition fallback
    if (err.code === 11000) {
      return res.json({ success: true, message: 'You are already subscribed!' })
    }
    next(err)
  }
}

/**
 * DELETE /api/newsletter/:email
 * Soft unsubscribe — retains record for GDPR/audit purposes.
 */
const unsubscribe = async (req, res, next) => {
  try {
    const { email } = req.params

    const subscriber = await NewsletterSubscriber.findOne({ email: email.toLowerCase() })
    if (!subscriber) {
      return res.status(404).json({ success: false, message: 'Email not found in subscriber list.' })
    }

    subscriber.active          = false
    subscriber.unsubscribedAt  = new Date()
    await subscriber.save()

    res.json({ success: true, message: 'You have been unsubscribed.' })
  } catch (err) {
    next(err)
  }
}

/**
 * GET /api/newsletter/count
 * Public subscriber count (for social proof).
 */
const getCount = async (req, res, next) => {
  try {
    const count = await NewsletterSubscriber.countDocuments({ active: true })
    res.json({ success: true, data: { count } })
  } catch (err) {
    next(err)
  }
}

module.exports = { subscribe, unsubscribe, getCount }
