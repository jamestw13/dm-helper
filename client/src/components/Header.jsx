import React from 'react';
import { Header as MHeader, Button, Avatar, Flex } from '@mantine/core';
import { Link } from 'react-router-dom';
import Auth from '../utils/auth';
import { useContext } from 'react';
import { UserContext } from '../features/users';

// import './Header.css';

const Header = () => {
  const logout = event => {
    event.preventDefault();
    Auth.logout();
  };

  const { user, loggedIn } = useContext(UserContext);

  return (
    <MHeader p="sm" height={90}>
      <Flex align="center" justify="space-between" direction="row">
        <Link to="/" style={{ textDecoration: 'none' }} className="home-link link">
          <Button>Stat Block</Button>
        </Link>

        <nav>
          {Auth.loggedIn() && (
            <div className="header-options">
              <Flex align="center" gap="1em">
                <a className="link" href="/" onClick={logout}>
                  <Button>Logout</Button>
                </a>
                <Link to={`/${user?._id}`}>
                  <Button>{user.firstname ? `${user.firstname || ''} ${user.lastname || ''}` : user.username}</Button>
                </Link>

                <Link to={`/${user?._id}`}>
                  <Avatar radius="xl" size="lg" src={user?.avatar} className="avatar" alt="User's avatar" />
                </Link>
              </Flex>
            </div>
          )}
        </nav>
      </Flex>
    </MHeader>
  );
};

export default Header;
