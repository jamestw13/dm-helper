import React from 'react';
import { PageWrapper } from '../components';
import { Link } from 'react-router-dom';

const NotLoggedIn = () => {
  return (
    <PageWrapper title="Not Logged In">
      <Title order={2}>
        You must be logged in to view this content. Please
        <Link to="/login"> click here </Link>to return to the homepage.
      </Title>
    </PageWrapper>
  );
};

export default NotLoggedIn;
