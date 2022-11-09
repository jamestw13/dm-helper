import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';

import Header from './components/Header';
import Footer from './components/Footer';

import NoMatch from './pages/NoMatch';

import Profile from './pages/Profile';

import Home from './pages/Home';
import { QUERY_ME } from './utils/queries';
import { useQuery } from '@apollo/client';
import Container from './components/Container';
const App = () => {
  const { data: userData } = useQuery(QUERY_ME);

  return (
    <>
      <Router>
        <Header me={userData?.me} />
        <Container>
          <Routes>
            <Route exact path='/' element={<Home />} />
            <Route exact path='/login' element={<Home />} />
            <Route exact path='/signup' element={<Home />} />
            <Route exact path='/profile/' element={<Profile />} />
            <Route exact path='/profile/:username?' element={<Profile />} />
            <Route element={<NoMatch />} />
          </Routes>
        </Container>

        <Footer />
      </Router>
    </>
  );
};

export default App;
