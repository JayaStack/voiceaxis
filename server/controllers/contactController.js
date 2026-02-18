'use strict'
const Contact = require('../models/Contact')

/**
 * POST /api/contact
 * Creates a new contact/inquiry record.
 */
const createContact = async (req, res, next) => {
  try {
    const { name, email, company, phone, employees, message } = req.body

    const contact = await Contact.create({
      name,
      email,
      company,
      phone:     phone     || '',
      employees: employees || '',
      message,
      ipAddress: req.ip,
      userAgent: req.get('User-Agent'),
    })

    res.status(201).json({
      success: true,
      message: 'Your message has been received. Our team will be in touch within 2 hours.',
      data: { id: contact._id },
    })
  } catch (err) {
    next(err)
  }
}

/**
 * GET /api/contact
 * Lists all contacts (admin/internal use).
 * In production, protect this with auth middleware.
 */
const listContacts = async (req, res, next) => {
  try {
    const { page = 1, limit = 20, status } = req.query
    const filter = {}
    if (status) filter.status = status

    const [contacts, total] = await Promise.all([
      Contact.find(filter)
        .sort({ createdAt: -1 })
        .skip((page - 1) * limit)
        .limit(Number(limit))
        .select('-__v'),
      Contact.countDocuments(filter),
    ])

    res.json({
      success: true,
      data: contacts,
      pagination: {
        page:  Number(page),
        limit: Number(limit),
        total,
        pages: Math.ceil(total / limit),
      },
    })
  } catch (err) {
    next(err)
  }
}

module.exports = { createContact, listContacts }
