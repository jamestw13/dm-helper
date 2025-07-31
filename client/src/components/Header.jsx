import React from 'react';
import { Button } from './Button';
import { Link } from 'react-router-dom';
import Auth from '../utils/auth';
import { useContext } from 'react';
import { UserContext } from '../features/users';
import { useNavigate } from 'react-router-dom';

import './Header.css';
import { Avatar } from './Avatar';

const Header = () => {
  const navigate = useNavigate();
  const logout = event => {
    event.preventDefault();
    Auth.logout();
  };

  const { user, loggedIn } = useContext(UserContext);

  return (
    <header className="header">
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <Link to="/" style={{ textDecoration: 'none' }} className="home-link link">
          <Button>Stat Block</Button>
        </Link>

        <nav>
          {Auth.loggedIn() && (
            <div className="header-options">
              <div style={{ display: 'flex', alignItems: 'center', gap: '1em' }}>
                <a className="link" href="/" onClick={logout}>
                  <Button>Logout</Button>
                </a>
                <Link to={`/${user?._id}`}>
                  <Button>{user.firstname ? `${user.firstname || ''} ${user.lastname || ''}` : user.username}</Button>
                </Link>

                <Link to={`/${user?.username}`}>
                  <Avatar />
                </Link>
              </div>
            </div>
          )}
        </nav>
      </div>
      <div>
        <Link to="/">
          <Button onClick={() => navigate('/')}>Dashboard</Button>
        </Link>
        <Link to="/campaigns">
          <Button onClick={() => navigate('/campaigns')}>Campaigns</Button>
        </Link>
        <Link to="/characters">
          <Button onClick={() => navigate('/characters')}>Characters</Button>
        </Link>
        <Link to="/friends">
          <Button onClick={() => navigate('/friends')}>Friends</Button>
        </Link>
      </div>
    </header>
  );
};

export default Header;
