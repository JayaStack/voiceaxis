'use strict'
const mongoose = require('mongoose')

let isConnected = false

async function connectDB() {
  if (isConnected) return

  const uri = process.env.MONGODB_URI
  if (!uri) {
    console.warn('⚠️  MONGODB_URI not set — skipping DB connection (data will not persist)')
    return
  }

  try {
    await mongoose.connect(uri, {
      serverSelectionTimeoutMS: 8000,
      socketTimeoutMS:          45000,
    })
    isConnected = true
    console.log(`✅ MongoDB connected: ${mongoose.connection.host}`)

    mongoose.connection.on('error', (err) => {
      console.error('MongoDB connection error:', err)
    })

    mongoose.connection.on('disconnected', () => {
      console.warn('MongoDB disconnected. Attempting reconnect...')
      isConnected = false
    })
  } catch (err) {
    console.error(`❌ MongoDB connection failed: ${err.message}`)
    // Exit in production — let the host restart the process
    if (process.env.NODE_ENV === 'production') {
      process.exit(1)
    }
  }
}

module.exports = connectDB
