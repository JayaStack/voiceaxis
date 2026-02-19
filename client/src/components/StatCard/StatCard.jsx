import { useInView } from "../../hooks/useInView";
import styles from "./StatCard.module.css";

export default function StatCard({ value, label, variant = "default" }) {
  const { ref, isVisible } = useInView();
  
  const cardClass = variant === "mission" ? styles.missionStat : styles.statCard;
  const visibleClass = variant === "mission" ? styles.missionStatVisible : styles.statVisible;
  const valueClass = variant === "mission" ? styles.missionStatNum : styles.statValue;
  const labelClass = variant === "mission" ? styles.missionStatLabel : styles.statLabel;

  return (
    <div 
      ref={ref} 
      className={`${cardClass} ${isVisible ? visibleClass : ""}`}
    >
      <span className={valueClass}>{value}</span>
      <span className={labelClass}>{label}</span>
    </div>
  );
}
