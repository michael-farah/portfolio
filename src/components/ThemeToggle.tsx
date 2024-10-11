import React from "react";
import SvgIcon from "./SvgIcon";
import { useTheme } from "./ThemeContext";

const ThemeToggle: React.FC = () => {
  const { theme, setTheme } = useTheme();

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  const buttonLabel =
    theme === "dark" ? "Switch to light theme" : "Switch to dark theme";
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