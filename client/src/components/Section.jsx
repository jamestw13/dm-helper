import { useState } from 'react';

export const Section = ({ children, title, collapsable }) => {
  const [cardOpen, setCardOpen] = useState(true);

  return (
    <section className='card'>
      {collapsable && (
        <div className='collapse-button' onClick={() => setCardOpen(!cardOpen)}>
          {title}
        </div>
      )}
      <h2 className={cardOpen ? 'card-title' : 'card-closed'}>{title}</h2>
      <div className={cardOpen ? 'card-children' : 'card-closed'}>
        {children}
      </div>
    </section>
  );
};
