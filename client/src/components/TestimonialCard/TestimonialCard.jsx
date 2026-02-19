import { useInView } from "../../hooks/useInView";
import styles from "./TestimonialCard.module.css";

export default function TestimonialCard({ quote, name, role, initials, img }) {
  const { ref, isVisible } = useInView();
  return (
    <div ref={ref} className={`${styles.testimonialCard} ${isVisible ? styles.testimonialVisible : ""}`}>
      <div className={styles.stars} aria-label="5 stars">{"★".repeat(5)}</div>
      <blockquote className={styles.quote}>"{quote}"</blockquote>
      <div className={styles.author}>
        <div className={styles.avatar} aria-hidden="true"><img
    src={img}
    alt={initials}
    className={styles.avatarImg}
  /></div>
        <div>
          <div className={styles.authorName}>{name}</div>
          <div className={styles.authorRole}>{role}</div>
        </div>
      </div>
    </div>
  );
}
