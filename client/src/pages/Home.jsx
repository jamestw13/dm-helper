import { Title, Text, Stack, Flex } from '@mantine/core';

import { PageWrapper, Section } from '../components';

import { Login, Signup, UserContext } from '../features/users';

import { useContext } from 'react';
import { Navigate } from 'react-router-dom';

function Home() {
  const { user, loggedIn } = useContext(UserContext);

  return loggedIn ? (
    <Navigate to={`/${user._id}`} />
  ) : (
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
          <Section title="Sign Up">
            <Signup />
          </Section>
        </Flex>
      </Stack>
    </PageWrapper>
  );
}

export default Home;
