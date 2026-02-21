import { Link } from "react-router-dom";
import Button from "../Button/Button";
import Icon from "../ui/Icon";
import styles from "./HomeHero.module.css";

export default function HomeHero() {
  return (
    <section className={styles.hero} aria-label="Hero">
      <div className={styles.heroBg} aria-hidden="true">
        <div className={styles.heroOrb1} />
        <div className={styles.heroOrb2} />
        <div className={styles.heroGrid} />
      </div>

      <div className={`container ${styles.heroContent}`}>
        <div className={styles.heroBadge}>
          <span className={styles.badgeDot} aria-hidden="true" />
          Introducing VoiceAxis v3 — now with 52 languages
        </div>

        <h1 className={styles.heroTitle}>
          Enterprise AI Agents That
          <br />
          <span className="text-gradient">Actually Understand</span>
          <br />
          Your Customers
        </h1>

        <p className={styles.heroSubtitle}>
          Deploy intelligent voice agents in hours. Handle millions of conversations simultaneously.
          Reduce costs by up to 70% while improving customer satisfaction scores.
        </p>

        <div className={styles.heroActions}>
          <Link to="/contact">
            <Button size="lg">Get a Free Demo</Button>
          </Link>
          <Link to="/features">
            <Button size="lg" variant="secondary" className="flex items-center gap-2">
              See How It Works <Icon name="ArrowRight" size="sm" />
            </Button>
          </Link>
        </div>

        <p className={styles.heroNote}>
          No credit card required · 14-day free trial · SOC 2 compliant
        </p>
      </div>

      {/* Live call visualizer */}
      <div className={`container ${styles.heroVisual}`} aria-hidden="true">
        <div className={styles.callCard}>
          <div className={styles.callHeader}>
            <span className={styles.callDot} />
            <span className={styles.callLabel}>Live Conversation</span>
            <span className={styles.callTimer}>2:47</span>
          </div>
          <div className={styles.waveform}>
            {Array.from({ length: 28 }).map((_, i) => (
              <div
                key={i}
                className={styles.wavebar}
                style={{ 
                  animationDelay: `${(i * 0.07).toFixed(2)}s`, 
                  animationDuration: `${0.6 + (i % 4) * 0.1}s` 
                }}
              />
            ))}
          </div>
          <div className={styles.callTranscript}>
            <span className={styles.transcriptLine}>AI Agent: "I've located your account and can see the last payment was on March 12th..."</span>
          </div>
          <div className={styles.callMeta}>
            <span className={styles.callTag}>Intent: Billing Inquiry</span>
            <span className={styles.callTag}>Sentiment: Neutral → Positive</span>
          </div>
        </div>
      </div>
    </section>
  );
}
