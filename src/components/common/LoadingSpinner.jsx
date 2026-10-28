import React from 'react';
import '../../styles/common/loadingSpinner.css';

export const LoadingSpinner = ({ message = 'Loading...' }) => {
  return (
    <div className="ms-spinner-wrapper">
      <div className="ms-spinner" />
      {message && <div className="ms-spinner-text">{message}</div>}
    </div>
  );
};

export default LoadingSpinner;
