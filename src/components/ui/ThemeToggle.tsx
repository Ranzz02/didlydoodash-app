import { useTheme } from "@/hooks/useTheme";
import "@/styles/components/themeToggle.css";

import { FaMoon } from "react-icons/fa";
import { FaSun } from "react-icons/fa";

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className={`theme-toggle ${theme === "dark" ? "dark" : "light"}`}
      aria-label="Toggle theme"
      aria-pressed={theme === "dark"}
    >
      <span className="theme-toggle__thumb" />
      <span className="theme-toggle__icon">
        {theme === "light" ? (
          <FaSun color="orange" />
        ) : (
          <FaMoon color="white" />
        )}
      </span>
    </button>
  );
}
