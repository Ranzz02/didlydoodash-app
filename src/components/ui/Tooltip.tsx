import React, { useState } from "react";
import "@/styles/components/tooltip.css";

export interface TooltipProps {
  enabled?: boolean;
  title: string;
  placement?: "right" | "left" | "top" | "bottom";
  children: React.ReactNode;
}

function Tooltip({
  enabled = true,
  title,
  placement = "right",
  children,
}: TooltipProps) {
  const [visible, setVisible] = useState(false);

  return (
    <div
      className="tooltip-wrapper"
      onMouseEnter={() => setVisible(true)}
      onFocus={() => setVisible(true)}
      onBlur={() => setVisible(false)}
      style={{ position: "relative", display: "inline-block" }}
    >
      {children}
      {visible && enabled && (
        <div className={`tooltip tooltip-${placement}`} role="tooltip">
          {title}
        </div>
      )}
    </div>
  );
}

export default Tooltip;
