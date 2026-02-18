'use strict'
const mongoose = require('mongoose')

const contactSchema = new mongoose.Schema(
  {
    name: {
      type:      String,
      required:  [true, 'Name is required'],
      trim:      true,
      maxlength: [100, 'Name cannot exceed 100 characters'],
    },
    email: {
      type:      String,
      required:  [true, 'Email is required'],
      trim:      true,
      lowercase: true,
      match:     [/^\S+@\S+\.\S+$/, 'Invalid email format'],
      index:     true,
    },
    company: {
      type:      String,
      required:  [true, 'Company is required'],
      trim:      true,
      maxlength: [200, 'Company name too long'],
    },
    phone: {
      type:      String,
      trim:      true,
      maxlength: [30, 'Phone number too long'],
      default:   '',
    },
    employees: {
      type: String,
      enum: ['', '1-10', '11-50', '51-200', '201-1000', '1000+'],
      default: '',
    },
    message: {
      type:      String,
      required:  [true, 'Message is required'],
      trim:      true,
      maxlength: [3000, 'Message cannot exceed 3000 characters'],
    },
    // CRM status field for sales pipeline
    status: {
      type:    String,
      enum:    ['new', 'contacted', 'qualified', 'converted', 'closed'],
      default: 'new',
      index:   true,
    },
    // Internal metadata
    ipAddress: { type: String, select: false },
    userAgent: { type: String, select: false },
  },
  {
    timestamps: true, // Adds createdAt and updatedAt automatically
    versionKey: false,
  }
)

// Compound index for common query pattern
contactSchema.index({ email: 1, createdAt: -1 })

module.exports = mongoose.model('Contact', contactSchema)
