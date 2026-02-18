import { Link } from 'react-router-dom'
import { useInView } from '../../hooks/useInView'
import SectionHeader from '../../components/SectionHeader/SectionHeader'
import Button from '../../components/Button/Button'
import styles from './Home.module.css'

/* ── Data ── */
const STATS = [
  { value: '98%',    label: 'First-call resolution',  suffix: '' },
  { value: '<180ms', label: 'Average response time',  suffix: '' },
  { value: '52+',    label: 'Languages supported',    suffix: '' },
  { value: '12M+',   label: 'Conversations monthly',  suffix: '' },
]

const FEATURES = [
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z"/>
        <path d="M19 10v2a7 7 0 0 1-14 0v-2M12 19v3M8 22h8"/>
      </svg>
    ),
    title: 'Natural Voice Intelligence',
    desc: 'Conversational AI that grasps context, intent, and emotion — not just keywords. Sub-200ms latency feels indistinguishable from a human agent.',
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="3" width="20" height="14" rx="2"/><path d="M8 21h8M12 17v4"/>
      </svg>
    ),
    title: 'Omnichannel Deployment',
    desc: 'Deploy across phone, web, mobile, and WhatsApp from a single platform. Unified conversation context regardless of channel.',
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 20h9M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5Z"/>
      </svg>
    ),
    title: 'No-Code Agent Builder',
    desc: 'Design full conversation flows with drag-and-drop. Go from concept to live deployment in under four hours — no engineers required.',
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 3v18h18"/><path d="M18 17 13 12l-4 4-3-3"/>
      </svg>
    ),
    title: 'Real-Time Analytics',
    desc: 'Live dashboards tracking resolution rate, sentiment trends, escalation patterns, and revenue impact. Every call generates insight.',
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <ellipse cx="12" cy="5" rx="9" ry="3"/><path d="M3 5v14c0 1.657 4.03 3 9 3s9-1.343 9-3V5"/><path d="M3 12c0 1.657 4.03 3 9 3s9-1.343 9-3"/>
      </svg>
    ),
    title: 'Enterprise Integrations',
    desc: 'Pre-built connectors for Salesforce, HubSpot, Zendesk, ServiceNow, and 200+ tools. REST API for everything else.',
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/>
      </svg>
    ),
    title: 'SOC 2 Type II Security',
    desc: 'End-to-end encryption, GDPR compliance, HIPAA-ready configurations, and full audit trails. Your data never leaves your region.',
  },
]

const TESTIMONIALS = [
  {
    quote: 'VoiceAxis cut our inbound call handling cost by 68% in the first quarter. The AI\'s ability to understand regional accents and dialects surprised everyone on our team.',
    name: 'Anika Reddy',
    role: 'VP Customer Operations, FinServe Global',
    initials: 'AR',
  },
  {
    quote: 'We went live in 6 hours. Within two weeks, 74% of routine queries were resolved without any human involvement. ROI was visible before the month ended.',
    name: 'Marcus Whitfield',
    role: 'CTO, RetailEdge',
    initials: 'MW',
  },
  {
    quote: 'The analytics dashboard alone changed how we run our support org. We can now see sentiment trends across 50,000 calls per day in real time.',
    name: 'Sneha Patel',
    role: 'Head of CX, Neobank Zeta',
    initials: 'SP',
  },
]

const LOGOS = ['Accenture', 'HDFC', 'Meesho', 'Razorpay', 'Flipkart', 'Swiggy', 'Byju\'s', 'PolicyBazaar', 'Groww', 'CRED']

/* ── Sub-components ── */
function StatCard({ value, label }) {
  const { ref, isVisible } = useInView()
  return (
    <div ref={ref} className={`${styles.statCard} ${isVisible ? styles.statVisible : ''}`}>
      <span className={styles.statValue}>{value}</span>
      <span className={styles.statLabel}>{label}</span>
    </div>
  )
}

