import { useState } from "react";
import { useForm } from "../../hooks/useForm";
import { submitContact, bookDemo } from "../../utils/api";
import SectionHeader from "../../components/SectionHeader/SectionHeader";
import Button from "../../components/Button/Button";
import styles from "./Contact.module.css";

/* ─── Validation ─────────────────────────────── */
function validateContact(values) {
  const e = {};
  if (!values.name.trim()) e.name = "Full name is required.";
  if (!values.email.trim()) e.email = "Work email is required.";
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email))
    e.email = "Enter a valid email address.";
  if (!values.company.trim()) e.company = "Company name is required.";
  if (!values.message.trim()) e.message = "Please tell us about your use case.";
  return e;
}

function validateDemo(values) {
  const e = {};
  if (!values.name.trim()) e.name = "Full name is required.";
  if (!values.email.trim()) e.email = "Work email is required.";
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email))
    e.email = "Enter a valid email address.";
  if (!values.date) e.date = "Please select a preferred date.";
  return e;
}

/* ─── Field component ────────────────────────── */
function Field({
  label,
  name,
  type = "text",
  placeholder,
  required,
  as,
  options,
  values,
  errors,
  touched,
  onChange,
  onBlur,
}) {
  const hasError = touched[name] && errors[name];

  const inputProps = {
    id: name,
    name,
    value: values[name],
    onChange,
    onBlur,
    placeholder,
    "aria-required": required,
    "aria-describedby": hasError ? `${name}-error` : undefined,
    "aria-invalid": hasError ? "true" : "false",
    className: `${styles.input} ${hasError ? styles.inputError : ""}`,
  };

  return (
    <div className={styles.field}>
      <label htmlFor={name} className={styles.label}>
        {label}{" "}
        {required && (
          <span className={styles.required} aria-hidden="true">
            *
          </span>
        )}
      </label>

      {as === "textarea" ? (
        <textarea
          {...inputProps}
          rows={4}
          className={`${inputProps.className} ${styles.textarea}`}
        />
      ) : as === "select" ? (
        <select {...inputProps}>
          <option value="">Select...</option>
          {options.map((o) => (
            <option key={o.value} value={o.value}>
              {o.label}
            </option>
          ))}
        </select>
      ) : (
        <input {...inputProps} type={type} />
      )}

      {hasError && (
        <span id={`${name}-error`} className={styles.fieldError} role="alert">
          {errors[name]}
        </span>
      )}
    </div>
  );
}

/* ─── Contact Form ───────────────────────────── */
const CONTACT_INITIAL = {
  name: "",
  email: "",
  company: "",
  phone: "",
  employees: "",
  message: "",
};

function ContactForm() {
  const {
    values,
    errors,
    touched,
    status,
    serverMessage,
    handleChange,
    handleBlur,
    handleSubmit,
  } = useForm(CONTACT_INITIAL, validateContact, async (vals) => {
    await submitContact(vals);
    return "Thanks! Our team will reach out within 2 hours.";
  });

  if (status === "success") {
    return (
      <div className={styles.successBox} role="status">
        <div className={styles.successCheck} aria-hidden="true">
          ✓
        </div>
        <h3 className={styles.successTitle}>Request received!</h3>
        <p className={styles.successDesc}>{serverMessage}</p>
      </div>
    );
  }

  const fieldProps = {
    values,
    errors,
    touched,
    onChange: handleChange,
    onBlur: handleBlur,
  };

  return (
    <form
      className={styles.form}
      onSubmit={handleSubmit}
      noValidate
      aria-label="Contact form"
    >
      <div className={styles.formRow}>
        <Field
          label="Full Name"
          name="name"
          placeholder="Anika Reddy"
          required
          {...fieldProps}
        />
        <Field
          label="Work Email"
          name="email"
          type="email"
          placeholder="anika@company.com"
          required
          {...fieldProps}
        />
      </div>
      <div className={styles.formRow}>
        <Field
          label="Company"
          name="company"
          placeholder="Acme Corp"
          required
          {...fieldProps}
        />
        <Field
          label="Phone"
          name="phone"
          type="tel"
          placeholder="+91 98765 43210"
          {...fieldProps}
        />
      </div>
      <Field
        label="Team Size"
        name="employees"
        as="select"
        options={[
          { value: "1-10", label: "1–10 employees" },
          { value: "11-50", label: "11–50 employees" },
          { value: "51-200", label: "51–200 employees" },
          { value: "201-1000", label: "201–1000 employees" },
          { value: "1000+", label: "1,000+ employees" },
        ]}
        {...fieldProps}
      />
      <Field
        label="Tell us about your use case"
        name="message"
        as="textarea"
        placeholder="We handle ~10,000 inbound calls per day and need to automate tier-1 support..."
        required
        {...fieldProps}
      />

      {status === "error" && (
        <p className={styles.serverError} role="alert">
          {serverMessage}
        </p>
      )}

      <Button type="submit" size="lg" fullWidth loading={status === "loading"}>
        Send Request
      </Button>

      <p className={styles.formFooter}>
        No spam. Our team responds within 2 hours on business days.
      </p>
    </form>
  );
}

