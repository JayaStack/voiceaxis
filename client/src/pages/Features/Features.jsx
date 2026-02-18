import { Link } from 'react-router-dom'
import { useInView } from '../../hooks/useInView'
import SectionHeader from '../../components/SectionHeader/SectionHeader'
import Button from '../../components/Button/Button'
import styles from './Features.module.css'

const FEATURE_BLOCKS = [
  {
    chip: 'Intelligence Layer',
    title: 'NLU that actually<br /><span class="text-gradient">understands humans</span>',
    desc: 'Our proprietary Natural Language Understanding engine is trained on 2 billion enterprise conversations. It handles complex multi-turn dialogues, regional accents, code-switching, and ambiguous intent — without constant retraining.',
    features: [
      'Multi-turn context retention across entire call',
      'Real-time sentiment tracking and escalation triggers',
      'Domain-specific pre-trained models for BFSI, healthcare, retail, telecom',
      'Automatic intent discovery from live call data',
      'Zero-shot handling of unseen queries',
    ],
    visual: 'brain',
    reverse: false,
  },
  {
    chip: 'Voice Engine',
    title: 'Voice synthesis that<br /><span class="text-gradient">fools the ear</span>',
    desc: 'VoiceAxis generates speech that is indistinguishable from a human agent. Our neural TTS models support expressive prosody, emotional modulation, and natural conversation rhythm — not robotic, stilted audio.',
    features: [
      '52 languages with dialect-level accuracy',
      'Custom voice cloning from 30-minute sample recordings',
      'Dynamic prosody adjustment based on conversation mood',
      'Barge-in detection — agent yields when customer speaks',
      'Active noise cancellation for call center environments',
    ],
    visual: 'wave',
    reverse: true,
  },
  {
    chip: 'Integration Hub',
    title: 'Connects to your<br /><span class="text-gradient">entire stack</span>',
    desc: 'Stop building point integrations. VoiceAxis ships with 200+ pre-built connectors and a REST API that handles everything else. Bi-directional data sync keeps every system in agreement.',
    features: [
      'Salesforce, HubSpot, Zendesk, ServiceNow (native)',
      'Twilio, AWS Connect, Genesys, Avaya telephony support',
      'Confluence, Notion, SharePoint knowledge base sync',
      'Webhook triggers on any conversation event',
      'Real-time call transcripts pushed to your data warehouse',
    ],
    visual: 'connect',
    reverse: false,
  },
  {
    chip: 'Analytics',
    title: 'Intelligence from<br /><span class="text-gradient">every conversation</span>',
    desc: "Every call is a data point. VoiceAxis surfaces patterns, identifies failure modes, and recommends improvements — automatically. Your ops team sees what's working and what isn't, in real time.",
    features: [
      'Live dashboard: resolution rate, AHT, CSAT, revenue impact',
      'Conversation flow analysis — where calls succeed and fail',
      'Automated quality scoring on every call',
      'Cohort comparison: AI vs human agent performance',
      'Executive summary reports generated weekly',
    ],
    visual: 'chart',
    reverse: true,
  },
]

const SECURITY = [
  { icon: '🔒', title: 'SOC 2 Type II', desc: 'Annual third-party security audits. Continuous monitoring and penetration testing.' },
  { icon: '🛡️', title: 'GDPR & HIPAA', desc: 'Data residency in 15+ regions. Right-to-delete workflows built in.' },
  { icon: '🔐', title: 'Zero-trust Architecture', desc: 'TLS 1.3 in transit. AES-256 at rest. Every API call authenticated and logged.' },
  { icon: '📋', title: 'Audit Trail', desc: 'Immutable logs of every agent action, configuration change, and data access.' },
]

const VisualBlock = ({ type }) => (
  <div className={styles.visualBlock}>
    <div className={styles.visualGlow} aria-hidden="true" />
    {type === 'brain' && (
      <div className={styles.brainViz}>
        {['Intent Detection', 'Sentiment Analysis', 'Context Memory', 'Entity Extraction', 'Response Gen'].map((n, i) => (
          <div key={n} className={styles.brainNode} style={{ animationDelay: `${i * 0.4}s` }}>
            <span>{n}</span>
          </div>
        ))}
      </div>
    )}
    {type === 'wave' && (
      <div className={styles.waveViz}>
        {Array.from({ length: 32 }).map((_, i) => (
          <div
            key={i}
            className={styles.waveVizBar}
            style={{ animationDelay: `${(i * 0.06).toFixed(2)}s`, animationDuration: `${0.5 + (i % 5) * 0.08}s` }}
          />
        ))}
      </div>
    )}
    {type === 'connect' && (
      <div className={styles.connectViz}>
        {['Salesforce', 'HubSpot', 'Zendesk', 'Twilio', 'Notion', 'Slack'].map((name, i) => (
          <div key={name} className={styles.connectNode} style={{ animationDelay: `${i * 0.2}s` }}>{name}</div>
        ))}
        <div className={styles.connectCenter}>API</div>
      </div>
    )}
    {type === 'chart' && (
      <div className={styles.chartViz}>
        {[60, 75, 55, 90, 70, 85, 95, 80, 92, 88].map((h, i) => (
          <div key={i} className={styles.chartBar} style={{ height: `${h}%`, animationDelay: `${i * 0.1}s` }} />
        ))}
      </div>
    )}
  </div>
)

function FeatureBlock({ chip, title, desc, features, visual, reverse }) {
  const { ref, isVisible } = useInView({ threshold: 0.1 })
  return (
    <div ref={ref} className={`${styles.featureBlock} ${isVisible ? styles.blockVisible : ''} ${reverse ? styles.blockReverse : ''}`}>
      <div className={styles.blockInfo}>
        <span className="chip" style={{ marginBottom: 'var(--space-4)', display: 'inline-flex' }}>{chip}</span>
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
  )
}

export default function Features() {
  return (
    <div className={styles.page}>
      {/* Hero */}
      <section className={styles.hero}>
        <div className={styles.heroBg} aria-hidden="true" />
        <div className={`container ${styles.heroContent}`}>
          <SectionHeader
            chip="Platform Overview"
            title='The complete AI voice<br /><span class="text-gradient">platform for enterprise</span>'
            subtitle="Four integrated layers: intelligence, voice, integrations, and analytics. Each best-in-class. Together, unstoppable."
          />
        </div>
      </section>

      {/* Feature blocks */}
      {FEATURE_BLOCKS.map((block) => (
        <section key={block.chip} className={`section ${styles.blockSection}`}>
          <div className="container">
            <FeatureBlock {...block} />
          </div>
        </section>
      ))}

      {/* Security */}
      <section className={`section ${styles.securitySection}`}>
        <div className="container">
          <SectionHeader
            chip="Security & Compliance"
            title='Enterprise security<br /><span class="text-gradient">by default</span>'
            subtitle="Security is not a feature. It's the foundation. Every deployment is hardened, audited, and compliant out of the box."
          />
          <div className={styles.securityGrid}>
            {SECURITY.map(({ icon, title, desc }) => (
              <div key={title} className={styles.securityCard}>
                <span className={styles.securityIcon}>{icon}</span>
                <h3 className={styles.securityTitle}>{title}</h3>
                <p className={styles.securityDesc}>{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className={`section--sm ${styles.ctaSection}`}>
        <div className="container">
          <div className={styles.ctaRow}>
            <div>
              <h2 className={styles.ctaTitle}>See the platform live</h2>
              <p className={styles.ctaDesc}>Our team will walk you through a full demo tailored to your industry and use case.</p>
            </div>
            <Link to="/contact">
              <Button size="lg">Book a Demo</Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
