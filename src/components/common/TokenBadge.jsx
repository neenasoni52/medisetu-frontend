import React from 'react';
import { useAccessibility } from '../../context/AccessibilityContext';
import '../../styles/common/tokenBadge.css';

export const TokenBadge = ({ tokenNumber, isTemporary }) => {
  const { t } = useAccessibility();

  return (
    <div className="ms-token-badge-container">
      <div className="ms-token-label">{t.tokenLabel}</div>
      <div className="ms-token-number">{tokenNumber || '---'}</div>
      <div className={`ms-token-type-pill ${isTemporary ? 'temporary' : 'permanent'}`}>
        <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>
          {isTemporary ? 'pending' : 'verified'}
        </span>
        {isTemporary ? t.temporaryToken : t.permanentToken}
      </div>
    </div>
  );
};

export default TokenBadge;
