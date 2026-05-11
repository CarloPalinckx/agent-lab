import type { MouseEventHandler } from "react";

export interface ButtonProps {
  /** Button label text */
  label: string;
  /** Click handler */
  onClick?: MouseEventHandler<HTMLButtonElement>;
  /** Visual variant */
  variant?: "primary" | "secondary";
  /** Disabled state */
  disabled?: boolean;
}

export function Button({
  label,
  onClick,
  variant = "primary",
  disabled = false,
}: ButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      style={{
        padding: "8px 16px",
        borderRadius: "4px",
        border: "none",
        cursor: disabled ? "not-allowed" : "pointer",
        opacity: disabled ? 0.6 : 1,
        backgroundColor: variant === "primary" ? "#0070f3" : "#e5e7eb",
        color: variant === "primary" ? "#ffffff" : "#111827",
        fontWeight: 500,
        fontSize: "14px",
      }}
    >
      {label}
    </button>
  );
}
