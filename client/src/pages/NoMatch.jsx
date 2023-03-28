import { Button, Text, Title } from '@mantine/core';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { PageWrapper } from '../components';

export default () => {
  const navigate = useNavigate();

  return (
    <PageWrapper title="No Match">
      <Text>Oops, we couldn't find that page.</Text>
      <Button onClick={() => navigate('/')}>Go Home</Button>
    </PageWrapper>
  );
};
