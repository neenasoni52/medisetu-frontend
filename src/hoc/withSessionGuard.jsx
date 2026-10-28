import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

/**
 * HOC: withSessionGuard
 * Protects clinical intake steps from being accessed without an identified patient.
 * If no activePatient is found in Redux, redirects to /kiosk.
 */
export const withSessionGuard = (WrappedComponent) => {
  return function SessionGuardedComponent(props) {
    const { activePatient } = useSelector((state) => state.patient);
    const navigate = useNavigate();

    useEffect(() => {
      if (!activePatient || !activePatient.patientId) {
        console.warn('SessionGuard: No active patient found in Redux. Redirecting to /kiosk');
        navigate('/kiosk', { replace: true });
      }
    }, [activePatient, navigate]);

    if (!activePatient || !activePatient.patientId) {
      return (
        <div style={{ padding: '40px', textAlign: 'center' }}>
          <h3>Redirecting to Patient Identification...</h3>
        </div>
      );
    }

    return <WrappedComponent {...props} />;
  };
};

export default withSessionGuard;
