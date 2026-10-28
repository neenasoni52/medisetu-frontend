import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { clearPatient } from '../../redux/slices/patientSlice';
import { resetSession } from '../../redux/slices/sessionSlice';
import { useAccessibility } from '../../context/AccessibilityContext';
import withSessionGuard from '../../hoc/withSessionGuard';
import AlertBanner from '../../components/common/AlertBanner';
import TokenBadge from '../../components/common/TokenBadge';
import AudioPrompt from '../../components/kiosk/AudioPrompt';
import '../../styles/pages/activeSession.css';

const ActiveSessionComponent = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { t, speak } = useAccessibility();
  const { activePatient } = useSelector((state) => state.patient);
  const { currentSession } = useSelector((state) => state.session);

  // If user reached here directly from lookup or registration
  const token = currentSession?.tokenNumber || activePatient?.tokenNumber || 'temp---';
  const isTemporary = currentSession ? currentSession.isTemporary : (activePatient?.isTemporary ?? true);
  const displayName = currentSession?.maskedName || activePatient?.firstName || 'Patient';

  useEffect(() => {
    // Vocal prompt for elderly users upon entering dashboard
    const promptText = isTemporary
      ? `नमस्ते ${displayName}। आपका टोकन नंबर है ${token}। कृपया ध्यान दें कि डॉक्टर केबिन में जाने से पहले पंजीकरण काउंटर से पक्का टोकन प्राप्त करें।`
      : `नमस्ते ${displayName}। आपका पक्का टोकन नंबर है ${token}। टोकन पुकारे जाने पर डॉक्टर कक्ष में जाएं।`;
    speak(promptText);
  }, []);

  const handleFinishAndReset = () => {
    dispatch(clearPatient());
    dispatch(resetSession());
    navigate('/kiosk');
  };

  return (
    <div className="ms-session-dashboard">
      <div className="ms-session-header">
        <div className="ms-session-header-left">
          <h1>{t.sessionActiveTitle}</h1>
          <p>
            {t.welcomePatient}, <strong style={{ color: 'var(--ms-navy-900)' }}>{displayName}</strong>
          </p>
        </div>
        <div style={{ display: 'flex', gap: '10px' }}>
          <AudioPrompt
            text={
              isTemporary
                ? t.cabinRuleDesc.replace('{token}', token)
                : t.permanentVerifiedDesc
            }
            label="Audio Guidance / सुनें"
          />
          <button
            type="button"
            onClick={handleFinishAndReset}
            style={{
              padding: '10px 18px',
              borderRadius: 'var(--ms-radius-md)',
              border: '2px solid var(--ms-border-medium)',
              backgroundColor: 'var(--ms-bg-surface)',
              fontWeight: '700',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
            }}
          >
            <span className="material-symbols-outlined">logout</span>
            Exit / बाहर निकलें
          </button>
        </div>
      </div>

      {/* 1. Large High-contrast Token Badge */}
      <TokenBadge tokenNumber={token} isTemporary={isTemporary} />

      {/* 2. Critical Workflow 2: The Cabin Rule Alert Banner */}
      <AlertBanner isTemporary={isTemporary} tokenNumber={token} />

      {/* 3. Clinical Intake Next Steps (Rapid Prototype for SIH 26047) */}
      <h2 style={{ fontSize: '1.4rem', marginTop: '32px', marginBottom: '8px' }}>
        Next Clinical Steps / आगामी चरण
      </h2>
      <p style={{ color: 'var(--ms-text-muted)', marginBottom: '16px' }}>
        Complete these steps on the kiosk before entering the consultation room:
      </p>

      <div className="ms-intake-tiles-grid">
        {/* Step 1: Socrates Questionnaire */}
        <div
          className="ms-intake-tile"
          onClick={() => navigate('/kiosk/interview')}
        >
          <div className="ms-tile-icon-box">
            <span className="material-symbols-outlined">quiz</span>
          </div>
          <h3>{t.step1Title}</h3>
          <p>{t.step1Desc}</p>
          <div className="ms-tile-status-pill ready">
            <span className="material-symbols-outlined" style={{ fontSize: '16px' }}>touch_app</span>
            Tap to Start
          </div>
        </div>

        {/* Step 2: Upload Prescriptions & Reports */}
        <div
          className="ms-intake-tile"
          onClick={() => alert('Document scanner / camera upload triggered.')}
        >
          <div className="ms-tile-icon-box" style={{ backgroundColor: 'var(--ms-saffron-100)', color: 'var(--ms-saffron-700)' }}>
            <span className="material-symbols-outlined">document_scanner</span>
          </div>
          <h3>{t.step2Title}</h3>
          <p>{t.step2Desc}</p>
          <div className="ms-tile-status-pill ready">
            <span className="material-symbols-outlined" style={{ fontSize: '16px' }}>add_a_photo</span>
            Scan Document
          </div>
        </div>

        {/* Step 3: Medical Summary Generation */}
        <div
          className="ms-intake-tile"
          onClick={() => alert('Medical history timeline preview.')}
        >
          <div className="ms-tile-icon-box" style={{ backgroundColor: 'var(--ms-herbal-100)', color: 'var(--ms-herbal-700)' }}>
            <span className="material-symbols-outlined">history_edu</span>
          </div>
          <h3>{t.step3Title}</h3>
          <p>{t.step3Desc}</p>
          <div className="ms-tile-status-pill">
            <span className="material-symbols-outlined" style={{ fontSize: '16px' }}>hourglass_top</span>
            Auto Generated
          </div>
        </div>
      </div>
    </div>
  );
};

export const ActiveSession = withSessionGuard(ActiveSessionComponent);
export default ActiveSession;
