'use strict'
const DemoBooking = require('../models/DemoBooking')

/**
 * POST /api/demo
 * Creates a new demo booking.
 */
const createDemoBooking = async (req, res, next) => {
  try {
    const { name, email, company, date, time, timezone } = req.body

    const booking = await DemoBooking.create({
      name,
      email,
      company:       company  || '',
      preferredDate: new Date(date),
      preferredTime: time     || '',
      timezone:      timezone || 'IST',
      ipAddress:     req.ip,
    })

    /*
     * Production note:
     * Here you would trigger:
     *   1. A calendar invite via Google Calendar API / Calendly
     *   2. A confirmation email via SendGrid / Resend
     *   3. A Slack notification to the sales team
     */

    res.status(201).json({
      success: true,
      message: 'Your demo has been booked! Check your email for a confirmation and calendar invite.',
      data: {
        id:            booking._id,
        preferredDate: booking.preferredDate,
        status:        booking.status,
      },
    })
  } catch (err) {
    next(err)
  }
}

/**
 * GET /api/demo
 * Lists all bookings (internal).
 */
const listDemoBookings = async (req, res, next) => {
  try {
    const { status } = req.query
    const filter = status ? { status } : {}

    const bookings = await DemoBooking.find(filter)
      .sort({ preferredDate: 1, createdAt: -1 })
      .select('-__v')

    res.json({ success: true, data: bookings, total: bookings.length })
  } catch (err) {
    next(err)
  }
}

module.exports = { createDemoBooking, listDemoBookings }
