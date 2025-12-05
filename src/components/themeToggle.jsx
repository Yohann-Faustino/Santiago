import React, { useState, useEffect } from "react";

const ThemeToggle = () => {
  // État pour savoir si le mode sombre est activé
  const [isDarkMode, setIsDarkMode] = useState(() => {
    // Vérifie si l'utilisateur a un thème sauvegardé dans localStorage
    const savedTheme = localStorage.getItem("theme");
    // Si pas de thème sauvegardé, utilise la préférence système
    return savedTheme
      ? savedTheme === "dark"
      : window.matchMedia("(prefers-color-scheme: dark)").matches;
  });

  // Effet pour appliquer le thème dans le DOM et le sauvegarder
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add("dark"); // active le mode sombre (Tailwind)
      localStorage.setItem("theme", "dark"); // sauvegarde la préférence
    } else {
      document.documentElement.classList.remove("dark"); // désactive le mode sombre
      localStorage.setItem("theme", "light"); // sauvegarde la préférence
    }
  }, [isDarkMode]);

  return (
    <button
      onClick={() => setIsDarkMode(!isDarkMode)} // bascule le mode sombre
      className="p-0.5 rounded-lg border dark:border-gray-200 border-gray-800 dark:bg-gray-800 bg-white dark:text-white text-black"
      aria-label="Basculer le mode jour/nuit"
    >
      {isDarkMode ? "☀️ Mode Jour" : "🌙 Mode Nuit"}
    </button>
  );
};

export default ThemeToggle;
