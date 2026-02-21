import { useState } from "react";
import Icon from "../ui/Icon";
import styles from "./FaqItem.module.css";

export default function FaqItem({ q, a, index }) {
  const [open, setOpen] = useState(false);
  return (
    <div className={`${styles.faqItem} ${open ? styles.faqOpen : ""}`}>
      <button
        className={styles.faqQ}
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-controls={`faq-${index}`}
      >
        <span>{q}</span>
        <span className={styles.faqIcon} aria-hidden="true">
          <Icon name={open ? "Minus" : "Plus"} size="sm" />
        </span>
      </button>
      <div
        id={`faq-${index}`}
        className={styles.faqA}
        role="region"
        hidden={!open}
      >
        <p>{a}</p>
      </div>
    </div>
  );
}
