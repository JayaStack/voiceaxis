import styles from './PageLoader.module.css'

export default function PageLoader() {
  return (
    <div className={styles.wrapper} aria-label="Loading page">
      <div className={styles.bars}>
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} className={styles.bar} style={{ animationDelay: `${i * 0.1}s` }} />
        ))}
      </div>
    </div>
  )
}
