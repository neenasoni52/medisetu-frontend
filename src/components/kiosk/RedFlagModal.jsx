import React from 'react';
import { useDispatch } from 'react-redux';
import { acknowledgeRedFlag, dismissRedFlag } from '../../redux/slices/interviewSlice';
import { useAccessibility } from '../../context/AccessibilityContext';
import '../../styles/components/redFlagModal.css';

export const RedFlagModal = ({ alert, sessionId }) => {
  const dispatch = useDispatch();
  const { t } = useAccessibility();

  if (!alert || alert.severity !== 'CRITICAL') {
    return null;
  }

  const handleAcknowledge = () => {
    if (sessionId) {
      dispatch(acknowledgeRedFlag(sessionId));
    } else {
      dispatch(dismissRedFlag());
    }
  };

  return (
    <div className="ms-redflag-overlay" role="alertdialog" aria-modal="true" aria-labelledby="redflag-title">
      <div className="ms-redflag-dialog">
        <div className="ms-redflag-header">
          <div className="ms-redflag-icon-badge">
            <span className="material-symbols-outlined" style={{ fontSize: '48px' }}>
              e911_emergency
            </span>
          </div>
          <h1 id="redflag-title">{t.redFlagEmergencyTitle}</h1>
          <p className="ms-redflag-subtitle">{t.emergencySubtitle}</p>
        </div>

        <div className="ms-redflag-alert-box">
          <p className="ms-redflag-message">{alert.message}</p>
        </div>

        <div className="ms-emergency-contacts-grid">
          <div className="ms-contact-card">
            <span className="material-symbols-outlined ms-contact-icon">emergency</span>
            <div className="ms-contact-info">
              <span className="ms-contact-label">Ambulance / एम्बुलेंस</span>
              <span className="ms-contact-number">108</span>
            </div>
          </div>

          <div className="ms-contact-card">
            <span className="material-symbols-outlined ms-contact-icon">local_police</span>
            <div className="ms-contact-info">
              <span className="ms-contact-label">National Emergency / हेल्पलाइन</span>
              <span className="ms-contact-number">112</span>
            </div>
          </div>

          <div className="ms-contact-card" style={{ gridColumn: '1 / -1' }}>
            <span className="material-symbols-outlined ms-contact-icon">medical_services</span>
            <div className="ms-contact-info">
              <span className="ms-contact-label">Hospital Staff Instruction</span>
              <span className="ms-contact-text">{t.nurseDeskPrompt}</span>
            </div>
          </div>
        </div>

        <div className="ms-redflag-actions">
          <button
            type="button"
            className="ms-btn-acknowledge"
            onClick={handleAcknowledge}
          >
            <span className="material-symbols-outlined">check_circle</span>
            {t.helpReceivedBtn}
          </button>
        </div>
      </div>
    </div>
  );
};

export default RedFlagModal;
