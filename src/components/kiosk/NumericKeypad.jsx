import React from 'react';

/**
 * High-contrast on-screen numeric keypad for hospital touchscreens.
 * Highly accessible for elderly patients with motor difficulties.
 */
export const NumericKeypad = ({ value = '', onChange, onEnter, enterLabel = 'Enter' }) => {
  const handleDigit = (digit) => {
    onChange(value + digit);
  };

  const handleBackspace = () => {
    onChange(value.slice(0, -1));
  };

  const handleClear = () => {
    onChange('');
  };

  const keys = ['1', '2', '3', '4', '5', '6', '7', '8', '9', 'C', '0', '⌫'];

  return (
    <div style={{ maxWidth: '360px', margin: '20px auto 0' }}>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: '12px',
        }}
      >
        {keys.map((k) => {
          if (k === 'C') {
            return (
              <button
                key={k}
                type="button"
                onClick={handleClear}
                style={{
                  height: 'var(--touch-min-height)',
                  borderRadius: 'var(--ms-radius-md)',
                  backgroundColor: 'var(--ms-bg-muted)',
                  border: '2px solid var(--ms-border-medium)',
                  fontSize: '1.25rem',
                  fontWeight: '700',
                  color: 'var(--ms-red-600)',
                }}
              >
                Clear
              </button>
            );
          }
          if (k === '⌫') {
            return (
              <button
                key={k}
                type="button"
                onClick={handleBackspace}
                style={{
                  height: 'var(--touch-min-height)',
                  borderRadius: 'var(--ms-radius-md)',
                  backgroundColor: 'var(--ms-bg-muted)',
                  border: '2px solid var(--ms-border-medium)',
                  fontSize: '1.4rem',
                  fontWeight: '700',
                  color: 'var(--ms-navy-900)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <span className="material-symbols-outlined">backspace</span>
              </button>
            );
          }
          return (
            <button
              key={k}
              type="button"
              onClick={() => handleDigit(k)}
              style={{
                height: 'var(--touch-min-height)',
                borderRadius: 'var(--ms-radius-md)',
                backgroundColor: 'var(--ms-bg-surface)',
                border: '2px solid var(--ms-border-medium)',
                boxShadow: 'var(--ms-shadow-sm)',
                fontSize: '1.6rem',
                fontWeight: '700',
                color: 'var(--ms-navy-900)',
              }}
            >
              {k}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default NumericKeypad;
