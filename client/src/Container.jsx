import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';

import Header from './components/Header';
import Footer from './components/Footer';
import Login from './pages/Login';
import NoMatch from './pages/NoMatch';

import Signup from './pages/Signup';
import Profile from './pages/Profile';

import Home from './pages/Home';
import { QUERY_ME } from './utils/queries';
import { useQuery } from '@apollo/client';
const Container = () => {
  const { data: userData } = useQuery(QUERY_ME);

  return (
    <>
      <Router>
        <Header me={userData?.me} />
        <Routes>
          <Route exact path='/' element={<Home />} />
          <Route exact path='/login' element={<Login />} />
          <Route exact path='/signup' element={<Signup />} />
          <Route exact path='/profile/' element={<Profile />} />
          <Route exact path='/profile/:username?' element={<Profile />} />
          <Route element={<NoMatch />} />
        </Routes>
        <Footer />
      </Router>
    </>
  );
};

export default Container;
