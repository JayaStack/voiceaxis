import { useEffect, useRef, useState } from 'react'

/**
 * useInView — Fires when element enters the viewport
 *
 * @param {Object} options - IntersectionObserver options
 * @returns {{ ref, isVisible }}
 */
export function useInView(options = { threshold: 0.15, rootMargin: '0px 0px -60px 0px' }) {
  const ref = useRef(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsVisible(true)
        observer.unobserve(el) // Animate once
      }
    }, options)

    observer.observe(el)
    return () => observer.disconnect()
  }, [options])

  return { ref, isVisible }
}
