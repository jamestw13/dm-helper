const PageWrapper = ({ children, title }) => {
  return (
    <div className="container">
      <div style={{ display: 'flex', justifyContent: 'space-between', margin: '20px' }}>
        <h1>{title}</h1>
      </div>

      {children}
    </div>
  );
};

export default PageWrapper;
