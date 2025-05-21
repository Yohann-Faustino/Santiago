import React, { useState, useEffect } from "react";

const ThemeToggle = () => {
  const [isDarkMode, setIsDarkMode] = useState(() => {
    // Vérifie le thème stocké dans le localStorage ou les préférences système
    const savedTheme = localStorage.getItem("theme");
    return savedTheme ? savedTheme === "dark" : window.matchMedia("(prefers-color-scheme: dark)").matches;
  });

  // Appliquer le thème au body (ou à html)
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [isDarkMode]);

  return (
    <button
      onClick={() => setIsDarkMode(!isDarkMode)}
      className="p-0.5 rounded-lg border dark:border-gray-200 border-gray-800 dark:bg-gray-800 bg-white dark:text-white text-black"
      aria-label="Basculer le mode jour/nuit"
    >
      {isDarkMode ? "☀️ Mode Jour" : "🌙 Mode Nuit"}
    </button>
  );
};

export default ThemeToggle;
