import { useState } from 'react'
import { Link } from 'react-router-dom'
import { subscribeNewsletter } from '../../utils/api'
import styles from './Footer.module.css'

const LINKS = {
  Product:  [
    { label: 'Features',    to: '/features' },
    { label: 'Pricing',     to: '/pricing' },
    { label: 'Changelog',   to: '#' },
    { label: 'Roadmap',     to: '#' },
  ],
  Company:  [
    { label: 'About',    to: '/about' },
    { label: 'Blog',     to: '#' },
    { label: 'Careers',  to: '#' },
    { label: 'Press',    to: '#' },
  ],
  Support:  [
    { label: 'Contact',       to: '/contact' },
    { label: 'Documentation', to: '#' },
    { label: 'Status',        to: '#' },
    { label: 'Privacy',       to: '#' },
  ],
}

export default function Footer() {
  const [email, setEmail]     = useState('')
  const [subState, setSubState] = useState('idle') // idle | loading | success | error

  const handleSubscribe = async (e) => {
    e.preventDefault()
    if (!email || !/\S+@\S+\.\S+/.test(email)) return
    setSubState('loading')
    try {
      await subscribeNewsletter(email)
      setSubState('success')
      setEmail('')
    } catch {
      setSubState('error')
    }
  }

  return (
    <footer className={styles.footer}>
      <div className={styles.glow} aria-hidden="true" />
      <div className={`container ${styles.inner}`}>

        {/* Top row */}
        <div className={styles.top}>
          {/* Brand */}
          <div className={styles.brand}>
            <Link to="/" className={styles.logo}>
              <svg width="26" height="26" viewBox="0 0 30 30" fill="none">
                <circle cx="15" cy="15" r="14" stroke="url(#footGrad)" strokeWidth="1.5" />
                <path d="M9 15c0-3.314 2.686-6 6-6s6 2.686 6 6" stroke="url(#footGrad)" strokeWidth="1.5" strokeLinecap="round" />
                <circle cx="15" cy="15" r="2.5" fill="url(#footGrad)" />
                <defs>
                  <linearGradient id="footGrad" x1="9" y1="9" x2="21" y2="21" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#00d4b4" /><stop offset="1" stopColor="#60efdf" />
                  </linearGradient>
                </defs>
              </svg>
              <span className={styles.logoText}>Voice<span className={styles.logoAccent}>Axis</span></span>
            </Link>
            <p className={styles.tagline}>
              AI voice agents that handle, qualify, and convert customer conversations at enterprise scale.
            </p>
            {/* Newsletter */}
            <div className={styles.newsletter}>
              <p className={styles.newsletterLabel}>Product updates, delivered monthly</p>
              {subState === 'success' ? (
                <p className={styles.newsletterSuccess}>✓ You're subscribed. Welcome aboard.</p>
              ) : (
                <form className={styles.newsletterForm} onSubmit={handleSubscribe}>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="your@company.com"
                    className={styles.newsletterInput}
                    aria-label="Email for newsletter"
                    disabled={subState === 'loading'}
                  />
                  <button
                    type="submit"
                    className={styles.newsletterBtn}
                    disabled={subState === 'loading'}
                    aria-label="Subscribe"
                  >
                    {subState === 'loading' ? '...' : '→'}
                  </button>
                </form>
              )}
              {subState === 'error' && (
                <p className={styles.newsletterError}>Failed. Please try again.</p>
              )}
            </div>
          </div>

          {/* Nav columns */}
          {Object.entries(LINKS).map(([group, items]) => (
            <div key={group} className={styles.linkGroup}>
              <h3 className={styles.groupTitle}>{group}</h3>
              <ul className={styles.linkList}>
                {items.map(({ label, to }) => (
                  <li key={label}>
                    <Link to={to} className={styles.link}>{label}</Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom row */}
        <div className={styles.bottom}>
          <p className={styles.copyright}>© {new Date().getFullYear()} VoiceAxis, Inc. All rights reserved.</p>
          <p className={styles.taglineMono}>Powered by deep learning. Trusted by enterprises.</p>
        </div>
      </div>
    </footer>
  )
}
