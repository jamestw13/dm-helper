import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import { QUERY_ME } from './utils/queries';
import { useQuery } from '@apollo/client';
import { MantineProvider, AppShell, Text } from '@mantine/core';
import Header from './components/Header';
import Footer from './components/Footer';

import Home from './pages/Home';
import Profile from './pages/Profile';
import Sheet from './pages/Sheet';
import Campaign from './pages/Campaign';

import NoMatch from './pages/NoMatch';
import Auth from './utils/auth';

import { theme } from './Theme.jsx';
import Encounter from './pages/Encounter';

const loggedIn = Auth.loggedIn();
const App = () => {
  const { data: userData } = useQuery(QUERY_ME);
  const user = userData?.me || {};

  return (
    <>
      <Router>
        <MantineProvider theme={theme}>
          <AppShell
            header={<Header user={user} />}
            footer={<Footer />}
            padding='0'
            bg='dark'
          >
            <Routes>
              <Route exact path='/' element={<Home />} />
              <Route exact path='/login' element={<Home />} />
              <Route exact path='/signup' element={<Home />} />

              {loggedIn && (
                <>
                  <Route exact path='/:userId' element={<Profile />} />
                  <Route exact path='/sheet/:charId' element={<Sheet />} />
                  <Route
                    exact
                    path='/campaign/:campaignId'
                    element={<Campaign />}
                  />
                  <Route
                    exact
                    path='/encounter/:encounterId'
                    element={<Encounter />}
                  />
                </>
              )}
              <Route path='*' element={<NoMatch />} />
            </Routes>
          </AppShell>
        </MantineProvider>
      </Router>
    </>
  );
};

export default App;
