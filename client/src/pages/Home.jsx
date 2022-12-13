import PageWrapper from '../components/PageWrapper';
import Auth from '../utils/auth';
import Login from '../components/Login';
import Signup from '../components/Signup';
import { Section } from '../components/Section';
import { Title, Text } from '@mantine/core';

function Home() {
  const loggedIn = Auth.loggedIn();

  return (
    <PageWrapper title='Stat Block'>
      <Section title=''>
        <Title order={1}>TTRPG Managment Tools</Title>
        <Text maw='30em'>
          A growing suite of tools to help you manage TTRPG games. Includes
          Encounter Tracking.
        </Text>
      </Section>

      {!loggedIn && (
        <div>
          <Login />
          <Signup />
        </div>
      )}
    </PageWrapper>
  );
}

export default Home;
