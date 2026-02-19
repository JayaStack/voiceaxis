import { Link } from 'react-router-dom'
import SectionHeader from '../../components/SectionHeader/SectionHeader'
import Button from '../../components/Button/Button'
import HomeHero from '../../components/HomeHero/HomeHero'
import StatCard from '../../components/StatCard/StatCard'
import FeatureCard from '../../components/FeatureCard/FeatureCard'
import TestimonialCard from '../../components/TestimonialCard/TestimonialCard'
import StepCard from '../../components/StepCard/StepCard'
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
    img: 'https://thumbs.dreamstime.com/b/profile-picture-smiling-indian-young-businesswoman-look-camera-posing-workplace-headshot-portrait-happy-millennial-ethnic-190959731.jpg',
  },
  {
    quote: 'We went live in 6 hours. Within two weeks, 74% of routine queries were resolved without any human involvement. ROI was visible before the month ended.',
    name: 'Marcus Whitfield',
    role: 'CTO, RetailEdge',
    initials: 'MW',
    img: 'https://img.freepik.com/free-photo/close-up-portrait-young-bearded-man-white-shirt-jacket-posing-camera-with-broad-smile-isolated-gray_171337-629.jpg?semt=ais_user_personalization&w=740&q=80',
  },
  {
    quote: 'The analytics dashboard alone changed how we run our support org. We can now see sentiment trends across 50,000 calls per day in real time.',
    name: 'Sneha Patel',
    role: 'Head of CX, Neobank Zeta',
    initials: 'SP',
    img: 'https://media.istockphoto.com/id/1317804578/photo/one-businesswoman-headshot-smiling-at-the-camera.jpg?s=612x612&w=0&k=20&c=EqR2Lffp4tkIYzpqYh8aYIPRr-gmZliRHRxcQC5yylY=',
  },
]

const LOGOS = ['Accenture', 'HDFC', 'Meesho', 'Razorpay', 'Flipkart', 'Swiggy', 'Byju\'s', 'PolicyBazaar', 'Groww', 'CRED']

/* ── Page ── */
export default function Home() {
  return (
    <div className={styles.page}>

      {/* ═══ HERO ═══ */}
      <HomeHero />

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
            ].map((step, i) => (
              <StepCard key={step.num} {...step} delay={i * 120} />
            ))}
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
