import { useForm } from "../../hooks/useForm";
import { submitContact } from "../../utils/api";
import Button from "../Button/Button";
import Field from "./Field";
import styles from "./ContactForm.module.css";

const CONTACT_INITIAL = {
  name: "",
  email: "",
  company: "",
  phone: "",
  employees: "",
  message: "",
};

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

export default function ContactForm() {
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
          placeholder="Ananya"
          required
          {...fieldProps}
        />
        <Field
          label="Work Email"
          name="email"
          type="email"
          placeholder="ananya@gmail.com"
          required
          {...fieldProps}
        />
      </div>
      <div className={styles.formRow}>
        <Field
          label="Company"
          name="company"
          placeholder="Buenve Grp"
          required
          {...fieldProps}
        />
        <Field
          label="Phone"
          name="phone"
          type="tel"
          placeholder="+91 97905 40716"
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
