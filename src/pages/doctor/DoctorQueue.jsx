import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchQueue, setActiveConsultation } from '../../redux/slices/queueSlice';
import { useAccessibility } from '../../context/AccessibilityContext';
import LoadingSpinner from '../../components/common/LoadingSpinner';
import '../../styles/pages/doctorQueue.css';

export const DoctorQueue = () => {
  const dispatch = useDispatch();
  const { t } = useAccessibility();
  const { patientsQueue, loading } = useSelector((state) => state.queue);

  const [selectedPatient, setSelectedPatient] = useState(null);

  // Fetch ONLY permanent token patients from database (onlyPermanent = true)
  useEffect(() => {
    dispatch(fetchQueue(true)).then((res) => {
      if (res.payload && res.payload.length > 0) {
        setSelectedPatient(res.payload[0]);
      }
    });
  }, [dispatch]);

  const handleSelectPatient = (patient) => {
    setSelectedPatient(patient);
  };

  const handleStartConsultation = (patient) => {
    dispatch(setActiveConsultation(patient));
    alert(`Consultation started for Token #${patient.tokenNumber} (${patient.fullName})`);
  };

  return (
    <div className="ms-doctor-page">
      <div className="ms-doctor-header">
        <div>
          <h1 style={{ fontSize: '1.8rem' }}>{t.doctorTitle}</h1>
          <p style={{ color: 'var(--ms-text-muted)' }}>
            Cabin #2 • Dr. Rajesh Deshmukh, MD (Permanent Token Queue Only)
          </p>
        </div>
        <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
          <button
            type="button"
            onClick={() => dispatch(fetchQueue(true))}
            className="ms-icon-btn"
            title="Refresh permanent patients queue"
            style={{ width: 'auto', padding: '0 12px', height: '38px', gap: '6px' }}
          >
            <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>refresh</span>
            Refresh Queue
          </button>
          <span style={{
            padding: '6px 14px',
            borderRadius: 'var(--ms-radius-full)',
            backgroundColor: 'var(--ms-herbal-100)',
            color: 'var(--ms-herbal-700)',
            fontWeight: '700',
            fontSize: '0.85rem'
          }}>
            Shift: Active
          </span>
        </div>
      </div>

      <div className="ms-doctor-grid">
        {/* Left: Active Permanent Token Patients from Database */}
        <div className="ms-doctor-card">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
            <h2 style={{ fontSize: '1.3rem' }}>
              Permanent Token OPD Queue ({patientsQueue.length})
            </h2>
            <span style={{ fontSize: '0.85rem', color: 'var(--ms-text-muted)' }}>
              Filtered: Temporary tokens excluded
            </span>
          </div>

          {loading ? (
            <LoadingSpinner message="Fetching verified patients from database..." />
          ) : patientsQueue.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '48px 20px', color: 'var(--ms-text-muted)' }}>
              <span className="material-symbols-outlined" style={{ fontSize: '56px', color: 'var(--ms-border-medium)' }}>
                how_to_reg
              </span>
              <p style={{ marginTop: '12px', fontSize: '1.1rem', fontWeight: '700', color: 'var(--ms-navy-900)' }}>
                No permanent token patients in queue
              </p>
              <p style={{ fontSize: '0.9rem', marginTop: '4px' }}>
                Patients must first receive a permanent token at the Registration Desk to appear here.
              </p>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              {patientsQueue.map((patient) => {
                const isSelected = selectedPatient?.id === patient.id;
                return (
                  <div
                    key={patient.id}
                    className={`ms-patient-queue-row ${isSelected ? 'active' : ''}`}
                    onClick={() => handleSelectPatient(patient)}
                    style={{ cursor: 'pointer' }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                      <div style={{
                        width: '56px',
                        height: '56px',
                        borderRadius: 'var(--ms-radius-md)',
                        backgroundColor: 'var(--ms-navy-100)',
                        color: 'var(--ms-navy-900)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontWeight: '900',
                        fontSize: '1.3rem',
                      }}>
                        {patient.tokenNumber}
                      </div>

                      <div>
                        <div style={{ fontWeight: '700', fontSize: '1.15rem', color: 'var(--ms-navy-900)' }}>
                          {patient.fullName}
                        </div>
                        <div style={{ fontSize: '0.85rem', color: 'var(--ms-text-muted)' }}>
                          {patient.age} yrs • {patient.gender} • Phone: {patient.phoneNumber || 'N/A'}
                        </div>
                      </div>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                      <span style={{
                        padding: '4px 10px',
                        borderRadius: 'var(--ms-radius-full)',
                        fontSize: '0.75rem',
                        fontWeight: '800',
                        backgroundColor: 'var(--ms-herbal-100)',
                        color: 'var(--ms-herbal-700)',
                        border: '1px solid var(--ms-herbal-500)'
                      }}>
                        VERIFIED OPD
                      </span>

                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleStartConsultation(patient);
                        }}
                        style={{
                          padding: '8px 16px',
                          borderRadius: 'var(--ms-radius-md)',
                          backgroundColor: 'var(--ms-navy-800)',
                          color: '#ffffff',
                          fontWeight: '700',
                          fontSize: '0.85rem',
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '6px'
                        }}
                      >
                        <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>
                          notifications_active
                        </span>
                        Call Patient
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Right: Selected Patient Clinical Card */}
        <div className="ms-doctor-card">
          <h2 style={{ fontSize: '1.3rem', marginBottom: '16px' }}>
            Patient Clinical Card
          </h2>

          {selectedPatient ? (
            <div>
              <div style={{
                textAlign: 'center',
                padding: '20px',
                backgroundColor: 'var(--ms-bg-canvas)',
                borderRadius: 'var(--ms-radius-md)',
                marginBottom: '16px',
                border: '1px solid var(--ms-border-light)'
              }}>
                <div style={{ fontSize: '2.5rem', fontWeight: '900', color: 'var(--ms-navy-900)', lineHeight: '1' }}>
                  {selectedPatient.tokenNumber}
                </div>
                <div style={{ fontWeight: '800', fontSize: '1.3rem', marginTop: '8px', color: 'var(--ms-navy-900)' }}>
                  {selectedPatient.fullName}
                </div>
                <div style={{ color: 'var(--ms-text-muted)', fontSize: '0.9rem', marginTop: '2px' }}>
                  Age: {selectedPatient.age} years • Gender: {selectedPatient.gender}
                </div>
                {selectedPatient.abhaNumber && (
                  <div style={{ fontSize: '0.8rem', color: 'var(--ms-text-muted)', marginTop: '4px' }}>
                    ABHA ID: <strong>{selectedPatient.abhaNumber}</strong>
                  </div>
                )}
              </div>

              <div style={{ marginBottom: '16px' }}>
                <strong style={{ display: 'block', fontSize: '0.9rem', color: 'var(--ms-navy-900)' }}>
                  Registered Status:
                </strong>
                <p style={{ fontSize: '0.9rem', color: 'var(--ms-herbal-700)', fontWeight: '700', marginTop: '2px' }}>
                  Permanent Token Confirmed • Ready for Cabin Entry
                </p>
              </div>

              <div style={{ marginBottom: '16px' }}>
                <strong style={{ display: 'block', fontSize: '0.9rem', color: 'var(--ms-navy-900)' }}>
                  Kiosk Clinical Evaluation:
                </strong>
                <p style={{ fontSize: '0.9rem', color: 'var(--ms-text-muted)', marginTop: '4px', lineHeight: '1.4' }}>
                  Patient intake session initiated. Chief complaints: General checkup and vitals assessment.
                </p>
              </div>

              <button
                type="button"
                className="ms-btn-primary"
                style={{ height: '50px', fontSize: '1rem', marginTop: '16px' }}
                onClick={() => handleStartConsultation(selectedPatient)}
              >
                <span className="material-symbols-outlined">clinical_notes</span>
                Start Clinical Examination
              </button>
            </div>
          ) : (
            <div style={{ textAlign: 'center', color: 'var(--ms-text-muted)', padding: '40px 10px' }}>
              Select a verified patient from the queue to view clinical details.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DoctorQueue;
