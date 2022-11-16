import { useNavigate } from 'react-router-dom';

const PageWrapper = ({ children, title }) => {
  const navigate = useNavigate();
  return (
    <main className='page-container'>
      <div className='page-title-bar'>
        <h1>{title}</h1>
        <div onClick={() => navigate(-1)}>Go back</div>
      </div>
      {children}
    </main>
  );
};

export default PageWrapper;
