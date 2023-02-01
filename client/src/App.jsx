import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import { QUERY_ME } from './features/users';
import { useQuery } from '@apollo/client';
import { MantineProvider, AppShell } from '@mantine/core';
import { Header, Footer } from './components';

import Auth from './utils/auth';
import { Home, Profile, Character, Campaign, Encounter, NoMatch } from './pages';

import { theme } from './Theme.jsx';

const loggedIn = Auth.loggedIn();
const App = () => {
  const { data: userData } = useQuery(QUERY_ME);
  const user = userData?.me || {};

  return (
    <>
      <Router>
        <MantineProvider theme={theme}>
          <AppShell header={<Header user={user} />} footer={<Footer />} padding="0" bg="dark">
            <Routes>
              <Route exact path="/" element={<Home />} />
              <Route exact path="/login" element={<Home />} />
              <Route exact path="/signup" element={<Home />} />

              {loggedIn && (
                <>
                  <Route exact path="/:userId" element={<Profile />} />
                  <Route exact path="/sheet/:charId" element={<Character />} />
                  <Route exact path="/campaign/:campaignId" element={<Campaign />} />
                  <Route exact path="/encounter/:encounterId" element={<Encounter />} />
                </>
              )}
              <Route path="*" element={<NoMatch />} />
            </Routes>
          </AppShell>
        </MantineProvider>
      </Router>
    </>
  );
};

export default App;
