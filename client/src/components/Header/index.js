import React from 'react';
import { Link } from 'react-router-dom';
import Auth from '../../utils/auth';
import './Header.css';

const Header = () => {
  const logout = event => {
    event.preventDefault();
    Auth.logout();
  };

  return (
    <header>
      <div className='header'>
        <Link to='/' className='home-link link'>
          Home
        </Link>

        <nav>
          {Auth.loggedIn() ? (
            <a href='/' onClick={logout}>
              Logout
            </a>
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
