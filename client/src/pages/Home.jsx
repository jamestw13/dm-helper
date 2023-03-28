import { Title, Text, Stack, Flex, Dialog } from '@mantine/core';

import { PageWrapper, Section } from '../components';

import { Login, Signup, UserContext } from '../features/users';

import { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { useState } from 'react';

function Home() {
  const { user, loggedIn } = useContext(UserContext);

  return loggedIn ? (
    <Navigate to={`/${user.username}`} />
  ) : (
    <>
      <PageWrapper title="Stat Block">
        <Stack align="stretch">
          <Section title="">
            <Title order={1}>TTRPG Managment Tools</Title>
            <Text>A growing suite of tools to help you manage TTRPG games. Includes Encounter Tracking.</Text>
          </Section>

          <Flex justify="space-between">
            <Section title="Login">
              <Login />
            </Section>
          </Flex>
        </Stack>
      </PageWrapper>
    </>
  );
}

export default Home;
