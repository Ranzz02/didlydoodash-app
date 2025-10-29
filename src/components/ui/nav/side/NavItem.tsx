import { ReactNode } from "react";
import { NavLink, useLocation } from "react-router-dom";
import Tooltip from "../../Tooltip";
import clsx from "clsx";
import styles from "./sidebar.module.css";

export type NavItemProps = {
  to: string;
  icon?: ReactNode;
  text: string;
  open: boolean;
  tooltip?: string;
};

export const NavItem = ({ to, icon, text, open, tooltip }: NavItemProps) => {
  const location = useLocation();
  const isActive = location.pathname === to;

  const navItemClasses = clsx(styles.item, {
    [styles.closed]: !open, // closed when sidebar is NOT open
    [styles.active]: isActive,
  });

  const content = (
    <NavLink to={to} className={navItemClasses}>
      {icon}
      <span className={styles.linkText}>{text}</span>
    </NavLink>
  );

  // Tooltip only needed when sidebar is collapsed
  return (
    <Tooltip
      enabled={open && tooltip !== undefined}
      title={tooltip ?? ""}
      placement="right"
    >
      {content}
    </Tooltip>
  );
};
