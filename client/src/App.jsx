import { Route, BrowserRouter as Router, Routes, useNavigate } from 'react-router-dom';
import { QUERY_ME, UserContext } from './features/users';
import { useQuery } from '@apollo/client';
import { MantineProvider } from '@mantine/core';

import MainLayout from './components/MainLayout.jsx';

import Auth from './utils/auth';
import { Home, Profile, Character, Campaign, Encounter, NoMatch } from './pages';

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
          <Routes>
            <Route element={<MainLayout />}>
              <Route exact path="/" element={<Home />} />
              {loggedIn && (
                <>
                  <Route exact path="/:userId" element={<Profile />} />
                  <Route exact path="/characters" element={<CharacterList />} />
                  <Route exact path="/sheet/:charId" element={<Character />} />

                  <Route exact path="/campaigns/" element={<CampaignList />} />
                  <Route exact path="/campaign/:campaignId" element={<Campaign />} />
                  <Route exact path="/encounter/:encounterId" element={<Encounter />} />

                  <Route exact path="/friends/" element={<FriendList />} />
                </>
              )}
              <Route path="*" element={<NoMatch />} />
            </Route>
          </Routes>
        </UserContext.Provider>
      </MantineProvider>
    </Router>
  );
};

export default App;
