import React from "react";
import clsx from "clsx";
import styles from "@/styles/components/modal.module.css";

export interface ModalProps {
  /** Whether the modal is visible */
  open: boolean;

  /** Called when user clicks outside or presses ESC */
  onClose?: () => void;

  /** Modal content */
  children: React.ReactNode;

  /** Optional title displayed at the top */
  title?: string;

  /** Optional custom class for the modal container */
  className?: string;
}

export default function Modal({
  open,
  onClose,
  children,
  title,
  className,
}: ModalProps) {
  if (!open) return null;

  const handleBackgroundClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) onClose?.();
  };

  React.useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose?.();
    };
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [onClose]);

  return (
    <div className={styles.overlay} onClick={handleBackgroundClick}>
      <div className={clsx(styles.modal, className)}>
        {title && <h2 className={styles.title}>{title}</h2>}
        <div className={styles.content}>{children}</div>
      </div>
    </div>
  );
}
