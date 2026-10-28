import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAccessibility } from '../../context/AccessibilityContext';
import { useRole } from '../../context/RoleContext';
import logoImg from '../../assets/medisetu-logo.png';
import '../../styles/common/header.css';

export const Header = () => {
  const navigate = useNavigate();
  const { largeFont, toggleLargeFont, highContrast, toggleHighContrast, audioEnabled, toggleAudio, language, setLanguage, t } = useAccessibility();
  const { activeRole, setActiveRole } = useRole();

  const handleRoleChange = (role, path) => {
    setActiveRole(role);
    navigate(path);
  };

  return (
    <header className="ms-header">
      <div className="ms-header-container">
        {/* Brand / Logo (Vite direct asset import with transparent background) */}
        <div className="ms-brand" onClick={() => navigate('/kiosk')} style={{ cursor: 'pointer' }}>
          <img src={logoImg} alt="MediSetu Logo" className="ms-brand-logo" />
          <div className="ms-brand-text-container">
            <div className="ms-brand-title">MediSetu</div>
            <div className="ms-brand-subtitle">{t.hospitalTagline}</div>
          </div>
        </div>

        {/* Persona Switcher (For rapid prototype demonstration) */}
        <div className="ms-role-nav">
          <button
            className={`ms-role-btn ${activeRole === 'kiosk' ? 'active' : ''}`}
            onClick={() => handleRoleChange('kiosk', '/kiosk')}
            title="Kiosk Touchscreen for Patients"
          >
            <span className="material-symbols-outlined">tablet</span>
            {t.roleKiosk}
          </button>
          <button
            className={`ms-role-btn ${activeRole === 'desk' ? 'active' : ''}`}
            onClick={() => handleRoleChange('desk', '/desk')}
            title="OPD Registration Desk"
          >
            <span className="material-symbols-outlined">desk</span>
            {t.roleDesk}
          </button>
          <button
            className={`ms-role-btn ${activeRole === 'doctor' ? 'active' : ''}`}
            onClick={() => handleRoleChange('doctor', '/doctor')}
            title="Doctor Consultation Cabin"
          >
            <span className="material-symbols-outlined">stethoscope</span>
            {t.roleDoctor}
          </button>
        </div>

        {/* Accessibility & Language Controls for Elderly */}
        <div className="ms-a11y-controls">
          {/* Quick Language switcher */}
          <select
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            style={{
              padding: '8px 12px',
              borderRadius: 'var(--ms-radius-sm)',
              border: '1px solid var(--ms-border-medium)',
              fontWeight: '600',
              backgroundColor: 'var(--ms-bg-surface)',
              color: 'var(--ms-text-primary)',
              cursor: 'pointer'
            }}
            title="Change Display Language"
          >
            <option value="hi">हिंदी (Hindi)</option>
            <option value="mr">मराठी (Marathi)</option>
            <option value="en">English</option>
          </select>

          {/* Large font toggle */}
          <button
            className={`ms-icon-btn ${largeFont ? 'active' : ''}`}
            onClick={toggleLargeFont}
            title={largeFont ? "Reset Text Size" : "Large Font for Elderly (A+)"}
          >
            A+
          </button>

          {/* High contrast toggle */}
          <button
            className={`ms-icon-btn ${highContrast ? 'active' : ''}`}
            onClick={toggleHighContrast}
            title="High Contrast Visual Mode"
          >
            <span className="material-symbols-outlined">contrast</span>
          </button>

          {/* Voice audio narration toggle */}
          <button
            className={`ms-icon-btn ${audioEnabled ? 'active' : ''}`}
            onClick={toggleAudio}
            title={audioEnabled ? "Voice Guidance Active (Audio On)" : "Voice Guidance Muted"}
          >
            <span className="material-symbols-outlined">
              {audioEnabled ? 'volume_up' : 'volume_off'}
            </span>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
