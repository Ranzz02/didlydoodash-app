import clsx from "clsx";
import "@/styles/components/organisations/settingCard.css";

export interface SettingCardProps {
  title: string;
  description?: string;
  variant?: "danger" | "normal";
  children?: React.ReactNode;
}

export default function SettingCard({
  title,
  description,
  variant = "normal",
  children,
}: SettingCardProps) {
  return (
    <div className={clsx("setting_card", { danger: variant === "danger" })}>
      <div className="setting_card_header">
        <h3>{title}</h3>
        {description && <p>{description}</p>}
      </div>
      <div className="setting_card_body">{children}</div>
    </div>
  );
}
