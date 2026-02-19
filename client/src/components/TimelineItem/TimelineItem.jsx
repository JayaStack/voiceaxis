import { useInView } from "../../hooks/useInView";
import styles from "./TimelineItem.module.css";

export default function TimelineItem({ year, title, desc, index }) {
  const { ref, isVisible } = useInView();
  return (
    <div
      ref={ref}
      className={`${styles.timelineItem} ${isVisible ? styles.timelineVisible : ""}`}
      style={{ transitionDelay: `${index * 80}ms` }}
    >
      <div className={styles.timelineYear}>{year}</div>
      <div className={styles.timelineDot} aria-hidden="true" />
      <div className={styles.timelineContent}>
        <h3 className={styles.timelineTitle}>{title}</h3>
        <p className={styles.timelineDesc}>{desc}</p>
      </div>
    </div>
  );
}