/* ─── Demo Form ──────────────────────────────── */
const DEMO_INITIAL = {
  name: "",
  email: "",
  company: "",
  date: "",
  time: "",
  timezone: "",
};

function DemoForm() {
  const {
    values,
    errors,
    touched,
    status,
    serverMessage,
    handleChange,
    handleBlur,
    handleSubmit,
  } = useForm(DEMO_INITIAL, validateDemo, async (vals) => {
    await bookDemo(vals);
    return "Your demo is booked! Check your email for a calendar invite.";
  });

  if (status === "success") {
    return (
      <div className={styles.successBox} role="status">
        <div className={styles.successCheck} aria-hidden="true">
          ✓
        </div>
        <h3 className={styles.successTitle}>Demo booked!</h3>
        <p className={styles.successDesc}>{serverMessage}</p>
      </div>
    );
  }

  const fieldProps = {
    values,
    errors,
    touched,
    onChange: handleChange,
    onBlur: handleBlur,
  };

  return (
    <form
      className={styles.form}
      onSubmit={handleSubmit}
      noValidate
      aria-label="Demo booking form"
    >
      <Field
        label="Full Name"
        name="name"
        placeholder="Marcus Whitfield"
        required
        {...fieldProps}
      />
      <Field
        label="Work Email"
        name="email"
        type="email"
        placeholder="marcus@company.com"
        required
        {...fieldProps}
      />
      <Field
        label="Company"
        name="company"
        placeholder="RetailEdge"
        {...fieldProps}
      />
      <Field
        label="Preferred Date"
        name="date"
        type="date"
        required
        {...fieldProps}
      />
      <div className={styles.formRow}>
        <Field
          label="Preferred Time"
          name="time"
          as="select"
          options={[
            { value: "09:00", label: "9:00 AM" },
            { value: "10:00", label: "10:00 AM" },
            { value: "11:00", label: "11:00 AM" },
            { value: "14:00", label: "2:00 PM" },
            { value: "15:00", label: "3:00 PM" },
            { value: "16:00", label: "4:00 PM" },
          ]}
          {...fieldProps}
        />
        <Field
          label="Timezone"
          name="timezone"
          as="select"
          options={[
            { value: "IST", label: "IST (UTC+5:30)" },
            { value: "SGT", label: "SGT (UTC+8)" },
            { value: "GST", label: "GST (UTC+4)" },
            { value: "EST", label: "EST (UTC-5)" },
            { value: "PST", label: "PST (UTC-8)" },
            { value: "GMT", label: "GMT (UTC+0)" },
          ]}
          {...fieldProps}
        />
      </div>

      {status === "error" && (
        <p className={styles.serverError} role="alert">
          {serverMessage}
        </p>
      )}

      <Button type="submit" size="lg" fullWidth loading={status === "loading"}>
        Book Demo
      </Button>
      <p className={styles.formFooter}>
        30-minute session · You'll receive a calendar invite immediately.
      </p>
    </form>
  );
}

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
                    { icon: "📧", label: "Sales", val: "sales@voiceaxis.io" },
                    {
                      icon: "🛟",
                      label: "Support",
                      val: "support@voiceaxis.io",
                    },
                    { icon: "📞", label: "Hotline", val: "+1 (800) 555-0192" },
                  ].map(({ icon, label, val }) => (
                    <div key={label} className={styles.infoItem}>
                      <span className={styles.infoIcon}>{icon}</span>
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
                    city: "Bangalore",
                    addr: "Prestige Tech Park, Whitefield, 560066",
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
