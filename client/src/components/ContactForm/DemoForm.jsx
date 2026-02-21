import { useForm } from "../../hooks/useForm";
import { bookDemo } from "../../utils/api";
import Button from "../Button/Button";
import Field from "./Field";
import Icon from "../ui/Icon";
import styles from "./ContactForm.module.css";

const DEMO_INITIAL = {
  name: "",
  email: "",
  company: "",
  date: "",
  time: "",
  timezone: "",
};

function validateDemo(values) {
  const e = {};
  if (!values.name.trim()) e.name = "Full name is required.";
  if (!values.email.trim()) e.email = "Work email is required.";
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email))
    e.email = "Enter a valid email address.";
  if (!values.date) e.date = "Please select a preferred date.";
  return e;
}

export default function DemoForm() {
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
          <Icon name="Check" size="lg" />
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
        placeholder="Shirou Emiya"
        required
        {...fieldProps}
      />
      <Field
        label="Work Email"
        name="email"
        type="email"
        placeholder="info@Studio.com"
        required
        {...fieldProps}
      />
      <Field
        label="Company"
        name="company"
        placeholder="Ufotable"
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
