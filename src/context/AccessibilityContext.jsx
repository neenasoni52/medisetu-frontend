import React, { createContext, useContext, useState, useEffect } from 'react';
import { speakText, stopSpeech } from '../utils/audioHelper';
import { translations } from '../utils/translations';

const AccessibilityContext = createContext();

export const AccessibilityProvider = ({ children }) => {
  const [largeFont, setLargeFont] = useState(false);
  const [highContrast, setHighContrast] = useState(false);
  const [audioEnabled, setAudioEnabled] = useState(true);
  const [language, setLanguage] = useState('hi'); // Default to Hindi for public hospital kiosk

  useEffect(() => {
    if (largeFont) {
      document.body.classList.add('large-font');
    } else {
      document.body.classList.remove('large-font');
    }
  }, [largeFont]);

  useEffect(() => {
    if (highContrast) {
      document.body.classList.add('high-contrast');
    } else {
      document.body.classList.remove('high-contrast');
    }
  }, [highContrast]);

  // Voice narration helper using current language
  const speak = (text) => {
    if (audioEnabled && text) {
      speakText(text, language);
    }
  };

  const t = translations[language] || translations.hi;

  return (
    <AccessibilityContext.Provider
      value={{
        largeFont,
        toggleLargeFont: () => setLargeFont((prev) => !prev),
        highContrast,
        toggleHighContrast: () => setHighContrast((prev) => !prev),
        audioEnabled,
        toggleAudio: () => {
          stopSpeech();
          setAudioEnabled((prev) => !prev);
        },
        language,
        setLanguage,
        speak,
        t,
      }}
    >
      {children}
    </AccessibilityContext.Provider>
  );
};

export const useAccessibility = () => useContext(AccessibilityContext);
