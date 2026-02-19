import { useInView } from "../../hooks/useInView";
import styles from "./TeamCard.module.css";

export default function TeamCard({ name, role, bio, initials, image, color, delay }) {
  const { ref, isVisible } = useInView();
  return (
    <div
      ref={ref}
      className={`${styles.teamCard} ${isVisible ? styles.teamVisible : ""}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      <div
        className={styles.teamAvatar}
        style={{
          background: `linear-gradient(135deg, ${color}, #050a0e88)`,
        }}
      >
          <img
    src={image}
    alt={initials}
    className={styles.avatarImg}
  />
      </div>
      <h3 className={styles.teamName}>{name}</h3>
      <div className={styles.teamRole}>{role}</div>
      <p className={styles.teamBio}>{bio}</p>
    </div>
  );
}
