import clsx from "clsx";
import styles from "@/styles/components/badge.module.css";

export interface BadgeProps {
  /** Text or number to display inside the badge */
  content?: string | number;

  /** Optional color theme — e.g. “success”, “error”, “neutral” */
  variant?: "default" | "success" | "error" | "contrast";

  /** Optional className for additional styling */
  className?: string;

  /** Optional tooltip/title for hover */
  title?: string;

  /** Optional children (for wrapping icons, buttons, etc.) */
  children?: React.ReactNode;

  /** Controls where the badge appears when used as a wrapper */
  position?: "top-right" | "top-left" | "bottom-right" | "bottom-left";
}

export function Badge({
  content,
  variant = "default",
  className,
  title,
  children,
  position = "top-right",
}: BadgeProps) {
  // ✅ Treat null, undefined, empty string, or whitespace-only as "no content"
  const isEmpty =
    content === 0 ||
    content === null ||
    content === undefined ||
    (typeof content === "string" && content.trim() === "");

  if (isEmpty) return <>{children ?? null}</>;

  // No children → just render the badge itself
  if (!children) {
    return (
      <span
        className={clsx(styles.badge, styles[variant], className)}
        title={title}
      >
        {content}
      </span>
    );
  }

  // With children → render badge overlay
  return (
    <div className={clsx(styles.badgeWrapper, className)}>
      {children}
      <span
        className={clsx(styles.badge, styles[variant], styles[position])}
        title={title}
      >
        {content}
      </span>
    </div>
  );
}

export default Badge;
