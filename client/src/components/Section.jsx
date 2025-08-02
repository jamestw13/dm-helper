import { useState } from 'react';

const Section = ({ children, title, collapsable = false, startOpen = true }) => {
  const [cardOpen, setCardOpen] = useState(startOpen);
  const sectionContainer = {
    outline: '0',
    display: 'block',
    textDecoration: 'none',

    backgroundColor: 'var(--bg)',
    boxSizing: 'border-box',
    borderRadius: '8px',
    boxShadow: 'none',
    border: '1px solid var(--border)',
    padding: '0',
  };

  return (
    <div style={sectionContainer}>
      <div style={{ display: 'flex' }}>
        {cardOpen && (
          <div style={{ padding: '15px' }}>
            <h2>{title}</h2>
            {children}
          </div>
        )}
        {collapsable && (
          <div
            style={{
              padding: '1em .5em',
              writingMode: 'vertical-lr',
              textOrientation: 'sideways-right',
              cursor: 'pointer',
            }}
            onClick={() => setCardOpen(!cardOpen)}
          >
            <p>{title}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Section;
