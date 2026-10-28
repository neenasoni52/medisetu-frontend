import React from 'react';
import { useAccessibility } from '../../context/AccessibilityContext';
import '../../styles/common/alertBanner.css';

/**
 * AlertBanner Component
 * Implements Workflow 2: The Cabin Rule
 * Warns temporary token holders that they must collect their permanent token from the desk.
 */
export const AlertBanner = ({ isTemporary, tokenNumber }) => {
  const { t, speak } = useAccessibility();

  const handleHearAlert = () => {
    const text = isTemporary
      ? t.cabinRuleDesc.replace('{token}', tokenNumber || '')
      : t.permanentVerifiedDesc;
    speak(text);
  };

  if (isTemporary) {
    return (
      <div className="ms-alert-banner temporary" role="alert">
        <span className="material-symbols-outlined alert-icon">warning</span>
        <div className="ms-alert-content" style={{ flex: 1 }}>
          <h3>{t.cabinRuleTitle}</h3>
          <p>
            {t.cabinRuleDesc.split('{token}')[0]}
            <span className="ms-alert-tag">{tokenNumber}</span>
            {t.cabinRuleDesc.split('{token}')[1]}
          </p>
        </div>
        <button
          onClick={handleHearAlert}
          className="ms-icon-btn"
          style={{ alignSelf: 'center', backgroundColor: '#ffffff' }}
          title="Hear this warning aloud"
        >
          <span className="material-symbols-outlined">volume_up</span>
        </button>
      </div>
    );
  }

  return (
    <div className="ms-alert-banner permanent" role="status">
      <span className="material-symbols-outlined alert-icon">verified</span>
      <div className="ms-alert-content" style={{ flex: 1 }}>
        <h3>{t.permanentVerifiedTitle}</h3>
        <p>{t.permanentVerifiedDesc}</p>
      </div>
      <button
        onClick={handleHearAlert}
        className="ms-icon-btn"
        style={{ alignSelf: 'center', backgroundColor: '#ffffff' }}
        title="Hear confirmation aloud"
      >
        <span className="material-symbols-outlined">volume_up</span>
      </button>
    </div>
  );
};

export default AlertBanner;
