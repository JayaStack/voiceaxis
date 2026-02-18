/**
 * api.js — Centralized HTTP client
 *
 * All API calls go through here. The base URL is driven by the
 * VITE_API_BASE_URL environment variable — never hardcoded.
 */

const BASE_URL = import.meta.env.VITE_API_BASE_URL || '/api'

class ApiError extends Error {
  constructor(message, status, data) {
    super(message)
    this.name = 'ApiError'
    this.status = status
    this.data = data
  }
}

async function request(endpoint, options = {}) {
  const url = `${BASE_URL}${endpoint}`

  const config = {
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
    ...options,
  }

  const res = await fetch(url, config)
  const data = await res.json().catch(() => ({}))

  if (!res.ok) {
    throw new ApiError(
      data.message || 'An unexpected error occurred.',
      res.status,
      data
    )
  }

  return data
}

/** POST /contact — submit demo/sales/support inquiry */
export const submitContact = (payload) =>
  request('/contact', { method: 'POST', body: JSON.stringify(payload) })

/** POST /demo — book a demo slot */
export const bookDemo = (payload) =>
  request('/demo', { method: 'POST', body: JSON.stringify(payload) })

/** POST /newsletter — subscribe */
export const subscribeNewsletter = (email) =>
  request('/newsletter', { method: 'POST', body: JSON.stringify({ email }) })
