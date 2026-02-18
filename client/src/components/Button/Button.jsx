import styles from './Button.module.css'

/**
 * Button
 * @param {'primary'|'secondary'|'ghost'} variant
 * @param {'sm'|'md'|'lg'} size
 * @param {boolean} loading
 * @param {boolean} fullWidth
 */
export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  type = 'button',
  href,
  loading = false,
  disabled = false,
  fullWidth = false,
  onClick,
  className = '',
}) {
  const cls = [
    styles.btn,
    styles[`btn--${variant}`],
    styles[`btn--${size}`],
    fullWidth && styles['btn--full'],
    loading && styles['btn--loading'],
    className,
  ]
    .filter(Boolean)
    .join(' ')

  const content = (
    <>
      {loading && <span className={styles.spinner} aria-hidden="true" />}
      <span className={styles.label}>{children}</span>
    </>
  )

  if (href) {
    return <a href={href} className={cls}>{content}</a>
  }

  return (
    <button type={type} className={cls} disabled={disabled || loading} onClick={onClick}>
      {content}
    </button>
  )
}