function FeatureCard({ icon, title, desc, delay }) {
  const { ref, isVisible } = useInView()
  return (
    <div
      ref={ref}
      className={`${styles.featureCard} ${isVisible ? styles.featureVisible : ''}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      <div className={styles.featureIcon} aria-hidden="true">{icon}</div>
      <h3 className={styles.featureTitle}>{title}</h3>
      <p className={styles.featureDesc}>{desc}</p>
    </div>
  )
}

function TestimonialCard({ quote, name, role, initials }) {
  const { ref, isVisible } = useInView()
  return (
    <div ref={ref} className={`${styles.testimonialCard} ${isVisible ? styles.testimonialVisible : ''}`}>
      <div className={styles.stars} aria-label="5 stars">{'★'.repeat(5)}</div>
      <blockquote className={styles.quote}>"{quote}"</blockquote>
      <div className={styles.author}>
        <div className={styles.avatar} aria-hidden="true">{initials}</div>
        <div>
          <div className={styles.authorName}>{name}</div>
          <div className={styles.authorRole}>{role}</div>
        </div>
      </div>
    </div>
  )
}

/* ── Page ── */
export default function Home() {
  return (
    <div className={styles.page}>

      {/* ═══ HERO ═══ */}
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
              <Button size="lg" variant="secondary">See How It Works →</Button>
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
                  style={{ animationDelay: `${(i * 0.07).toFixed(2)}s`, animationDuration: `${0.6 + (i % 4) * 0.1}s` }}
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

      {/* ═══ LOGO STRIP ═══ */}
      <section className={styles.logos} aria-label="Trusted by">
        <div className="container">
          <p className={styles.logosLabel}>Trusted by 500+ enterprises worldwide</p>
        </div>
        <div className={styles.logoTrack} aria-hidden="true">
          <div className={styles.logoMarquee}>
            {[...LOGOS, ...LOGOS].map((name, i) => (
              <span key={i} className={styles.logoItem}>{name}</span>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ STATS ═══ */}
      <section className={`section ${styles.statsSection}`} aria-label="Key metrics">
        <div className="container">
          <div className={styles.statsGrid}>
            {STATS.map((s) => <StatCard key={s.label} {...s} />)}
          </div>
        </div>
      </section>

      {/* ═══ FEATURES ═══ */}
      <section className="section" aria-labelledby="features-heading">
        <div className="container">
          <SectionHeader
            chip="Platform"
            title='Everything you need to scale<br /><span class="text-gradient">AI voice operations</span>'
            subtitle="A complete platform — not just a voice bot. VoiceAxis gives you the intelligence, integrations, and analytics to run your entire customer conversation layer on AI."
          />

          <div className={styles.featuresGrid}>
            {FEATURES.map((f, i) => (
              <FeatureCard key={f.title} {...f} delay={i * 60} />
            ))}
          </div>

          <div className={styles.featuresCta}>
            <Link to="/features">
              <Button variant="secondary">Explore all features →</Button>
            </Link>
          </div>
        </div>
      </section>

      {/* ═══ HOW IT WORKS ═══ */}
      <section className={`section ${styles.howSection}`} aria-label="How it works">
        <div className="container">
          <SectionHeader
            chip="Process"
            title='Live in hours,<br /><span class="text-gradient">not months</span>'
            subtitle="We've made enterprise AI deployment genuinely fast. Most customers are handling real calls within their first day."
          />

          <div className={styles.steps}>
            {[
              { num: '01', title: 'Connect your data', desc: 'Link your CRM, knowledge base, and call systems. Our ingestion pipeline structures everything automatically.' },
              { num: '02', title: 'Build your agent', desc: 'Use the no-code flow builder to define conversation paths, escalation rules, and agent personality.' },
              { num: '03', title: 'Deploy & optimize', desc: 'Go live on any channel. Monitor performance in real time and improve with conversation insights.' },
            ].map(({ num, title, desc }, i) => {
              const { ref, isVisible } = useInView()
              return (
                <div
                  key={num}
                  ref={ref}
                  className={`${styles.step} ${isVisible ? styles.stepVisible : ''}`}
                  style={{ transitionDelay: `${i * 120}ms` }}
                >
                  <div className={styles.stepNum}>{num}</div>
                  <h3 className={styles.stepTitle}>{title}</h3>
                  <p className={styles.stepDesc}>{desc}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* ═══ TESTIMONIALS ═══ */}
      <section className="section" aria-label="Customer testimonials">
        <div className="container">
          <SectionHeader
            chip="Social Proof"
            title='Results that speak<br /><span class="text-gradient">for themselves</span>'
          />

          <div className={styles.testimonialGrid}>
            {TESTIMONIALS.map((t) => <TestimonialCard key={t.name} {...t} />)}
          </div>
        </div>
      </section>

      {/* ═══ CTA BANNER ═══ */}
      <section className={`section--sm ${styles.ctaSection}`} aria-label="Call to action">
        <div className="container">
          <div className={styles.ctaBox}>
            <div className={styles.ctaGlow} aria-hidden="true" />
            <h2 className={styles.ctaTitle}>
              Ready to transform your<br />customer experience?
            </h2>
            <p className={styles.ctaSubtitle}>
              Join 500+ enterprises. Start your 14-day trial today — no engineers, no credit card.
            </p>
            <div className={styles.ctaActions}>
              <Link to="/contact"><Button size="lg">Start Free Trial</Button></Link>
              <Link to="/pricing"><Button size="lg" variant="secondary">View Pricing</Button></Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
