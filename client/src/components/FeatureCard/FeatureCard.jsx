import { useInView } from "../../hooks/useInView";
import styles from "./FeatureCard.module.css";

export default function FeatureCard({ icon, title, desc, delay }) {
  const { ref, isVisible } = useInView();
  return (
    <div
      ref={ref}
      className={`${styles.featureCard} ${isVisible ? styles.featureVisible : ""}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      <div className={styles.featureIcon} aria-hidden="true">{icon}</div>
      <h3 className={styles.featureTitle}>{title}</h3>
      <p className={styles.featureDesc}>{desc}</p>
    </div>
  );
}
