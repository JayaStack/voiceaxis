import { useState, useEffect } from 'react'
import { NavLink, Link, useLocation } from 'react-router-dom'
import styles from './Navbar.module.css'

const NAV_LINKS = [
  { to: '/',         label: 'Home' },
  { to: '/features', label: 'Features' },
  { to: '/about',    label: 'About' },
  { to: '/pricing',  label: 'Pricing' },
]

export default function Navbar() {
  const [scrolled, setScrolled]     = useState(false)
  const [menuOpen, setMenuOpen]     = useState(false)
  const { pathname } = useLocation()

  // Detect scroll to add blur/border to nav
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Close menu on route change
  useEffect(() => { setMenuOpen(false) }, [pathname])

  // Prevent body scroll when mobile menu open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [menuOpen])

  return (
    <header className={`${styles.header} ${scrolled ? styles.scrolled : ''}`} role="banner">
      <nav className={`${styles.nav} container`} aria-label="Main navigation">

        {/* Logo */}
        <Link to="/" className={styles.logo} aria-label="VoiceAxis home">
          <span className={styles.logoIcon} aria-hidden="true">
            <svg width="30" height="30" viewBox="0 0 30 30" fill="none">
              <circle cx="15" cy="15" r="14" stroke="url(#navGrad)" strokeWidth="1.5" />
              <path d="M9 15c0-3.314 2.686-6 6-6s6 2.686 6 6" stroke="url(#navGrad)" strokeWidth="1.5" strokeLinecap="round" />
              <path d="M9 15c0 3.314 2.686 6 6 6" stroke="url(#navGrad2)" strokeWidth="1.5" strokeLinecap="round" strokeDasharray="2 3" />
              <circle cx="15" cy="15" r="2.5" fill="url(#navGrad)" />
              <defs>
                <linearGradient id="navGrad" x1="9" y1="9" x2="21" y2="21" gradientUnits="userSpaceOnUse">
                  <stop stopColor="#00d4b4" /><stop offset="1" stopColor="#60efdf" />
                </linearGradient>
                <linearGradient id="navGrad2" x1="9" y1="15" x2="15" y2="21" gradientUnits="userSpaceOnUse">
                  <stop stopColor="#60efdf" /><stop offset="1" stopColor="#6366f1" />
                </linearGradient>
              </defs>
            </svg>
          </span>
          <span className={styles.logoText}>
            Voice<span className={styles.logoAccent}>Axis</span>
          </span>
        </Link>

        {/* Desktop nav */}
        <ul className={styles.navLinks} role="list">
          {NAV_LINKS.map(({ to, label }) => (
            <li key={to}>
              <NavLink
                to={to}
                end={to === '/'}
                className={({ isActive }) =>
                  `${styles.navLink} ${isActive ? styles.navLinkActive : ''}`
                }
              >
                {label}
              </NavLink>
            </li>
          ))}
        </ul>

        {/* CTA */}
        <div className={styles.navActions}>
          <Link to="/contact" className={`${styles.ctaBtn} ${styles.ctaBtnDesktop}`}>
            Get a Demo
          </Link>

          {/* Hamburger */}
          <button
            className={`${styles.hamburger} ${menuOpen ? styles.hamburgerOpen : ''}`}
            onClick={() => setMenuOpen((v) => !v)}
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
          >
            <span className={styles.hLine} />
            <span className={styles.hLine} />
            <span className={styles.hLine} />
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      <div
        id="mobile-menu"
        className={`${styles.mobileMenu} ${menuOpen ? styles.mobileMenuOpen : ''}`}
        aria-hidden={!menuOpen}
      >
        <ul className={styles.mobileLinks} role="list">
          {NAV_LINKS.map(({ to, label }) => (
            <li key={to}>
              <NavLink
                to={to}
                end={to === '/'}
                className={({ isActive }) =>
                  `${styles.mobileLink} ${isActive ? styles.mobileLinkActive : ''}`
                }
              >
                {label}
              </NavLink>
            </li>
          ))}
          <li>
            <Link to="/contact" className={styles.ctaBtn} style={{ display: 'flex', justifyContent: 'center' }}>
              Get a Demo
            </Link>
          </li>
        </ul>
      </div>

      {/* Overlay */}
      {menuOpen && (
        <div className={styles.overlay} onClick={() => setMenuOpen(false)} aria-hidden="true" />
      )}
    </header>
  )
}
