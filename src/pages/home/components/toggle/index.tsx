import { useEffect, useState } from "react";
import { FaMoon, FaSun } from "react-icons/fa";

// eslint-disable-next-line no-unused-vars
import React from "react";
import "./styles.css";

function Toggle() {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const handleToggle = () => {
    setIsDarkMode(!isDarkMode);
    document.body.classList.toggle("dark");
    localStorage.setItem("darkMode", JSON.stringify(!isDarkMode));
  };

  useEffect(() => {
    const darkMode = JSON.parse(localStorage.getItem("darkMode") || "false");
    setIsDarkMode(darkMode);
    if (darkMode) {
      document.body.classList.add("dark");
    }
  }, []);

  return (
    <div className="toggle">
      <button
        className={`toggle-button ${
          isDarkMode ? "toggle-button-on" : "toggle-button-off"
        }`}
        onClick={handleToggle}
      >
        {isDarkMode ? (
          <FaMoon size={20} color="#fff" />
        ) : (
          <FaSun size={20} color="#ffbb00" />
        )}
      </button>
    </div>
  );
}

export default Toggle;
