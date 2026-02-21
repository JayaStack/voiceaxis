import { useState } from "react";
import SectionHeader from "../../components/SectionHeader/SectionHeader";
import ContactForm from "../../components/ContactForm/ContactForm";
import DemoForm from "../../components/ContactForm/DemoForm";
import Icon from "../../components/ui/Icon";
import styles from "./Contact.module.css";

/* ─── Page ───────────────────────────────────── */
export default function Contact() {
  const [activeTab, setActiveTab] = useState("contact");

  return (
    <div className={styles.page}>
      <section className={styles.hero}>
        <div className={styles.heroBg} aria-hidden="true" />
        <div className={`container ${styles.heroContent}`}>
          <SectionHeader
            chip="Get in Touch"
            title='Let&apos;s build something<br /><span class="text-gradient">remarkable together</span>'
            subtitle="Have a question, want a demo, or ready to get started? Fill out the form and we'll be in touch within 2 hours."
          />
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className={styles.layout}>
            {/* ── Left: Forms ── */}
            <div className={styles.formPanel}>
              {/* Tab switcher */}
              <div className={styles.tabs} role="tablist">
                <button
                  role="tab"
                  aria-selected={activeTab === "contact"}
                  className={`${styles.tab} ${activeTab === "contact" ? styles.tabActive : ""}`}
                  onClick={() => setActiveTab("contact")}
                >
                  Send a Message
                </button>
                <button
                  role="tab"
                  aria-selected={activeTab === "demo"}
                  className={`${styles.tab} ${activeTab === "demo" ? styles.tabActive : ""}`}
                  onClick={() => setActiveTab("demo")}
                >
                  Book a Demo
                </button>
              </div>

              <div className={styles.formCard}>
                {activeTab === "contact" ? <ContactForm /> : <DemoForm />}
              </div>
            </div>

            {/* ── Right: Info ── */}
            <aside className={styles.infoPanel}>
              <div className={styles.infoCard}>
                <h3 className={styles.infoTitle}>Contact Information</h3>
                <div className={styles.infoItems}>
                  {[
                    { icon: "Mail", label: "Sales", val: "sales@voiceaxis.io" },
                    {
                      icon: "LifeBuoy",
                      label: "Support",
                      val: "support@voiceaxis.io",
                    },
                    { icon: "Phone", label: "Hotline", val: "+91-755-516-4186" },
                  ].map(({ icon, label, val }) => (
                    <div key={label} className={styles.infoItem}>
                      <Icon name={icon} size="md" className={styles.infoIcon} />
                      <div>
                        <div className={styles.infoLabel}>{label}</div>
                        <div className={styles.infoVal}>{val}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className={styles.infoCard}>
                <h3 className={styles.infoTitle}>Offices</h3>
                {[
                  {
                    city: "Chennai",
                    addr: "46., Devarajamdlist, Park Town,  600003",
                  },
                  {
                    city: "Singapore",
                    addr: "1 Raffles Place, #20-61, 048616",
                  },
                  {
                    city: "San Francisco",
                    addr: "101 Mission St, Suite 1750, CA 94105",
                  },
                ].map(({ city, addr }) => (
                  <div key={city} className={styles.office}>
                    <div className={styles.officeCity}>{city}</div>
                    <div className={styles.officeAddr}>{addr}</div>
                  </div>
                ))}
              </div>

              <div className={styles.infoCard}>
                <h3 className={styles.infoTitle}>Response Times</h3>
                {[
                  { type: "Sales inquiry", time: "Within 2 hours" },
                  { type: "Demo request", time: "Same day" },
                  { type: "Support (Starter)", time: "Within 24 hours" },
                  { type: "Support (Enterprise)", time: "Within 1 hour" },
                ].map(({ type, time }) => (
                  <div key={type} className={styles.slaRow}>
                    <span className={styles.slaType}>{type}</span>
                    <span className={styles.slaTime}>{time}</span>
                  </div>
                ))}
              </div>
            </aside>
          </div>
        </div>
      </section>
    </div>
  );
}
