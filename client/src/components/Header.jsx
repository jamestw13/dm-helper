import React from 'react';
import { Link } from 'react-router-dom';
import Auth from '../utils/auth';

import './Header.css';

const Header = ({ me }) => {
  const logout = event => {
    event.preventDefault();
    Auth.logout();
  };

  return (
    <header>
      <div className='header'>
        <Link to='/' className='home-link link'>
          Stat Block
        </Link>

        <nav>
          {Auth.loggedIn() ? (
            <div className='header-options'>
              <a className='link' href='/' onClick={logout}>
                Logout
              </a>
              <Link to='/profile'>{`${me?.firstname} ${me?.lastname}`}</Link>
              <Link to='/profile'>
                <img src={me?.avatar} className='avatar' alt="User's avatar" />
              </Link>
            </div>
          ) : (
            <div className='header-options'>
              <Link className='link header-link' to={'/login'}>
                Login
              </Link>
              <Link className='link header-link' to={'/signup'}>
                Signup
              </Link>
            </div>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;
