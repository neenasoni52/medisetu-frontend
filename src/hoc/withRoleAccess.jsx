import React from 'react';
import { useRole } from '../context/RoleContext';

/**
 * HOC: withRoleAccess
 * Ensures that kiosk users cannot accidentally open Doctor or Desk routes.
 */
export const withRoleAccess = (WrappedComponent, allowedRoles = []) => {
  return function RoleGuardedComponent(props) {
    const { activeRole } = useRole();

    if (allowedRoles.length > 0 && !allowedRoles.includes(activeRole)) {
      return (
        <div style={{ padding: '60px 20px', textAlign: 'center', maxWidth: '600px', margin: '0 auto' }}>
          <span className="material-symbols-outlined" style={{ fontSize: '64px', color: 'var(--ms-saffron-600)' }}>
            lock
          </span>
          <h2 style={{ marginTop: '16px' }}>Restricted Clinical Access</h2>
          <p style={{ marginTop: '8px', color: 'var(--ms-text-muted)' }}>
            This portal is restricted to {allowedRoles.join(' / ').toUpperCase()} personnel.
            Please switch roles in the top bar to continue testing.
          </p>
        </div>
      );
    }

    return <WrappedComponent {...props} />;
  };
};

export default withRoleAccess;
