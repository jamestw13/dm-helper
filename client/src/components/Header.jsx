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

  const { data } = useQuery(QUERY_HEADER);
  // console.log('header', me);

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
              <Link to='/profile'>
                {`${data?.me.firstname} ${data?.me.lastname}`}
              </Link>
              <Link to='/profile'>
                <img src={data?.me.avatar} className='avatar' />
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
