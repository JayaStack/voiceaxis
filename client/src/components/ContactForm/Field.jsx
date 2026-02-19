import styles from "./ContactForm.module.css";

export default function Field({
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
