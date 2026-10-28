import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { registerPatient } from '../../redux/slices/patientSlice';
import { fetchQueue } from '../../redux/slices/queueSlice';
import { useAccessibility } from '../../context/AccessibilityContext';
import LoadingSpinner from '../../components/common/LoadingSpinner';
import '../../styles/pages/registrationDesk.css';

export const RegistrationDesk = () => {
  const dispatch = useDispatch();
  const { t } = useAccessibility();
  const { loading: submitting, registrationErrors, generalError } = useSelector((state) => state.patient);
  const { patientsQueue, loading: queueLoading } = useSelector((state) => state.queue);

  const [formData, setFormData] = useState({
    tokenNumber: '',
    abhaNumber: '',
    phoneNumber: '',
    fullName: '',
    age: '',
    gender: 'FEMALE',
  });

  const [successMessage, setSuccessMessage] = useState(null);

  // Fetch all real database records on mount (onlyPermanent = false)
  useEffect(() => {
    dispatch(fetchQueue(false));
  }, [dispatch]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccessMessage(null);

    const payload = {
      tokenNumber: formData.tokenNumber.trim() || null,
      abhaNumber: formData.abhaNumber.trim() || null,
      phoneNumber: formData.phoneNumber.trim() || null,
      fullName: formData.fullName.trim(),
      age: formData.age ? parseInt(formData.age, 10) : null,
      gender: formData.gender,
    };

    const resultAction = await dispatch(registerPatient(payload));
    if (registerPatient.fulfilled.match(resultAction)) {
      const savedPatient = resultAction.payload;
      setSuccessMessage(`Permanent Token ${savedPatient.tokenNumber} successfully issued for ${savedPatient.fullName}!`);
      
      // Refresh the live queue directly from MySQL
      dispatch(fetchQueue(false));

      // Reset form
      setFormData({
        tokenNumber: '',
        abhaNumber: '',
        phoneNumber: '',
        fullName: '',
        age: '',
        gender: 'FEMALE',
      });
    }
  };

  return (
    <div className="ms-desk-page">
      <div className="ms-desk-header">
        <div>
          <h1>{t.deskTitle}</h1>
          <p style={{ color: 'var(--ms-text-muted)' }}>
            Hospital OPD Registration Desk (All Database Records)
          </p>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <button
            type="button"
            onClick={() => dispatch(fetchQueue(false))}
            className="ms-icon-btn"
            title="Refresh database records"
            style={{ width: 'auto', padding: '0 12px', height: '38px', gap: '6px' }}
          >
            <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>refresh</span>
            Sync DB
          </button>
          <span style={{ fontWeight: '700', marginLeft: '6px' }}>Operator #4</span>
        </div>
      </div>

      <div className="ms-desk-layout">
        {/* Left Column: Permanent Token Registration Form */}
        <div className="ms-desk-card">
          <h2 style={{ fontSize: '1.3rem', marginBottom: '16px' }}>
            Issue Permanent OPD Token
          </h2>

          {successMessage && (
            <div style={{
              backgroundColor: 'var(--ms-herbal-100)',
              border: '2px solid var(--ms-herbal-500)',
              color: 'var(--ms-herbal-700)',
              padding: '12px 16px',
              borderRadius: 'var(--ms-radius-md)',
              marginBottom: '16px',
              fontWeight: '700',
              display: 'flex',
              alignItems: 'center',
              gap: '8px'
            }}>
              <span className="material-symbols-outlined">check_circle</span>
              {successMessage}
            </div>
          )}

          {generalError && (
            <div className="ms-banner-error" role="alert">
              <span className="material-symbols-outlined">error</span>
              <div>{generalError}</div>
            </div>
          )}

          <form onSubmit={handleSubmit}>
            {/* Token Number (3 to 6 digits) */}
            <div className="ms-form-group">
              <label className="ms-form-label">Permanent Token Number (3-6 digits) *</label>
              <input
                type="text"
                maxLength={6}
                className={`ms-input ${registrationErrors?.tokenNumber ? 'error' : ''}`}
                placeholder="e.g. 4822"
                value={formData.tokenNumber}
                onChange={(e) => setFormData({ ...formData, tokenNumber: e.target.value.replace(/[^0-9]/g, '') })}
              />
              {registrationErrors?.tokenNumber && (
                <div className="ms-field-error">
                  <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>warning</span>
                  {registrationErrors.tokenNumber}
                </div>
              )}
            </div>

            {/* Full Name */}
            <div className="ms-form-group">
              <label className="ms-form-label">{t.fullName} *</label>
              <input
                type="text"
                className={`ms-input ${registrationErrors?.fullName ? 'error' : ''}`}
                placeholder="e.g. सुनीता शर्मा / Sunita Sharma"
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

            {/* ABHA Number & Mobile Number */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
              <div className="ms-form-group">
                <label className="ms-form-label">ABHA ID (14 digits)</label>
                <input
                  type="text"
                  maxLength={14}
                  className={`ms-input ${registrationErrors?.abhaNumber ? 'error' : ''}`}
                  placeholder="14-digit ABHA"
                  value={formData.abhaNumber}
                  onChange={(e) => setFormData({ ...formData, abhaNumber: e.target.value.replace(/[^0-9]/g, '') })}
                />
              </div>

              <div className="ms-form-group">
                <label className="ms-form-label">{t.phoneNumber}</label>
                <input
                  type="tel"
                  maxLength={10}
                  className={`ms-input ${registrationErrors?.phoneNumber ? 'error' : ''}`}
                  placeholder="10-digit mobile"
                  value={formData.phoneNumber}
                  onChange={(e) => setFormData({ ...formData, phoneNumber: e.target.value.replace(/[^0-9]/g, '') })}
                />
              </div>
            </div>

            {/* Age & Gender */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
              <div className="ms-form-group">
                <label className="ms-form-label">{t.age} *</label>
                <input
                  type="number"
                  min={1}
                  max={120}
                  className={`ms-input ${registrationErrors?.age ? 'error' : ''}`}
                  placeholder="Age"
                  value={formData.age}
                  onChange={(e) => setFormData({ ...formData, age: e.target.value })}
                />
              </div>

              <div className="ms-form-group">
                <label className="ms-form-label">{t.gender} *</label>
                <select
                  className="ms-input"
                  value={formData.gender}
                  onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
                >
                  <option value="FEMALE">{t.female}</option>
                  <option value="MALE">{t.male}</option>
                  <option value="OTHER">{t.other}</option>
                </select>
              </div>
            </div>

            <button
              type="submit"
              className="ms-btn-primary"
              disabled={submitting || !formData.fullName.trim() || !formData.tokenNumber.trim()}
              style={{ marginTop: '8px' }}
            >
              {submitting ? (
                <LoadingSpinner message="Saving to database..." />
              ) : (
                <>
                  <span className="material-symbols-outlined">receipt_long</span>
                  Issue Permanent OPD Slip
                </>
              )}
            </button>
          </form>
        </div>

        {/* Right Column: Live MySQL Database Records */}
        <div className="ms-desk-card">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
            <h2 style={{ fontSize: '1.3rem' }}>
              Registered Database Records ({patientsQueue.length})
            </h2>
          </div>

          {queueLoading ? (
            <LoadingSpinner message="Fetching live database records..." />
          ) : patientsQueue.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '40px 20px', color: 'var(--ms-text-muted)' }}>
              <span className="material-symbols-outlined" style={{ fontSize: '48px', color: 'var(--ms-border-medium)' }}>
                inbox
              </span>
              <p style={{ marginTop: '8px', fontWeight: '600' }}>No records found in database yet.</p>
              <p style={{ fontSize: '0.85rem' }}>Create a patient on the left or via kiosk to see it here.</p>
            </div>
          ) : (
            <div style={{ overflowX: 'auto' }}>
              <table className="ms-desk-table">
                <thead>
                  <tr>
                    <th>Token</th>
                    <th>Patient Name</th>
                    <th>Type</th>
                    <th>ID / Created</th>
                  </tr>
                </thead>
                <tbody>
                  {patientsQueue.map((item) => (
                    <tr key={item.id}>
                      <td>
                        <strong style={{ fontSize: '1.1rem', color: 'var(--ms-navy-900)' }}>
                          {item.tokenNumber || '---'}
                        </strong>
                      </td>
                      <td>
                        <div style={{ fontWeight: '700' }}>{item.fullName}</div>
                        <small style={{ color: 'var(--ms-text-muted)' }}>
                          {item.age} yrs • {item.gender}
                        </small>
                      </td>
                      <td>
                        <span style={{
                          padding: '3px 8px',
                          border: '1px solid',
                          borderRadius: '4px',
                          fontSize: '0.75rem',
                          fontWeight: '800',
                          backgroundColor: item.isTemporary ? 'var(--ms-saffron-100)' : 'var(--ms-herbal-100)',
                          borderColor: item.isTemporary ? 'var(--ms-saffron-500)' : 'var(--ms-herbal-500)',
                          color: item.isTemporary ? 'var(--ms-saffron-700)' : 'var(--ms-herbal-700)',
                        }}>
                          {item.isTemporary ? 'TEMPORARY' : 'PERMANENT'}
                        </span>
                      </td>
                      <td>
                        <small style={{ color: 'var(--ms-text-muted)' }}>
                          #{item.id} • {item.createdAt ? new Date(item.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : 'Today'}
                        </small>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default RegistrationDesk;
