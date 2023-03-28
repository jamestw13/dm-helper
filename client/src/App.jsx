import { Route, BrowserRouter as Router, Routes, Navigate } from 'react-router-dom';
import { QUERY_ME, UserContext } from './features/users';
import { useQuery } from '@apollo/client';
import { MantineProvider, AppShell } from '@mantine/core';
import { Header, Footer, Navbar } from './components';

import Auth from './utils/auth';
import { Home, User, Character, Campaign, Encounter, NoMatch } from './pages';

import { theme } from './Theme.jsx';
import { CampaignList } from './features/campaigns';
import { CharacterList } from './features/characters';
import { FriendList } from './features/friends';

const loggedIn = Auth.loggedIn();
const App = () => {
  const { data: userData } = useQuery(QUERY_ME);

  return (
    <Router>
      <MantineProvider theme={theme}>
        <UserContext.Provider value={{ user: userData?.me || {}, loggedIn }}>
          <AppShell
            navbar={loggedIn && <Navbar />}
            header={loggedIn && <Header />}
            footer={<Footer />}
            padding="0"
            bg="dark"
          >
            <Routes>
              <Route exact path="/" element={<Home />} />

              {loggedIn && (
                <>
                  <Route exact path="/:userId" element={<User />} />
                  <Route exact path="/characters" element={<CharacterList />} />
                  <Route exact path="/sheet/:charId" element={<Character />} />

                  <Route exact path="/campaigns/" element={<CampaignList />} />
                  <Route exact path="/campaign/:campaignId" element={<Campaign />} />
                  <Route exact path="/encounter/:encounterId" element={<Encounter />} />

                  <Route exact path="/friends/" element={<FriendList />} />
                </>
              )}
              <Route exact path="/nomatch" element={<NoMatch />} />
              <Route path="*" element={<NoMatch />} />
            </Routes>
          </AppShell>
        </UserContext.Provider>
      </MantineProvider>
    </Router>
  );
};

export default App;
