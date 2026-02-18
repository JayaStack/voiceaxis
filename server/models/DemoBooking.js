'use strict'
const mongoose = require('mongoose')

const demoBookingSchema = new mongoose.Schema(
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
      type:  String,
      trim:  true,
      default: '',
    },
    preferredDate: {
      type:     Date,
      required: [true, 'Preferred date is required'],
    },
    preferredTime: {
      type: String,
      enum: ['09:00', '10:00', '11:00', '14:00', '15:00', '16:00', ''],
      default: '',
    },
    timezone: {
      type:    String,
      default: 'IST',
    },
    // Booking status
    status: {
      type:    String,
      enum:    ['pending', 'confirmed', 'cancelled', 'completed'],
      default: 'pending',
      index:   true,
    },
    confirmedAt:  { type: Date },
    calendarLink: { type: String },
    // Metadata
    ipAddress: { type: String, select: false },
  },
  {
    timestamps: true,
    versionKey: false,
  }
)

demoBookingSchema.index({ preferredDate: 1, status: 1 })

module.exports = mongoose.model('DemoBooking', demoBookingSchema)
