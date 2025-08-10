import { PageWrapper } from '.';

import { Login, UserContext } from '../features/users';

import { useContext } from 'react';
import { Navigate } from 'react-router-dom';

function Home() {
  const { user, loggedIn } = useContext(UserContext);

  return loggedIn ? (
    <Navigate to={`/${user._id}`} />
  ) : (
    <>
      <PageWrapper>
        <div>
          <div className="section-container">
            <h1>TTRPG Managment Tools</h1>
            <p>A growing suite of tools to help you manage TTRPG games. Includes Encounter Tracking.</p>
          </div>

          <div style={{ display: 'flex', marginBlock: '.5rem' }} justify="space-between">
            <div className="section-container">
              <h2>Login</h2>
              <Login />
            </div>
          </div>
        </div>
      </PageWrapper>
    </>
  );
}

export default Home;
