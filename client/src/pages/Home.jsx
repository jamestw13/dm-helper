import PageWrapper from '../layouts/PageWrapper';
import Auth from '../utils/auth';
import Login from '../features/users/Login';
import Signup from '../features/users/Signup';
import { Section } from '../layouts/Section';
import { Title, Text, Stack, Flex } from '@mantine/core';

function Home() {
  const loggedIn = Auth.loggedIn();

  return (
    <PageWrapper title="Stat Block">
      <Stack align="stretch">
        <Section title="">
          <Title order={1}>TTRPG Managment Tools</Title>
          <Text>A growing suite of tools to help you manage TTRPG games. Includes Encounter Tracking.</Text>
        </Section>

        {!loggedIn && (
          <Flex justify="space-between">
            <Login />
            <Signup />
          </Flex>
        )}
      </Stack>
    </PageWrapper>
  );
}

export default Home;
