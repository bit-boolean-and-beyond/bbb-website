import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSun, faMoon } from "@fortawesome/free-solid-svg-icons";

interface DarkModeToggleProps {
  isDarkMode: boolean;
  onThemeChange: (newMode: boolean) => void;
}

const DarkModeToggle: React.FC<DarkModeToggleProps> = ({ isDarkMode, onThemeChange }) => {
  const toggleTheme = () => {
    const newMode = !isDarkMode;
    localStorage.setItem("isDarkMode", newMode.toString());
    document.documentElement.className = newMode ? "dark" : "light";
    onThemeChange(newMode); // Notify the parent of the state change
  };

  return (
    <button
      onClick={toggleTheme}
      className="fixed top-4 right-4 z-50 px-4 py-2 bg-gray-800 text-white rounded shadow-md hover:bg-gray-700"
      aria-label="Toggle dark mode"
    >
      {isDarkMode ? (
        <>
          <FontAwesomeIcon icon={faSun} />
          <br />
          <p>Light Mode</p>
        </>
      ) : (
        <>
          <FontAwesomeIcon icon={faMoon} />
          <br />
          <p>Dark Mode</p>
        </>
      )}
    </button>
  );
};

export default DarkModeToggle;