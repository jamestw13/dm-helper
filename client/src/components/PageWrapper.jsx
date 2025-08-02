const PageWrapper = ({ children, title }) => {
  return (
    <div className="page-wrapper">
      <h1 className="title">{title}</h1>
      {children}
    </div>
  );
};

export default PageWrapper;
