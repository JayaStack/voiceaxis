import { Link } from "react-router-dom";
import { useInView } from "../../hooks/useInView";
import Button from "../Button/Button";
import styles from "./PricingCard.module.css";

export default function PricingCard({ plan, annual, index }) {
  const { ref, isVisible } = useInView();
  const price = plan.monthly ? (annual ? plan.annual : plan.monthly) : null;

  return (
    <div
      ref={ref}
      className={`${styles.planCard} ${plan.color === "accent" ? styles.planFeatured : ""} ${isVisible ? styles.planVisible : ""}`}
      style={{ transitionDelay: `${index * 80}ms` }}
    >
      {plan.badge && <div className={styles.planBadge}>{plan.badge}</div>}

      <div className={styles.planHeader}>
        <h2 className={styles.planName}>{plan.name}</h2>
        <p className={styles.planDesc}>{plan.desc}</p>
        <div className={styles.planPrice}>
          {price ? (
            <>
              <span className={styles.priceCurrency}>$</span>
              <span className={styles.priceAmount}>{price.toLocaleString()}</span>
              <span className={styles.pricePeriod}>/mo</span>
            </>
          ) : (
            <span className={styles.priceCustom}>Custom</span>
          )}
        </div>
        {price && annual && (
          <p className={styles.priceNote}>Billed annually · ${(price * 12).toLocaleString()}/yr</p>
        )}
      </div>

      <ul className={styles.featureList} aria-label={`${plan.name} features`}>
        {plan.features.map((f) => (
          <li key={f} className={styles.featureItem}>
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
              <circle cx="7" cy="7" r="6" fill={plan.color === "accent" ? "rgba(0,212,180,0.15)" : "rgba(255,255,255,0.06)"} />
              <path d="M4.5 7l2 2 3-4" stroke={plan.color === "accent" ? "#00d4b4" : "#7a9eb5"} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            {f}
          </li>
        ))}
      </ul>

      <Link to={plan.href} style={{ display: "block" }}>
        <Button
          variant={plan.color === "accent" ? "primary" : "secondary"}
          fullWidth
          size="md"
        >
          {plan.cta}
        </Button>
      </Link>
    </div>
  );
}
