import React, { useEffect, useState } from "react";
import SvgIcon from "./SvgIcon";

const ThemeToggle: React.FC = () => {
  const [theme, setTheme] = useState<string | null>(
    () => localStorage.getItem("theme") || "dark",
  );

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
  }, [theme]);

  const toggleTheme = () => {
    const newTheme = theme === "dark" ? "light" : "dark";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
  };

  const buttonLabel = theme === "dark" ? "Switch to light theme" : "Switch to dark theme";
  const iconName = theme === "dark" ? "sun" : "moon";


  return (
    <button
      onClick={toggleTheme}
      className="theme-toggle"
      aria-label={buttonLabel}
      title={buttonLabel}
    >
      <SvgIcon name={iconName} title={buttonLabel} />
    </button>
  );
};

export default ThemeToggle;