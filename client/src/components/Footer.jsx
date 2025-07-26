import React from 'react';
const Footer = () => {
  return (
    <div
      style={{
        height: '40px',
        fontFamily: 'Inter, sans-serif',
        color: 'white',
        bottom: 0,
        left: 0,
        right: 0,
        maxHeight: '40px',
        position: 'fixed',
        background: '#1A1B1E',
        borderTop: '1px solid #2C2E33',
      }}
    >
      <div style={{ display: 'flex', justifyContent: 'flex-end', padding: '.5em' }}>
        <div>&copy;TJ James 2022</div>
      </div>
    </div>
  );
};

export default Footer;
