import React, { useEffect } from 'react';
import { useAccessibility } from '../context/AccessibilityContext';

/**
 * HOC: withAudioGuidance
 * Speaks screen guidance text aloud when elderly/non-literate patients enter a screen.
 */
export const withAudioGuidance = (WrappedComponent, getVoiceText) => {
  return function AudioGuidedComponent(props) {
    const { speak, audioEnabled, t } = useAccessibility();

    useEffect(() => {
      if (audioEnabled && typeof getVoiceText === 'function') {
        const textToSpeak = getVoiceText(t);
        // Small delay to allow page render
        const timer = setTimeout(() => {
          speak(textToSpeak);
        }, 300);
        return () => clearTimeout(timer);
      }
    }, [audioEnabled, t]);

    return <WrappedComponent {...props} />;
  };
};

export default withAudioGuidance;
