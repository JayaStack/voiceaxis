import { useInView } from '../../hooks/useInView'
import styles from './SectionHeader.module.css'

/**
 * SectionHeader — Consistent chip + heading + subtext block
 */
export default function SectionHeader({ chip, title, subtitle, align = 'center', className = '' }) {
  const { ref, isVisible } = useInView()

  return (
    <div
      ref={ref}
      className={`${styles.wrapper} ${styles[`align-${align}`]} ${isVisible ? styles.visible : ''} ${className}`}
    >
      {chip && (
        <span className={`chip ${styles.chip}`}>{chip}</span>
      )}
      <h2 className={styles.title} dangerouslySetInnerHTML={{ __html: title }} />
      {subtitle && <p className={styles.subtitle}>{subtitle}</p>}
    </div>
  )
}
