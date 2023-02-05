import { Accordion, Box, Button, Card, Flex, Text, Title } from '@mantine/core';
import { useContext } from 'react';
import { UserContext } from '../../users';
import { PageWrapper } from '../../../components';

const CharacterList = () => {
  const {
    user: { characters: chars },
    loggedIn,
  } = useContext(UserContext);

  const handleCharacterClick = char => {
    console.log(char);
  };
  return (
    <PageWrapper title="My Characters">
      <Accordion chevronPosition="left" variant="separated">
        {chars?.map(char => (
          <Accordion.Item key={char._id} value={char._id}>
            <Accordion.Control>
              <Flex justify="space-between">
                <Title order={4}>{char.name}</Title>
                <Box onClick={() => console.log({ char })}>Char Sheet</Box>
              </Flex>
            </Accordion.Control>
            <Accordion.Panel value={char._id}>
              <Card onClick={() => handleCharacterClick({ char })}>
                <Text>
                  {!!char.campaign && (char.isNPC ? `NPC in: ${char.campaign.name}` : `PC in: ${char.campaign.name}`)}
                </Text>
              </Card>
            </Accordion.Panel>
          </Accordion.Item>
        ))}
        <Accordion.Item value="new character">
          <Accordion.Control>
            <Title order={3}>+ Add Character</Title>
          </Accordion.Control>
          <Accordion.Panel>
            <Card></Card>
          </Accordion.Panel>
        </Accordion.Item>
      </Accordion>
    </PageWrapper>
  );
};

export default CharacterList;
