import { useState } from 'react';

export const Section = ({
  children,
  title,
  collapsable = false,
  startOpen = true,
}) => {
  const [cardOpen, setCardOpen] = useState(startOpen);

  return (
    <section className='card'>
      {collapsable && (
        <div className='collapse-button' onClick={() => setCardOpen(!cardOpen)}>
          {title}
        </div>
      )}
      <div>
        <h2 className={cardOpen ? 'card-title' : 'card-closed'}>{title}</h2>
        <div
          className={`card-children ${cardOpen ? 'card-open' : 'card-closed'}`}
        >
          {children}
        </div>
      </div>
    </section>
  );
};
