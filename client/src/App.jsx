import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import { QUERY_ME } from './utils/queries';
import { useQuery } from '@apollo/client';
import { MantineProvider, AppShell, Container } from '@mantine/core';
import Header from './components/Header';
import Footer from './components/Footer';

import Home from './pages/Home';
import Profile from './pages/Profile';
import Sheet from './pages/Sheet';
import Campaign from './pages/Campaign';

import NoMatch from './pages/NoMatch';

const App = () => {
  const { data: userData } = useQuery(QUERY_ME);

  return (
    <>
      <Router>
        <MantineProvider
          theme={{
            colorScheme: 'dark',
            fontFamily: 'Veranda, sans serif',
            spacing: { xs: 15, sm: 20, md: 25, lg: 30, xl: 40 },
          }}
        >
          <AppShell header={<Header me={userData?.me} />}>
            <Container>
              <Routes>
                <Route exact path='/' element={<Home />} />
                <Route exact path='/login' element={<Home />} />
                <Route exact path='/signup' element={<Home />} />
                <Route
                  exact
                  path='/profile/'
                  element={<Profile data={userData?.me} />}
                />
                <Route exact path='/profile/:username?' element={<Profile />} />
                <Route exact path='/sheet/:charId' element={<Sheet />} />
                <Route
                  exact
                  path='/campaign/:campaignId'
                  element={<Campaign />}
                />
                <Route path='*' element={<NoMatch />} />
              </Routes>
            </Container>
            <Footer />
          </AppShell>
        </MantineProvider>
      </Router>
    </>
  );
};

export default App;
