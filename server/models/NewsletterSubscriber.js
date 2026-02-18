'use strict'
const mongoose = require('mongoose')

const newsletterSchema = new mongoose.Schema(
  {
    email: {
      type:      String,
      required:  [true, 'Email is required'],
      unique:    true,
      trim:      true,
      lowercase: true,
      match:     [/^\S+@\S+\.\S+$/, 'Invalid email format'],
    },
    active: {
      type:    Boolean,
      default: true,
      index:   true,
    },
    source: {
      type:    String,
      enum:    ['footer', 'popup', 'blog', 'api'],
      default: 'footer',
    },
    // GDPR compliance
    consentedAt: {
      type:    Date,
      default: Date.now,
    },
    unsubscribedAt: {
      type: Date,
    },
    // Metadata
    ipAddress: { type: String, select: false },
  },
  {
    timestamps: true,
    versionKey: false,
  }
)

// Unique constraint already on email, add index for lookup
newsletterSchema.index({ email: 1 }, { unique: true })

module.exports = mongoose.model('NewsletterSubscriber', newsletterSchema)
