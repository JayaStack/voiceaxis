import { useInView } from "../../hooks/useInView";
import SectionHeader from "../../components/SectionHeader/SectionHeader";
import StatCard from "../../components/StatCard/StatCard";
import TimelineItem from "../../components/TimelineItem/TimelineItem";
import TeamCard from "../../components/TeamCard/TeamCard";
import styles from "./About.module.css";

const TEAM = [
  {
    name: "Jaya Sarathy",
    role: "CEO & Co-founder",
    bio: "Former ML research lead at Google DeepMind. PhD in computational linguistics from MIT.",
    initials: "JS",
    image: "images/Jaya_Sarathy.jpg",
    color: "#00d4b4",
  },
  {
    name: "Priya Krishnamurthy",
    role: "CTO & Co-founder",
    bio: "Led voice AI infra at Amazon Alexa for 6 years. Built systems handling 2B+ interactions/year.",
    initials: "PK",
    color: "#6366f1",
    image: "images/Priya_Krishnamurthy.jpg",
    delay: 60,
  },
  {
    name: "James Wu",
    role: "Chief Product Officer",
    bio: "Previously VP Product at Intercom. Expert in conversational UX and PLG growth.",
    initials: "JW",
    color: "#f59e0b",
    image: "images/James_Wu.jpg",
    delay: 120,
  },
  {
    name: "Divya Nair",
    role: "Head of AI Research",
    bio: "Published 22 NLP papers. Ex-Microsoft Research Cambridge. Specializes in low-resource language models.",
    initials: "DN",
    color: "#10b981",
    image: "images/Divya_Nair.jpg",
    delay: 180,
  },
  {
    name: "Rohit Agarwal",
    role: "VP of Engineering",
    bio: "Scaled engineering from 8 to 120 engineers at Razorpay. Distributed systems architect.",
    initials: "RA",
    color: "#00d4b4",
    image: "images/Rohit_Agarwal.jpg",
    delay: 240,
  },
  {
    name: "Fatima Al-Hassan",
    role: "VP of Customer Success",
    bio: "Managed CS at Zendesk across APAC. Built onboarding frameworks adopted by 3,000+ customers.",
    initials: "FA",
    color: "#6366f1",
    image: "images/Fatima_Al_Hassan.jpg",
    delay: 300,
  },
];

const TIMELINE = [
  {
    year: "2020",
    title: "Founded in Bangalore",
    desc: "Three researchers left Google and Amazon with one conviction: enterprise voice AI was broken and they could fix it.",
  },
  {
    year: "2021",
    title: "$6M Seed Round",
    desc: "Led by Accel India. Signed first 10 enterprise customers in BFSI and telecom. Processed our first 1M calls.",
  },
  {
    year: "2022",
    title: "$28M Series A",
    desc: "Lightspeed and Sequoia co-led. Launched multilingual support across 30 languages. Expanded to Southeast Asia.",
  },
  {
    year: "2023",
    title: "$80M Series B",
    desc: "Tiger Global. Crossed 200 enterprise customers. Opened Singapore and Dubai offices. Hit 5M calls/month.",
  },
  {
    year: "2024",
    title: "Platform v3 Launch",
    desc: "Proprietary NLU engine delivering 40% improvement in intent accuracy. 12M+ calls processed monthly.",
  },
  {
    year: "2025",
    title: "Global Expansion",
    desc: "Entered North America and Europe. 500+ enterprise clients. Recognized as Gartner Cool Vendor in CX AI.",
  },
];

const VALUES = [
  {
    emoji: "🎯",
    title: "Radical Clarity",
    desc: "We build products that are powerful and simple. Complexity is a failure of design.",
  },
  {
    emoji: "🔬",
    title: "Research First",
    desc: "We publish our research openly. The field advances faster when we share what we learn.",
  },
  {
    emoji: "🌍",
    title: "Inclusive by Design",
    desc: "AI should work for every language, accent, and culture — not just English speakers.",
  },
  {
    emoji: "🤝",
    title: "Customer Outcomes",
    desc: "We measure our success exclusively by measurable outcomes for the people using our product.",
  },
];

export default function About() {
  return (
    <div className={styles.page}>
      {/* Hero */}
      <section className={styles.hero}>
        <div className={styles.heroBg} aria-hidden="true" />
        <div className={`container ${styles.heroContent}`}>
          <SectionHeader
            chip="Our Story"
            title='We exist to make<br /><span class="text-gradient">great CX universal</span>'
            subtitle="VoiceAxis was born from a frustration shared by three engineers: the tools enterprises used for customer conversations were outdated, expensive to run, and genuinely bad at their jobs. We built the platform we wished existed."
          />
        </div>
      </section>

      {/* Mission */}
      <section className={`section ${styles.missionSection}`}>
        <div className="container">
          <div className={styles.missionGrid}>
            <div className={styles.missionText}>
              <span
                className="chip"
                style={{
                  marginBottom: "var(--space-4)",
                  display: "inline-flex",
                }}
              >
                Mission
              </span>
              <h2 className={styles.missionTitle}>
                Making exceptional customer service infinitely scalable
              </h2>
              <p className={styles.missionDesc}>
                A small company in Tier 2 India should be able to deliver the
                same customer experience as a Fortune 500 call center. A startup
                shouldn't need 200 agents to handle growth.
              </p>
              <p className={styles.missionDesc}>
                AI eliminates those constraints. Our job is to make it
                deployable, reliable, and genuinely good — so any business can
                compete on customer experience.
              </p>
            </div>
            <div className={styles.missionStats}>
              {[
                { n: "500+", l: "Enterprise clients" },
                { n: "52+", l: "Languages" },
                { n: "12M+", l: "Monthly conversations" },
                { n: "120+", l: "Team members" },
              ].map(({ n, l }) => (
                <StatCard key={l} value={n} label={l} variant="mission" />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className={`section ${styles.valuesSection}`}>
        <div className="container">
          <SectionHeader chip="Values" title="What we stand for" />
          <div className={styles.valuesGrid}>
            {VALUES.map(({ emoji, title, desc }, i) => {
              const { ref, isVisible } = useInView();
              return (
                <div
                  key={title}
                  ref={ref}
                  className={`${styles.valueCard} ${isVisible ? styles.valueVisible : ""}`}
                  style={{ transitionDelay: `${i * 80}ms` }}
                >
                  <span className={styles.valueEmoji} aria-hidden="true">
                    {emoji}
                  </span>
                  <h3 className={styles.valueTitle}>{title}</h3>
                  <p className={styles.valueDesc}>{desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className={`section ${styles.timelineSection}`}>
        <div className="container">
          <SectionHeader
            chip="Journey"
            title='From idea to<br /><span class="text-gradient">category leader</span>'
          />
          <div className={styles.timeline}>
            <div className={styles.timelineLine} aria-hidden="true" />
            {TIMELINE.map((item, i) => (
              <TimelineItem key={item.year} {...item} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="section">
        <div className="container">
          <SectionHeader
            chip="Team"
            title='Built by the<br /><span class="text-gradient">best in the field</span>'
            subtitle="Our team brings deep expertise from Google, Amazon, Microsoft, and the world's top research institutions."
          />
          <div className={styles.teamGrid}>
            {TEAM.map((member, i) => (
              <TeamCard key={member.name} {...member} delay={i * 60} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
