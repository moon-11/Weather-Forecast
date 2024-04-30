import React, { useState, useEffect } from 'react';
import './styles.css';

function Toggle() {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const handleToggle = () => {
    setIsDarkMode(!isDarkMode);
  };

  useEffect(() => {
    const html = document.querySelector('html');
    if (html) {
      if (isDarkMode) {
        html.style.setProperty('--bg-color', '#333');
        html.style.setProperty('--text-color', '#fff');
      } else {
        html.style.setProperty('--bg-color', '#fff');
        html.style.setProperty('--text-color', '#333');
      }
    }
  }, [isDarkMode]);

  return (
    <div className="toggle">
      <button
        className={`toggle-button ${isDarkMode ? 'toggle-button-on' : 'toggle-button-off'}`}
        onClick={handleToggle}
      >
        {isDarkMode ? 'Dark Mode' : 'Light Mode'}
      </button>
    </div>
  );
}

export default Toggle;

