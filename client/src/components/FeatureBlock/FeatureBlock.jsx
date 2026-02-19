import { useInView } from "../../hooks/useInView";
import styles from "./FeatureBlock.module.css";

const VisualBlock = ({ type }) => (
  <div className={styles.visualBlock}>
    <div className={styles.visualGlow} aria-hidden="true" />
    {type === "brain" && (
      <div className={styles.brainViz}>
        {["Intent Detection", "Sentiment Analysis", "Context Memory", "Entity Extraction", "Response Gen"].map((n, i) => (
          <div key={n} className={styles.brainNode} style={{ animationDelay: `${i * 0.4}s` }}>
            <span>{n}</span>
          </div>
        ))}
      </div>
    )}
    {type === "wave" && (
      <div className={styles.waveViz}>
        {Array.from({ length: 32 }).map((_, i) => (
          <div
            key={i}
            className={styles.waveVizBar}
            style={{ 
              animationDelay: `${(i * 0.06).toFixed(2)}s`, 
              animationDuration: `${0.5 + (i % 5) * 0.08}s` 
            }}
          />
        ))}
      </div>
    )}
    {type === "connect" && (
      <div className={styles.connectViz}>
        {["Salesforce", "HubSpot", "Zendesk", "Twilio", "Notion", "Slack"].map((name, i) => (
          <div key={name} className={styles.connectNode} style={{ animationDelay: `${i * 0.2}s` }}>{name}</div>
        ))}
        <div className={styles.connectCenter}>API</div>
      </div>
    )}
    {type === "chart" && (
      <div className={styles.chartViz}>
        {[60, 75, 55, 90, 70, 85, 95, 80, 92, 88].map((h, i) => (
          <div key={i} className={styles.chartBar} style={{ height: `${h}%`, animationDelay: `${i * 0.1}s` }} />
        ))}
      </div>
    )}
  </div>
);

export default function FeatureBlock({ chip, title, desc, features, visual, reverse }) {
  const { ref, isVisible } = useInView({ threshold: 0.1 });
  return (
    <div ref={ref} className={`${styles.featureBlock} ${isVisible ? styles.blockVisible : ""} ${reverse ? styles.blockReverse : ""}`}>
      <div className={styles.blockInfo}>
        <span className="chip" style={{ marginBottom: "var(--space-4)", display: "inline-flex" }}>{chip}</span>
        <h2 className={styles.blockTitle} dangerouslySetInnerHTML={{ __html: title }} />
        <p className={styles.blockDesc}>{desc}</p>
        <ul className={styles.blockFeatures}>
          {features.map((f) => (
            <li key={f} className={styles.blockFeatureItem}>
              <span className={styles.checkIcon} aria-hidden="true">
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <circle cx="7" cy="7" r="6" fill="var(--color-accent-dim)" stroke="var(--color-border-accent)" strokeWidth="1"/>
                  <path d="M4.5 7l2 2 3-4" stroke="var(--color-accent)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </span>
              {f}
            </li>
          ))}
        </ul>
      </div>
      <VisualBlock type={visual} />
    </div>
  );
}
