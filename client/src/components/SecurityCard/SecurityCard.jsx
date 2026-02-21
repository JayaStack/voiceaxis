import Icon from "../ui/Icon";
import styles from "./SecurityCard.module.css";

export default function SecurityCard({ icon, title, desc }) {
  return (
    <div className={styles.securityCard}>
      <span className={styles.securityIcon}>
        <Icon name={icon} size="lg" />
      </span>
      <h3 className={styles.securityTitle}>{title}</h3>
      <p className={styles.securityDesc}>{desc}</p>
    </div>
  );
}
