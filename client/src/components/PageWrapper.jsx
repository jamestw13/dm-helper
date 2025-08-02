const PageWrapper = ({ children, title, subtitle = '' }) => {
  return (
    <div className="page-wrapper">
      <div className="header">
        <h1 className="title">{title}</h1>
        {subtitle}
      </div>
      {children}
    </div>
  );
};

export default PageWrapper;
