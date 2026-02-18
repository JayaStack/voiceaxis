/**
 * server.js — VoiceAxis API entry point
 *
 * Architecture:
 *   Request → CORS/Helmet → Rate limit → JSON parse → Route → Controller → Model
 *                                                                         ↓
 *                                                               Mongoose → Atlas
 */

'use strict'
require('dotenv').config()

const express      = require('express')
const cors         = require('cors')
const helmet       = require('helmet')
const rateLimit    = require('express-rate-limit')
const connectDB    = require('./config/db')
const contactRoutes    = require('./routes/contact')
const demoRoutes       = require('./routes/demo')
const newsletterRoutes = require('./routes/newsletter')
const notFound     = require('./middleware/notFound')
const errorHandler = require('./middleware/errorHandler')

/* ── Init ── */
const app  = express()
const PORT = process.env.PORT || 5000

/* ── Connect database ── */
connectDB()

/* ── Security headers ── */
app.use(helmet())

/* ── CORS ── */
const allowedOrigins = (process.env.CLIENT_URL || 'http://localhost:5173').split(',').map(s => s.trim())

app.use(cors({
  origin: (origin, cb) => {
    // Allow server-to-server calls (no origin) and whitelisted origins
    if (!origin || allowedOrigins.includes(origin)) return cb(null, true)
    cb(new Error(`CORS policy does not allow origin: ${origin}`))
  },
  methods:     ['GET', 'POST', 'OPTIONS'],
  allowedHeaders: ['Content-Type'],
  credentials: false,
}))

/* ── Rate limiting ── */
const limiter = rateLimit({
  windowMs:         15 * 60 * 1000, // 15 minutes
  max:              60,
  standardHeaders:  true,
  legacyHeaders:    false,
  message: { success: false, message: 'Too many requests. Please wait and try again.' },
})

// Stricter limit for form submission routes
const formLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  max:      10,
  message: { success: false, message: 'Too many submissions. Please try again later.' },
})

app.use('/api', limiter)

/* ── Body parsing ── */
app.use(express.json({ limit: '10kb' }))
app.use(express.urlencoded({ extended: true, limit: '10kb' }))

/* ── Trust proxy (required for rate limiting behind Render/Vercel) ── */
app.set('trust proxy', 1)

/* ── Health check ── */
app.get('/api/health', (req, res) => {
  res.json({
    success:   true,
    message:   'VoiceAxis API is running',
    env:       process.env.NODE_ENV,
    timestamp: new Date().toISOString(),
  })
})

/* ── Routes ── */
app.use('/api/contact',    formLimiter, contactRoutes)
app.use('/api/demo',       formLimiter, demoRoutes)
app.use('/api/newsletter', formLimiter, newsletterRoutes)

/* ── Error handling (must be last) ── */
app.use(notFound)
app.use(errorHandler)

/* ── Start ── */
app.listen(PORT, () => {
  console.log(`\n🚀 VoiceAxis API`)
  console.log(`   Env:  ${process.env.NODE_ENV}`)
  console.log(`   Port: http://localhost:${PORT}`)
  console.log(`   CORS: ${allowedOrigins.join(', ')}\n`)
})

module.exports = app // For testing
