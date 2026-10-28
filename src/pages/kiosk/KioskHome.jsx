import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { lookupPatient, registerPatient, clearErrors } from '../../redux/slices/patientSlice';
import { useAccessibility } from '../../context/AccessibilityContext';
import NumericKeypad from '../../components/kiosk/NumericKeypad';
import AudioPrompt from '../../components/kiosk/AudioPrompt';
import LoadingSpinner from '../../components/common/LoadingSpinner';
import '../../styles/pages/kioskHome.css';

export const KioskHome = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { t } = useAccessibility();
  const { loading, lookupError, registrationErrors, generalError } = useSelector((state) => state.patient);

  const [activeTab, setActiveTab] = useState('lookup'); // 'lookup' | 'register'
  
  // Lookup state
  const [identifier, setIdentifier] = useState('');
  
  // Registration form state
  const [formData, setFormData] = useState({
    fullName: '',
    phoneNumber: '',
    age: '',
    gender: 'FEMALE',
  });

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    dispatch(clearErrors());
  };

  // 1. Handle Patient Lookup (POST /patients/lookup)
  const handleLookupSubmit = async (e) => {
    if (e) e.preventDefault();
    if (!identifier.trim()) return;

    const resultAction = await dispatch(lookupPatient(identifier.trim()));
    if (lookupPatient.fulfilled.match(resultAction)) {
      navigate('/kiosk/language');
    }
  };

  // 2. Handle Walk-in Registration (POST /patients)
  const handleRegisterSubmit = async (e) => {
    e.preventDefault();
    
    const payload = {
      fullName: formData.fullName.trim(),
      phoneNumber: formData.phoneNumber.trim() || null,
      age: formData.age ? parseInt(formData.age, 10) : null,
      gender: formData.gender,
      // Walk-in at kiosk does not pass tokenNumber -> triggers temporary flow in system
    };

    const resultAction = await dispatch(registerPatient(payload));
    if (registerPatient.fulfilled.match(resultAction)) {
      navigate('/kiosk/language');
    }
  };

  return (
    <div className="ms-kiosk-page">
      <div className="ms-kiosk-hero">
        <h1>{t.kioskGreeting}</h1>
        <p>{t.kioskSubtitle}</p>
        <div style={{ marginTop: '12px' }}>
          <AudioPrompt text={`${t.kioskGreeting}. ${t.kioskSubtitle}`} label="Audio Help / आवाज़ सुनें" />
        </div>
      </div>

      {/* Tabs */}
      <div className="ms-kiosk-tabs">
        <button
          className={`ms-tab-btn ${activeTab === 'lookup' ? 'active' : ''}`}
          onClick={() => handleTabChange('lookup')}
        >
          <span className="material-symbols-outlined">search</span>
          {t.tabLookup}
        </button>
        <button
          className={`ms-tab-btn ${activeTab === 'register' ? 'active' : ''}`}
          onClick={() => handleTabChange('register')}
        >
          <span className="material-symbols-outlined">person_add</span>
          {t.tabRegister}
        </button>
      </div>

      {/* TAB 1: LOOKUP BY IDENTIFIER */}
      {activeTab === 'lookup' && (
        <div className="ms-kiosk-card">
          {lookupError && (
            <div className="ms-banner-error" role="alert">
              <span className="material-symbols-outlined">error</span>
              <div>{lookupError}</div>
            </div>
          )}

          <form onSubmit={handleLookupSubmit}>
            <div className="ms-form-group">
              <label className="ms-form-label">
                {t.lookupHelp}
              </label>
              <input
                type="text"
                className={`ms-input ${lookupError ? 'error' : ''}`}
                placeholder={t.lookupPlaceholder}
                value={identifier}
                onChange={(e) => setIdentifier(e.target.value.replace(/[^0-9]/g, ''))}
                autoFocus
              />
            </div>

            <button
              type="submit"
              className="ms-btn-primary"
              disabled={loading || identifier.length < 4}
            >
              {loading ? (
                <LoadingSpinner message="Searching records..." />
              ) : (
                <>
                  <span className="material-symbols-outlined">search</span>
                  {t.lookupBtn}
                </>
              )}
            </button>
          </form>

          {/* Touchscreen Numeric Keypad for elderly patients */}
          <div style={{ marginTop: '24px', borderTop: '1px solid var(--ms-border-light)', paddingTop: '16px' }}>
            <div style={{ textAlign: 'center', fontSize: '0.85rem', color: 'var(--ms-text-muted)', fontWeight: '600' }}>
              Touchscreen Keypad / स्क्रीन पर नंबर दबाएं
            </div>
            <NumericKeypad
              value={identifier}
              onChange={(val) => setIdentifier(val)}
            />
          </div>
        </div>
      )}

      {/* TAB 2: WALK-IN REGISTRATION */}
      {activeTab === 'register' && (
        <div className="ms-kiosk-card">
          {generalError && (
            <div className="ms-banner-error" role="alert">
              <span className="material-symbols-outlined">error</span>
              <div>{generalError}</div>
            </div>
          )}

          <form onSubmit={handleRegisterSubmit}>
            {/* Full Name */}
            <div className="ms-form-group">
              <label className="ms-form-label">{t.fullName} *</label>
              <input
                type="text"
                className={`ms-input ${registrationErrors?.fullName ? 'error' : ''}`}
                placeholder={t.fullNamePlaceholder}
                value={formData.fullName}
                onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
              />
              {registrationErrors?.fullName && (
                <div className="ms-field-error">
                  <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>warning</span>
                  {registrationErrors.fullName}
                </div>
              )}
            </div>

            {/* Mobile Number */}
            <div className="ms-form-group">
              <label className="ms-form-label">{t.phoneNumber}</label>
              <input
                type="tel"
                maxLength={10}
                className={`ms-input ${registrationErrors?.phoneNumber ? 'error' : ''}`}
                placeholder={t.phoneNumberPlaceholder}
                value={formData.phoneNumber}
                onChange={(e) => setFormData({ ...formData, phoneNumber: e.target.value.replace(/[^0-9]/g, '') })}
              />
              {registrationErrors?.phoneNumber && (
                <div className="ms-field-error">
                  <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>warning</span>
                  {registrationErrors.phoneNumber}
                </div>
              )}
            </div>

            {/* Age & Gender in a grid */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '16px' }}>
              {/* Age */}
              <div className="ms-form-group">
                <label className="ms-form-label">{t.age} *</label>
                <input
                  type="number"
                  min={1}
                  max={120}
                  className={`ms-input ${registrationErrors?.age ? 'error' : ''}`}
                  placeholder={t.agePlaceholder}
                  value={formData.age}
                  onChange={(e) => setFormData({ ...formData, age: e.target.value })}
                />
                {registrationErrors?.age && (
                  <div className="ms-field-error">
                    <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>warning</span>
                    {registrationErrors.age}
                  </div>
                )}
              </div>

              {/* Gender */}
              <div className="ms-form-group">
                <label className="ms-form-label">{t.gender} *</label>
                <div className="ms-gender-group">
                  {['FEMALE', 'MALE', 'OTHER'].map((g) => (
                    <button
                      type="button"
                      key={g}
                      className={`ms-gender-card ${formData.gender === g ? 'active' : ''}`}
                      onClick={() => setFormData({ ...formData, gender: g })}
                    >
                      <span className="material-symbols-outlined">
                        {g === 'FEMALE' ? 'female' : g === 'MALE' ? 'male' : 'transgender'}
                      </span>
                      {g === 'FEMALE' ? t.female : g === 'MALE' ? t.male : t.other}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <button
              type="submit"
              className="ms-btn-primary"
              disabled={loading || !formData.fullName.trim() || !formData.age}
              style={{ marginTop: '12px' }}
            >
              {loading ? (
                <LoadingSpinner message="Registering walk-in patient..." />
              ) : (
                <>
                  <span className="material-symbols-outlined">check_circle</span>
                  {t.registerBtn}
                </>
              )}
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default KioskHome;
