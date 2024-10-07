import React, { useEffect, useState } from "react";

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

  return (
    <button
      onClick={toggleTheme}
      className={`fixed top-4 right-4 z-50 rounded-full bg-gray-800 text-white p-2
        transition-all duration-300 ease-in-out
        hover:ring-2 hover:ring-offset-2 hover:ring-offset-gray-400
        hover:opacity-100 opacity-40`}
      aria-label={"Toggle theme"}
    >
      Toggle Theme
    </button>
  );
};

export default ThemeToggle;