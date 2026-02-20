import { useState } from 'react'
import SectionHeader from '../../components/SectionHeader/SectionHeader'
import PricingCard from '../../components/PricingCard/PricingCard'
import FaqItem from '../../components/FaqItem/FaqItem'
import styles from './Pricing.module.css'

const PLANS = [
  {
    name: 'Starter',
    desc: 'For teams exploring AI automation.',
    monthly: 499,
    annual: 399,
    color: 'default',
    features: [
      '5,000 minutes / month',
      '3 concurrent agents',
      '10 languages',
      'Basic analytics dashboard',
      'CRM integration (1)',
      'Email support',
      '99.5% SLA',
    ],
    missing: ['Custom voice', 'Dedicated CSM', 'On-premise'],
    cta: 'Start Free Trial',
    href: '/contact',
  },
  {
    name: 'Growth',
    desc: 'For scaling operations that need more power.',
    monthly: 1499,
    annual: 1199,
    color: 'accent',
    badge: 'Most Popular',
    features: [
      '30,000 minutes / month',
      '20 concurrent agents',
      '35 languages',
      'Advanced analytics + BI export',
      'CRM integrations (5)',
      '24/7 priority support',
      'Custom voice training',
      'Webhooks + REST API',
      '99.9% SLA',
    ],
    missing: ['On-premise deployment'],
    cta: 'Start Free Trial',
    href: '/contact',
  },
  {
    name: 'Enterprise',
    desc: 'Unlimited scale with white-glove service.',
    monthly: null,
    annual: null,
    color: 'default',
    features: [
      'Unlimited minutes',
      'Unlimited agents',
      '52+ languages',
      'Custom reporting + SLA',
      'All integrations',
      'Dedicated CSM',
      'Voice cloning',
      'On-premise option',
      '99.99% SLA',
    ],
    missing: [],
    cta: 'Contact Sales',
    href: '/contact',
  },
]

const FAQS = [
  { q: 'Can I upgrade or downgrade my plan?', a: 'Yes, you can change plans at any time. Upgrades take effect immediately, downgrades apply at the start of your next billing cycle.' },
  { q: 'What exactly counts as a "minute"?', a: 'A billable minute is 60 seconds of active AI conversation. Hold time, silence, and post-call processing are not billed.' },
  { q: 'Is there a free trial?', a: 'Yes. Starter and Growth plans both include a 14-day free trial with no credit card required. You get full feature access from day one.' },
  { q: 'How does annual billing work?', a: 'Annual plans are paid upfront for 12 months. You save approximately 20% compared to monthly billing, and the discount is applied immediately.' },
  { q: 'What happens if I exceed my minute limit?', a: 'Overage minutes are billed at a flat per-minute rate. You receive automated alerts at 80% and 100% of your monthly limit.' },
  { q: 'Can I bring my own telephony provider?', a: 'Absolutely. VoiceAxis integrates with any SIP-compliant telephony system, plus has native support for Twilio, AWS Connect, Genesys, and Avaya.' },
  { q: 'Is VoiceAxis HIPAA-compliant?', a: 'Yes. Enterprise plans include a Business Associate Agreement (BAA) and HIPAA-compliant data handling. Contact sales to configure this for your deployment.' },
]

export default function Pricing() {
  const [annual, setAnnual] = useState(false)
  const [selectedPlan, setSelectedPlan] = useState(null)

  return (
    <div className={styles.page}>

      {/* Hero */}
      <section className={styles.hero}>
        <div className={styles.heroBg} aria-hidden="true" />
        <div className={`container ${styles.heroContent}`}>
          <SectionHeader
            chip="Pricing"
            title='Simple pricing that<br /><span class="text-gradient">scales with you</span>'
            subtitle="Start free. Scale without friction. Cancel anytime. No hidden fees, no per-seat gotchas."
          />

          {/* Billing toggle */}
          <div className={styles.toggle} role="group" aria-label="Billing period">
            <span className={!annual ? styles.toggleLabelActive : styles.toggleLabel}>Monthly</span>
            <button
              className={`${styles.toggleTrack} ${annual ? styles.toggleTrackOn : ''}`}
              onClick={() => setAnnual((v) => !v)}
              role="switch"
              aria-checked={annual}
              aria-label="Toggle annual billing"
            >
              <span className={styles.toggleKnob} />
            </button>
            <span className={annual ? styles.toggleLabelActive : styles.toggleLabel}>
              Annual
              <span className={styles.saveBadge}>Save 20%</span>
            </span>
          </div>
        </div>
      </section>

      {/* Plans */}
      <section className="section--sm">
        <div className="container">
          <div className={styles.plansGrid}>
            {PLANS.map((plan, i) => (
              <PricingCard
                key={plan.name}
                plan={plan}
                annual={annual}
                index={i}
                selected={selectedPlan === plan.name}
                onSelect={() => setSelectedPlan(plan.name)}
              />
            ))}
          </div>

          <p className={styles.trialNote}>
            All plans include a 14-day free trial · No credit card required · Cancel anytime
          </p>
        </div>
      </section>

      {/* Guarantee strip */}
      <section className={`section--sm ${styles.guaranteeSection}`}>
        <div className="container">
          <div className={styles.guaranteeRow}>
            {[
              { icon: '🔒', text: 'SOC 2 Type II certified' },
              { icon: '🌍', text: '15+ data residency regions' },
              { icon: '⚡', text: '99.99% uptime on Enterprise' },
              { icon: '🎯', text: '14-day free trial, all plans' },
            ].map(({ icon, text }) => (
              <div key={text} className={styles.guaranteeItem}>
                <span>{icon}</span>
                <span>{text}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="section">
        <div className="container">
          <SectionHeader chip="FAQ" title='Common questions' />
          <div className={styles.faqList}>
            {FAQS.map((item, i) => <FaqItem key={i} {...item} index={i} />)}
          </div>
        </div>
      </section>
    </div>
  )
}
