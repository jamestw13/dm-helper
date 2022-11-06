import { useQuery } from '@apollo/client';
import React from 'react';
import { Link } from 'react-router-dom';
import Auth from '../utils/auth';
import { QUERY_HEADER } from '../utils/queries';
import './Header.css';

const Header = () => {
  const logout = event => {
    event.preventDefault();
    Auth.logout();
  };

  const { me } = useQuery(QUERY_HEADER);

  return (
    <header>
      <div className='header'>
        <Link to='/' className='home-link link'>
          Stat Block
        </Link>

        <nav>
          {Auth.loggedIn() ? (
            <>
              <Link to='/profile'>{`${me?.firstname} ${me?.lastname}`}</Link>
              <a className='link' href='/' onClick={logout}>
                Logout
              </a>
            </>
          ) : (
            <>
              <Link className='link header-link' to={'/login'}>
                Login
              </Link>
              <Link className='link header-link' to={'/signup'}>
                Signup
              </Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;
