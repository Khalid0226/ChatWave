import React, { createContext, useContext, useState, useEffect } from 'react';

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useState(() => {
    // LocalStorage se saved theme check karein, default dark rakhein
    const savedTheme = localStorage.getItem('chatwave_theme');
    return savedTheme ? JSON.parse(savedTheme) : true;
  });

  useEffect(() => {
    // LocalStorage mein save karein
    localStorage.setItem('chatwave_theme', JSON.stringify(isDarkMode));

    // HTML root element par dark class add/remove karein
    const root = document.documentElement;
    if (isDarkMode) {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }, [isDarkMode]);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <ThemeContext.Provider value={{ isDarkMode, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);