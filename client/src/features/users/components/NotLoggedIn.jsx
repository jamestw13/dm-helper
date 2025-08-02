import React from 'react';
import { PageWrapper } from '../../../components';
import { Link } from 'react-router-dom';

const NotLoggedIn = () => {
  return (
    <PageWrapper title="Not Logged In">
      <h2>
        You must be logged in to view this content. Please
        <Link to="/"> click here </Link>to return to the homepage.
      </h2>
    </PageWrapper>
  );
};

export default NotLoggedIn;
