export const Card = ({ children, title }) => {
  return (
    <section className='card'>
      <h2>{title}</h2>
      {children}
    </section>
  );
};
