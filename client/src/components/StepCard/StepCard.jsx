import { useInView } from "../../hooks/useInView";
import styles from "./StepCard.module.css";

export default function StepCard({ num, title, desc, delay }) {
  const { ref, isVisible } = useInView();
  return (
    <div
      ref={ref}
      className={`${styles.step} ${isVisible ? styles.stepVisible : ""}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      <div className={styles.stepNum}>{num}</div>
      <h3 className={styles.stepTitle}>{title}</h3>
      <p className={styles.stepDesc}>{desc}</p>
    </div>
  );
}
