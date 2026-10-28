import React from 'react';
import { useAccessibility } from '../../context/AccessibilityContext';

export const AudioPrompt = ({ text, label = 'Listen' }) => {
  const { speak } = useAccessibility();

  return (
    <button
      type="button"
      onClick={() => speak(text)}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '6px',
        padding: '6px 14px',
        borderRadius: 'var(--ms-radius-full)',
        backgroundColor: 'var(--ms-navy-100)',
        color: 'var(--ms-navy-800)',
        border: '1px solid var(--ms-navy-700)',
        fontWeight: '600',
        fontSize: '0.9rem',
      }}
      title="Tap to hear this instruction aloud"
    >
      <span className="material-symbols-outlined" style={{ fontSize: '20px' }}>
        volume_up
      </span>
      <span>{label}</span>
    </button>
  );
};

export default AudioPrompt;
