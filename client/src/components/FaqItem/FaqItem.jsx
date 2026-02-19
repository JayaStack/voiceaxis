import { useState } from "react";
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
        <span className={styles.faqIcon} aria-hidden="true">{open ? "−" : "+"}</span>
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
