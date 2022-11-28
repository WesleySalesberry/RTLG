import React, { useState } from 'react';

export const LanguageContext = React.createContext();

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState([]);
  return (
    <LanguageContext.Provider value={{ language, setLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};