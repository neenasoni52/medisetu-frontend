import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { startSession } from '../../redux/slices/sessionSlice';
import { useAccessibility } from '../../context/AccessibilityContext';
import withSessionGuard from '../../hoc/withSessionGuard';
import LoadingSpinner from '../../components/common/LoadingSpinner';
import AudioPrompt from '../../components/kiosk/AudioPrompt';
import '../../styles/pages/languageSelect.css';

const LanguageSelectComponent = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { language, setLanguage, t, speak } = useAccessibility();
  const { activePatient } = useSelector((state) => state.patient);
  const { loading, error } = useSelector((state) => state.session);

  const [selectedLang, setSelectedLang] = useState(language || 'hi');

  const languageOptions = [
    {
      code: 'hi',
      native: 'हिंदी',
      sub: 'Hindi',
      voicePrompt: 'हिंदी भाषा चुनी गई है। सत्र शुरू करने के लिए नीचे हरा बटन दबाएं।',
    },
    {
      code: 'mr',
      native: 'मराठी',
      sub: 'Marathi',
      voicePrompt: 'मराठी भाषा निवडली आहे. सत्र सुरू करण्यासाठी खालील हिरवे बटण दाबा.',
    },
    {
      code: 'en',
      native: 'English',
      sub: 'English',
      voicePrompt: 'English language selected. Tap the button below to start your clinical session.',
    },
  ];

  const handleCardClick = (option) => {
    setSelectedLang(option.code);
    setLanguage(option.code); // Updates global app translation dictionary
    speak(option.voicePrompt);
  };

  // POST /medisetu/api/v1/sessions/start
  const handleStartSession = async () => {
    if (!activePatient || !activePatient.patientId) return;

    const resultAction = await dispatch(
      startSession({
        patientId: activePatient.patientId,
        language: selectedLang,
      })
    );

    if (startSession.fulfilled.match(resultAction)) {
      navigate('/kiosk/session');
    }
  };

  return (
    <div className="ms-lang-page">
      <div className="ms-lang-hero">
        <div className="ms-patient-greeting-pill">
          <span className="material-symbols-outlined">account_circle</span>
          <span>
            {t.welcomePatient}, {activePatient?.firstName || 'Patient'}
          </span>
        </div>
        <h1>{t.chooseLanguage}</h1>
        <p>{t.chooseLanguageSub}</p>
        <div style={{ marginTop: '12px' }}>
          <AudioPrompt text={`${t.chooseLanguage}. ${t.chooseLanguageSub}`} label="Listen / सुनें" />
        </div>
      </div>

      {error && (
        <div className="ms-banner-error" role="alert" style={{ marginBottom: '24px' }}>
          <span className="material-symbols-outlined">error</span>
          <div>{error}</div>
        </div>
      )}

      {/* Language Cards */}
      <div className="ms-lang-grid">
        {languageOptions.map((opt) => {
          const isSelected = selectedLang === opt.code;
          return (
            <div
              key={opt.code}
              className={`ms-lang-card ${isSelected ? 'active' : ''}`}
              onClick={() => handleCardClick(opt)}
            >
              {isSelected && (
                <span className="material-symbols-outlined ms-lang-check-icon">
                  check_circle
                </span>
              )}
              <div className="ms-lang-native-title">{opt.native}</div>
              <div className="ms-lang-sub-title">{opt.sub}</div>
              <div style={{ marginTop: '14px' }}>
                <span className="material-symbols-outlined" style={{ fontSize: '32px', color: 'var(--ms-navy-700)' }}>
                  translate
                </span>
              </div>
            </div>
          );
        })}
      </div>

      <button
        type="button"
        className="ms-btn-primary"
        onClick={handleStartSession}
        disabled={loading}
      >
        {loading ? (
          <LoadingSpinner message="Starting Clinical Session..." />
        ) : (
          <>
            <span className="material-symbols-outlined">play_circle</span>
            {t.startSessionBtn}
          </>
        )}
      </button>
    </div>
  );
};

export const LanguageSelect = withSessionGuard(LanguageSelectComponent);
export default LanguageSelect;
