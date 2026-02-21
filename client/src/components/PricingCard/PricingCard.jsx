import { Link } from "react-router-dom";
import { useInView } from "../../hooks/useInView";
import Button from "../Button/Button";
import Icon from "../ui/Icon";
import styles from "./PricingCard.module.css";

export default function PricingCard({ plan, annual, index, selected, onSelect }) {
  const { ref, isVisible } = useInView();
  const price = plan.monthly ? (annual ? plan.annual : plan.monthly) : null;

  return (
    <div
      ref={ref}
      className={`${styles.planCard} ${selected ? styles.planSelected : ""} ${isVisible ? styles.planVisible : ""}`}
      style={{ transitionDelay: `${index * 80}ms` }}
      onClick={onSelect}
    >
      {plan.badge && <div className={styles.planBadge}>{plan.badge}</div>}

      <div className={styles.planHeader}>
        <h2 className={styles.planName}>{plan.name}</h2>
        <p className={styles.planDesc}>{plan.desc}</p>
        <div className={styles.planPrice}>
          {price ? (
            <>
              <span className={styles.priceCurrency}>₹</span>
              <span className={styles.priceAmount}>
                {price.toLocaleString()}
              </span>
              <span className={styles.pricePeriod}>/mo</span>
            </>
          ) : (
            <span className={styles.priceCustom}>Custom</span>
          )}
        </div>
        {price && annual && (
          <p className={styles.priceNote}>
            Billed annually · ${(price * 12).toLocaleString()}/yr
          </p>
        )}
      </div>

      <ul className={styles.featureList} aria-label={`${plan.name} features`}>
        {plan.features.map((f) => (
          <li key={f} className={styles.featureItem}>
            <Icon 
              name="CheckCircle2" 
              size="sm" 
              className={selected ? styles.selectedIcon : styles.defaultIcon} 
            />
            {f}
          </li>
        ))}
      </ul>

      {selected && (
        <Link to={plan.href} style={{ display: "block" }}>
          <Button variant="primary" fullWidth size="md">
            {plan.cta}
          </Button>
        </Link>
      )}
    </div>
  );
}
