import * as Icons from "lucide-react";
import styles from "./icon.module.css";

/**
 * A centralized Icon component for the application.
 * Uses lucide-react as the primary icon library.
 * 
 * @param {Object} props
 * @param {string} props.name - The name of the Lucide icon (e.g., "Rocket", "Mail")
 * @param {'xs' | 'sm' | 'md' | 'lg' | 'xl'} [props.size='md'] - The size of the icon
 * @param {string} [props.className=''] - Additional CSS classes
 * @param {boolean} [props.inline=false] - Whether to add right margin for inline text
 * @param {string} [props['aria-label']] - Accessibility label
 */
export default function Icon({
  name,
  size = "md",
  className = "",
  inline = false,
  "aria-label": ariaLabel,
  ...props
}) {
  const LucideIcon = Icons[name];
  if (!LucideIcon) {
    console.warn(`Icon "${name}" not found in lucide-react`);
    return null;
  }

  return (
    <span
      className={`
        ${styles.icon}
        ${styles[size]}
        ${inline ? styles.inline : ""}
        ${className}
      `}
    >
      <LucideIcon
        aria-hidden={ariaLabel ? undefined : "true"}
        aria-label={ariaLabel}
        {...props}
      />
    </span>
  );
}
