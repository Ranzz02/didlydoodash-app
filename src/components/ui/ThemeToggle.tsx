import { useTheme } from "@/hooks/useTheme";

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="card"
      style={{
        border: "none",
        borderRadius: "6px",
        padding: "0.5rem 1rem",
        cursor: "pointer",
        fontWeight: 600,
      }}
    >
      {theme === "light" ? "🌙 Dark Mode" : "☀️ Light Mode"}
    </button>
  );
}
