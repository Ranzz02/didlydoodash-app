import { useEffect, useState } from "react";

export function useTheme() {
  // Default: match system theme
  const systemPrefersLight =
    window.matchMedia &&
    window.matchMedia("(prefers-color-scheme: light)").matches;

  const [theme, setTheme] = useState(
    localStorage.getItem("theme") || (systemPrefersLight ? "light" : "dark")
  );

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () =>
    setTheme((prev) => (prev === "light" ? "dark" : "light"));

  return { theme, toggleTheme };
}
